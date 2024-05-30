"use client";

import { useState, useMemo, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { updateTask } from "../../../store/taskSlice";
import styles from "./TaskList.module.scss";

const TaskList: FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    title: "",
    email: "",
    status: "",
  });
  const [sortKey, setSortKey] = useState<"id" | "title" | "email" | "status">(
    "id"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState({
    title: "",
    text: "",
    email: "",
    status: "pending" as "pending" | "completed",
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      return (
        (!filter.title || task.title.includes(filter.title)) &&
        (!filter.email || task.email.includes(filter.email)) &&
        (!filter.status || task.status === filter.status)
      );
    });
  }, [tasks, filter]);

  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1;
      if (a[sortKey] > b[sortKey]) return 1;
      return 0;
    });
  }, [filteredTasks, sortKey]);

  const paginatedTasks = sortedTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startEditing = (task: {
    id: number;
    title: string;
    text: string;
    email: string;
    status: "pending" | "completed";
  }) => {
    setEditingTaskId(task.id);
    setEditValues({
      title: task.title,
      text: task.text,
      status: task.status,
      email: task.email,
    });
  };

  const saveEdit = () => {
    if (editingTaskId !== null) {
      dispatch(
        updateTask({
          id: editingTaskId,
          title: editValues.title,
          email: editValues.email,
          text: editValues.text,
          status: editValues.status,
        })
      );
      setEditingTaskId(null);
    }
  };

  return (
    <div className={styles["task-list"]}>
      <div className={styles["task-list__filters"]}>
        <input
          type="text"
          placeholder="Filter by title"
          value={filter.title}
          onChange={(e) => setFilter({ ...filter, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by email"
          value={filter.email}
          onChange={(e) => setFilter({ ...filter, email: e.target.value })}
        />
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as any)}
        >
          <option value="id">ID</option>
          <option value="title">Title</option>
          <option value="email">Email</option>
          <option value="status">Status</option>
        </select>
      </div>
      <div className={styles["task-list__container"]}>
        {paginatedTasks.map((task) => (
          <div
            key={task.id}
            className={`${styles["task-list__item"]} ${task.status === "completed" ? styles["task-list__item--completed"] : ""}`}
          >
            {editingTaskId === task.id ? (
              <div className={styles["task-list__edit-form"]}>
                <input
                  type="text"
                  value={editValues.title}
                  onChange={(e) =>
                    setEditValues({ ...editValues, title: e.target.value })
                  }
                />
                <textarea
                  value={editValues.text}
                  onChange={(e) =>
                    setEditValues({ ...editValues, text: e.target.value })
                  }
                />
                <select
                  value={editValues.status}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      status: e.target.value as "pending" | "completed",
                    })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
                <button onClick={saveEdit}>Save</button>
              </div>
            ) : (
              <div>
                <h3>{task.title}</h3>
                <p>{task.text}</p>
                <p>{task.email}</p>
                <p>{task.status}</p>
                {currentUser === "admin@admin.com" && (
                  <button onClick={() => startEditing(task)}>Edit</button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles["task-list__pagination"]}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={styles["task-list__pagination-button"]}
              onClick={() => handlePageChange(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default TaskList;
