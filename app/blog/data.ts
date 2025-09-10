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
    archived: boolean;
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
        },
        archived: true,
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
        },
        archived: false,
    },



    //All Banks
    {
        id: '3',
        title: 'Meet – All Banks',
        excerpt: 'All Banks — convenient management of all accounts in one application',
        content: `
<h2>Introducing All Banks — a simple way to manage all your accounts in one app</h2>
<p>We at <strong>LOVIGIN</strong> are excited to present our new product — <strong>All Banks</strong>, a smart and minimalistic app for managing bank accounts.</p>

<p><strong>All Banks</strong> is the perfect solution for anyone tired of juggling multiple banking apps. Add accounts in different currencies, group them by bank, track your total balance in any currency, and gain a full picture of your finances — all in one place.</p>

<h3>Already available:</h3>
<ul>
  <li>Manage multiple banks and accounts</li>
  <li>Support for all major currencies (including RUB, USD, EUR and more)</li>
  <li>Total balance conversion using live exchange rates</li>
  <li>Clean navigation and fast access to information</li>
  <li>Minimal interface with no ads or clutter</li>
</ul>
</br>
<h3>Coming soon</h3>
<p>We’re actively working on the following features:</p>
<ul>
  <li>Cryptocurrency accounts (BTC, ETH, TON and more)</li>
  <li>Loan and installment tracking with reminders</li>
  <li>Smart notifications and automatic purchase detection</li>
  <li>In-depth analytics and financial statistics</li>
  <li>iCloud sync for security and convenience</li>
  <br />
  <li><strong>And Android version is coming soon!</strong></li>
</ul>
<br />
<p>The app is already available on the App Store. We’re developing it with real user needs in mind — and we welcome your feedback!</p>

<hr>
<br/>
<p><strong>Try All Banks now — and take full control of your finances.</strong></p>
<p><b><u><a style='color: var(--foreground);' href="https://apps.apple.com/us/app/all-banks-manage-accouns/id6744983251">Download on the App Store</a><u></b></p>
         `,
        date: 'April 24, 2025',
        timestamp: new Date('2025-04-24').getTime(),
        image: '/projects/all-banks/logo.webp',
        category: 'Products',
        author: {
            name: 'Ilia Loviagin',
            role: 'Senior Developer',
            avatar: '/blog/all-banks.webp'
        },
        archived: false,
    },




    {
        id: '4',
        title: 'Happy International Workers’ Day!',
        excerpt: 'Today, on May 1st, we celebrate those who build, create, and move the world forward',
        content: `
        <h2>🌍 Happy International Workers’ Day! 💻⚙️</h2>

<p>Today, on <strong>May 1st</strong>, we celebrate those who build, create, and move the world forward — developers, designers, engineers, support teams, freelancers, founders, and everyone who puts heart and soul into their work.</p>

<p>At <strong>LOVIGIN</strong>, we believe that <em>technology empowers people</em>, but behind every great product are humans who care, think, and build. Today is a day to recognize your effort, creativity, and persistence.</p>

<p>Whether you're writing code, designing interfaces, fixing bugs, launching startups, or supporting users — <strong>you are shaping the future</strong>. And that deserves a moment of pride.</p>

<p>💪 <strong>Happy Labor Day! Thank you for doing what you do.</strong></p>

<p><em>– The LOVIGIN Team</em></p>
`,
        date: 'May 1, 2025',
        timestamp: new Date('2025-05-01').getTime(),
        image: '/blog/labor.webp',
        category: 'News',
        author: {
            name: 'Ilia Loviagin',
            role: 'Senior Developer',
            avatar: '/blog/all-banks.webp'
        },
        archived: false,
    },






    {
        id: '5',
        title: 'New App is live – Gift Text',
        excerpt: 'GiftText helps you create unique greetings with AI 🎁 Write touching messages and generate beautiful images for any occasion 💌',
        content: `
        <h2>Gift Text – Create your own</h2>

<p><strong>Gift Text</strong> helps you instantly create warm, relevant, and memorable messages for any occasion — from birthdays and anniversaries to professional thank-yous. Simply choose the event, tone, and recipient — and get a ready-to-send text that you can share in messengers or turn into a stylish card.</p>

<h2>Features</h2>
<ul>
  <li><strong>Occasions & Formats:</strong> birthdays, weddings, love, friendship, apologies, thank-yous, business messages, holidays, and more.</li>
  <li><strong>Personalized Style:</strong> adjust tone from formal to casual to match the situation.</li>
  <li><strong>Instant Sharing:</strong> copy or send directly in one tap.</li>
  <li><strong>Creative Inspiration:</strong> never run out of ideas when words are hard to find.</li>
</ul>

<br />
<p>The app is already available on the App Store. We’re developing it with real user needs in mind — and we welcome your feedback!</p>

<hr>
<br/>
<p><strong>Try Gift Text now — and create your own greetings.</strong></p>
<p><b><u><a style='color: var(--foreground);' href="https://apps.apple.com/us/app/gift-text-create-your-own/id6751366964">Download on the App Store</a></u></b></p>
`,
        date: 'August 27, 2025',
        timestamp: new Date('2025-08-27').getTime(),
        image: '/projects/gift-text/logo.webp',
        category: 'Products',
        author: {
            name: 'Ilia Loviagin',
            role: 'Senior Developer',
            avatar: '/blog/all-banks.webp'
        },
        archived: false,
    }
];

export const getPostById = (id: string): BlogPost | undefined => {
    return blogPosts.find(post => post.id === id);
};

export const getSortedPosts = (): BlogPost[] => {
    return [...blogPosts].sort((a, b) => b.timestamp - a.timestamp);
}; 