export const patterns = {
  name: /^[A-Za-z][A-Za-z ]{1,49}$/,
  username: /^[A-Za-z0-9._@-]{4,30}$/,
  password: /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':\"\\|,.<>\/?`~.]{6,64}$/,
  gmail: /^[a-zA-Z0-9._%+-]+@gmail\.com$/i,
  phone: /^\+[1-9]\d{7,14}$/
};

export function validateSignup(values) {
  const errors = {};
  if (!values.name?.trim()) errors.name = "Name is required.";
  else if (!patterns.name.test(values.name.trim())) errors.name = "Only alphabets and spaces (2–50 chars).";
  if (!values.username) errors.username = "Username is required.";
  else if (!patterns.username.test(values.username)) errors.username = "Use letters, numbers and . _ - @ (4–30 chars).";
  if (!values.email) errors.email = "Email is required.";
  else if (!patterns.gmail.test(values.email)) errors.email = "Use a valid Gmail address.";
  if (!values.phone) errors.phone = "Phone is required.";
  else if (!patterns.phone.test(values.phone)) errors.phone = "Use +<country code><number>.";
  if (!values.password) errors.password = "Password is required.";
  else if (!patterns.password.test(values.password)) errors.password = "6–64 chars; letters, numbers, symbols.";
  else if (values.password === values.username) errors.password = "Password cannot equal username.";
  if (!values.confirm) errors.confirm = "Please confirm your password.";
  else if (values.confirm !== values.password) errors.confirm = "Passwords do not match.";
  return errors;
}

export function validateLogin(values) {
  const errors = {};
  if (!values.identifier) errors.identifier = "Enter username or Gmail.";
  if (!values.password) errors.password = "Password is required.";
  return errors;
}
