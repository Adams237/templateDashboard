import { generateKeyPair } from "./encodeKey";


let publicKeyPem: string;
let privateKeyPem: string;

export async function initCryptoKeys() {
  if (!publicKeyPem) {
    const pair = await generateKeyPair();
    publicKeyPem  = pair.publicKeyPem;
    privateKeyPem = pair.privateKeyPem;
  }
}

// getters
export function getPublicKey()  { return publicKeyPem; }
export function getPrivateKey() { return privateKeyPem; }
