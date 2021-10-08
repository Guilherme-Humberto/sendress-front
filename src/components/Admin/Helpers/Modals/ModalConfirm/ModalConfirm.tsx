import React from 'react';

import {ModalConfirmWrapper} from './ModalConfirmStyles';

interface ModalConfirmProps {
  content: string;
  execute(): void;
  close(value: boolean): void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  content,
  execute,
  close,
}) => {
  return (
    <ModalConfirmWrapper
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
      <h1>{content}</h1>
      <div className="btns-confirm">
        <button
          style={{background: '#645bde', color: '#fff'}}
          onClick={() => close(false)}>
          Cancelar
        </button>
        <button onClick={execute}>Sim</button>
      </div>
    </ModalConfirmWrapper>
  );
};

export default ModalConfirm;
