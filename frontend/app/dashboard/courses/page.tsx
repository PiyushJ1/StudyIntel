'use client'

import { useEffect, useState } from "react";
import styles from "./Courses.module.css"

export default function CoursesPage() {
  const [courses, setCourses]= useState<string[]>(['', '', '']);
  const [displayCourses, setDisplayCourses] = useState<string[]>([])
  const [_submittedCourses, _setSubmittedCourses] = useState<string[]>([]);
  const [_isSubmitting, setIsSubmitting] = useState(false);
  const [userId, _setUserId] = useState<string>('');

  const fetchUserData = () => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {        
        if (data.courses) {
          setDisplayCourses(data.courses);
        }
      })
      .catch(err => {
        console.error("Failed to fetch user data:", err);
      });
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  const handleCourseChange = (index: number, value: string) => {
    const newCourses = [...courses];
    newCourses[index] = value.toUpperCase(); // convert course codes to uppercase
    setCourses(newCourses);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // remove elements from array
    const validCourses = courses.filter(course => course.trim() !== '');

    if (validCourses.length < 2) {
      alert("Please enter at least 2 courses");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/new-courses`, 
        {
          method: "POST",
          credentials: "include",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courses: validCourses,
            userId: userId
          })
        }
      );
      
      if (!response.ok) {
        alert("Submission failed");
        return;
      }

      setCourses(['', '', '']);
      setDisplayCourses(validCourses);
      fetchUserData();
    } catch (err) {
      console.log("Error: ", err);
      alert("Error adding courses");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={styles.coursesContainer}>
      <div className={styles.coursesContent}>
        <div className={styles.addCoursesSection}>
          <h1 className={styles.addCoursesMessage}>Add Your Courses</h1>
          <div className={styles.inputGroup}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                id="course1"
                name="course1"
                value={courses[0]}
                onChange={e => handleCourseChange(0, e.target.value)}
                placeholder="Course code e.g. COMPXXX"
                className={styles.input}
              />
              <input
                type="text"
                id="course2"
                name="course2"
                value={courses[1]}
                onChange={e => handleCourseChange(1, e.target.value)}
                placeholder="Course code e.g. DESNXXXX"
                className={styles.input}
              />
              <input
                type="text"
                id="course3"
                name="course3"
                value={courses[2]}
                onChange={e => handleCourseChange(2, e.target.value)}
                placeholder="Course code e.g. MATHXXXX"
                className={styles.input}
              />
              <button type="submit" className={styles.submitCoursesButton}>
                Add Courses
              </button>
            </form>
          </div>

          <div className={styles.displayCourses}>
            <h2 className={styles.coursesLabel}>Your Courses:</h2>
            <div className={styles.userCourses}>
              <span>
                {displayCourses.length > 0 ? displayCourses.join(', ') : "No courses added yet" }
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
