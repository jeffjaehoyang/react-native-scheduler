import Course from "../Course";

const CourseList = ({ courses }) => (
  <ScrollView>
    <View style={styles.courseList}>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </View>
  </ScrollView>
);

export default CourseList;
