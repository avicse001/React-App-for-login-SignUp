import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FormInput from "../components/FormInput";
import PasswordInput from "../components/PasswordInput";
import { validateLogin } from "../utils/validators";

export default function Login() {
  const [values, setValues] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [banner, setBanner] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.justSignedUp) {
      setBanner({ type: "success", text: "Sign-up successful! You can log in now." });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const onChange = e => setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  const onBlur = () => setErrors(validateLogin(values));
  const onSubmit = e => {
    e.preventDefault();
    const errs = validateLogin(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const saved = JSON.parse(localStorage.getItem("authkit_user") || "null");
    if (!saved) return setBanner({ type: "error", text: "No account found. Please sign up first." });
    const id = values.identifier.trim().toLowerCase();
    const ok = (id === saved.username.toLowerCase() || id === saved.email.toLowerCase()) && values.password === saved.password;
    if (!ok) return setBanner({ type: "error", text: "Invalid credentials. Try again." });
    setBanner({ type: "success", text: `Welcome back, ${saved.name || saved.username}!` });
  };

  return (
    <section className="shell">
      <div className="card">
        <h1>Welcome back</h1>
        <p className="sub">Log in using your username or Gmail.</p>
        {banner && <div className={`banner ${banner.type}`}>{banner.text}</div>}
        <form className="form" onSubmit={onSubmit}>
          <FormInput label="" name="identifier" value={values.identifier} onChange={onChange} onBlur={onBlur} placeholder="name@gmail.com" error={errors.identifier} />
          <PasswordInput label="" name="password" value={values.password} onChange={onChange} onBlur={onBlur} placeholder="Your password" error={errors.password} />
          <button className="btn primary">Log In</button>
          <p className="hint">New here? <Link to="/signup">Create an account</Link></p>
        </form>
      </div>
    </section>
  );
}
