'use client';

import { useMemo, useState, Suspense } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Platform = 'ios' | 'android' | 'web';

interface TermsLinks {
    termsUrl: string;
    privacyUrl: string;
}

const DEFAULT_TERMS: TermsLinks = {
    termsUrl: '/terms-of-service',
    privacyUrl: '/privacy-policy',
};

function useProjectContext() {
    const params = useSearchParams();
    const project = params.get('project') || '';
    const platform = (params.get('platform') as Platform | null) || null;

    const terms: TermsLinks = useMemo(() => {
        switch (project) {
            case 'all-banks':
                return DEFAULT_TERMS;
            case 'communa':
                return DEFAULT_TERMS;
            case 'gohood':
                return DEFAULT_TERMS;
            default:
                return DEFAULT_TERMS;
        }
    }, [project]);

    return { project, platform, terms };
}

function EnrollTesterPageContent() {
    const { project, platform, terms } = useProjectContext();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const isSubmitDisabled =
        status === 'loading' || !project || !platform || !name || !email || !consent;

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitDisabled) return;
        setStatus('loading');
        try {
            const res = await fetch('/api/send-enroll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ project, platform, name, email }),
            });
            if (res.ok) {
                setStatus('success');
                setName('');
                setEmail('');
                setConsent(false);
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <main className={styles.enroll}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Joining the Testers</h1>
                    <p className={styles.description}>
                    Join Early Access — help us improve the product and get
                    an invitation to install the application. Participation is free.
                    </p>
                </header>

                <section className={styles.benefitsGrid}>
                    <div className={styles.benefitCard}>
                        <div className={styles.benefitIcon}>🚀</div>
                        <div className={styles.benefitTitle}>Early Access</div>
                        <div className={styles.benefitText}>Get new features early and influence priorities.</div>
                    </div>
                    <div className={styles.benefitCard}>
                        <div className={styles.benefitIcon}>💬</div>
                        <div className={styles.benefitTitle}>Feedback</div>
                        <div className={styles.benefitText}>Your feedback directly helps us improve quality.</div>
                    </div>
                </section>

                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Order of Actions</h2>
                    <h3 className={styles.sectionSubtitle}>
                        Simple process for joining the testing team
                    </h3>
                </div>
                <section className={styles.stepsGrid}>
                    <div className={styles.stepCard}>
                        <div className={styles.stepNumber}>1</div>
                        <div className={styles.stepText}>Fill out and submit the form below.</div>
                    </div>
                    <div className={styles.stepCard}>
                        <div className={styles.stepNumber}>2</div>
                        <div className={styles.stepText}>Wait for an email with instructions.</div>
                    </div>
                    <div className={styles.stepCard}>
                        <div className={styles.stepNumber}>3</div>
                        <div className={styles.stepText}>Download and install the application by the link.</div>
                    </div>
                </section>

                <section className={styles.formSection}>
                    <form className={styles.form} onSubmit={onSubmit}>
                        <div className={styles.formRow}>
                            <input
                                className={styles.input}
                                type="text"
                                value={project}
                                placeholder="Project"
                                disabled
                                aria-label="Project"
                            />
                            <input
                                className={styles.input}
                                type="text"
                                value={platform || ''}
                                placeholder="Platform"
                                disabled
                                aria-label="Platform"
                            />
                        </div>

                        <div className={styles.formRow}>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={status === 'loading'}
                                required
                            />
                            <input
                                className={styles.input}
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'loading'}
                                required
                            />
                        </div>

                        <label className={styles.checkboxRow}>
                            <input
                                type="checkbox"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                disabled={status === 'loading'}
                                required
                            />
                            <span className={styles.checkboxText}>
                                I accept
                                {' '}<Link href={terms.termsUrl} target="_blank">Terms of use</Link>
                                {' '}and{' '}
                                <Link href={terms.privacyUrl} target="_blank">Privacy policy</Link>
                                {' '}for the project {project || '—'}.
                            </span>
                        </label>

                        <button className={styles.submitButton} type="submit" disabled={isSubmitDisabled}>
                            {status === 'loading' ? 'Sending…' : status === 'success' ? 'Application sent' : 'Send application'}
                        </button>

                        {status === 'error' && (
                            <div className={styles.errorMessage}>
                                An error occurred while sending the application. Please try again.
                            </div>
                        )}

                        {status === 'success' && (
                            <div className={styles.successMessage}>
                                Application sent successfully! We will contact you soon.
                            </div>
                        )}

                        {!project || !platform ? (
                            <div className={styles.warningMessage}>
                                The project name and platform are not set. Please go back and try again.
                            </div>
                        ) : null}
                    </form>
                </section>
            </div>
        </main>
    );
}

export default function EnrollTesterPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EnrollTesterPageContent />
        </Suspense>
    );
}


