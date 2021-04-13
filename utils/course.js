// getCourseTerm(course) => string
//   given a course, returns the term the course is in
//
// getCourseNumber(course) => string
//   given a course, returns its course number
//
// terms -- a variable set to the list of academic terms
const termMap = { F: "Fall", W: "Winter", S: "Spring" };
const terms = Object.values(termMap);

const getCourseTerm = (course) => termMap[course.id.charAt(0)];

const getCourseNumber = (course) => course.id.slice(1);

// addTimes(course) => void
//   given a course with a meeting time, e.g., "MTuWF 9:00-10:30"
//   adds a days value, e.g., ["M", "Tu", "W", "F"]
//     and an hours value, e.g., { start: 540, end: 630 },
//     with start and end in minutes past midnight

const allDays = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];
const timesPat = /(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d)/;

const addTimes = (course) => {
  course.days = allDays.filter((day) => course.meets.includes(day));

  const [match, hh1, mm1, hh2, mm2] = timesPat.exec(course.meets);
  if (match) {
    course.hours = {
      start: hh1 * 60 + mm1 * 1,
      end: hh2 * 60 + mm2 * 1,
    };
  }
};

// hasConflict(course, selected) => boolean
//   given a course and list of courses
//   returns true if course conflicts with any item in selected
//
// courseConflict(course1, course1) => boolean
//   given two courses
//   returns if they are not the same course, occur in the
//     same quarter, have at least one day in common, and
//     the start/end times overlap

const daysOverlap = (days1, days2) =>
  days1 && days2 && days2.some((day) => days1.includes(day));

const hoursOverlap = (hours1, hours2) =>
  hours1 &&
  hours2 &&
  Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end);

const timeConflict = (course1, course2) =>
  daysOverlap(course1.days, course2.days) &&
  hoursOverlap(course1.hours, course2.hours);

const courseConflict = (course1, course2) =>
  course1 !== course2 &&
  getCourseTerm(course1) === getCourseTerm(course2) &&
  timeConflict(course1, course2);

// SIDE EFFECT: the first time a course is compared to other courses,
// its meeting times are parsed and added, so that this work
// doesn't need to be done again. Clear the days field if
// changing meeting times.
const hasConflict = (course, selected) => {
  if (!course.days) addTimes(course);
  return selected.some((selection) => courseConflict(course, selection));
};

export { getCourseNumber, getCourseTerm, hasConflict, terms };
