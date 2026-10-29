import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Control, Controller, useForm } from "react-hook-form";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { signupSchema, type SignupFormData } from "@/schemas/signup";

// props for one form row; keyboard props are passed straight to TextInput
type FieldProps = {
  control: Control<SignupFormData>;
  name: keyof SignupFormData;
  label: string;
  error?: string;
} & Pick<TextInputProps, "secureTextEntry" | "keyboardType" | "autoCapitalize">;

// label + input + error text for one field, so the screen isn't five copies of this
function Field({ control, name, label, error, ...inputProps }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      {/* Controller connects a native TextInput to react-hook-form */}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            // red border only when this field has an error
            style={[styles.input, error ? styles.inputError : null]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...inputProps}
          />
        )}
      />

      {/* message text comes from the Zod schema */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

export default function SignUpScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    // Zod does all the validation
    resolver: zodResolver(signupSchema),
    // empty strings, not undefined, so Zod never shows its raw type errors
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // only runs when validation passes; data is already trimmed by the schema
  const onSubmit = (data: SignupFormData) => {
    // log these three only, never the passwords
    console.log({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });

    // replace so back doesn't return to a filled-in form
    router.replace({
      pathname: "/confirmation",
      params: { firstName: data.firstName },
    });
  };

  return (
    // ScrollView so the lower fields stay reachable with the keyboard open
    <ScrollView
      contentContainerStyle={styles.container}
      // keeps the first tap on the button working while the keyboard is open
      keyboardShouldPersistTaps="handled"
      // iOS: adds padding for the keyboard so the focused field stays visible
      automaticallyAdjustKeyboardInsets
    >
      <Text style={styles.title}>Sign up</Text>

      <Field
        control={control}
        name="firstName"
        label="First name"
        error={errors.firstName?.message}
        autoCapitalize="words"
      />
      <Field
        control={control}
        name="lastName"
        label="Last name"
        error={errors.lastName?.message}
        autoCapitalize="words"
      />
      <Field
        control={control}
        name="email"
        label="Email"
        error={errors.email?.message}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Field
        control={control}
        name="password"
        label="Password"
        error={errors.password?.message}
        secureTextEntry
        autoCapitalize="none"
      />
      <Field
        control={control}
        name="confirmPassword"
        label="Confirm password"
        error={errors.confirmPassword?.message}
        secureTextEntry
        autoCapitalize="none"
      />

      {/* handleSubmit validates first, then calls onSubmit */}
      <Pressable style={styles.button} onPress={() => handleSubmit(onSubmit)()}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 72,
    // room under the button so it isn't flush against the keyboard
    paddingBottom: 40,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 24 },
  field: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputError: { borderColor: "#d32f2f" },
  error: { color: "#d32f2f", fontSize: 13, marginTop: 4 },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
