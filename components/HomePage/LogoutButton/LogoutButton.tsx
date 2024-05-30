"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import styles from "./LogoutButton.module.scss";

const LogoutButton: FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/logout");
  };

  return (
    <div className={styles["logout__nav"]}>
      <button className={styles["logout__button"]} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
