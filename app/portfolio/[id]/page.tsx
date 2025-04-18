import { notFound } from 'next/navigation';
import Image from 'next/image';
import { projects } from '../projects';
import styles from './page.module.css';
import ScreenshotSlider from './ScreenshotSlider';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProjectPage({ params }: PageProps) {
    const { id } = await params;
    const project = projects.find(p => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <main className={styles.container}>
            <div className={styles.background}>
                <div className={styles.gradient} />
            </div>
            <div className={styles.headerSection}>
                <div className={styles.content}>
                    <h1 className={styles.title}>{project.title}</h1>
                    <p className={styles.subtitle}>{project.shortDescription}</p>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.projectContent}>
                    {/* Screenshots Slider */}
                    <ScreenshotSlider screenshots={project.screenshots} title={project.title} />

                    {/* Project Links */}
                    <div className={styles.links}>
                        {project.links.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                            >
                                {link.title}
                            </a>
                        ))}
                    </div>

                    {/* Project Description */}
                    <div className={styles.description}>
                        <h2 className={styles.sectionTitle}>About the Project</h2>
                        <p>{project.description}</p>
                    </div>

                    {/* Project Timeline */}
                    <div className={styles.timeline}>
                        <h2 className={styles.sectionTitle}>What we built</h2>
                        <div className={styles.timelineContent}>
                            {project.projectTimeline.map((item, index) => (
                                <div key={index} className={styles.timelineItem}>
                                    <span className={styles.timelineLabel}>{item.label}</span>
                                    <span className={styles.timelineValue}>{item.description}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className={styles.stack}>
                        <h2 className={styles.sectionTitle}>Tech Stack</h2>
                        <div className={styles.stackItems}>
                            {project.stack.map((tech, index) => (
                                <div key={index} className={styles.stackItem}>
                                    <h3 className={styles.techName}>{tech.name}</h3>
                                    <p className={styles.techDescription}>{tech.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Project Duration */}
                    <div className={styles.timeline}>
                        <h2 className={styles.sectionTitle}>Project Duration</h2>
                        <div className={styles.timelineContent}>
                            <div className={styles.timelineItem}>
                                <span className={styles.timelineLabel}>Start Date</span>
                                <span className={styles.timelineValue}>
                                    {new Date(project.timeline.start).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className={styles.timelineItem}>
                                <span className={styles.timelineLabel}>End Date</span>
                                <span className={styles.timelineValue}>
                                    {new Date(project.timeline.end).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className={styles.timelineItem}>
                                <span className={styles.timelineLabel}>Duration</span>
                                <span className={styles.timelineValue}>{project.timeline.duration}</span>
                            </div>
                        </div>
                    </div>

                    {/* Client Info */}
                    {project.client && (
                        <div className={styles.client}>
                            <h2 className={styles.sectionTitle}>Client</h2>
                            <div className={styles.clientContent}>
                                {project.client.logo && (
                                    <div className={styles.clientLogo}>
                                        <Image
                                            src={project.client.logo}
                                            alt={`${project.client.name} logo`}
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                )}
                                <div className={styles.clientInfo}>
                                    <h3 className={styles.clientName}>{project.client.name}</h3>
                                    {project.client.description && (
                                        <p className={styles.clientDescription}>{project.client.description}</p>
                                    )}
                                    {project.client.link && (
                                        <a href={project.client.link} target="_blank" rel="noopener noreferrer" className={styles.clientLink}>
                                            Official website
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Features */}
                    <div className={styles.features}>
                        <h2 className={styles.sectionTitle}>Key Features</h2>
                        <ul className={styles.featuresList}>
                            {project.features.map((feature, index) => (
                                <li key={index} className={styles.featureItem}>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tags */}
                    <div className={styles.tags}>
                        {project.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
} 