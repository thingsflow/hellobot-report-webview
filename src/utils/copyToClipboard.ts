export const isClipboardSupported = () => navigator?.clipboard != null;

export const copyToClipboard = async (text: string) => {
  if (isClipboardSupported()) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {}
  }
};

export default copyToClipboard;
