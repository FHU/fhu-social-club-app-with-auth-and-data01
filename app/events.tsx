import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ClubEventsScreen() {
  const { club } = useLocalSearchParams<{ club: string }>();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const clubName = club?.toUpperCase() ?? "UNKNOWN CLUB";

  // Filter events for the selected club
  const filteredEvents = events
    .filter((event) => event.club === clubName)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    useEffect(() => {
    const fetchEvents = async () => {
        try {
        const response = await fetch("https://nyc.cloud.appwrite.io/v1/storage/buckets/68f8f011001a9b3cb4b7/files/6915ee670031399342c4/view?project=68f8ec9400054fdf0c05&mode=admin");
        const data = await response.json();

        const filtered = data
            .filter((item: any) => item.club === club)
            .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setEvents(filtered);
        } catch (error) {
        console.error("Error fetching events:", error);
        } finally {
        setLoading(false);
        }
    };

    fetchEvents();
    }, [club]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{clubName}</Text>

      {filteredEvents.length === 0 ? (
        <Text style={styles.noEvents}>No upcoming events found.</Text>
      ) : (
        filteredEvents.map((event, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.eventTitle}>{event.event}</Text>
            <Text style={styles.eventDetails}>
              📅 {new Date(event.date).toLocaleDateString()} — {event.time}
            </Text>
            <Text style={styles.eventDetails}>📍 {event.location}</Text>
            <Text style={styles.description}>{event.description}</Text>
            <Text
              style={[
                styles.rsvp,
                { color: event.rsvp_required ? "#b91c1c" : "#047857" },
              ]}
            >
              {event.rsvp_required ? "*RSVP will be required" : "*RSVP will NOT be required"}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9fafb",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1e3a8a",
    letterSpacing: 1,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  eventDetails: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#374151",
    marginTop: 8,
    marginBottom: 10,
  },
  rsvp: {
    fontWeight: "600",
    textAlign: "right",
  },
  noEvents: {
    textAlign: "center",
    fontSize: 16,
    color: "#6b7280",
    marginTop: 40,
  },
});