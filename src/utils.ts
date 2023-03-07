// Generate array from ASCII
export const arrMaker = (length: number, start: number) => {
  return Array.from(Array(length))
    .map((e, i) => i + start)
    .map((x) => String.fromCharCode(x));
};

// Generate random number between min and max
export const generateRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * max + min);
};

// Copy text to clipboard
export const copyTextToClipboard = async (text: string) => {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
};
