"use client";

import { FC } from "react";
import Link from "next/link";
import styles from "./not-found.module.scss";

const NotFoundPage: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link className={styles.link} href="/">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
