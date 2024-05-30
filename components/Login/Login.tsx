"use client";

import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm/LoginForm";
import styles from "./Login.module.scss";

const LoginPage: FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  if (currentUser) return null;

  return (
    <main>
      <h1 className={styles["login__title"]}>Login</h1>
      <LoginForm />
    </main>
  );
};

export default LoginPage;
