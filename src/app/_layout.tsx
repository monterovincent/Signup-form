import { Stack } from "expo-router";

export default function RootLayout() {
  // plain stack: the form at "/", then "/confirmation"
  return <Stack screenOptions={{ headerShown: false }} />;
}
