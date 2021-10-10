import React from 'react';

import {ModalWrapper} from './ModalStyles';

interface ModalProps {
  animation: {
    initial: any;
    animate: any;
    exit: any;
  };
  height?: number;
  width?: number;
}

const Modal: React.FC<ModalProps> = ({children, animation, height, width}) => {
  return (
    <ModalWrapper
      height={height ? height : 0}
      width={width ? width : 0}
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}>
      <div className="content">{children}</div>
    </ModalWrapper>
  );
};

export default Modal;
