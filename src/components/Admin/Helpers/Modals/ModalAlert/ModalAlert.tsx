import React from 'react';

import {ModalAlertWrapper} from './ModalAlertStyles';

const Modal: React.FC = ({children}) => {
  return (
    <ModalAlertWrapper
      initial={{
        opacity: 0,
        y: '-100%',
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {duration: 0.4},
      }}
      exit={{
        opacity: 0,
        transition: {duration: 0.4},
      }}>
      {children}
    </ModalAlertWrapper>
  );
};

export default Modal;
