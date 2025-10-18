"use client";

import DarkVeil from "@/styles/DarkVeil";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import WaitlistPopup from "../components/WaitlistPopup";

export default function HomePage() {
  const [isWaitlistPopupOpen, setIsWaitlistPopupOpen] = useState(false);

  // Prevent scrolling when popup is open
  useEffect(() => {
    if (isWaitlistPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isWaitlistPopupOpen]);

  const handleWaitlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWaitlistPopupOpen(true);
  };

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <DarkVeil />
      <header className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.navLeft}>
            <Link href="/" className={styles.logo}>
              StudyIntel
            </Link>
          </div>

          <nav className={styles.navCenter}>
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "features")}
              className={styles.navLink}
            >
              Features
            </a>
            <a
              href="#about"
              onClick={(e) => handleSmoothScroll(e, "about")}
              className={styles.navLink}
            >
              About
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleSmoothScroll(e, "testimonials")}
              className={styles.navLink}
            >
              Reviews
            </a>
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "contact")}
              className={styles.navLink}
            >
              Contact
            </a>
          </nav>

          <div className={styles.navRight}>
            <Link
              href="/signin"
              className={`${styles.signinButton} ${styles.disabled}`}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className={`${styles.signupButtonNav} ${styles.disabled}`}
            >
              Sign Up
            </Link>
            <button
              onClick={handleWaitlistClick}
              className={styles.joinWaitlistButton}
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className={styles.heroContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.mainTitle}>
            The future of studying starts here.
          </div>

          <h2 className={styles.subtitle}>
            Get real-time, personalised insights into how you study.
            <br></br>
            Backed by your own data. Tailored just for you.
          </h2>

          <div className={styles.ctaSection}>
            {/* <button
              onClick={handleTryStudyIntel}
              className={styles.waitlistButton}
            >
              Try StudyIntel
            </button> */}
            <Link href="/signup" className={styles.waitlistButton}>
              Try StudyIntel
            </Link>
            <button
              onClick={handleWaitlistClick}
              className={styles.secondaryButton}
            >
              Join Waitlist
            </button>

            <p className={styles.waitlistText}>
              Join the future of academic excellence&mdash;tailored for UNSW students.
            </p>
          </div>
        </div>
      </main>

      {/* About Section */}
      {/* <section id="about" className={styles.aboutSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Why StudyIntel?</h2>
          <p className={styles.aboutText}>
            Turn your study sessions into actionable insights with AI-powered
            analytics. Our AI analyzes your learning patterns and creates
            beautiful, interactive dashboards that reveal hidden insights about
            your study habits. <br></br>
            <br></br>No more guesswork. StudyIntel helps you reveal when and how
            you study best, so you can focus on what matters most.
          </p>
        </div>
      </section> */}

      {/* Features Section
      <section id="features" className={styles.featuresSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            Powerful Features for Smarter Studying
          </h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3 className={styles.featureTitle}>AI-Powered Analytics</h3>
              <p className={styles.featureDescription}>
                Unlock tailored insights into your study patterns, focus, and
                learning efficiency, powered by advanced AI analysis.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📈</div>
              <h3 className={styles.featureTitle}>Visual Progress Tracking</h3>
              <p className={styles.featureDescription}>
                Interactive dashboards and visualisations transform your study
                data into clear, actionable insights.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎯</div>
              <h3 className={styles.featureTitle}>Smart Recommendations</h3>
              <p className={styles.featureDescription}>
                Get AI-driven study tips and recommendations customised for your
                unique learning style and goals.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔔</div>
              <h3 className={styles.featureTitle}>Study Reminders</h3>
              <p className={styles.featureDescription}>
                Never miss a study session with intelligent reminders that adapt
                to your schedule and priorities.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3 className={styles.featureTitle}>Multi-Platform Sync</h3>
              <p className={styles.featureDescription}>
                Access your study data seamlessly across all your devices with
                real-time synchronisation.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔒</div>
              <h3 className={styles.featureTitle}>Privacy First</h3>
              <p className={styles.featureDescription}>
                Your study data is encrypted and secure. We never share your
                information with third parties.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Video Demo Section */}
      {/* <section className={styles.videoSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>See StudyIntel in Action</h2>
          <p className={styles.sectionSubtitle}>
            Watch your study data come to life with personalised AI insights and
            interactive data visualisations.
          </p>
          <div className={styles.videoContainer}>
            <div className={styles.videoPlaceholder}>
              <div className={styles.playButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </div>
              <p className={styles.videoText}>Coming Soon</p>
              <p className={styles.videoSubtext}>Check back here later.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      {/* <section id="testimonials" className={styles.testimonialsSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Loved by Students Everywhere</h2>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;The visual analytics are incredible! I can finally see
                which subjects I need to focus on and track my progress over
                time. The personalised AI insights showed me exactly when I
                focus best, and the data visualisations make my progress crystal
                clear.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div>
                  <div className={styles.testimonialName}>Sarah Johnson</div>
                  <div className={styles.testimonialTitle}>
                    Computer Science/Commerce, UNSW
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;StudyIntel completely transformed how I approach studying.
                The AI insights helped me identify my peak focus hours and
                improve my grades by over 30% in one semester!&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div>
                  <div className={styles.testimonialName}>Michael Chen</div>
                  <div className={styles.testimonialTitle}>
                    Medical Science, USYD
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;I was struggling with time management until I found
                StudyIntel. The smart recommendations and progress tracking
                helped me develop better study habits and reduce stress.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div>
                  <div className={styles.testimonialName}>Emily Rodriguez</div>
                  <div className={styles.testimonialTitle}>
                    Media/Communications, UTS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className={styles.ctaSection2}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.ctaTitle}>
            Ready to Transform Your Study Game?
          </h2>
          <p className={styles.ctaSubtitle}>
            Join students who are already experiencing the future of study
            intelligence
          </p>
          <div className={styles.ctaButtons}>
            <button
              onClick={handleWaitlistClick}
              className={styles.ctaPrimaryButton}
            >
              Get Early Access
            </button>
            <button
              onClick={handleWaitlistClick}
              className={styles.ctaSecondaryButton}
            >
              Try StudyIntel
            </button>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer id="contact" className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <div className={styles.footerLogo}>StudyIntel</div>
              <p className={styles.footerDescription}>
                Built with ❤️ by a student, for students. AI-powered study
                intelligence to help you reach your academic potential through
                beautiful data visualisation and personalised insights. Always
                free.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink}>
                  Twitter
                </a>
                <a
                  href="https://www.linkedin.com/in/piyush-jha1/"
                  target="_blank"
                  className={styles.socialLink}
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/PiyushJ1/StudyIntel"
                  target="_blank"
                  className={styles.socialLink}
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className={styles.footerSection}>
              <h4 className={styles.footerSectionTitle}>Product</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#features" className={styles.footerLink}>
                    Features
                  </a>
                </li>
                <li>
                  <a href="#about" className={styles.footerLink}>
                    About
                  </a>
                </li>
                <li>
                  <a href="/dashboard" className={styles.footerLink}>
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.footerSection}>
              <h4 className={styles.footerSectionTitle}>Support</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Status
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.footerSection}>
              <h4 className={styles.footerSectionTitle}>Legal</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="/privacy" className={styles.footerLink}>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className={styles.footerLink}>
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/cookies" className={styles.footerLink}>
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p className={styles.footerCopyright}>
              © 2025 StudyIntel. A study intelligence platform.
            </p>
            <div className={styles.footerBottomLinks}>
              <a href="#" className={styles.footerBottomLink}>
                Security
              </a>
              <a href="#" className={styles.footerBottomLink}>
                Changelog
              </a>
            </div>
          </div>
        </div>
      </footer> */}

      <WaitlistPopup
        isOpen={isWaitlistPopupOpen}
        onClose={() => setIsWaitlistPopupOpen(false)}
      />
    </>
  );
}
