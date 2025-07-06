'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import WaitlistPopup from '../components/WaitlistPopup';

export default function HomePage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isWaitlistPopupOpen, setIsWaitlistPopupOpen] = useState(false);
  
  useEffect(() => {
    const words = ['Get personalized study insights.', 'Visualize your learning progress.', 'Reach your academic potential.'];
    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
          
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
          
        if (currentText === currentWord) {
          setIsPaused(true);
        }
      }
    }, isPaused ? 1500 : isDeleting ? 40 : 70);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentWordIndex]);

  // Prevent scrolling when popup is open
  useEffect(() => {
    if (isWaitlistPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isWaitlistPopupOpen]);

  const handleWaitlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWaitlistPopupOpen(true);
  };

  const handleFreePlanClick = () => {
    setIsWaitlistPopupOpen(true);
  };

  const handleProPlanClick = () => {
    setIsWaitlistPopupOpen(true);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.navLeft}>
            <Link href="/" className={styles.logo}>
              StudyIntel
            </Link>
          </div>
            
          <nav className={styles.navCenter}>
            <a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')} className={styles.navLink}>Features</a>
            <a href="#pricing" onClick={(e) => handleSmoothScroll(e, 'pricing')} className={styles.navLink}>Pricing</a>
            <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, 'testimonials')} className={styles.navLink}>Reviews</a>
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className={styles.navLink}>Contact</a>
          </nav>
            
          <div className={styles.navRight}>
            <Link href="/login" className={`${styles.loginButton} ${styles.disabled}`}>
              Sign In
            </Link>
            <Link href="/register" className={`${styles.signupButtonNav} ${styles.disabled}`}>
              Sign Up
            </Link>
            <button onClick={handleWaitlistClick} className={styles.joinWaitlistButton}>
              Join Waitlist
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className={styles.heroContainer}>
        <div className={styles.contentContainer}>
          <h1 className={styles.mainTitle}>
            <div className={styles.typingContainer}>
              <span className={styles.typingText}>{currentText}</span>
              <span className={styles.cursor}></span>
            </div>
          </h1>
          <h2 className={styles.subtitle}>AI-powered study intelligence with beautiful data visualization. <br></br>See your study patterns, receive actionable insights.</h2>
            
          <div className={styles.ctaSection}>
            <button onClick={handleWaitlistClick} className={styles.waitlistButton}>
              Start Free Trial
            </button>
            <button onClick={handleWaitlistClick} className={styles.secondaryButton}>
              Join Waitlist
            </button>
              
            <p className={styles.waitlistText}>
              Claim your spot in the future of academic excellence
            </p>
          </div>
        </div>
      </main>

      {/* About Section */}
      <section className={styles.aboutSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Why StudyIntel?</h2>
          <p className={styles.aboutText}>
            StudyIntel transforms your study sessions into stunning visual analytics and actionable intelligence. Our AI analyzes your learning patterns and creates beautiful, interactive dashboards that reveal hidden insights about your study habits, helping you study smarter, not harder.
          </p>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className={styles.videoSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>See StudyIntel in Action</h2>
          <p className={styles.sectionSubtitle}>
            Watch how StudyIntel transforms your study data into actionable insights
          </p>
          <div className={styles.videoContainer}>
            <div className={styles.videoPlaceholder}>
              <div className={styles.playButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7z" fill="currentColor"/>
                </svg>
              </div>
              <p className={styles.videoText}>Insert your Loom video embed here</p>
              <p className={styles.videoSubtext}>Replace this placeholder with your Loom video URL</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Powerful Features for Smarter Studying</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3 className={styles.featureTitle}>AI-Powered Analytics</h3>
              <p className={styles.featureDescription}>
                Get personalized insights about your study patterns, focus levels, and learning efficiency with advanced AI analysis.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📈</div>
              <h3 className={styles.featureTitle}>Visual Progress Tracking</h3>
              <p className={styles.featureDescription}>
                Beautiful dashboards and charts that make it easy to understand your academic progress at a glance.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎯</div>
              <h3 className={styles.featureTitle}>Smart Recommendations</h3>
              <p className={styles.featureDescription}>
                Receive personalized study recommendations based on your performance data and learning style.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔔</div>
              <h3 className={styles.featureTitle}>Study Reminders</h3>
              <p className={styles.featureDescription}>
                Never miss a study session with intelligent reminders that adapt to your schedule and priorities.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3 className={styles.featureTitle}>Multi-Platform Sync</h3>
              <p className={styles.featureDescription}>
                Access your study data seamlessly across all your devices with real-time synchronization.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔒</div>
              <h3 className={styles.featureTitle}>Privacy First</h3>
              <p className={styles.featureDescription}>
                Your study data is encrypted and secure. We never share your information with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={styles.pricingSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Simple, Transparent Pricing</h2>
          <p className={styles.sectionSubtitle}>
            Start free, upgrade when you&apos;re ready to unlock your full potential
          </p>
          
          <div className={styles.pricingGrid}>
            {/* Free Plan */}
            <div className={styles.pricingCard}>
              <div className={styles.pricingHeader}>
                <h3 className={styles.pricingTitle}>Free</h3>
                <div className={styles.pricingPrice}>
                  <span className={styles.priceAmount}>$0</span>
                  <span className={styles.pricePeriod}>/month</span>
                </div>
                <p className={styles.pricingDescription}>Perfect for getting started</p>
              </div>
              
              <ul className={styles.pricingFeatures}>
                <li className={styles.pricingFeature}>
                  <span className={styles.checkIcon}>✓</span>
                  Track up to 5 study sessions per week
                </li>
                <li className={styles.pricingFeature}>
                  <span className={styles.checkIcon}>✓</span>
                  Basic time tracking and timers
                </li>
                <li className={styles.pricingFeature}>
                  <span className={styles.checkIcon}>✓</span>
                  Simple progress charts and graphs
                </li>
                <li className={styles.pricingFeature}>
                  <span className={styles.checkIcon}>✓</span>
                  General performance insights
                </li>
                <li className={styles.pricingFeature}>
                  <span className={styles.checkIcon}>✓</span>
                  Basic study statistics
                </li>
                <li className={styles.pricingFeatureLimited}>
                  <span className={styles.xIcon}>✗</span>
                  AI-powered study insights
                </li>
                <li className={styles.pricingFeatureLimited}>
                  <span className={styles.xIcon}>✗</span>
                  Advanced analytics dashboard
                </li>
                <li className={styles.pricingFeatureLimited}>
                  <span className={styles.xIcon}>✗</span>
                  Personalized recommendations
                </li>
              </ul>
              
              <button onClick={handleFreePlanClick} className={styles.pricingButton}>
                Get Started Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}>
              <div className={styles.popularBadge}>Most Popular</div>
              <div className={styles.pricingHeader}>
                <h3 className={styles.pricingTitle}>Pro</h3>
                <div className={styles.pricingPrice}>
                  <span className={styles.priceAmount}>$3.99</span>
                  <span className={styles.pricePeriod}>/month</span>
                </div>
                <p className={styles.pricingDescription}>For serious students</p>
              </div>
              
              <ul className={styles.pricingFeatures}>
                <li className={styles.pricingFeature}>
                  <span className={styles.checkIcon}>✓</span>
                  Everything in Free Plan
                </li>
                <li className={styles.pricingFeature}>
                  <span className={styles.checkIcon}>✓</span>
                  Unlimited study session tracking
                </li>
                <li className={styles.pricingFeature}>
                  <span className={styles.checkIcon}>✓</span>
                  AI-powered study pattern analysis
                </li>
                <li className={styles.pricingFeature}>
                  <span className={styles.checkIcon}>✓</span>
                  Advanced productivity insights
                </li>
                <li className={styles.pricingFeature}>
                  <span className={styles.checkIcon}>✓</span>
                  Personalized study recommendations
                </li>
                <li className={styles.pricingFeature}>
                  <span className={styles.checkIcon}>✓</span>
                  Focus score and concentration analytics
                </li>
                <li className={styles.pricingFeature}>
                  <span className={styles.checkIcon}>✓</span>
                  Export study reports and data
                </li>
                <li className={styles.pricingFeature}>
                  <span className={styles.checkIcon}>✓</span>
                  Priority email support
                </li>
              </ul>
              
              <button onClick={handleProPlanClick} className={styles.pricingButtonFeatured}>
                Start Pro Trial
              </button>
            </div>
          </div>
          
          <p className={styles.pricingNote}>
            All plans come with a 14-day free trial. No credit card required to start.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={styles.testimonialsSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Loved by Students Everywhere</h2>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;StudyIntel completely transformed how I approach studying. The AI insights helped me identify my peak focus hours and improve my grades by over 30% in one semester!&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>SJ</div>
                <div>
                  <div className={styles.testimonialName}>Sarah Johnson</div>
                  <div className={styles.testimonialTitle}>Computer Science/Commerce, UNSW</div>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;The visual analytics are incredible! I can finally see which subjects I need to focus on and track my progress over time. It&apos;s like having a personal study coach.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>MC</div>
                <div>
                  <div className={styles.testimonialName}>Michael Chen</div>
                  <div className={styles.testimonialTitle}>Medical Science, USYD</div>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;I was struggling with time management until I found StudyIntel. The smart recommendations and progress tracking helped me develop better study habits and reduce stress.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>ER</div>
                <div>
                  <div className={styles.testimonialName}>Emily Rodriguez</div>
                  <div className={styles.testimonialTitle}>Media/Communications, UTS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection2}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.ctaTitle}>Ready to Transform Your Study Game?</h2>
          <p className={styles.ctaSubtitle}>
            Join hundreds of students who already on the StudyIntel waitlist
          </p>
          <div className={styles.ctaButtons}>
            <button onClick={handleWaitlistClick} className={styles.ctaPrimaryButton}>
              Join Waitlist Now
            </button>
            <button onClick={handleWaitlistClick} className={styles.ctaSecondaryButton}>
              Start free trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <div className={styles.footerLogo}>StudyIntel</div>
              <p className={styles.footerDescription}>
                Built with ❤️ by a student, for students. AI-powered study intelligence to help you reach your academic potential through beautiful data visualization and personalized insights.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink}>Twitter</a>
                <a href="https://www.linkedin.com/in/piyush-jha1/" target="_blank" className={styles.socialLink}>LinkedIn</a>
                <a href="https://github.com/PiyushJ1/StudyIntel" target="_blank" className={styles.socialLink}>GitHub</a>
              </div>
            </div>
            
            <div className={styles.footerSection}>
              <h4 className={styles.footerSectionTitle}>Product</h4>
              <ul className={styles.footerLinks}>
                <li><a href="#features" className={styles.footerLink}>Features</a></li>
                <li><a href="#pricing" className={styles.footerLink}>Pricing</a></li>
                <li><a href="/dashboard" className={styles.footerLink}>Dashboard</a></li>
                <li><a href="#" className={styles.footerLink}>Roadmap</a></li>
              </ul>
            </div>
            
            <div className={styles.footerSection}>
              <h4 className={styles.footerSectionTitle}>Support</h4>
              <ul className={styles.footerLinks}>
                <li><a href="#" className={styles.footerLink}>Help Center</a></li>
                <li><a href="#" className={styles.footerLink}>Documentation</a></li>
                <li><a href="#" className={styles.footerLink}>Contact</a></li>
                <li><a href="#" className={styles.footerLink}>Status</a></li>
              </ul>
            </div>
            
            <div className={styles.footerSection}>
              <h4 className={styles.footerSectionTitle}>Legal</h4>
              <ul className={styles.footerLinks}>
                <li><a href="/privacy" className={styles.footerLink}>Privacy Policy</a></li>
                <li><a href="/terms" className={styles.footerLink}>Terms of Service</a></li>
                <li><a href="/cookies" className={styles.footerLink}>Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className={styles.footerBottom}>
            <p className={styles.footerCopyright}>
              © 2025 StudyIntel. A study intelligence platform.
            </p>
            <div className={styles.footerBottomLinks}>
              <a href="#" className={styles.footerBottomLink}>Security</a>
              <a href="#" className={styles.footerBottomLink}>Changelog</a>
            </div>
          </div>
        </div>
      </footer>

      <WaitlistPopup 
        isOpen={isWaitlistPopupOpen}
        onClose={() => setIsWaitlistPopupOpen(false)}
      />
    </>
  );
}
