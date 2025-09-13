'use client'

import { useEffect, useState } from "react";
import styles from "./Courses.module.css"

export default function CoursesPage() {
  const [courses, setCourses]= useState<string[]>(['', '', '']);
  const [displayCourses, setDisplayCourses] = useState<string[]>([])
  const [_submittedCourses, _setSubmittedCourses] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [scrapedCourseTopics, setScrapedCourseTopics] = useState<Record<string, string>>({});

  const fetchUserData = () => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.userId) {
          setUserId(data.userId);
        }
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
    } catch (err) {
      console.log("Error: ", err);
      alert("Error adding courses");
    } finally {
      setIsSubmitting(false);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scrape-course/${validCourses[0]}`, 
        {
          method: "POST",
          credentials: "include",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseCode: validCourses[0] }),
        }
      );

      if (!res.ok) {
        console.error("Scraping API failed");
      } else {
        const data = await res.json();
        console.log(data);

        // store topics object
        setScrapedCourseTopics(
          Object.assign({}, data.topics)
        );
      }
    } catch (err) {
      console.error("Error scraping courses", err);
    }
  }

  return (
    <>
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
                  placeholder="Course code e.g. COMMXXXX"
                  className={styles.input}
                />
                <input
                  type="text"
                  id="course3"
                  name="course3"
                  value={courses[2]}
                  onChange={e => handleCourseChange(2, e.target.value)}
                  placeholder="Course code e.g. MATHXXXX (Optional)"
                  className={styles.input}
                />
                <button 
                  type="submit"  
                  className={styles.submitCoursesButton} 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Add Courses"}
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

        <div className={styles.userCoursesContainer}>
          <div className={styles.coursesContent}>
            <h2>Course Topics</h2>
            {Object.keys(scrapedCourseTopics).length > 0 ? (
              <>
                <h2>{displayCourses[0]}</h2>
                <ul>
                  {Object.entries(scrapedCourseTopics).map(([week, topic]) => (
                    <li key={week}>
                      <strong>{week}:</strong>{" "}
                      <input
                        type="text"
                        defaultValue={topic}
                        className={styles.input}
                      />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <span>Enter your courses to view their weekly topics. </span>
            )}

            {Object.keys(scrapedCourseTopics).length > 0 ? (
              <>
                <h2>{displayCourses[1]}</h2>
                <ul>
                  {Object.entries(scrapedCourseTopics).map(([week, topic]) => (
                    <li key={week}>
                      <strong>{week}:</strong>{" "}
                      <input
                        type="text"
                        defaultValue={topic}
                        className={styles.input}
                      />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <span>Enter your courses to view their weekly topics. </span>
            )}

            {Object.keys(scrapedCourseTopics).length > 0 ? (
              <>
                <h2>{displayCourses[2]}</h2>
                <ul>
                  {Object.entries(scrapedCourseTopics).map(([week, topic]) => (
                    <li key={week}>
                      <strong>{week}:</strong>{" "}
                      <input
                        type="text"
                        defaultValue={topic}
                        className={styles.input}
                      />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <span>Enter your courses to view their weekly topics. </span>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
