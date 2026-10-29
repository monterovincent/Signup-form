# Sign-Up Form

A mobile sign-up form built with React Native and Expo. It validates input with a Zod schema, manages form state with react-hook-form, and navigates to a confirmation screen after a successful submit.

This is an in-class assessment for CPRG 303 (Mobile App Development). It is a form-validation exercise, not a real authentication system: no account is created, nothing is stored, and no API or database is used.

## Demo

<!-- Add a screenshot or GIF here, e.g. ![Demo](docs/demo.gif) -->

## Features

- Five-field sign-up form: first name, last name, email, password, confirm password
- Validation with a Zod schema, shown next to the field that failed
- Errors appear when the user taps **Sign Up**; the user stays on the form and can fix them and resubmit
- On success, logs the first name, last name and email to the console (passwords are never logged), then navigates to a confirmation screen
- Confirmation screen shows "Account created for <first name>!"
- Password fields are masked, the email field uses the email keyboard, and the form scrolls above the keyboard on iOS

## Validation rules

| Field            | Rule                                                              |
| ---------------- | ----------------------------------------------------------------- |
| First name       | Required, 2–30 characters, trimmed, cannot be only whitespace     |
| Last name        | Required, 2–30 characters, trimmed, cannot be only whitespace     |
| Email            | Required, trimmed, valid email format                             |
| Password         | Required, at least 8 characters                                   |
| Confirm password | Required, must exactly match the password (checked in the schema) |

## Tech stack

- [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- TypeScript
- [Expo Router](https://docs.expo.dev/router/introduction/) for navigation
- [react-hook-form](https://react-hook-form.com/) for form state and submission
- [Zod](https://zod.dev/) for the validation schema
- [@hookform/resolvers](https://github.com/react-hook-form/resolvers) to connect Zod to react-hook-form

## Project structure

```
src/
  app/
    _layout.tsx        root stack navigator
    index.tsx          sign-up form screen
    confirmation.tsx   confirmation screen
  schemas/
    signup.ts          Zod schema and form type
```

## How it works

1. `src/schemas/signup.ts` defines the Zod schema for all five fields. The password match rule lives on the whole object and attaches its error to `confirmPassword`, so the message appears under that input.
2. `src/app/index.tsx` creates the form with `useForm` and `zodResolver(signupSchema)`. Each input is wrapped in a `Controller`, and `defaultValues` are empty strings so Zod never shows raw type errors.
3. `handleSubmit` runs validation first. If it fails, the field errors are shown. If it passes, `onSubmit` logs the allowed fields and navigates to `/confirmation`, passing the first name as a route param.
4. `src/app/confirmation.tsx` reads the first name with `useLocalSearchParams` and displays it.

## Getting started

Requirements: Node.js, and the Expo Go app on your phone.

```bash
npm install
npx expo start --tunnel
```

Scan the QR code with Expo Go (iOS or Android) to open the app.

## Testing checklist

- Submit with every field empty: each field shows an error
- Enter a first name made only of spaces: it fails
- Enter an invalid email: "Please enter a valid email address."
- Enter a password under 8 characters: it fails
- Enter two different 8+ character passwords: the error appears under **Confirm password**
- Submit valid data: the confirmation screen shows the first name, and the console log has no passwords
