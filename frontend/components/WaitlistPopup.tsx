"use client";

import { useState } from "react";
import styles from "../styles/WaitlistPopup.module.css";

interface WaitlistPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistPopup({ isOpen, onClose }: WaitlistPopupProps) {
  const [formData, setFormData] = useState({
    email: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // call backend waitlist endpoint
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/waitlist`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.message || response.statusText}`);
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);
    } catch {
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (/*e: React.MouseEvent*/) => {
    // if (e.target === e.currentTarget) {
    //   onClose();
    // }
    // cant close popup by clicking outside
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.popup}>
        {!isSubmitted ? (
          <>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>

            <div className={styles.header}>
              <h2 className={styles.title}>Join the StudyIntel Waitlist</h2>
              <p className={styles.subtitle}>
                Be among the first to experience AI-powered study intelligence.
                Get early access and exclusive updates.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.benefits}>
                <h3 className={styles.benefitsTitle}>What you&apos;ll get:</h3>
                <ul className={styles.benefitsList}>
                  <li>🚀 Priority early access</li>
                  <li>📊 Exclusive preview of AI insights</li>
                  <li>💡 Provide direct input on new features</li>
                  <li>👀 Insider updates and information</li>
                </ul>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting || !formData.email}
              >
                {isSubmitting ? (
                  <span className={styles.loading}>
                    <span className={styles.spinner}></span>
                    Joining...
                  </span>
                ) : (
                  "Join Waitlist"
                )}
              </button>

              <div className={styles.privacy}>
                <p className={styles.privacyText}>
                  🔒 By joining, you agree to our{" "}
                  <a
                    href="/privacy"
                    className={styles.privacyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="/terms"
                    className={styles.privacyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Service
                  </a>
                  . We respect your privacy and never share your information
                  with third parties.
                </p>
              </div>
            </form>
          </>
        ) : (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✨</div>
            <h2 className={styles.successTitle}>
              Welcome to the future of studying!
            </h2>
            <p className={styles.successText}>
              You&apos;re now on the StudyIntel waitlist. We&apos;ll email you
              as soon as early access is available. Get ready to revolutionize
              your studies!
            </p>
            <button onClick={onClose} className={styles.returnHomeButton}>
              Return Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
