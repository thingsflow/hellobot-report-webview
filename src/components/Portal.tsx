import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface IPopUpModal {
  children: JSX.Element | JSX.Element[];
  selector?: string;
}

const Portal = ({ children, selector }: IPopUpModal) => {
  const [element, setElement] = useState<Element | null>();

  useEffect(() => {
    setElement(document.querySelector(selector || '#portal'));
  }, []);

  return element ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
