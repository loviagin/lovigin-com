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
    archived: boolean;
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
            '/portfolio/irisprophoto/photo1.webp',
            '/portfolio/irisprophoto/photo2.webp',
            '/portfolio/irisprophoto/photo3.webp',
            '/portfolio/irisprophoto/photo4.webp',
            '/portfolio/irisprophoto/photo5.webp',
            '/portfolio/irisprophoto/photo6.webp',
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
            logo: '/portfolio/logo/voroninsfamilyllc.webp',
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
        ],
        archived: false,
    },







    {
        id: 'unifood',
        title: 'Uni Food',
        shortDescription: 'Loyalty program for a university cafeteria with a mobile Admin app.',
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
        archived: false,
    },





    {
        id: 'voroninsfamilyllc',
        title: 'Voronin\'s Family LLC',
        shortDescription: 'The website of a family business that offers a wide range of handyman services.',
        status: 'completed',
        date: '2025-03-05',
        tags: ['UI/UX', 'WEB'],
        screenshots: [
            '/portfolio/voroninsfamilyllc.webp',
        ],
        links: [
            {
                title: 'Web site',
                url: 'https://voroninsfamilyllc.com'
            }
        ],
        timeline: {
            start: '2024-10-26',
            end: '2024-11-13',
            duration: '2 weeks'
        },
        archived: false,
    },







    {
        id: 'annaloviagina',
        title: 'Anna Loviagina',
        shortDescription: 'The website of a professional artist including a portfolio, blog, and contact form.',
        status: 'in-progress',
        date: '2025-03-29',
        tags: ['UI/UX', 'WEB'],
        screenshots: [
            '/portfolio/annaloviagina.webp',
        ],
        links: [
            {
                title: 'Web site',
                url: 'https://annaloviagina.art/en'
            }
        ],
        timeline: {
            start: '2025-03-29',
            end: '2025-04-29',
            duration: '1 month'
        },
        archived: false,
    },







    {
        id: 'busmanager',
        title: 'Bus Manager',
        shortDescription: 'A web application for managing bus routes and schedules.',
        status: 'in-progress',
        date: '2025-03-12',
        tags: ['UI/UX', 'WEB'],
        screenshots: [
            '/portfolio/busmanager.webp',
            '/portfolio/busmanager/picture1.webp',
            '/portfolio/busmanager/picture2.webp',
        ],
        links: [
            {
                title: 'Web site',
                url: 'https://busmanager.space'
            }
        ],
        timeline: {
            start: '2025-03-12',
            end: '2025-04-29',
            duration: 'In progress'
        },
        archived: false,
    },



    {
        id: 'all-banks',
        title: 'All Banks',
        description: 'All Banks – Manage all your accounts in one place. Take full control of your finances with All Banks, the smart and minimalistic app for managing accounts across multiple banks and currencies. Forget about juggling different apps – now you can track everything in one clear and convenient dashboard. Whether you need a clear overview of your personal finances or a simple tool to track accounts in different currencies, All Banks makes money management easier than ever. Your privacy comes first: all data is stored securely on your device and synced via iCloud – only you have access.',
        shortDescription: 'iOS & Android app for managing all your accounts in one place.',
        status: 'completed',
        date: '2025-04-16',
        tags: ['UI/UX', 'IOS', 'ANDROID'],
        screenshots: [
            '/projects/all-banks/logo.webp',
            '/projects/all-banks/overview.webp',
            '/projects/all-banks/picture1.webp',
            '/projects/all-banks/picture2.webp',
            '/projects/all-banks/picture3.webp',
            '/projects/all-banks/picture4.webp',
        ],
        links: [
            {
                title: 'App Store',
                url: 'https://apps.apple.com/us/app/all-banks-manage-accouns/id6744983251'
            },
            {
                title: 'Enroll to Test in Play Market',
                url: '/products/enroll?project=All+Banks&platform=Android'
            }
        ],
        stack: [
            {
                name: 'Swift + SwiftUI',
                description: 'Swift programming language and SwiftUI framework'
            },
            {
                name: 'Kotlin + Jetpack Compose',
                description: 'Kotlin programming language and Jetpack Compose framework'
            },
            {
                name: 'Swift Data + Room',
                description: 'Swift Data and Room database'
            },
        ],
        client: {
            name: 'LOVIGIN LTD',
            logo: '/favicon.webp',
            link: 'https://lovigin.com'
        },
        timeline: {
            start: '2025-04-16',
            end: '2025-04-28',
            duration: '12 days'
        },
        features: [
            'Multiple banks & accounts – add all your accounts and group them by bank',
            'Multi-currency support – manage balances in USD, EUR, RUB and other currencies',
            'Total balance conversion – instantly see your overall balance in any currency with live exchange rates',
            'Simple shopping list – keep track of your purchases and planned expenses',
            'Clean interface – minimal design with fast navigation, no ads, and no distractions',
            'SOON: Advanced analytics and spending statistics',
            'SOON: Debt and installment tracking with payment reminders',
            'SOON: Support for cryptocurrencies',
        ],
        archived: false,
    },






    {
        id: 'gift-text',
        title: 'Gift Text',
        description: 'Gift Text helps you instantly create warm, relevant, and memorable messages for any occasion — from birthdays and anniversaries to professional thank-yous. Simply choose the event, tone, and recipient — and get a ready-to-send text that you can share in messengers or turn into a stylish card.',
        shortDescription: 'Gift Text helps you instantly create warm, relevant, and memorable messages for any occasion',
        status: 'completed',
        date: '2025-08-27',
        tags: ['UI/UX', 'IOS', 'AI'],
        screenshots: [
            '/projects/gift-text/logo.webp',
            '/projects/gift-text/overview.webp',
        ],
        links: [
            {
                title: 'App Store',
                url: 'https://apps.apple.com/us/app/gift-text-create-your-own/id6751366964'
            }
        ],
        // stack: [
        //     {
        //         name: 'Swift + SwiftUI',
        //         description: 'Swift programming language and SwiftUI framework'
        //     },
        //     {
        //         name: 'Kotlin + Jetpack Compose',
        //         description: 'Kotlin programming language and Jetpack Compose framework'
        //     },
        //     {
        //         name: 'Swift Data + Room',
        //         description: 'Swift Data and Room database'
        //     },
        // ],
        client: {
            name: 'LOVIGIN LTD',
            logo: '/favicon.webp',
            link: 'https://lovigin.com'
        },
        timeline: {
            start: '2025-07-27',
            end: '2025-08-27',
            duration: '1 month'
        },
        // features: [
        //     'Multiple banks & accounts – add all your accounts and group them by bank',
        //     'Multi-currency support – manage balances in USD, EUR, RUB and other currencies',
        //     'Total balance conversion – instantly see your overall balance in any currency with live exchange rates',
        //     'Simple shopping list – keep track of your purchases and planned expenses',
        //     'Clean interface – minimal design with fast navigation, no ads, and no distractions',
        //     'SOON: Advanced analytics and spending statistics',
        //     'SOON: Debt and installment tracking with payment reminders',
        //     'SOON: Support for cryptocurrencies',
        // ],
        archived: false,
    },
]; 