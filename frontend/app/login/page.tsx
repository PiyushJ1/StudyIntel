'use client';

import Link from 'next/link';
import styles from './login.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // handle user login
    console.log('Login submitted:', formData);
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.message || response.statusText}`);
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      alert('Could not log in');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to continue your learning journey</p>
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

          <button type="submit" className={styles.loginButton}>
            Sign In
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
            <Link href="/register" className={styles.registerLink}>
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