'use client'

import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--dark-bg)' }}>
      <Link 
        href="/" 
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          color: 'var(--text-primary)',
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontWeight: '500',
          opacity: '0.7',
          transition: 'all 0.3s ease',
          fontFamily: "'Inter', sans-serif",
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'translateX(-2px)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.7';
          e.currentTarget.style.transform = 'translateX(0)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
        }}
      >
        ← Back to StudyIntel
      </Link>
      
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg p-8" style={{ 
        background: 'var(--card-bg)', 
        border: '1px solid var(--card-border)' 
      }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ 
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            fontFamily: "'Poppins', sans-serif"
          }}>
            Terms of Service
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Last updated: [Date]</p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ 
              color: 'var(--text-primary)',
              fontFamily: "'Inter', sans-serif"
            }}>
              1. Agreement to Terms
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              By accessing and using StudyIntel (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ 
              color: 'var(--text-primary)',
              fontFamily: "'Inter', sans-serif"
            }}>
              2. Description of Service
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              StudyIntel is a platform designed to help students organize their study sessions, track academic progress, and collaborate with peers. The service includes features such as study session logging, progress tracking, event management, and collaborative tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ 
              color: 'var(--text-primary)',
              fontFamily: "'Inter', sans-serif"
            }}>
              3. User Accounts
            </h2>
            <div className="leading-relaxed space-y-3" style={{ color: 'var(--text-secondary)' }}>
              <p>To access certain features of StudyIntel, you must register for an account. When creating your account, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ 
              color: 'var(--text-primary)',
              fontFamily: "'Inter', sans-serif"
            }}>
              4. Acceptable Use
            </h2>
            <div className="leading-relaxed space-y-3" style={{ color: 'var(--text-secondary)' }}>
              <p>You agree not to use StudyIntel to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Upload, post, or transmit any content that is harmful, threatening, abusive, or offensive</li>
                <li>Violate any applicable local, state, national, or international law</li>
                <li>Impersonate any person or entity or falsely state your affiliation</li>
                <li>Interfere with or disrupt the service or servers connected to the service</li>
                <li>Use the service for any commercial purposes without our written consent</li>
                <li>Share academic work in ways that violate academic integrity policies</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ 
              color: 'var(--text-primary)',
              fontFamily: "'Inter', sans-serif"
            }}>
              5. Privacy and Data Protection
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using StudyIntel, you agree to the collection and use of information in accordance with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ 
              color: 'var(--text-primary)',
              fontFamily: "'Inter', sans-serif"
            }}>
              6. Content and Intellectual Property
            </h2>
            <div className="leading-relaxed space-y-3" style={{ color: 'var(--text-secondary)' }}>
              <p>StudyIntel and its original content, features, and functionality are owned by [Company Name] and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
              <p>You retain ownership of any content you submit, post, or display on StudyIntel. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute such content solely for the purpose of providing the service.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ 
              color: 'var(--text-primary)',
              fontFamily: "'Inter', sans-serif"
            }}>
              7. Academic Integrity
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              StudyIntel is designed to support legitimate academic activities. Users are responsible for ensuring their use of the platform complies with their institution&apos;s academic integrity policies. We do not condone or support academic dishonesty in any form.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ 
              color: 'var(--text-primary)',
              fontFamily: "'Inter', sans-serif"
            }}>
              8. Service Availability
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              We strive to maintain StudyIntel&apos;s availability but cannot guarantee uninterrupted access. The service may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control. We reserve the right to modify, suspend, or discontinue the service at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ 
              color: 'var(--text-primary)',
              fontFamily: "'Inter', sans-serif"
            }}>
              9. Limitation of Liability
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              StudyIntel is provided &quot;as is&quot; without warranties of any kind. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, or other intangible losses resulting from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ 
              color: 'var(--text-primary)',
              fontFamily: "'Inter', sans-serif"
            }}>
              10. Termination
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ 
              color: 'var(--text-primary)',
              fontFamily: "'Inter', sans-serif"
            }}>
              11. Changes to Terms
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on this page and updating the &quot;Last updated&quot; date. Your continued use of the service after any such changes constitutes your acceptance of the new Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ 
              color: 'var(--text-primary)',
              fontFamily: "'Inter', sans-serif"
            }}>
              12. Contact Information
            </h2>
            <div className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
              <div className="mt-3 p-4 rounded-lg" style={{ 
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid var(--card-border)'
              }}>
                <p>Email: [support@studyintel.com]</p>
                <p>Address: [Company Address]</p>
                <p>Phone: [Phone Number]</p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 text-center" style={{ borderTop: '1px solid var(--card-border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} StudyIntel. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}