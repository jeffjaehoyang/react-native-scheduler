import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";
import Form from "../../components/Form";
import { firebase } from "../../firebase";

const CourseEditScreen = ({ navigation, route }) => {
  const course = route?.params?.course;
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(values) {
    const { id, meets, title } = values;
    const course = { id, meets, title };
    firebase
      .database()
      .ref("courses")
      .child(id)
      .set(course)
      .catch((error) => {
        setSubmitError(error.message);
      });
  }

  const validationSchema = Yup.object().shape({
    id: Yup.string()
      .required()
      .matches(/(F|W|S)\d{3,}/, "Must be a term and 3-digit number")
      .label("ID"),
    meets: Yup.string()
      .required()
      .matches(
        /(M|Tu|W|Th|F)+ +\d\d?:\d\d-\d\d?:\d\d/,
        "Must be weekdays followed by start and end time"
      )
      .label("Meeting times"),
    title: Yup.string().required().label("Title"),
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Form
          initialValues={{
            id: course?.id,
            meets: course?.meets,
            title: course?.title,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Form.Field
            name="id"
            leftIcon="identifier"
            placeholder="F110"
            autoCapitalize="none"
            autoFocus={true}
          />
          <Form.Field
            name="meets"
            leftIcon="calendar-range"
            placeholder="MThu 12:00-13:50"
            autoCapitalize="none"
          />
          <Form.Field
            name="title"
            leftIcon="format-title"
            placeholder="Introduction to programming"
          />
          <Form.Button title={"Update"} />
          {<Form.ErrorMessage error={submitError} visible={true} />}
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
});

export default CourseEditScreen;
