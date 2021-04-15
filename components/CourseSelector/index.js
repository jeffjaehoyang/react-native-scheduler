import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { hasConflict } from "../../utils/course";
import Course from "../Course";

const CourseSelector = ({ courses, view }) => {
  const [selected, setSelected] = useState([]);

  const toggle = (course) =>
    setSelected((selected) =>
      selected.includes(course)
        ? selected.filter((x) => x !== course)
        : [...selected, course]
    );

  return (
    <View style={styles.courseList}>
      {courses.map((course) => (
        <Course
          key={course.id}
          course={course}
          select={toggle}
          isDisabled={hasConflict(course, selected)}
          isSelected={selected.includes(course)}
          view={view}
        />
      ))}
    </View>
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

export default CourseSelector;
