import { Member } from "@/types/navigation";
// import { RouteProp, useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
// import { useRouter } from "expo-router";
import { Image, Linking, ScrollView, StyleSheet, Text, View } from "react-native";

// type ProfileRouteProp = RouteProp<RootStackParamList, "Profile">;

// Profile: https://fhu.edu/wp-content/uploads/faculty-placeholder.jpg

export default function ProfileScreen() {
  // const route = useRoute<ProfileRouteProp>();
  // const { member } = route.params;
  // const parsedMember: Member = JSON.parse(member);
  // const router = useRouter();

  const { member } = useLocalSearchParams();
  const parsedMember: Member = member ? JSON.parse(member as string) : null;
  const router = useRouter();

  function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }
  async function handleEmailPress(email: string) {
    const url = `mailto:${email}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn("Email app not available on this device.");
    }
  
  }
  function handlePhonePress(phone: string) {
    Linking.openURL(`sms:${phone}`);
  }

  return (
  <View style={styles.screen}>
    <ScrollView contentContainerStyle={styles.container}>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image source={{ uri: parsedMember.imageURL }} style={styles.avatar} />
      </View>

      {/* Name */}
      <Text style={styles.name}>{parsedMember.firstName} {parsedMember.lastName}</Text>

      {/* Officer */}
      <View style={styles.officerContainer}>
        {parsedMember.officer && (<Text style={styles.officer}>{parsedMember.officer}</Text>)}
      </View>

      {/* Classification */}
      <Text style={styles.classification}>
        <Text style={{ fontWeight: "bold" }}>Classification: </Text>
        {capitalizeWords(parsedMember.classification)}
      </Text>

      {/* Relationship */}
      <Text style={styles.relationship}>
        <Text style={{ fontWeight: "bold" }}>Relationship Status: </Text>
        {capitalizeWords(parsedMember.relationshipStatus)}
      </Text>

      <View style={styles.infoText}>
        {/* Email */}
        {parsedMember.showEmail && parsedMember.email && (
          <Text style={styles.infoText} onPress={() => handleEmailPress(parsedMember.email!)}>Email: {parsedMember.email}</Text>
        )}

        {/* Phone */}
        {parsedMember.showPhone && parsedMember.phone && (
          <Text style={styles.infoText} onPress={() => handlePhonePress(parsedMember.phone!)}>Phone: {parsedMember.phone}</Text>
        )}
      </View>
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: "100%",
    height: 300,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  avatarContainer: {
    width: "100%",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    backgroundColor: "#952727ff",
    marginBottom: 20,
  },
  centeredBlock: {
    alignItems: "center",
    marginBottom: 20,
  },
  classification: {
    fontSize: 18,
    color: "#fff",
    marginTop: 10,
    textAlign: "left",
  },
  container: {
    padding: 20,
    backgroundColor: "#952727ff",
    paddingBottom: 40,
  },
  details: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: 12,
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 8,
    color: "#1E90FF",
    textDecorationLine: "underline",
    textAlign: "left",
  },
  officer: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#000",
    backgroundColor: "#fff01eff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 6,
  },
  officerContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  relationship: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    textAlign: "left",
  },
  screen: {
    flex: 1,
    backgroundColor: "#952727ff",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16
  }});