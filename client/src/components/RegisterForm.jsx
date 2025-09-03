import React, { useState } from "react";
import { register } from "../api/auth";

export default function RegisterForm() {
  const [form, setForm] = useState({
    email: "", first_name: "", last_name: "", password: "",
    university_name: "", gender: "", year_joined: ""
  });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    await register({ ...form, year_joined: Number(form.year_joined) || null });
    alert("Registered! Now login.");
  };
  return (
    <form onSubmit={onSubmit} style={{ display:"grid", gap: 8, maxWidth: 420 }}>
      <input name="email" placeholder="Email" onChange={onChange} required />
      <input name="first_name" placeholder="First name" onChange={onChange} />
      <input name="last_name" placeholder="Last name" onChange={onChange} />
      <input type="password" name="password" placeholder="Password" onChange={onChange} required />
      <input name="university_name" placeholder="University" onChange={onChange} />
      <input name="gender" placeholder="Gender" onChange={onChange} />
      <input name="year_joined" placeholder="Year Joined" onChange={onChange} />
      <button type="submit">Register</button>
    </form>
  );
}
