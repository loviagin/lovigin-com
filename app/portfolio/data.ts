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
        description: 'Loyalty program for a university cafeteria.',
        image: '/portfolio/unifood.webp',
        tags: ['UI/UX', 'WEB', 'IOS'],
        status: 'completed',
        date: '2025-03-05'
    },
    // {
    //     id: '3',
    //     title: 'Project Name 3',
    //     description: 'Description of our third project and its impact.',
    //     image: '/images/portfolio/project3.jpg',
    //     tags: ['ECOMMERCE', 'FULL STACK'],
    //     status: 'completed',
    //     date: '2024-03-10'
    // }
]; 