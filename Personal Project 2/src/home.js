import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { AppContext } from "./appContext";
import Header from "./header";
import Card from "./card";
import quotes from "./quotes.json";

export default function Home() {

  const { theme, tasks, addTask, deleteTask } = useContext(AppContext);
  const [taskInput, setTaskInput] = useState("");

  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      <Header title="LifeHub" />

      <Text style={[styles.greeting, { color: theme.text }]}>
        Your Daily Dashboard 🚀
      </Text>

      <Card>
        <Text style={[styles.cardTitle, { color: theme.text }]}>
          Add Task
        </Text>

        <TextInput
          placeholder="Enter a task..."
          placeholderTextColor="#94a3b8"
          value={taskInput}
          onChangeText={setTaskInput}
          style={[styles.input, { color: theme.text }]}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => {
            addTask(taskInput);
            setTaskInput("");
          }}
        >
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </Card>

      <Card>
        <Text style={[styles.cardTitle, { color: theme.text }]}>
          Tasks
        </Text>

        {tasks.length === 0 && (
          <Text style={{ color: theme.text }}>No tasks yet</Text>
        )}

        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={styles.taskItem}
            onPress={() => deleteTask(task.id)}
          >
            <Text style={{ color: theme.text }}>
              ✔ {task.text}
            </Text>
          </TouchableOpacity>
        ))}
      </Card>

      <Card>
        <Text style={[styles.cardTitle, { color: theme.text }]}>
          Quote
        </Text>

        <Text style={{ color: theme.text }}>
          "{quote.text}"
        </Text>
      </Card>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  },

  greeting: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10
  },

  input: {
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  },

  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center"
  },

  buttonText: {
    color: "white",
    fontWeight: "600"
  },

  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#334155"
  }

});