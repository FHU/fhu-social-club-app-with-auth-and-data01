import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Models } from "react-native-appwrite";

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const current = await account.get<Models.User<Models.Preferences>>();
        setUser(current);
      } catch (error) {
        // Not signed in
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }

  async function handleEmailPress(email: string) {
    const url = `mailto:${email}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  }

  function handlePhonePress(phone: string) {
    Linking.openURL(`sms:${phone}`);
  }

  if (loading) {
    return (
      <View style={[styles.screen, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#444" />
      </View>
    );
  }

  // Guest view
  if (!user) {
    return (
      <View style={[styles.screen, { justifyContent: "center", alignItems: "center" }]}>
        <Image
          source={{ uri: "https://fhu.edu/wp-content/uploads/faculty-placeholder.jpg" }}
          style={[styles.avatar, { marginBottom: 20 }]}
        />
        <Text style={styles.name}>Guest Profile</Text>
        <Text style={styles.infoText}>You’re not signed in.</Text>
        <TouchableOpacity
          onPress={() => router.push("/login")}
          style={styles.signInButton}
          activeOpacity={0.8}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Signed-in view
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: user.prefs?.imageURL || "https://fhu.edu/wp-content/uploads/faculty-placeholder.jpg" }}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.name}>
          {capitalizeWords(user.name)}
        </Text>

        {user.prefs?.officer && <Text style={styles.officer}>{user.prefs.officer}</Text>}

        {user.prefs?.classification && (
          <Text style={styles.classification}>
            <Text style={{ fontWeight: "bold" }}>Classification: </Text>
            {capitalizeWords(user.prefs.classification)}
          </Text>
        )}

        {user.prefs?.relationshipStatus && (
          <Text style={styles.relationship}>
            <Text style={{ fontWeight: "bold" }}>Relationship Status: </Text>
            {capitalizeWords(user.prefs.relationshipStatus)}
          </Text>
        )}

        <View style={styles.infoText}>
          {user.email && (
            <Text style={styles.infoText} onPress={() => handleEmailPress(user.email)}>
              Email: {user.email}
            </Text>
          )}
          {user.prefs?.phone && (
            <Text style={styles.infoText} onPress={() => handlePhonePress(user.prefs.phone)}>
              Phone: {user.prefs.phone}
            </Text>
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
    color: "#fff",
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
  },
  signInButton: {
    width: "90%",
    backgroundColor: "#fff01eff",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  signInText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  }});