import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  title: string;
  email: string;
  text: string;
  status: "pending" | "completed";
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [
    {
      id: 1,
      title: "task 1",
      email: "user@user.com",
      text: "Some task 1",
      status: "pending",
    },
    {
      id: 2,
      title: "task 2",
      email: "admin@admin.com",
      text: "some task2",
      status: "completed",
    },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{ title: string; email: string; text: string }>
    ) => {
      const newTask: Task = {
        id: state.tasks.length + 1,
        title: action.payload.title,
        email: action.payload.email,
        text: action.payload.text,
        status: "pending",
      };
      state.tasks.push(newTask);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const { id, title, email, text, status } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.email = email;
        task.text = text;
        task.status = status;
      }
    },
  },
});

export const { addTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
