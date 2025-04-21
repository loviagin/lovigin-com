'use client';

import styles from './WorkProcess.module.css';

const steps = [
  {
    number: 1,
    title: 'You make an order or contact us',
    description: 'We start with getting to know your project.',
    items: [
      'We discuss all the details via messenger or your personal account',
      'You fill out a short brief to define the scope and goals',
      'We sign an official contract',
      'Payment second stage via any card, PayPal, or Payoneer'
    ]
  },
  {
    number: 2,
    title: 'We create the design',
    description: 'Bringing your vision to life through modern UI/UX.',
    items: [
      'We research your niche and audience',
      'Create a moodboard and wireframe (if needed)',
      'Deliver the first design concept',
      'Make 1–2 rounds of revisions (if needed)',
      'Finalize the design for development'
    ]
  },
  {
    number: 3,
    title: 'We develop your website',
    description: 'Clean, responsive, and fast-loading website development.',
    items: [
        'Convert design into your website',
        'Make the website fully responsive for mobile & tablet',
        'Add animations, transitions, and other effects',
        'Optimize performance and load speed',
        'Set up domain, hosting, and HTTPS'
    ]
  },
  {
    number: 4,
    title: 'Final review and approval',
    description: 'Making sure everything is perfect before launch.',
    items: [
      'You review the website on staging',
      'We fix any final bugs or tweaks',
      'We launch the website on the domain',
      'Full handover + guide on how to use/update your site'
    ]
  },
  {
    number: 5,
    title: 'Tech support (3 months included*)',
    description: 'We stay in touch after launch.',
    items: [
        'Fix technical issues or bugs',
        'Help with content updates',
        'Answer your questions about managing the site',
        'Optional support extension available'
    ]
  }
];

export default function WorkProcess() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Work Process</h2>
        <div className={styles.titleLine} />
      </div>

      <div className={styles.steps}>
        {steps.map((step, index) => (
          <div key={step.number} className={styles.step}>
            <div className={styles.stepLeft}>
              <div className={styles.stepNumber}>
                <span>{step.number}</span>
              </div>
              {index < steps.length - 1 && <div className={styles.stepLine} />}
            </div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
              {step.items.length > 0 && (
                <ul className={styles.stepList}>
                  {step.items.map((item, index) => (
                    <li key={index} className={styles.stepItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 