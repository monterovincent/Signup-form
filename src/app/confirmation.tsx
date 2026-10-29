import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ConfirmationScreen() {
  // firstName comes from the route params set in the form's onSubmit
  const { firstName } = useLocalSearchParams<{ firstName: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account created for {firstName}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center" },
});
