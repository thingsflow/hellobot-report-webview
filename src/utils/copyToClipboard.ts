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
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<boolean>(async (resolve) => {
    const rootElement = document.body;

    if (isClipboardSupported()) {
      await navigator.clipboard.writeText(text);
      resolve(true);
      return;
    }

    // 안드로이드 웹뷰에서 위 로직에 실패할 경우 아래 로직을 실행한다.
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
  });
};

export default copyToClipboard;
