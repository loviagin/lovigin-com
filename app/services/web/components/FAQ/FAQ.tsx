'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
    {
        question: 'How long does it take to develop a website?',
        answer: 'The development time varies depending on the project complexity. Typically, a landing page takes 2-3 weeks, a corporate website 3-4 weeks, and an online store 4-6 weeks. We\'ll provide you with a more precise timeline after discussing your specific requirements.'
    },
    {
        question: 'What is included in the website development service?',
        answer: 'Our service includes design creation, responsive development, content integration, domain and hosting setup, SEO optimization, and testing. We also provide post-launch support.'
    },
    {
        question: 'Do you provide website maintenance services?',
        answer: 'Yes, we offer comprehensive website maintenance services including regular updates, security monitoring, performance optimization, and technical support. You can choose from monthly ($99/month), semi-annual ($89/month), or annual ($80/month) maintenance plans.'
    },
    {
        question: 'What technologies do you use for development?',
        answer: 'We use modern and reliable technologies including Next.js, React, TypeScript, and Node.js. Our tech stack ensures high performance, security, and scalability of your website.'
    },
    {
        question: 'What is your payment process?',
        answer: 'We work with a three-stage payment process aligned with project phases: 1) Design phase payment before starting the design work, 2) Development phase payment before beginning the implementation, and 3) Final payment before the final approval and launch. This approach ensures clear project milestones and helps distribute the cost over the project timeline.'
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h2 className={styles.title}>FAQ</h2>
                    <div className={styles.titleLine} />
                </div>

                <div className={styles.faqList}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`${styles.faqItem} ${openIndex === index ? styles.active : ''}`}
                            onClick={() => toggleQuestion(index)}
                        >
                            <div className={styles.question}>
                                <span>{faq.question}</span>
                                <div className={styles.arrow} />
                            </div>
                            <div className={styles.answer}>
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 