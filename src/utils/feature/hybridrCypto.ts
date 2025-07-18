// src/utils/hybridCrypto.ts

// —————— Helpers de conversion ——————

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = window.atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

function derToPem(der: ArrayBuffer, label: string): string {
  const b64 = arrayBufferToBase64(der);
  const lines = b64.match(/.{1,64}/g) || [];
  return [
    `-----BEGIN ${label}-----`,
    ...lines,
    `-----END ${label}-----`
  ].join("\n");
}

function pemToDer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN [^-]+-----/, "")
    .replace(/-----END [^-]+-----/, "")
    .replace(/\s+/g, "");
  return base64ToArrayBuffer(b64);
}

// —————— 1. Génération de la paire RSA-OAEP ——————

export async function generateKeyPair(): Promise<{
  publicKeyPem: string;
  privateKeyPem: string;
}> {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: "SHA-256",
    },
    true,                  // autorise l’export des clés
    ["encrypt", "decrypt"] // usages
  );

  const spki = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
  const pkcs8 = await window.crypto.subtle.exportKey(
    "pkcs8",
    keyPair.privateKey
  );

  return {
    publicKeyPem: derToPem(spki, "PUBLIC KEY"),
    privateKeyPem: derToPem(pkcs8, "PRIVATE KEY"),
  };
}

// —————— 2. Importer une clé PEM en CryptoKey ——————

async function importPublicKey(pem: string): Promise<CryptoKey> {
  const der = pemToDer(pem);
  return window.crypto.subtle.importKey(
    "spki",
    der,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"]
  );
}

async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const der = pemToDer(pem);
  return window.crypto.subtle.importKey(
    "pkcs8",
    der,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["decrypt"]
  );
}

// —————— 3. Schéma hybride AES-GCM + RSA-OAEP ——————

export interface HybridEncrypted {
  encryptedKey: string; // AES key chiffrée par RSA (Base64)
  iv: string;           // vecteur d'initialisation AES (Base64)
  ciphertext: string;   // message chiffré AES (Base64)
}

export async function encryptHybrid(
  plaintext: string,
  publicKeyPem: string
): Promise<HybridEncrypted> {
  // a) importer la clé publique RSA
  const rsaPub = await importPublicKey(publicKeyPem);

  // b) générer une clé AES-GCM 256 bits
  const aesKey = await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  // c) exporter la clé AES et la chiffrer par RSA-OAEP
  const rawKey = await window.crypto.subtle.exportKey("raw", aesKey);
  const encryptedKeyBuf = await window.crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    rsaPub,
    rawKey
  );

  // d) chiffrer le message avec AES-GCM
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const cipherBuf = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    data
  );

  return {
    encryptedKey: arrayBufferToBase64(encryptedKeyBuf),
    iv: arrayBufferToBase64(iv.buffer),
    ciphertext: arrayBufferToBase64(cipherBuf)
  };
}

export async function decryptHybrid(
  encrypted: HybridEncrypted,
  privateKeyPem: string
): Promise<string> {
  // a) importer la clé privée RSA
  const rsaPriv = await importPrivateKey(privateKeyPem);

  // b) déchiffrer la clé AES
  const rawKey = await window.crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    rsaPriv,
    base64ToArrayBuffer(encrypted.encryptedKey)
  );
  const aesKey = await window.crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  // c) déchiffrer le message AES-GCM
  const iv = new Uint8Array(base64ToArrayBuffer(encrypted.iv));
  const plainBuf = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    aesKey,
    base64ToArrayBuffer(encrypted.ciphertext)
  );

  return new TextDecoder().decode(plainBuf);
}

// —————— 4. Exemple d’utilisation ——————

export async function demoHybrid() {
  // 1. Générer RSA
  const { publicKeyPem, privateKeyPem } = await generateKeyPair();
  console.log("PUBLIC KEY:\n", publicKeyPem);
  console.log("PRIVATE KEY:\n", privateKeyPem);

  // 2. Texte long à chiffrer
  const longText = "Ceci est une chaîne très longue ".repeat(50);

  // 3. Chiffrement hybride
  const encrypted = await encryptHybrid(longText, publicKeyPem);
  console.log("Encrypted:", encrypted);

  // 4. Déchiffrement hybride
  const decrypted = await decryptHybrid(encrypted, privateKeyPem);
  console.log("Decrypted:", decrypted);
}

// Exécutez demoHybrid() pour tester
// demoHybrid().catch(console.error);
