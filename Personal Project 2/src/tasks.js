import React, { useState, useContext } from "react";
import { View, TextInput, Button } from "react-native";
import { AppContext } from "./appContext";

export default function Tasks() {

  const { addTask } = useContext(AppContext);
  const [task, setTask] = useState("");

  return (
    <View>
      <TextInput
        placeholder="New task"
        value={task}
        onChangeText={setTask}
      />

      <Button
        title="Add Task"
        onPress={() => {
          addTask(task);
          setTask("");
        }}
      />
    </View>
  );
}