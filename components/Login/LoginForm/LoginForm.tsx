"use client";

import { useState, FC } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "../../../store/authSlice";
import styles from "./LoginForm.module.scss";

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      valid = false;
    } else if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
      valid = false;
    }

    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      valid = false;
    }

    if (!valid) return;

    if (email === "user@user.com" && password === "12345") {
      dispatch(login(email));
      router.push("/");
    } else if (email === "admin@admin.com" && password === "67890") {
      dispatch(login(email));
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <input
        className={styles["login-form__input"]}
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((prev) => ({ ...prev, email: "" }));
        }}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email}</span>}
      <input
        className={styles["login-form__input"]}
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors((prev) => ({ ...prev, password: "" }));
        }}
        placeholder="Password"
      />
      {errors.password && <span>{errors.password}</span>}
      <button className={styles["login-form__button"]} type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
