import express from "express";
import courses from "./course.js";
import logger from "./logger.js";
import validateQuery from "./validateQuery.js";
import auth from "./auth.js";

const app = express();
const PORT = 3000;

// Apply global logging middleware
app.use(logger);

// Middleware to parse JSON bodies (for future POST requests if needed)
app.use(express.json());

// Route: GET /departments/:dept/courses
app.get(
  "/departments/:dept/courses",
  [auth, validateQuery], // Apply auth and query validation middleware
  (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    // Filter courses by department (case-insensitive)
    let filteredCourses = courses.filter(
      (course) => course.department.toUpperCase() === dept.toUpperCase()
    );

    // Apply filters based on query parameters
    if (level) {
      filteredCourses = filteredCourses.filter(
        (course) => course.level.toLowerCase() === level.toLowerCase()
      );
    }
    if (minCredits) {
      filteredCourses = filteredCourses.filter(
        (course) => course.credits >= parseInt(minCredits)
      );
    }
    if (maxCredits) {
      filteredCourses = filteredCourses.filter(
        (course) => course.credits <= parseInt(maxCredits)
      );
    }
    if (semester) {
      filteredCourses = filteredCourses.filter(
        (course) => course.semester.toLowerCase() === semester.toLowerCase()
      );
    }
    if (instructor) {
      filteredCourses = filteredCourses.filter((course) =>
        course.instructor.toLowerCase().includes(instructor.toLowerCase())
      );
    }

    // Handle no matching courses
    if (filteredCourses.length === 0) {
      return res.status(404).json({
        results: [],
        meta: { total: 0 },
        message: "No courses found matching the criteria",
      });
    }

    // Return response with meta data
    res.json({
      results: filteredCourses,
      meta: { total: filteredCourses.length },
    });
  }
);

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
