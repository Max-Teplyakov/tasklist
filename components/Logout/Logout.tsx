import { FC } from "react";
import styles from "./Logout.module.scss";
import LogoutButton from "./LogoutButton/LogoutButton";

const LogoutPage: FC = () => {
  return (
    <main className={styles["logout"]}>
      <h1>Are you going to log out of your account?</h1>
      <LogoutButton />
    </main>
  );
};

export default LogoutPage;
