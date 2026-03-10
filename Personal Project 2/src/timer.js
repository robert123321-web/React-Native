import React, { useState } from "react";
import { View, Text, Button } from "react-native";

export default function Timer() {

  const [seconds, setSeconds] = useState(1500);

  return (
    <View>
      <Text>Focus Timer: {seconds}s</Text>

      <Button
        title="Start"
        onPress={() => {
          setInterval(() => {
            setSeconds((s) => s - 1);
          }, 1000);
        }}
      />
    </View>
  );
}