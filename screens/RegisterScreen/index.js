import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { loginWithEmail, registerWithEmail } from "../../firebase";
import Form from "../../components/Form";
import * as Yup from "yup";

const RegisterScreen = ({ navigation }) => {
  const [signInError, setSignInError] = useState("");
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Please enter a valid email")
      .email()
      .label("Email"),
    password: Yup.string()
      .required()
      .min(6, "Password must have at least 6 characters")
      .label("Password"),
    confirm: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Confirmation password must match password"
    ),
  });

  async function handleOnLogin(values) {
    const { email, password } = values;
    setSignInError(null);
    try {
      await loginWithEmail(email, password);
      navigation.navigate("ScheduleScreen");
    } catch (error) {
      setSignInError(error.message);
    }
  }

  async function handleOnSignUp(values) {
    const { name, email, password } = values;
    console.log("handle on sign up");
    setSignInError(null);
    try {
      const authCredential = await registerWithEmail(email, password);
      console.log("auth credential: ", authCredential);
      const user = authCredential.user;
      await user.updateProfile({ displayName: name });
      navigation.navigate("ScheduleScreen");
    } catch (error) {
      setSignInError(error.message);
    }
  }

  async function handleOnSubmit(values) {
    console.log("handle on submit: ", values);
    return values.confirm ? handleOnSignUp(values) : handleOnLogin(values);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Form
          initialValues={{
            email: "",
            password: "",
            confirm: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleOnSubmit}
        >
          <Form.Field
            name="email"
            leftIcon="email"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <Form.Field
            name="password"
            leftIcon="lock"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
          <Form.Field
            name="confirm"
            leftIcon="lock"
            placeholder="Confirm password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
          <Form.Button
            title={(values) => (values.confirm ? "Register" : "Login")}
          />
          {<Form.ErrorMessage error={signInError} visible={true} />}
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  bannerStyle: {
    color: "#888",
    fontSize: 32,
  },
  courseList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  courseButton: {
    flex: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    height: 60,
    padding: 10,
    minWidth: 90,
    maxWidth: 90,
    backgroundColor: "#66b0ff",
  },
  courseText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
});

export default RegisterScreen;
