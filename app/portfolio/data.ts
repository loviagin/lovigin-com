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
    }
    // {
    //     id: '2',
    //     title: 'Project Name 2',
    //     description: 'Another project description showcasing our capabilities.',
    //     image: '/images/portfolio/project2.jpg',
    //     tags: ['MOBILE', 'BACKEND'],
    //     status: 'in-progress',
    //     date: '2024-03-20'
    // },
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