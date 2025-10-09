"use client";

import { useState } from 'react';
import styles from './page.module.css';
import { FaRocket, FaChartBar, FaUsers, FaLock, FaFileAlt, FaEnvelope, FaSyncAlt, FaBolt, FaTint, FaCode, FaShieldAlt, FaCreditCard, FaDatabase, FaFolderOpen, FaSync, FaEnvelopeOpen, FaBook, FaCheckCircle, FaUser, FaClock, FaDollarSign, FaCheck, FaGift, FaHeadset } from 'react-icons/fa';
import OrderFormPopup from '../../components/OrderFormPopup/OrderFormPopup';

export default function HMRCReportsPage() {
    const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);

    const handleBuyClick = () => {
        setIsOrderPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsOrderPopupOpen(false);
    };

    return (
        <main className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.badge}>
                        <FaRocket className={styles.badgeIcon} />
                        <span>Backend Solution</span>
                    </div>
                    <h1 className={styles.title}>
                        Swift Reports <span className={styles.highlight}>HMRC</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Production-ready Swift server for HMRC RTI submissions with IRmark calculation and GovTalk XML handling
                    </p>
                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>EPS</span>
                            <span className={styles.statLabel}>Employer Payment Summary</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>FPS</span>
                            <span className={styles.statLabel}>Full Payment Submission</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>IRmark</span>
                            <span className={styles.statLabel}>Automatic Calculation</span>
                        </div>
                    </div>
                    <div className={styles.heroActions}>
                        <button onClick={handleBuyClick} className={styles.buyBtn}>
                            <FaCreditCard />
                            Buy Access
                        </button>
                        <div className={styles.priceBox}>
                            <span className={styles.price}>$15</span>
                            <span className={styles.priceText}>one-time + 1 year updates</span>
                        </div>
                    </div>
                </div>
                <div className={styles.heroVisual}>
                    <div className={styles.codePreview}>
                        <div className={styles.codeHeader}>
                            <div className={styles.codeDots}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span className={styles.codeTitle}>EPSSender.swift</span>
                        </div>
                        <div className={styles.codeContent}>
                            <pre>{`func sendEpsHandler(_ req: Request) async throws -> Response {
    let i = try req.content.decode(EPSInput.self)
    let epsSender = EPSSender()

    // Step 1: Build IRenvelope WITHOUT IRmark
    let envelopeNoIR = epsSender.buildIRenvelopeForIRmark(i)
    
    // Step 2: Build complete GovTalk message
    let govtalkNoIR = epsSender.buildGovTalkForIRmark(i, irEnvelopeWithoutIRmark: envelopeNoIR)
    
    // Step 3: Calculate IRmark from canonicalized content
    let irmark = try epsSender.computeIRmarkFromGovTalkBody(govtalkXML: govtalkNoIR, logger: req.logger)
    
    // Step 4: Insert IRmark into final document
    let govtalkFinal = try epsSender.injectIRmarkIntoGovTalk(govtalkNoIR, irmarkB64: irmark, taxYear: i.relatedTaxYear, logger: req.logger)
    
    // Step 5: Submit to HMRC
    return try await EPSSender.postToHMRC(xml: govtalkFinal, urlString: endpoint, logger: req.logger)
}`}</pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.features} id="features">
                <div className={styles.sectionHeader}>
                    <h2>Key Features</h2>
                    <p>Everything you need for HMRC RTI submissions</p>
                </div>
                <div className={styles.featuresGrid}>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>
                            <FaChartBar />
                        </div>
                        <h3>EPS Submissions</h3>
                        <p>Complete Employer Payment Summary processing with automatic IRmark calculation and validation</p>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>
                            <FaUsers />
                        </div>
                        <h3>FPS Submissions</h3>
                        <p>Full Payment Submission with employee payment details and comprehensive data validation</p>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>
                            <FaLock />
                        </div>
                        <h3>IRmark Calculation</h3>
                        <p>Automatic SHA-1 hash generation and Base64 encoding following HMRC specifications</p>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>
                            <FaFileAlt />
                        </div>
                        <h3>XML Canonicalization</h3>
                        <p>C14N 1.0 compliant XML processing using libxml2 for perfect HMRC compatibility</p>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>
                            <FaEnvelope />
                        </div>
                        <h3>GovTalk Integration</h3>
                        <p>Full GovTalk message envelope handling with proper namespace management</p>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>
                            <FaSyncAlt />
                        </div>
                        <h3>Polling Support</h3>
                        <p>Status checking for submitted reports with correlation ID tracking</p>
                    </div>
                </div>
            </section>

            {/* API Documentation */}
            <section className={styles.apiDocs} id="api-docs">
                <div className={styles.sectionHeader}>
                    <h2>API Documentation</h2>
                    <p>Simple REST API for HMRC submissions</p>
                </div>
                <div className={styles.endpoints}>
                    <div className={styles.endpoint}>
                        <div className={styles.endpointHeader}>
                            <span className={styles.method}>POST</span>
                            <span className={styles.path}>/reports/eps</span>
                        </div>
                        <p className={styles.endpointDesc}>Submit Employer Payment Summary</p>
                        <div className={styles.codeExample}>
                            <pre>{`curl -X POST http://localhost:8080/reports/eps \\
  -H "Content-Type: application/json" \\
  -d '{
    "senderID": "your-sender-id",
    "senderPassword": "your-password",
    "officeNo": "120",
    "payeRef": "FE94467",
    "periodEnd": "2026-04-05",
    "relatedTaxYear": "25-26"
  }'`}</pre>
                        </div>
                    </div>
                    <div className={styles.endpoint}>
                        <div className={styles.endpointHeader}>
                            <span className={styles.method}>POST</span>
                            <span className={styles.path}>/reports/fps/poll</span>
                        </div>
                        <p className={styles.endpointDesc}>Poll submission status</p>
                        <div className={styles.codeExample}>
                            <pre>{`curl -X POST http://localhost:8080/reports/fps/poll \\
  -H "Content-Type: application/json" \\
  -d '{
    "correlationId": "your-correlation-id"
  }'`}</pre>
                        </div>
                    </div>
                    <div className={styles.endpoint}>
                        <div className={styles.endpointHeader}>
                            <span className={styles.method}>POST</span>
                            <span className={styles.path}>/reports/fps</span>
                        </div>
                        <p className={styles.endpointDesc}>Submit Full Payment Submission</p>
                        <div className={styles.codeExample}>
                            <pre>{`curl -X POST http://localhost:8080/reports/fps \\
  -H "Content-Type: application/json" \\
  -d '{
    "senderID": "your-sender-id",
    "senderPassword": "your-password",
    "officeNo": "120",
    "payeRef": "FE94467",
    "employees": [{
      "details": {
        "forename": "John",
        "surname": "Smith",
        "birthDate": "1980-01-01"
      },
      "employment": {
        "payId": "EMP001",
        "figuresToDate": {
          "taxablePay": "50000.00",
          "totalTax": "10000.00"
        }
      }
    }]
  }'`}</pre>
                        </div>
                    </div>
                    <div className={styles.endpoint}>
                        <div className={styles.endpointHeader}>
                            <span className={styles.method}>POST</span>
                            <span className={styles.path}>/reports/eps/poll</span>
                        </div>
                        <p className={styles.endpointDesc}>Poll submission status</p>
                        <div className={styles.codeExample}>
                            <pre>{`curl -X POST http://localhost:8080/reports/eps/poll \\
  -H "Content-Type: application/json" \\
  -d '{
    "correlationId": "your-correlation-id"
  }'`}</pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className={styles.techStack} id="tech-stack">
                <div className={styles.sectionHeader}>
                    <h2>Technology Stack</h2>
                    <p>Built with modern Swift technologies</p>
                </div>
                <div className={styles.techItems}>
                    <div className={styles.techItem}>
                        <div className={styles.techIcon}>
                            <FaBolt />
                        </div>
                        <div className={styles.techInfo}>
                            <h3>Swift 5.9+</h3>
                            <p>Modern, safe, and fast programming language</p>
                        </div>
                    </div>
                    <div className={styles.techItem}>
                        <div className={styles.techIcon}>
                            <FaTint />
                        </div>
                        <div className={styles.techInfo}>
                            <h3>Vapor Framework</h3>
                            <p>Server-side Swift web framework</p>
                        </div>
                    </div>
                    <div className={styles.techItem}>
                        <div className={styles.techIcon}>
                            <FaFileAlt />
                        </div>
                        <div className={styles.techInfo}>
                            <h3>libxml2</h3>
                            <p>Robust XML processing and canonicalization</p>
                        </div>
                    </div>
                    <div className={styles.techItem}>
                        <div className={styles.techIcon}>
                            <FaShieldAlt />
                        </div>
                        <div className={styles.techInfo}>
                            <h3>Crypto</h3>
                            <p>SHA-1 hash generation for IRmark</p>
                        </div>
                    </div>
                    <div className={styles.techItem}>
                        <div className={styles.techIcon}>
                            <FaDatabase />
                        </div>
                        <div className={styles.techInfo}>
                            <h3>Fluent ready</h3>
                            <p>Ready to use with Fluent and Postgres</p>
                        </div>
                    </div>
                    <div className={styles.techItem}>
                        <div className={styles.techIcon}>
                            <FaCode />
                        </div>
                        <div className={styles.techInfo}>
                            <h3>HTTP Client</h3>
                            <p>Built-in HTTP client for HMRC API communication</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className={styles.pricing} id='get-started'>
                <div className={styles.pricingContainer}>
                    <div className={styles.pricingHeader}>
                        <h2>
                            <FaDollarSign />
                            Get Started Today
                        </h2>
                        <p>One-time payment, lifetime access</p>
                    </div>
                    <div className={styles.priceCard}>
                        <div className={styles.priceAmount}>$15</div>
                        <div className={styles.priceDescription}>one-time payment</div>
                        <div className={styles.priceFeatures}>
                            <div className={styles.priceFeature}>
                                <FaCheck />
                                Complete source code
                            </div>
                            <div className={styles.priceFeature}>
                                <FaGift />
                                1 year of updates
                            </div>
                            <div className={styles.priceFeature}>
                                <FaHeadset />
                                Email support
                            </div>
                        </div>
                        <button onClick={handleBuyClick} className={styles.buyBtn}>
                            <FaCreditCard />
                            Buy Access Now
                        </button>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className={styles.benefitsSection} id="benefits">
                <div className={styles.benefitsContainer}>
                    <div className={styles.benefitsHeader}>
                        <h2>What You Get</h2>
                        <p>Everything you need to integrate HMRC reporting</p>
                    </div>
                    <div className={styles.benefitsGrid}>
                        <div className={styles.benefitCard}>
                            <div className={styles.benefitIcon}>
                                <FaFolderOpen />
                            </div>
                            <h3>Complete Source Code</h3>
                            <p>Full Swift Vapor project with all HMRC integration code</p>
                        </div>
                        <div className={styles.benefitCard}>
                            <div className={styles.benefitIcon}>
                                <FaSync />
                            </div>
                            <h3>1 Year Updates</h3>
                            <p>Receive updates and bug fixes for a full year</p>
                        </div>
                        <div className={styles.benefitCard}>
                            <div className={styles.benefitIcon}>
                                <FaBook />
                            </div>
                            <h3>Documentation</h3>
                            <p>Comprehensive docs and code examples</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className={styles.process} id="how-it-works">
                <div className={styles.processContainer}>
                    <div className={styles.processHeader}>
                        <h2>How It Works</h2>
                        <p>Get access in 3 simple steps</p>
                    </div>
                    <div className={styles.processSteps}>
                        <div className={styles.processStep}>
                            <div className={styles.stepNumber}>
                                <FaCreditCard />
                            </div>
                            <div className={styles.stepContent}>
                                <h3>Make Payment</h3>
                                <p>Complete the $15 one-time payment</p>
                            </div>
                        </div>
                        <div className={styles.processStep}>
                            <div className={styles.stepNumber}>
                                <FaUser />
                            </div>
                            <div className={styles.stepContent}>
                                <h3>Provide GitHub</h3>
                                <p>Enter your GitHub username in the order form</p>
                            </div>
                        </div>
                        <div className={styles.processStep}>
                            <div className={styles.stepNumber}>
                                <FaCheckCircle />
                            </div>
                            <div className={styles.stepContent}>
                                <h3>Get Access</h3>
                                <p>Repository access within a few minutes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.ctaContainer}>
                    <div className={styles.ctaContent}>
                        <h2>Ready to Get Started?</h2>
                        <p>Join developers who are already using our HMRC integration</p>
                        <button onClick={handleBuyClick} className={styles.buyBtn}>
                            <FaRocket />
                            Request Access Now
                        </button>
                    </div>
                </div>
            </section>

            {/* Order Form Popup */}
            <OrderFormPopup
                isOpen={isOrderPopupOpen}
                onClose={handleClosePopup}
                productName="Swift Reports HMRC"
                productPrice={15}
            />
        </main>
    );
}