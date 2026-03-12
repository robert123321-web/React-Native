import React, { useState, useContext } from "react";
import { View, TextInput, Button } from "react-native";
import { AppContext } from "./appContext";

export default function Notes() {

  const { addNote } = useContext(AppContext);
  const [note, setNote] = useState("");

  return (
    <View>
      <TextInput
        placeholder="Write a note..."
        value={note}
        onChangeText={setNote}
      />

      <Button
        title="Save Note"
        onPress={() => {
          addNote(note);
          setNote("");
        }}
      />
    </View>
  );
}