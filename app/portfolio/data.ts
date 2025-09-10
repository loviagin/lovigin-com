export interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    status: 'in-progress' | 'completed';
    date: string; // Format: YYYY-MM-DD
}

export const portfolioItems: PortfolioItem[] = [
    {
        id: 'irisprophoto',
        title: 'Iris Pro Photo',
        description: 'The website of an American company that creates portraits of the iris of the eye',
        image: '/portfolio/irisprophoto.webp',
        tags: ['UI/UX', 'WEB', 'IOS'],
        status: 'completed',
        date: '2025-02-25'
    },
    {
        id: 'unifood',
        title: 'Uni Food',
        description: 'Loyalty program for a university cafeteria with a mobile Admin app.',
        image: '/portfolio/unifood.webp',
        tags: ['UI/UX', 'WEB', 'IOS'],
        status: 'completed',
        date: '2025-03-05'
    },
    {
        id: 'voroninsfamilyllc',
        title: 'Voronin\'s Family LLC',
        description: 'The website of a family business that offers a wide range of handyman services.',
        image: '/portfolio/voroninsfamilyllc.webp',
        tags: ['UI/UX', 'WEB'],
        status: 'completed',
        date: '2024-10-26'
    },
    {
        id: 'annaloviagina',
        title: 'Anna Loviagina',
        description: 'The website of a professional artist including a portfolio, blog, and contact form.',
        image: '/portfolio/annaloviagina.webp',
        tags: ['UI/UX', 'WEB'],
        status: 'in-progress',
        date: '2025-03-29'
    },
    {
        id: 'busmanager',
        title: 'Bus Manager',
        description: 'A web application for managing bus routes and schedules.',
        image: '/portfolio/busmanager.webp',
        tags: ['UI/UX', 'WEB'],
        status: 'in-progress',
        date: '2025-03-12'
    },
    {
        id: 'all-banks',
        title: 'All Banks',
        description: 'iOS & Android app for managing all your accounts in one place.',
        image: '/projects/all-banks/logo.webp',
        tags: ['UI/UX', 'IOS', 'ANDROID'],
        status: 'completed',
        date: '2025-04-16'
    },
]; 