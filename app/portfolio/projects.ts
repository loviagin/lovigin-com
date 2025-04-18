export interface Project {
    id: string;
    title: string;
    description?: string;
    shortDescription?: string;
    status: 'completed' | 'in-progress';
    date: string;
    tags: string[];
    screenshots: string[];
    links: {
        title: string;
        url: string;
    }[];
    stack?: {
        name: string;
        description: string;
    }[];
    client?: {
        name: string;
        description?: string;
        logo?: string;
        link?: string;
    };
    timeline?: {
        start: string;
        end: string;
        duration: string;
    };
    projectTimeline?: {
        label: string;
        description: string;
    }[];
    features?: string[];
}

export const projects: Project[] = [
    {
        id: 'irisprophoto',
        title: 'Iris Pro Photo',
        description: 'IrisProPhoto is a creative web-based service that transforms a close-up photograph of the human iris into a personalized piece of digital art. The project combines artistic expression with a seamless user experience, offering users the ability to generate and order stylized images of their own eyes enhanced with custom visual effects such as fire, waves, space, and more. The service guides the user through a simple and engaging process: uploading or capturing an iris image, choosing a preferred artistic style, and customizing the final look. Once the design is ready, users can place an order to receive their artwork in various formats — digital download or physical print on canvas, glass, or other mediums. ',
        shortDescription: 'IrisProPhoto is a unique service that captures your iris and transforms it into stunning artwork using custom visual effects. A meaningful and personal gift like no other',
        status: 'completed',
        date: '2024-01-01',
        tags: ['UI/UX', 'WEB', 'IOS'],
        screenshots: [
            '/portfolio/irisprophoto.webp',
            '/projects/irisprophoto/photo1.webp',
            '/projects/irisprophoto/photo2.webp',
            '/projects/irisprophoto/photo3.webp',
            '/projects/irisprophoto/photo4.webp',
            '/projects/irisprophoto/photo5.webp',
            '/projects/irisprophoto/photo6.webp',
        ],
        links: [
            {
                title: 'Web site',
                url: 'https://irisprophoto.me'
            }
        ],
        stack: [
            {
                name: 'Next.js 15',
                description: 'React framework for production'
            },
            {
                name: 'TypeScript',
                description: 'Typed JavaScript'
            },
            {
                name: 'CSS Modules',
                description: 'Modern CSS preprocessor'
            },
            {
                name: 'SwiftUI',
                description: 'Modern SwiftUI framework'
            },
            {
                name: 'REST API',
                description: 'REST API for mobile app'
            },
            {
                name: 'Resend',
                description: 'Email service'
            },
            {
                name: 'Square',
                description: 'Payment service'
            },
            {
                name: 'Express',
                description: 'Node.js framework'
            },
            {
                name: 'MongoDB',
                description: 'NoSQL database'
            },
            {
                name: 'NGINX',
                description: 'Web server'
            },
            {
                name: 'Google API',
                description: 'Google API for Map'
            },
            {
                name: 'Apple API',
                description: 'Apple APNS for push notifications'
            }
        ],
        client: {
            name: 'Voronin\'s Family LLC',
            logo: '/projects/voroninsfamilyllc.webp',
            link: 'https://voroninsfamilyllc.com'
        },
        timeline: {
            start: '2025-02-25',
            end: '2025-03-25',
            duration: '1 month'
        },
        projectTimeline: [
            {
                label: 'Design',
                description: 'We offered 3 design options to choose from. All were done in Figma.'
            },
            {
                label: 'Developed a website',
                description: 'Developed a fully responsive for desktop, tablet and mobile devices website on a modern technology stack and powerful servers in New York.'
            },
            {
                label: 'Mobile application',
                description: 'Created a mobile app for order administration. Everything was done in conjunction with the Notion database.'
            }
        ],
        features: [
            'Responsive design',
            'Performance optimization',
            'SEO implementation',
            'Payment integration',
            'Order management',
            'Notification system',
            'Admin panel',
            'Google Analytics',
        ]
    },
    {
        id: 'unifood',
        title: 'Uni Food',
        shortDescription: 'Loyalty program for a university cafeteria.',
        status: 'completed',
        date: '2025-03-05',
        tags: ['UI/UX', 'WEB', 'IOS'],
        screenshots: [
            '/portfolio/unifood.webp',
        ],
        links: [
            {
                title: 'Web site',
                url: 'https://unifood.space/en'
            }
        ],
        timeline: {
            start: '2025-03-05',
            end: '2025-04-05',
            duration: '1 month'
        },
    },
]; 