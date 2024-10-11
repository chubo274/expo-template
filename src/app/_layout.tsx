import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="unAuth">
      <Stack.Screen name="unAuth" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
