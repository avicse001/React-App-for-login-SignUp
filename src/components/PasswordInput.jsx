import React, { useState } from "react";

export default function PasswordInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  autoComplete = "current-password"
}) {
  const [show, setShow] = useState(false);
  const id = name;
  return (
    <div className="field">
      <label htmlFor={id} className="label">{label}</label>
      <div className={`password-wrap ${error ? "invalid" : ""}`}>
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="input password-input"
        />
        <button
          type="button"
          className="toggle"
          aria-label={show ? "Hide password" : "Show password"}
          onClick={() => setShow(s => !s)}
        >
          {show ? "🙈" : "👁️"}
        </button>
      </div>
      {error ? <p className="error-msg">{error}</p> : null}
    </div>
  );
}
