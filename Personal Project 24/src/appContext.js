import React, { createContext, useState } from "react";
import theme from "./darkTheme";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);

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

  const addEvent = (event) => {
    const newEvent = {
      id: Date.now().toString(),
      title: event.title,
      date: event.date,
      time: event.time || "All day",
      description: event.description || ""
    };
    setEvents([...events, newEvent]);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const getEventsForDate = (date) => {
    return events.filter(e => e.date === date);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        tasks,
        addTask,
        deleteTask,
        events,
        addEvent,
        deleteEvent,
        getEventsForDate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};