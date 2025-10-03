import { DiscountTier } from "./licence/type";

export const formaNumber = (value: number|string) => {
 // 1. On convertit toujours en string et on supprime les espaces
  const raw = String(value).replace(/\s+/g, '');
  // 2. On accepte seulement les chiffres ; sinon on retourne vide
  if (!/^\d*$/.test(raw) || raw === "") {
    return "";
  }
  // 3. On parse en int (optionnel si vous ne faites pas de calcul derrière)
  const num = parseInt(raw, 10);
  // 4. On formate avec un regex (séparateur espace tous les 3 chiffres)
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // reader.result est de type string | ArrayBuffer
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Le résultat de FileReader n’est pas une chaîne'));
      }
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsDataURL(file);
  });
}

export function generateRandomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

// time.ts
type Opts = {
  locale?: string;           // ex: "fr-FR" | "en-US"
  timeZone?: string;         // ex: "Africa/Douala"
  now?: Date;                // pour les tests
};

const pad2 = (n: number) => n.toString().padStart(2, "0");



 
export function formatDateAgo(date: Date, opts: Opts = {}): string {
  const {
    locale = "fr-FR",
    timeZone = "Africa/Douala",
    now = new Date(),
  } = opts;

  const d = new Date(date);
  const nowTz = new Date(
    new Intl.DateTimeFormat("en-CA", { // format stable ISO-like
      timeZone, year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    }).format(now).replace(",", "")
  );
  const dTz = new Date(
    new Intl.DateTimeFormat("en-CA", {
      timeZone, year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    }).format(d).replace(",", "")
  );

  const diffMs = nowTz.getTime() - dTz.getTime();
  const sec = Math.max(0, Math.floor(diffMs / 1000));
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);

  if (sec < 60) return locale.startsWith("fr") ? "À l’instant" : "Just now";
  if (min < 60)
    return locale.startsWith("fr") ? `il y a ${min} min` : `${min} min ago`;
  if (hour < 24)
    return locale.startsWith("fr") ? `il y a ${hour} h` : `${hour} h ago`;

  // Hier
  if (day === 1) return locale.startsWith("fr") ? "Hier" : "Yesterday";

  // < 7 jours → nom du jour abrégé
  if (day < 7) {
    const weekday = new Intl.DateTimeFormat(locale, {
      weekday: "short",
      timeZone,
    }).format(dTz);
    // Uniformiser (WhatsApp met souvent la majuscule initiale)
    return weekday.charAt(0).toUpperCase() + weekday.slice(1);
  }

  // Sinon → dd/MM/yy
  const dd = pad2(dTz.getDate());
  const mm = pad2(dTz.getMonth() + 1);
  const yy = dTz.getFullYear().toString().slice(-2);
  return `${dd}/${mm}/${yy}`;
}

/** Version générique “time ago” courte (utile pour statuts, badges, etc.) */
export function timeAgoShort(date: Date, opts: Opts = {}): string {
  const { now = new Date() } = opts;
  const diff = Math.max(0, now.getTime() - date.getTime());
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}j`;
  const w = Math.floor(d / 7);
  return `${w} sem`;
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function fractionDigitsFor(currency: string) {
  // XAF/XOF n'ont pas de décimales en général
  const zero = new Set(['XAF', 'XOF', 'JPY', 'CLP'])
  return zero.has(currency.toUpperCase()) ? 0 : 2
}

export function getDiscountPercent(months: number, tiers: DiscountTier[]): number {
  // On prend le palier de minMonths le plus grand qui soit <= months
  let best = 0
  for (const t of tiers.sort((a, b) => a.minMonths - b.minMonths)) {
    if (months >= t.minMonths) best = t.percent
  }
  return best
}
