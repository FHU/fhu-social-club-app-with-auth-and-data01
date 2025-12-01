import { appwrite } from "@/lib/appwrite";
import type { RootStackParamList } from "@/types/navigation";
import { Picker } from '@react-native-picker/picker';
import type { StackNavigationProp } from "@react-navigation/stack";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Signup">;

export default function SignupScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [club, setClub] = useState("CHI BETA CHI");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

    function handleGuest() {
      router.replace("/");
    }

    async function handleSignup() {
      if (!firstName || !lastName || !email || !password || !club) {
        Alert.alert("Missing Fields", "Please fill in all required fields.");
        return;
      }

      setLoading(true);

      try {
        const fullName = `${firstName} ${lastName}`;
        const newUser = await appwrite.registerWithEmail({ email, password, name: fullName, club });
        console.log("New user created:", newUser);

        if (newUser) {
          const session = await appwrite.loginWithEmail({ email, password });
          console.log("User session:", session);
          Alert.alert("Your account has been created successfully!");
          router.replace("/"); // Redirect to home
        }
      } catch (err: any) {
        console.error(err);
        Alert.alert("Signup failed", err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Started!</Text>

      <View style={styles.nameContainer}>
        <TextInput
          style={[styles.input]}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={[styles.input]}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={club}
          onValueChange={(itemValue) => setClub(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="CHI BETA CHI" value="CHI BETA CHI" />
          <Picker.Item label="OMEGA CHI" value="OMEGA CHI" />
          <Picker.Item label="PHI KAPPA ALPHA" value="PHI KAPPA ALPHA" />
          <Picker.Item label="SIGMA RHO" value="SIGMA RHO" />
          <Picker.Item label="XI CHI DELTA" value="XI CHI DELTA" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign up</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.guestButton} onPress={handleGuest}>
        <Text style={styles.guestText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#952727ff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#fff01eff",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: "#1E90FF",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  nameContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    fontSize: 16,
    marginBottom: 16,
  },
  pickerContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: "100%",
    color: "#000",
  },
  guestButton: {
    marginTop: 24,
  },
  guestText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});