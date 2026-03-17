import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from "react-native";
import { AppContext } from "./appContext";
import Card from "./card";

export default function Weather() {
  const { theme } = useContext(AppContext);
  const [location, setLocation] = useState("New York, USA");
  const [tempUnit, setTempUnit] = useState("°C");
  const [showModal, setShowModal] = useState(false);
  const [newLocation, setNewLocation] = useState("");

  // Mock weather data - replace with real API call if needed
  const currentWeather = {
    temp: 22,
    condition: "Partly Cloudy",
    icon: "⛅",
    humidity: 65,
    windSpeed: 12,
    feelsLike: 20,
    uvIndex: 5,
    visibility: 10,
    pressure: 1013
  };

  const hourlyForecast = [
    { time: "Now", temp: 22, icon: "⛅", condition: "Partly Cloudy" },
    { time: "1 PM", temp: 23, icon: "☀️", condition: "Sunny" },
    { time: "2 PM", temp: 24, icon: "☀️", condition: "Sunny" },
    { time: "3 PM", temp: 24, icon: "⛅", condition: "Partly Cloudy" },
    { time: "4 PM", temp: 23, icon: "⛅", condition: "Partly Cloudy" },
    { time: "5 PM", temp: 22, icon: "🌤️", condition: "Cloudy" }
  ];

  const weeklyForecast = [
    { day: "Today", high: 24, low: 18, icon: "⛅", condition: "Partly Cloudy" },
    { day: "Tomorrow", high: 25, low: 19, icon: "☀️", condition: "Sunny" },
    { day: "Wed", high: 23, low: 17, icon: "🌧️", condition: "Rainy" },
    { day: "Thu", high: 21, low: 15, icon: "⛈️", condition: "Thunderstorm" },
    { day: "Fri", high: 22, low: 16, icon: "🌤️", condition: "Cloudy" },
    { day: "Sat", high: 25, low: 19, icon: "☀️", condition: "Sunny" },
    { day: "Sun", high: 26, low: 20, icon: "☀️", condition: "Sunny" }
  ];

  const handleChangeLocation = () => {
    if (newLocation.trim()) {
      setLocation(newLocation);
      setNewLocation("");
      setShowModal(false);
    }
  };

  const toggleTempUnit = () => {
    setTempUnit(tempUnit === "°C" ? "°F" : "°C");
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Location Header */}
      <Card>
        <View style={styles.locationHeader}>
          <View style={styles.locationInfo}>
            <Text style={[styles.locationTitle, { color: theme.text }]}>
              📍 {location}
            </Text>
            <Text style={[styles.locationSubtitle, { color: theme.text }]}>
              Today • Last updated 2 min ago
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.changeButton, { backgroundColor: theme.primary }]}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Current Weather - Large Card */}
      <Card>
        <View style={styles.currentWeatherContainer}>
          <Text style={styles.largeIcon}>{currentWeather.icon}</Text>
          <View style={styles.tempContainer}>
            <Text style={[styles.largeTemp, { color: theme.primary }]}>
              {currentWeather.temp}{tempUnit}
            </Text>
            <Text style={[styles.condition, { color: theme.text }]}>
              {currentWeather.condition}
            </Text>
            <TouchableOpacity
              style={[styles.unitToggle, { backgroundColor: theme.card }]}
              onPress={toggleTempUnit}
            >
              <Text style={[styles.unitToggleText, { color: theme.primary }]}>
                Switch to {tempUnit === "°C" ? "°F" : "°C"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[styles.feelsLike, { color: theme.text }]}>
          Feels like {currentWeather.feelsLike}{tempUnit}
        </Text>
      </Card>

      {/* Weather Details Grid */}
      <View style={styles.detailsGrid}>
        <Card>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>💧</Text>
            <Text style={[styles.detailLabel, { color: theme.text }]}>Humidity</Text>
            <Text style={[styles.detailValue, { color: theme.primary }]}>
              {currentWeather.humidity}%
            </Text>
          </View>
        </Card>
        <Card>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>🌬️</Text>
            <Text style={[styles.detailLabel, { color: theme.text }]}>Wind</Text>
            <Text style={[styles.detailValue, { color: theme.primary }]}>
              {currentWeather.windSpeed} km/h
            </Text>
          </View>
        </Card>
      </View>

      <View style={styles.detailsGrid}>
        <Card>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>☀️</Text>
            <Text style={[styles.detailLabel, { color: theme.text }]}>UV Index</Text>
            <Text style={[styles.detailValue, { color: theme.primary }]}>
              {currentWeather.uvIndex}
            </Text>
          </View>
        </Card>
        <Card>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>👁️</Text>
            <Text style={[styles.detailLabel, { color: theme.text }]}>Visibility</Text>
            <Text style={[styles.detailValue, { color: theme.primary }]}>
              {currentWeather.visibility} km
            </Text>
          </View>
        </Card>
      </View>

      <View style={styles.detailsGrid}>
        <Card>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>🔽</Text>
            <Text style={[styles.detailLabel, { color: theme.text }]}>Pressure</Text>
            <Text style={[styles.detailValue, { color: theme.primary }]}>
              {currentWeather.pressure} mb
            </Text>
          </View>
        </Card>
        <Card>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>🌡️</Text>
            <Text style={[styles.detailLabel, { color: theme.text }]}>Comfort</Text>
            <Text style={[styles.detailValue, { color: theme.primary }]}>
              Good
            </Text>
          </View>
        </Card>
      </View>

      {/* Hourly Forecast */}
      <Card>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          ⏰ Hourly Forecast
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.hourlyContainer}
        >
          {hourlyForecast.map((hour, index) => (
            <View
              key={index}
              style={[
                styles.hourlyItem,
                {
                  backgroundColor: theme.card,
                  borderColor: index === 0 ? theme.primary : "transparent"
                }
              ]}
            >
              <Text style={[styles.hourlyTime, { color: theme.text }]}>
                {hour.time}
              </Text>
              <Text style={styles.hourlyIcon}>{hour.icon}</Text>
              <Text style={[styles.hourlyTemp, { color: theme.primary }]}>
                {hour.temp}{tempUnit}
              </Text>
              <Text style={[styles.hourlyCondition, { color: theme.text }]}>
                {hour.condition}
              </Text>
            </View>
          ))}
        </ScrollView>
      </Card>

      {/* Weekly Forecast */}
      <Card>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          📅 7-Day Forecast
        </Text>
        <View style={styles.weeklyContainer}>
          {weeklyForecast.map((day, index) => (
            <View
              key={index}
              style={[
                styles.weeklyItem,
                {
                  backgroundColor: index === 0 ? theme.primary : theme.background,
                  borderRadius: 12
                }
              ]}
            >
              <Text
                style={[
                  styles.weeklyDay,
                  {
                    color: index === 0 ? "#fff" : theme.text,
                    fontWeight: index === 0 ? "700" : "600"
                  }
                ]}
              >
                {day.day}
              </Text>
              <Text style={styles.weeklyIcon}>{day.icon}</Text>
              <Text
                style={[
                  styles.weeklyRange,
                  { color: index === 0 ? "#e2e8f0" : theme.text }
                ]}
              >
                {day.high}° / {day.low}°
              </Text>
              <Text
                style={[
                  styles.weeklyCondition,
                  {
                    color: index === 0 ? "#e2e8f0" : theme.text,
                    fontSize: 11
                  }
                ]}
              >
                {day.condition}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Weather Tips */}
      <Card>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          💡 Weather Tips
        </Text>
        <View style={styles.tipItem}>
          <Text style={[styles.tipText, { color: theme.text }]}>
            ☔ <Text style={{ fontWeight: "600" }}>Rain Expected Wednesday:</Text> Plan indoor activities or bring an umbrella.
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={[styles.tipText, { color: theme.text }]}>
            ☀️ <Text style={{ fontWeight: "600" }}>High UV Index:</Text> Remember to use sunscreen if you're going outside!
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={[styles.tipText, { color: theme.text }]}>
            🌤️ <Text style={{ fontWeight: "600" }}>Perfect Weekend:</Text> Great weather coming Friday through Sunday!
          </Text>
        </View>
      </Card>

      {/* Change Location Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Change Location
            </Text>

            <TextInput
              placeholder="Enter city name..."
              placeholderTextColor="#94a3b8"
              value={newLocation}
              onChangeText={setNewLocation}
              style={[styles.modalInput, { color: theme.text, borderColor: theme.primary }]}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.primary }]}
                onPress={handleChangeLocation}
              >
                <Text style={styles.buttonText}>Update</Text>
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

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  locationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  locationInfo: {
    flex: 1
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4
  },
  locationSubtitle: {
    fontSize: 12,
    fontWeight: "400",
    opacity: 0.7
  },
  changeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10
  },
  changeButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12
  },
  currentWeatherContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "center",
    paddingVertical: 20
  },
  largeIcon: {
    fontSize: 80,
    marginRight: 20
  },
  tempContainer: {
    alignItems: "flex-start"
  },
  largeTemp: {
    fontSize: 48,
    fontWeight: "800",
    marginBottom: 5
  },
  condition: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10
  },
  unitToggle: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  unitToggleText: {
    fontSize: 12,
    fontWeight: "600"
  },
  feelsLike: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
    opacity: 0.8
  },
  detailsGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10
  },
  detailItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15
  },
  detailIcon: {
    fontSize: 28,
    marginBottom: 8
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "700"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15
  },
  hourlyContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  hourlyItem: {
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    minWidth: 90,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent"
  },
  hourlyTime: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6
  },
  hourlyIcon: {
    fontSize: 28,
    marginBottom: 4
  },
  hourlyTemp: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4
  },
  hourlyCondition: {
    fontSize: 10,
    fontWeight: "500"
  },
  weeklyContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8
  },
  weeklyItem: {
    width: "23%",
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    borderRadius: 12
  },
  weeklyDay: {
    fontSize: 12,
    marginBottom: 6
  },
  weeklyIcon: {
    fontSize: 24,
    marginBottom: 4
  },
  weeklyRange: {
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 4
  },
  weeklyCondition: {
    fontSize: 9,
    fontWeight: "400",
    textAlign: "center"
  },
  tipItem: {
    marginBottom: 12,
    paddingVertical: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#3b82f6",
    paddingLeft: 12
  },
  tipText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400"
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
    padding: 20
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15
  },
  modalInput: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 15
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15
  }
});