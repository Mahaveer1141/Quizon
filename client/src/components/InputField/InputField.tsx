import React, { InputHTMLAttributes } from "react";
import "./InputField.scss";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  value?: string;
  name?: string;
  required?: boolean;
  type: string;
  placeholder?: string;
  error?: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  error,
  handleChange,
  ...props
}) => {
  return (
    <div className="input-con">
      <input {...props} onChange={handleChange} className="input-text" />
      {error ? <div className="error-text">{error}</div> : null}
    </div>
  );
};

export default InputField;
