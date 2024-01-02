import { useEffect, useState } from 'react';

const useDetectKeyboardOpen = (
  defaultValue?: boolean,
  minKeyboardHeight = 300,
) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(defaultValue);

  useEffect(() => {
    if (!window.visualViewport) return;

    const listener = () => {
      if (!window.visualViewport) return;

      const newState =
        window.screen.height - minKeyboardHeight > window.visualViewport.height;
      if (isKeyboardOpen !== newState) {
        setIsKeyboardOpen(newState);
      }
    };
    if (typeof visualViewport !== 'undefined') {
      window.visualViewport.addEventListener('resize', listener);
    }

    return () => {
      if (!window.visualViewport) return;

      if (typeof visualViewport !== 'undefined') {
        window.visualViewport.removeEventListener('resize', listener);
      }
    };
  }, []);

  return isKeyboardOpen;
};

export default useDetectKeyboardOpen;
