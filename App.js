import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CourseList from "./components/CourseList";

const schedule = {
  title: "CS Courses for 2018-2019",
  courses: [
    {
      id: "F101",
      title: "Computer Science: Concepts, Philosophy, and Connections",
      meets: "MWF 11:00-11:50",
    },
    {
      id: "F110",
      title: "Intro Programming for non-majors",
      meets: "MWF 10:00-10:50",
    },
    {
      id: "F111",
      title: "Fundamentals of Computer Programming I",
      meets: "MWF 13:00-13:50",
    },
    {
      id: "F211",
      title: "Fundamentals of Computer Programming II",
      meets: "TuTh 12:30-13:50",
    },
  ],
};

const Banner = ({ title }) => <Text style={styles.bannerStyle}>{title}</Text>;

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
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

export default App;
