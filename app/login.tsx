import { appwrite } from "@/lib/appwrite";
import type { RootStackParamList } from "@/types/navigation";
// import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  // const navigation = useNavigation<LoginScreenNavigationProp>();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

    async function handleLogin() {
        if (!email || !password) {
            Alert.alert("Missing Fields", "Please enter both email and password.");
            return;
        }
        setLoading(true);

        try {
            const user = await appwrite.loginWithEmail({email, password});
            console.log("Logged in user:", user);
            Alert.alert("Welcome back!", `Logged in as ${user?.name}`);
            // router.replace("/home");
        }
        catch (err: any) {
            console.error(err);
            Alert.alert("Login Failed", err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    function handleGuest() {
        // navigation.replace("Home");
        router.replace("/");
    }

    function handleSignup() {
        // navigation.navigate("Signup");
        router.push("/signup");
    }

    return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={handleSignup}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
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
  guestButton: {
    marginTop: 24,
  },
  guestText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});