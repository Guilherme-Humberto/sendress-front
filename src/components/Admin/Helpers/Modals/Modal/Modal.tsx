import React from 'react';

import {ModalWrapper} from './ModalStyles';

interface ModalProps {
  animation: {
    initial: any;
    animate: any;
    exit: any;
  };
}

const Modal: React.FC<ModalProps> = ({children, animation}) => {
  return (
    <ModalWrapper
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}>
      {children}
    </ModalWrapper>
  );
};

export default Modal;
