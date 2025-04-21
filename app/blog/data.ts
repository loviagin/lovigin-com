export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    timestamp: number;
    image: string;
    category: string;
    author: {
        name: string;
        role: string;
        avatar: string;
    };
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'We launch new app Communa',
        excerpt: 'We are excited to announce the launch of our new app, Communa. It is a social media platform that allows you to connect with your friends and family.',
        content: `
<h2>Introducing Communa — Our New Platform for Meaningful Collaboration</h2>
<p><u>
<a style='color: #fff;' href='https://apps.apple.com/app/communa-community/id6541758055' target='_blank'>Download in App Store</a>
</u></p>
<p>
We're excited to officially launch <strong>Communa</strong>, a brand-new platform designed to bring people together through shared goals, interests, and ideas. Whether you're working on a project, learning something new, or simply want to connect with like-minded individuals, Communa is here to make collaboration easier and more engaging.
</p>
<p>
At its core, Communa is about community. With powerful chat tools, interest-based groups, task planners, and seamless integrations with external services, our goal is to give you everything you need to stay connected and productive — all in one place.
</p>
<p>
Our team has focused on creating a clean, intuitive interface that removes friction and keeps you focused on what really matters: communication, cooperation, and creativity. Whether you're a student, a professional, or just someone with a passion to share, Communa adapts to your needs.
</p>
<p>
We believe that great things happen when people come together. That's why Communa isn't just another tool — it's a growing ecosystem where ideas take shape, goals are met, and connections turn into opportunities.
</p>
<p>
Join us on this journey and be part of something bigger. Sign up today and explore how Communa can help you build stronger, smarter communities — one conversation at a time.
</p>  
<p><u>
<a style='color: #fff;' href='https://communa.icu' target='_blank'>Learn more about Communa</a>
</u></p>
        `,
        date: 'December 27, 2024',
        timestamp: new Date('2024-12-27').getTime(),
        image: '/projects/communa/logo.webp',
        category: 'Products',
        author: {
            name: 'John Doe',
            role: 'Senior Developer',
            avatar: '/projects/communa.webp'
        }
    },
    {
        id: '2',
        title: 'Happy Easter',
        excerpt: 'On this joyful occasion of Easter, we would like to send our warmest wishes to you and your loved ones.',
        content: `
<h2>Happy Easter from the LOVIGIN Team!</h2>
<p>
On this joyful occasion of Easter, we would like to send our warmest wishes to you and your loved ones. May this season of renewal bring peace, happiness, and new beginnings to your life.
</p>
<p>
Easter reminds us of the power of hope, unity, and kindness — values that lie at the heart of everything we do at <strong>LOVIGIN</strong>. As we continue building our platform and growing our community, we are grateful to have you with us on this journey.
</p>
<p>
Wishing you a bright and beautiful Easter filled with meaningful moments and joyful memories.
</p>
<p>
With love and appreciation,  
<br>— The LOVIGIN Team
</p>
         `,
        date: 'April 20, 2025',
        timestamp: new Date('2025-04-20').getTime(),
        image: '/blog/easter2025.webp',
        category: 'News',
        author: {
            name: 'Ilia Loviagin',
            role: 'Senior Developer',
            avatar: '/projects/communa.webp'
        }
    },
];

export const getPostById = (id: string): BlogPost | undefined => {
    return blogPosts.find(post => post.id === id);
};

export const getSortedPosts = (): BlogPost[] => {
    return [...blogPosts].sort((a, b) => b.timestamp - a.timestamp);
}; 