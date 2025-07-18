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