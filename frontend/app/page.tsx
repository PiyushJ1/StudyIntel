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
      <div className={styles.pageWrapper}>
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
              {/* <button
                onClick={handleWaitlistClick}
                className={styles.joinWaitlistButton}
              >
              Join Waitlist
              </button> */}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className={styles.heroContainer}>
          <div className={styles.contentContainer}>
            <div className={styles.mainTitle}>
              Start studying with confidence.
            </div>

            <h2 className={styles.subtitle}>
              Track your progress, visualise your habits, and <br /> get
              personalised insights — all powered by your own data.
            </h2>

            <div className={styles.ctaSection}>
              <Link href="/signup" className={styles.waitlistButton}>
                Get Started
              </Link>
              <button
                onClick={handleWaitlistClick}
                className={styles.secondaryButton}
              >
                Join Waitlist
              </button>

              <p className={styles.waitlistText}>
                The smarter way to study. Designed for UNSW students.
              </p>
            </div>
          </div>
        </main>


        {/* Footer */}
        <footer className={styles.footerMinimal}>
          <div className={styles.footerIcons}>
            <span className={styles.footerCredit}>by Piyush Jha</span>
            <strong className={styles.footerDivider}>|</strong>
            <a
              href="https://www.linkedin.com/in/piyushj1/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIconLink}
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com/PiyushJ1/StudyIntel"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIconLink}
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </footer>

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

        <DarkVeil />
      </div>
    </>
  );
}
