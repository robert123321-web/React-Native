import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { AppContext } from "./appContext";
import Header from "./header";
import Card from "./card";
import Calendar from "./calendar";
import MiniGame from "./minigame";
import Weather from "./weather";
import quotes from "./quotes.json";

export default function Home() {

  const { theme, tasks, addTask, deleteTask } = useContext(AppContext);
  const [taskInput, setTaskInput] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  const handleAddTask = () => {
    if (taskInput.trim()) {
      addTask(taskInput);
      setTaskInput("");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      <Header title="LifeHub" />

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "dashboard" && { backgroundColor: theme.primary }
          ]}
          onPress={() => setActiveTab("dashboard")}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === "dashboard" ? "#fff" : theme.text }
          ]}>
            📊 Dashboard
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "calendar" && { backgroundColor: theme.primary }
          ]}
          onPress={() => setActiveTab("calendar")}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === "calendar" ? "#fff" : theme.text }
          ]}>
            📅 Calendar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "weather" && { backgroundColor: theme.primary }
          ]}
          onPress={() => setActiveTab("weather")}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === "weather" ? "#fff" : theme.text }
          ]}>
            🌤️ Weather
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "minigame" && { backgroundColor: theme.primary }
          ]}
          onPress={() => setActiveTab("minigame")}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === "minigame" ? "#fff" : theme.text }
          ]}>
            🎮 Game
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dashboard View */}
      {activeTab === "dashboard" && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

          <Text style={[styles.greeting, { color: theme.text }]}>
            Your Daily Dashboard 🚀
          </Text>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <Card>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: theme.primary }]}>
                  {tasks.length}
                </Text>
                <Text style={[styles.statLabel, { color: theme.text }]}>
                  Tasks
                </Text>
              </View>
            </Card>
          </View>

          {/* Add Task Card */}
          <Card>
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              ✏️ Add Task
            </Text>

            <TextInput
              placeholder="Enter a task..."
              placeholderTextColor="#94a3b8"
              value={taskInput}
              onChangeText={setTaskInput}
              style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
              onSubmitEditing={handleAddTask}
            />

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={handleAddTask}
            >
              <Text style={styles.buttonText}>➕ Add Task</Text>
            </TouchableOpacity>
          </Card>

          {/* Tasks Card */}
          <Card>
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              📋 Tasks ({tasks.length})
            </Text>

            {tasks.length === 0 ? (
              <Text style={[styles.emptyText, { color: theme.text }]}>
                No tasks yet. Add one to get started! 🎯
              </Text>
            ) : (
              <View style={styles.tasksList}>
                {tasks.map((task, index) => (
                  <TouchableOpacity
                    key={task.id}
                    style={[
                      styles.taskItem,
                      {
                        borderLeftColor: theme.primary,
                        backgroundColor: theme.background
                      }
                    ]}
                    onPress={() => deleteTask(task.id)}
                  >
                    <Text style={[styles.taskNumber, { color: theme.primary }]}>
                      {index + 1}.
                    </Text>
                    <Text style={[styles.taskText, { color: theme.text }]}>
                      {task.text}
                    </Text>
                    <Text style={styles.deleteHint}>✕</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </Card>

          {/* Quote Card */}
          <Card>
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              ✨ Daily Quote
            </Text>

            <Text style={[styles.quoteText, { color: theme.text }]}>
              "{quote.text}"
            </Text>
            <Text style={[styles.quoteAuthor, { color: theme.primary }]}>
              — {quote.author}
            </Text>
          </Card>

          <View style={{ height: 30 }} />

        </ScrollView>
      )}

      {/* Calendar View */}
      {activeTab === "calendar" && <Calendar />}

      {/* Weather View */}
      {activeTab === "weather" && <Weather />}

      {/* MiniGame View */}
      {activeTab === "minigame" && <MiniGame />}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },



  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
    backgroundColor: "transparent",
    alignItems: "center"
  },

  tab: {
    height: 44,
    minWidth: 110,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#64748b",
    flexShrink: 0
  },

  tabText: {
    fontSize: 12,
    fontWeight: "600"
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 10
  },

  greeting: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    marginTop: 10
  },

  statsContainer: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-around"
  },

  statItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10
  },

  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5
  },

  statLabel: {
    fontSize: 14,
    fontWeight: "600"
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15
  },

  input: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 15,
    fontWeight: "500"
  },

  button: {
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16
  },

  tasksList: {
    marginTop: 10
  },

  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingVertical: 12,
    paddingRight: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderRadius: 10,
    alignItems: "center"
  },

  taskNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10
  },

  taskText: {
    fontSize: 15,
    fontWeight: "500",
    flex: 1
  },

  deleteHint: {
    color: "#ef4444",
    fontSize: 16,
    fontWeight: "bold"
  },

  emptyText: {
    fontSize: 15,
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 20
  },

  quoteText: {
    fontSize: 16,
    fontStyle: "italic",
    lineHeight: 24,
    marginBottom: 12,
    fontWeight: "500"
  },

  quoteAuthor: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right"
  }

});