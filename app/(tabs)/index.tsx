import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function IndexScreen() {
  const clubs = [
    { name: "CHI BETA CHI", greek: "ΧΒΧ", color: "#f6f061", bgColor: "#662d91" },
    { name: "OMEGA CHI", greek: "ΩΧ", color: "#ffffff", bgColor: "#009f53" },
    { name: "PHI KAPPA ALPHA", greek: "ΦΚΑ", color: "#ffffff", bgColor: "#bf1e2e" },
    { name: "SIGMA RHO", greek: "ΣΡ", color: "#242020", bgColor: "#f5ef61" },
    { name: "XI CHI DELTA", greek: "ΞΧΔ", color: "#0756a0", bgColor: "#a7a9ac" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>FHU Social Clubs</Text>
      {clubs.map((club, index) => (
        <View key={index} style={styles.clubContainer}>
          <Text style={styles.clubName}>{club.name}</Text>
          <TouchableOpacity
            style={[styles.clubBox, { backgroundColor: club.bgColor }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.greekLetters, { color: club.color }]}>
              {club.greek}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#222",
  },
  clubContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  clubBox: {
    width: "85%",
    borderRadius: 16,
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  clubName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  greekLetters: {
    fontSize: 64,
    fontWeight: "bold",
  },
});