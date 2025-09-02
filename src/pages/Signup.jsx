import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import PasswordInput from "../components/PasswordInput";
import { validateSignup } from "../utils/validators";

export default function Signup() {
  const [values, setValues] = useState({ name: "", username: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const onChange = e => setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  const onBlur = () => setErrors(validateSignup(values));
  const onSubmit = e => {
    e.preventDefault();
    const errs = validateSignup(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    const payload = { ...values };
    localStorage.setItem("authkit_user", JSON.stringify(payload));
    setTimeout(() => {
      setSubmitting(false);
      navigate("/login", { state: { justSignedUp: true, username: payload.username } });
    }, 400);
  };
  return (
    <section className="shell">
      <div className="card">
        <h1>Create your account</h1>
        <form className="form" onSubmit={onSubmit}>
          <FormInput label="" name="name" value={values.name} onChange={onChange} onBlur={onBlur} placeholder="Name " error={errors.name} />
          <FormInput label="" name="username" value={values.username} onChange={onChange} onBlur={onBlur} placeholder="Username" error={errors.username} />
          <FormInput label="" name="email" type="email" value={values.email} onChange={onChange} onBlur={onBlur} placeholder="Email" error={errors.email} />
          <FormInput label="" name="phone" value={values.phone} onChange={onChange} onBlur={onBlur} placeholder="Phone No." error={errors.phone} />
          <PasswordInput label="" name="password" value={values.password} onChange={onChange} onBlur={onBlur} placeholder="Password" error={errors.password} />
          <PasswordInput label="" name="confirm" value={values.confirm} onChange={onChange} onBlur={onBlur} placeholder="Confirm Password" error={errors.confirm} />
          <button className="btn primary" disabled={submitting}>{submitting ? "Creating..." : "Sign Up"}</button>
          <p className="hint">Already have an account? <Link to="/login">Log in</Link></p>
        </form>
      </div>
    </section>
  );
}
