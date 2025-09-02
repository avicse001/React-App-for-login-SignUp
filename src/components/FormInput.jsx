import React from "react";

export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  autoComplete
}) {
  const id = name;
  return (
    <div className="field">
      <label htmlFor={id} className="label">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`input ${error ? "invalid" : ""}`}
      />
      {error ? <p className="error-msg">{error}</p> : null}
    </div>
  );
}
