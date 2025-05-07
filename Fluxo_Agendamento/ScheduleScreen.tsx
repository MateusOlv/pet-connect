import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import { Calendar } from "react-native-calendars";

export default function ScheduleScreen() {
  const router = useRouter();
  const { id } = useSearchParams();
  const [selectedDate, setSelectedDate] = useState("");

  const handleConfirm = () => {
    router.push("/confirmation");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar com o Pet Shop {id}</Text>
      <Calendar
        onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#FE8C00" },
        }}
      />
      {selectedDate ? (
        <Button title="Confirmar Agendamento" onPress={handleConfirm} />
      ) : (
        <Text style={styles.infoText}>Selecione uma data para continuar.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  infoText: {
    marginTop: 16,
    fontSize: 14,
    color: "#555",
  },
});