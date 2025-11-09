import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "#000",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="login"
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        options={{ title: "Signup", headerShown: false }}
      />
      <Stack.Screen
        name="home"
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="profile"
        options={{ title: "Profile" }}
      />
    </Stack>
  );
}