"use client";

import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AddTaskForm from "./AddTaskForm/AddTaskForm";
import LogoutButton from "./LogoutButton/LogoutButton";
import TaskList from "./TaskList/TaskList";
import { useRouter } from "next/navigation";
import styles from "./HomePage.module.scss";

const HomePage: FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  return (
    <main>
      <LogoutButton />
      <h1 className={styles["home__title"]}>Tasks</h1>
      <TaskList />
      <AddTaskForm />
    </main>
  );
};

export default HomePage;
