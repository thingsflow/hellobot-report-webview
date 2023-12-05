const getDummyTextarea = () => {
  const textarea = document.createElement('textarea') as HTMLTextAreaElement;
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.display = 'fixed';

  return textarea;
};

export const isClipboardSupported = () => navigator?.clipboard != null;
export const isClipboardCommandSupported = () =>
  document.queryCommandSupported?.('copy') ?? false;

export const copyToClipboard = (text: string) => {
  return new Promise<boolean>(async (resolve) => {
    const rootElement = document.body;

    // if (isClipboardSupported()) {
    //   await navigator.clipboard.writeText(text);
    //   resolve(true);
    //   return;
    // }

    if (isClipboardCommandSupported()) {
      const textarea = getDummyTextarea();
      textarea.value = text;

      rootElement.appendChild(textarea);

      textarea.focus();
      textarea.select();

      document.execCommand('copy');
      rootElement.removeChild(textarea);
      resolve(true);
      return;
    }

    resolve(false);
    return;
  });
};

export default copyToClipboard;
