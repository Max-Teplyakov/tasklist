"use client";

import { FC } from "react";
import Link from "next/link";
import styles from "./error.module.scss";

const ErrorPage: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>500 - Server Error</h1>
      <p className={styles.description}>
        Something went wrong. Please try again later.
      </p>
      <Link href="/">Go back to Home</Link>
    </div>
  );
};

export default ErrorPage;
