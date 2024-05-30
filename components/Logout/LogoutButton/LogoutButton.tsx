"use client";

import { FC } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../../../store/authSlice";
import styles from "./LogoutButton.module.scss";

const LogoutButton: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className={styles["logout__container"]}>
      <button className={styles["logout__button"]} onClick={handleLogout}>
        Yes, I want to log out of my account
      </button>
      <button className={styles["logout__button"]} onClick={handleBack}>
        No, I don't want to log out of my account
      </button>
    </div>
  );
};

export default LogoutButton;
