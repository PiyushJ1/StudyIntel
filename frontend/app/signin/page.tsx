'use client';

import Link from 'next/link';
import styles from './signin.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SigninPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // handle user signin 
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signin`, {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.message || response.statusText}`);
        setIsSubmitting(false);
        return;
      }
            
      if (response.ok) {
        router.push('/dashboard');
      }
    } catch (err) {
      alert('Could not log in');
      setIsSubmitting(false);
      console.log("error:", err);
    }
  };

  return (
    <div className={styles.signinContainer}>
      <div className={styles.signinCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to keep leveling up your studies 🚀</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className={styles.formOptions}>
            <label className={styles.checkboxContainer}>
              <input type="checkbox" className={styles.checkbox} />
              <span className={styles.checkboxLabel}>Remember me</span>
            </label>
            <Link href="/forgot-password" className={styles.forgotLink}>
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            className={styles.signinButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className={styles.loading}>
                <span className={styles.spinner}></span>
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>

          <div className={styles.divider}>
            <span className={styles.dividerText}>or</span>
          </div>

          <button type="button" className={styles.googleButton}>
            <span className={styles.googleIcon}>
              <Image 
                src='/assets/google-logo.png'
                alt='google-icon'
                width={24}
                height={24}
              />
            </span>
            Continue with Google
          </button>
        </form>

        <button type="button" className={styles.microsoftButton}>
          <span className={styles.microsoftIcon}>
            <Image 
              src='/assets/microsoft-logo.png'
              alt='microsoft-icon'
              width={19}
              height={19}
            />
          </span>
            Continue with Microsoft
        </button>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className={styles.signupLink}>
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <Link href="/" className={styles.backButton}>
        ← Back to Home
      </Link>
    </div>
  );
};