export const base64ToArrayBuffer = (base64: string) => {
  const base64Data = base64.includes(",") ? base64.split(",")[1] : base64;

  const binary = atob(base64Data);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
};
