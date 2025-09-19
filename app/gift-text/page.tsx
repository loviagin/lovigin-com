import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🎁</span>
            <span className={styles.logoText}>GiftText</span>
          </div>
          <a href="https://apps.apple.com/us/app/gift-text-create-your-own/id6751366964" target="_blank" className={styles.downloadBtn}>
            Download
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
          <div className={styles.gradientOrb3}></div>
        </div>

        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                Create
                <span className={styles.titleHighlight}> beautiful greetings</span>
                <br />
                with AI
              </h1>
              <p className={styles.heroSubtitle}>
                Personalized texts and postcards for any occasion.
                Surprise your loved ones with original greetings in seconds.
              </p>

              <div className={styles.heroActions}>
                <a href="https://apps.apple.com/us/app/gift-text-create-your-own/id6751366964" target="_blank" className={styles.primaryButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span>Download in App Store</span>
                </a>
                <a href="#howitworks" className={styles.secondaryButton}>
                  Learn more
                </a>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.phoneContainer}>
                <div className={styles.phoneImage}>
                  <img
                    src="/projects/gift-text/phone.webp"
                    alt="GiftText приложение на телефоне"
                    className={styles.phoneImg}
                  />
                </div>

                {/* Floating message bubbles around phone */}
                <div className={styles.messageBubbles}>
                  <div className={styles.messageBubble1}>
                    <div className={styles.bubbleIcon}>💝</div>
                    <div className={styles.bubbleText}>Happy Birthday!</div>
                  </div>
                  <div className={styles.messageBubble2}>
                    <div className={styles.bubbleIcon}>🎉</div>
                    <div className={styles.bubbleText}>Happy New Year!</div>
                  </div>
                  <div className={styles.messageBubble3}>
                    <div className={styles.bubbleIcon}>💕</div>
                    <div className={styles.bubbleText}>Happy Anniversary!</div>
                  </div>
                </div>

                {/* AI sparkles around phone */}
                <div className={styles.aiElements}>
                  <div className={styles.aiSparkle1}>✨</div>
                  <div className={styles.aiSparkle2}>✨</div>
                  <div className={styles.aiSparkle3}>✨</div>
                  <div className={styles.aiSparkle4}>✨</div>
                </div>

                {/* Background decorative elements */}
                <div className={styles.decorativeElements}>
                  <div className={styles.decorativeCircle1}></div>
                  <div className={styles.decorativeCircle2}></div>
                  <div className={styles.decorativeCircle3}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="howitworks" className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How it works</h2>
            <p className={styles.sectionSubtitle}>
              Three simple steps to the perfect greeting
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>01</div>
              <div className={styles.featureIcon}>🎯</div>
              <h3 className={styles.featureTitle}>Enter who you want to greet</h3>
              <p className={styles.featureDescription}>
                Enter the name of the person you want to greet
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>02</div>
              <div className={styles.featureIcon}>🎯</div>
              <h3 className={styles.featureTitle}>Choose the occasion</h3>
              <p className={styles.featureDescription}>
                Birthday, wedding, New Year or any other holiday
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>03</div>
              <div className={styles.featureIcon}>🎨</div>
              <h3 className={styles.featureTitle}>Set the style</h3>
              <p className={styles.featureDescription}>
                Romantic, official, friendly or creative tone
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>04</div>
              <div className={styles.featureIcon}>✨</div>
              <h3 className={styles.featureTitle}>Get the result</h3>
              <p className={styles.featureDescription}>
                Unique text or beautiful postcard in just a few seconds
              </p>
            </div>
          </div>

          {/* Additional content */}
          <div className={styles.featuresAdditional}>
            <div className={styles.featuresStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>10,000+</div>
                <div className={styles.statLabel}>Satisfied users</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>50,000+</div>
                <div className={styles.statLabel}>Created greetings</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>4.9</div>
                <div className={styles.statLabel}>Rating in App Store</div>
              </div>
            </div>

            <div className={styles.featuresTestimonial}>
              <div className={styles.testimonialContent}>
                <div className={styles.testimonialQuote}>
                  "GiftText helped me create the perfect greeting for my mom.
                  She was in awe! Now I use the app for all holidays."
                </div>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>👩</div>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorName}>Anna Petrova</div>
                    <div className={styles.authorRole}>Application user</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="features" className={styles.benefits}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why choose GiftText</h2>
            <p className={styles.sectionSubtitle}>
              Modern technologies for creating perfect greetings
            </p>
          </div>

          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🤖</div>
              <h3 className={styles.benefitTitle}>Artificial intelligence</h3>
              <p className={styles.benefitDescription}>
                Advanced algorithms create unique and personalized greetings for each occasion
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>⚡</div>
              <h3 className={styles.benefitTitle}>Instant result</h3>
              <p className={styles.benefitDescription}>
                Get a ready greeting or postcard in just a few seconds
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🎨</div>
              <h3 className={styles.benefitTitle}>Beautiful design</h3>
              <p className={styles.benefitDescription}>
                Create stylish postcards with modern templates and effects
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>💝</div>
              <h3 className={styles.benefitTitle}>For all occasions</h3>
              <p className={styles.benefitDescription}>
                Birthday, wedding, New Year, anniversary and many other occasions
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>📱</div>
              <h3 className={styles.benefitTitle}>Convenient interface</h3>
              <p className={styles.benefitDescription}>
                Intuitive application that can be used by any user
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🔒</div>
              <h3 className={styles.benefitTitle}>Data security</h3>
              <p className={styles.benefitDescription}>
                Your personal data and greeting history are located on your device
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to surprise your loved ones?
            </h2>
            <p className={styles.ctaSubtitle}>
              Download GiftText and create beautiful greetings today
            </p>
            <a href="https://apps.apple.com/us/app/gift-text-create-your-own/id6751366964" target="_blank" className={styles.ctaButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span>Download in App Store</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <span className={styles.logoIcon}>🎁</span>
                <span className={styles.logoText}>GiftText</span>
              </div>
              <p className={styles.footerDescription}>
                Easy way to surprise friends and loved ones with original greetings
              </p>
            </div>

            <div className={styles.footerLinks}>
              <div className={styles.footerColumn}>
                <h4 className={styles.footerTitle}>Product</h4>
                <a href="#howitworks" className={styles.footerLink}>How it works</a>
                <a href="#features" className={styles.footerLink}>Features</a>
                <a href="https://apps.apple.com/us/app/gift-text-create-your-own/id6751366964" target="_blank" className={styles.footerLink}>Download</a>
              </div>

              <div className={styles.footerColumn}>
                <h4 className={styles.footerTitle}>Support</h4>
                <a href="https://lovigin.com/contacts" target="_blank" className={styles.footerLink}>Contacts</a>
                <a href="https://lovigin.com/terms-of-service" target="_blank" className={styles.footerLink}>Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}