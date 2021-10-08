import React from 'react';
import InputMask from 'react-input-mask';
import {InputWrapper} from './InputStyles';

interface Props {
  label: string;
  mask: string;
  placeholder: string;
  value: string | number;
  error: string;
  type?: string;
  disabled?: boolean;
  setState(value: string): void;
}

const Input: React.FC<Props> = ({
  label,
  value,
  mask,
  error,
  type,
  disabled,
  placeholder,
  setState,
}) => {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setState(e.target.value);
  };
  return (
    <InputWrapper>
      <label>{label}</label>
      <InputMask
        disabled={disabled}
        mask={mask}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <strong className="error-msg">{error}</strong>}
    </InputWrapper>
  );
};

export default Input;
