"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import { FaCheckCircle, FaGithub, FaEnvelope, FaClock, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

interface PaymentStatus {
    status: string;
    customerEmail?: string;
    amountTotal?: number;
    currency?: string;
    metadata?: {
        customerName?: string;
        githubUsername?: string;
        contactMethod?: string;
        contact?: string;
    };
}

function ThankYouContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkPaymentStatus = async () => {
            if (!sessionId) {
                setError('No session ID provided');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/stripe/check-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sessionId }),
                });

                const data = await response.json();

                if (response.ok) {
                    setPaymentStatus(data);
                    
                    // If payment is successful, send emails and add to GitHub
                    if (data.status === 'paid') {
                        await handleSuccessfulPayment(data);
                    }
                } else {
                    setError(data.error || 'Failed to check payment status');
                }
            } catch (err) {
                setError('Network error while checking payment status');
            } finally {
                setIsLoading(false);
            }
        };

        checkPaymentStatus();
    }, [sessionId]);

    const handleSuccessfulPayment = async (paymentData: PaymentStatus) => {
        try {
            // Send emails and add to GitHub
            const response = await fetch('/api/stripe/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId,
                    paymentData,
                }),
            });

            if (!response.ok) {
                console.error('Failed to process payment actions');
            }
        } catch (error) {
            console.error('Error processing payment actions:', error);
        }
    };
    // Loading state
    if (isLoading) {
        return (
            <main className={styles.container}>
                <div className={styles.background}>
                    <div className={styles.gradient} />
                </div>
                
                <div className={styles.content}>
                    <div className={styles.successCard}>
                        <div className={styles.successIcon}>
                            <FaSpinner className={styles.spinner} />
                        </div>
                        
                        <h1 className={styles.title}>Checking Payment Status...</h1>
                        <p className={styles.subtitle}>
                            Please wait while we verify your payment.
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    // Error state
    if (error) {
        return (
            <main className={styles.container}>
                <div className={styles.background}>
                    <div className={styles.gradient} />
                </div>
                
                <div className={styles.content}>
                    <div className={styles.successCard}>
                        <div className={styles.errorIcon}>
                            <FaExclamationTriangle />
                        </div>
                        
                        <h1 className={styles.title}>Payment Status Error</h1>
                        <p className={styles.subtitle}>
                            {error}
                        </p>
                        
                        <div className={styles.actions}>
                            <a href="/products/swift-reports-hmrc" className={styles.backButton}>
                                Back to Product Page
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Payment not completed
    if (paymentStatus?.status !== 'paid') {
        return (
            <main className={styles.container}>
                <div className={styles.background}>
                    <div className={styles.gradient} />
                </div>
                
                <div className={styles.content}>
                    <div className={styles.successCard}>
                        <div className={styles.errorIcon}>
                            <FaExclamationTriangle />
                        </div>
                        
                        <h1 className={styles.title}>Payment Not Completed</h1>
                        <p className={styles.subtitle}>
                            Your payment status is: {paymentStatus?.status || 'unknown'}
                        </p>
                        
                        <div className={styles.actions}>
                            <a href="/products/swift-reports-hmrc" className={styles.backButton}>
                                Try Again
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Success state
    return (
        <main className={styles.container}>
            <div className={styles.background}>
                <div className={styles.gradient} />
            </div>
            
            <div className={styles.content}>
                <div className={styles.successCard}>
                    <div className={styles.successIcon}>
                        <FaCheckCircle />
                    </div>
                    
                    <h1 className={styles.title}>Payment Successful!</h1>
                    <p className={styles.subtitle}>
                        Thank you for your purchase! Your payment has been processed successfully.
                    </p>

                    <div className={styles.details}>
                        <div className={styles.detailItem}>
                            <FaGithub className={styles.detailIcon} />
                            <div className={styles.detailContent}>
                                <h3>Repository Access</h3>
                                <p>GitHub: {paymentStatus.metadata?.githubUsername || 'Not provided'}</p>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <FaEnvelope className={styles.detailIcon} />
                            <div className={styles.detailContent}>
                                <h3>Contact Information</h3>
                                <p>{paymentStatus.metadata?.contactMethod}: {paymentStatus.metadata?.contact}</p>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <FaClock className={styles.detailIcon} />
                            <div className={styles.detailContent}>
                                <h3>Payment Details</h3>
                                <p>Amount: ${(paymentStatus.amountTotal! / 100).toFixed(2)} {paymentStatus.currency?.toUpperCase()}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.nextSteps}>
                        <h2>What happens next?</h2>
                        <ol>
                            <li>We'll add your GitHub username to the private repository</li>
                            <li>You'll receive an invitation email from GitHub</li>
                            <li>Accept the invitation to access the repository</li>
                            <li>Start using the Swift Reports HMRC code in your projects</li>
                        </ol>
                    </div>

                    <div className={styles.support}>
                        <h3>Need Help?</h3>
                        <p>If you have any questions or need assistance, please contact us:</p>
                        <div className={styles.contactLinks}>
                            <a href="mailto:support@lovigin.com" className={styles.contactLink}>
                                <FaEnvelope />
                                support@lovigin.com
                            </a>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <a href="/products/swift-reports-hmrc" className={styles.backButton}>
                            Back to Product Page
                        </a>
                        <a href="/" className={styles.homeButton}>
                            Go to Homepage
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={
            <main className={styles.container}>
                <div className={styles.background}>
                    <div className={styles.gradient} />
                </div>
                
                <div className={styles.content}>
                    <div className={styles.successCard}>
                        <div className={styles.successIcon}>
                            <FaSpinner className={styles.spinner} />
                        </div>
                        
                        <h1 className={styles.title}>Loading...</h1>
                        <p className={styles.subtitle}>
                            Please wait while we load your payment status.
                        </p>
                    </div>
                </div>
            </main>
        }>
            <ThankYouContent />
        </Suspense>
    );
}
