import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal, ScrollView } from "react-native";
import { AppContext } from "./appContext";
import Card from "./card";

export default function Calendar() {
  const { theme, events, addEvent, deleteEvent, getEventsForDate } = useContext(AppContext);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 17));
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (day) => {
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const handleAddEvent = () => {
    if (!eventTitle.trim() || !selectedDate) return;

    addEvent({
      title: eventTitle,
      date: formatDate(selectedDate),
      time: eventTime || "All day",
      description: eventDescription
    });

    setEventTitle("");
    setEventTime("");
    setEventDescription("");
    setShowModal(false);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    setSelectedDate(null);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(formatDate(selectedDate)) : [];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Calendar Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <TouchableOpacity onPress={previousMonth} style={styles.monthButton}>
          <Text style={[styles.monthButtonText, { color: theme.primary }]}>{"◀"}</Text>
        </TouchableOpacity>
        <Text style={[styles.monthName, { color: theme.text }]}>{monthName}</Text>
        <TouchableOpacity onPress={nextMonth} style={styles.monthButton}>
          <Text style={[styles.monthButtonText, { color: theme.primary }]}>{"▶"}</Text>
        </TouchableOpacity>
      </View>

      {/* Weekday Headers */}
      <View style={[styles.weekdayContainer, { backgroundColor: theme.card }]}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <View key={day} style={styles.weekdayCell}>
            <Text style={[styles.weekdayText, { color: theme.text }]}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={[styles.calendarGrid, { backgroundColor: theme.card, borderRadius: 18, overflow: "hidden", marginHorizontal: 20, marginBottom: 20 }]}>
        {days.map((day, index) => {
          const dateStr = day ? formatDate(day) : null;
          const dayEvents = day ? getEventsForDate(dateStr) : [];
          const isSelected = selectedDate === day;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCell,
                isSelected && [{ backgroundColor: theme.primary }],
                !day && { backgroundColor: theme.background }
              ]}
              onPress={() => day && setSelectedDate(isSelected ? null : day)}
              disabled={!day}
            >
              {day && (
                <>
                  <Text style={[styles.dayNumber, { color: isSelected ? "#fff" : theme.text }]}>
                    {day}
                  </Text>
                  {dayEvents.length > 0 && (
                    <View style={styles.eventIndicator}>
                      <Text style={styles.eventDot}>●</Text>
                    </View>
                  )}
                </>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Selected Date Info and Events */}
      {selectedDate && (
        <Card>
          <Text style={[styles.selectedDateTitle, { color: theme.text }]}>
            {new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate).toLocaleDateString("default", { 
              weekday: "long", 
              month: "long", 
              day: "numeric" 
            })}
          </Text>

          <TouchableOpacity
            style={[styles.addEventButton, { backgroundColor: theme.primary }]}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.buttonText}>+ Add Event</Text>
          </TouchableOpacity>

          {selectedDateEvents.length === 0 ? (
            <Text style={{ color: theme.text, marginTop: 10, fontStyle: "italic" }}>No events scheduled</Text>
          ) : (
            <View style={styles.eventsList}>
              {selectedDateEvents.map((event) => (
                <View key={event.id} style={[styles.eventItem, { borderLeftColor: theme.primary }]}>
                  <View style={styles.eventContent}>
                    <Text style={[styles.eventTitle, { color: theme.text }]}>{event.title}</Text>
                    <Text style={[styles.eventTime, { color: theme.text }]}>🕐 {event.time}</Text>
                    {event.description && (
                      <Text style={[styles.eventDesc, { color: theme.text }]}>{event.description}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => deleteEvent(event.id)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </Card>
      )}

      {/* Add Event Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Add Event</Text>

            <TextInput
              placeholder="Event title..."
              placeholderTextColor="#94a3b8"
              value={eventTitle}
              onChangeText={setEventTitle}
              style={[styles.modalInput, { color: theme.text }]}
            />

            <TextInput
              placeholder="Time (e.g., 2:30 PM)..."
              placeholderTextColor="#94a3b8"
              value={eventTime}
              onChangeText={setEventTime}
              style={[styles.modalInput, { color: theme.text }]}
            />

            <TextInput
              placeholder="Description (optional)..."
              placeholderTextColor="#94a3b8"
              value={eventDescription}
              onChangeText={setEventDescription}
              multiline
              numberOfLines={3}
              style={[styles.modalInput, { color: theme.text }]}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.primary }]}
                onPress={handleAddEvent}
              >
                <Text style={styles.buttonText}>Add Event</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#64748b" }]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 18
  },
  monthButton: {
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  monthButtonText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  monthName: {
    fontSize: 24,
    fontWeight: "bold"
  },
  weekdayContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 10,
    paddingVertical: 15,
    borderRadius: 12
  },
  weekdayCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  weekdayText: {
    fontWeight: "600",
    fontSize: 12
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 5,
    position: "relative"
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: "600"
  },
  eventIndicator: {
    position: "absolute",
    bottom: 5,
    right: 5
  },
  eventDot: {
    fontSize: 10,
    color: "#22c55e"
  },
  selectedDateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15
  },
  addEventButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center"
  },
  eventsList: {
    marginTop: 15
  },
  eventItem: {
    borderLeftWidth: 4,
    paddingLeft: 15,
    paddingVertical: 12,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  eventContent: {
    flex: 1
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4
  },
  eventTime: {
    fontSize: 14,
    marginBottom: 4
  },
  eventDesc: {
    fontSize: 13,
    opacity: 0.8,
    marginTop: 4
  },
  deleteButton: {
    padding: 8,
    marginLeft: 10
  },
  deleteButtonText: {
    color: "#ef4444",
    fontSize: 18,
    fontWeight: "bold"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    width: "85%",
    borderRadius: 18,
    padding: 20,
    maxHeight: "80%"
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },
  modalInput: {
    borderWidth: 1.5,
    borderColor: "#475569",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 14
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12
  }
});
