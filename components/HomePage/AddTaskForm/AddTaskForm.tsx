"use client";

import { useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../../store/taskSlice";
import { RootState } from "../../../store/store";
import styles from "./AddTaskForm.module.scss";

const AddTaskForm: FC = () => {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({ title: "", email: "" });
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!title) {
      setErrors((prev) => ({ ...prev, title: "Title is required" }));
      valid = false;
    } else if (title.length < 3 || title.length > 25) {
      setErrors((prev) => ({
        ...prev,
        title: "Title must be between 3 and 25 characters",
      }));
      valid = false;
    }

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      valid = false;
    } else if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
      valid = false;
    }

    if (!valid) return;

    dispatch(addTask({ title, email, text }));
    setTitle("");
    setEmail("");
    setText("");
    setErrors({ title: "", email: "" });
  };

  return (
    <form className={styles["add-task-form"]} onSubmit={handleSubmit}>
      <input
        className={styles["add-task-form__input"]}
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setErrors((prev) => ({ ...prev, title: "" }));
        }}
        placeholder="Title"
      />
      {errors.title && <span>{errors.title}</span>}
      <input
        className={styles["add-task-form__input"]}
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((prev) => ({ ...prev, email: "" }));
        }}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email}</span>}
      <textarea
        className={styles["add-task-form__textarea"]}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Text"
      />
      <button className={styles["add-task-form__button"]} type="submit">
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
