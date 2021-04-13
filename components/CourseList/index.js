import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import TermSelector from "../TermSelector";
import CourseSelector from "../CourseSelector";
import { getCourseTerm, terms } from "../../utils/course";

const CourseList = ({ courses }) => {
  const [selectedTerm, setSelectedTerm] = useState("Fall");
  const termCourses = courses.filter(
    (course) => selectedTerm === getCourseTerm(course)
  );

  return (
    <ScrollView>
      <TermSelector
        terms={terms}
        selectedTerm={selectedTerm}
        setSelectedTerm={setSelectedTerm}
      />
      <CourseSelector courses={termCourses} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  courseList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default CourseList;
