import React, { createContext, useState } from "react";
import theme from "./darkTheme";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      text: task
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        tasks,
        addTask,
        deleteTask
      }}
    >
      {children}
    </AppContext.Provider>
  );
};