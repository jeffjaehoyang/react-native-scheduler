import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import CourseList from "../../components/CourseList";
import UserContext from "../../context/UserContext";
import { firebase } from "../../firebase";

const db = firebase.database().ref();

const Banner = ({ title }) => (
  <Text style={styles.bannerStyle}>{title || "loading..."}</Text>
);

const fixCourses = (json) => ({
  ...json,
  courses: Object.values(json.courses),
});

const ScheduleScreen = ({ navigation }) => {
  const url = "https://courses.cs.northwestern.edu/394/data/cs-courses.php";
  const user = useContext(UserContext);
  const canEdit = user && user.role === "admin";

  const view = (course) => {
    navigation.navigate(canEdit ? "CourseEditScreen" : "CourseDetailScreen", {
      course,
    });
  };

  const [schedule, setSchedule] = useState({ title: "", courses: [] });

  useEffect(() => {
    const db = firebase.database().ref();
    db.on(
      "value",
      (snap) => {
        if (snap.val()) setSchedule(fixCourses(snap.val()));
      },
      (error) => console.log(error)
    );
    return () => {
      db.off("value", handleData);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} view={view} />
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

export default ScheduleScreen;
