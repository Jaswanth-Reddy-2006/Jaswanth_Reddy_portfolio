// Portfolio data structure
export interface EngineeringDecisions {
    why: string;
    tradeoffs: string[];
    scalability: string;
    futureImprovements: string[];
}

export interface ProjectMetric {
    label: string;
    value: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    problem: string;
    outcome: string;
    link?: string;
    year: string;
    decisions: EngineeringDecisions;
    metrics?: ProjectMetric[];
    impactBadge?: string;
    imageUrl?: string;
}

export interface CoreValue {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface SkillCategory {
    category: string;
    skills: string[];
    icon: string;
}

export interface Certification {
    id: string;
    title: string;
    organization: string;
    year: string;
    credentialUrl?: string;
}

export interface BuildLogItem {
    id: string;
    date: string;
    description: string;
}

export interface PortfolioData {
    name: string;
    tagline: string;
    introduction: string;
    projects: Project[];
    skills: SkillCategory[];
    certifications: Certification[];
    experience: ExperienceItem[];
    vision: string;
    buildLog: BuildLogItem[];
    coreValues?: CoreValue[];
    socials: SocialProfile[];
}

export interface SocialProfile {
    platform: 'LeetCode' | 'GitHub' | 'Codeforces' | 'LinkedIn';
    url: string;
    username: string;
    metrics: Record<string, string | number>;
}

export interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    duration: string;
    description: string[];
    techStack: string[];
    roleTag: string;
}

// Sample portfolio data - Replace with actual student data
export const portfolioData: PortfolioData = {
    name: "R Jaswanth Reddy",
    tagline: "Full-Stack Engineer | Interactive Systems Builder | DSA Practitioner",
    introduction: "I design and build **scalable web applications** combining **strong frontend engineering** with **efficient backend systems**. Passionate about **algorithm visualization**, **system design**, and shipping solutions that solve **real problems**.",

    projects: [
        {
            id: "1",
            title: "AlgoScope",
            description: "Interactive Algorithm Visualization Platform\n- Built step-by-step visualization for sorting, searching, and graph algorithms.\n- Designed dynamic memory trace visualization with auxiliary data structure mapping.\n- Optimized Canvas API rendering for smooth complex algorithm states.\n- Deployed using Vercel.",
            techStack: ["React.js", "JavaScript", "Canvas API", "Vercel"],
            problem: "Students struggle to understand complex algorithms through static diagrams and manual traces. Traditional learning methods often lack the interactive feedback needed to grasp temporal changes in memory and data structures.",
            outcome: "Developed a high-performance visualization suite that maps auxiliary data structures in real-time. The platform provides a hands-on environment for mastering DSA concepts, leading to clearer mental models for complex graph and sorting logic.",
            year: "2026",
            impactBadge: "Engineering Excellence",
            decisions: {
                why: "React.js was selected for its declarative UI state management, which is essential for reflecting algorithm steps. Canvas API was utilized for low-level rendering control, ensuring high frame rates during complex graph traversals where DOM-based rendering would lag.",
                tradeoffs: [
                    "Manual implementation of algorithm steps over existing libraries to ensure 100% control over the visualization lifecycle",
                    "Prioritized rendering smoothness over bundle size by including custom animation curves"
                ],
                scalability: "The engine is built on a plugin-based architecture, allowing new algorithms to be added simply by defining their state transitions and memory mapping hooks.",
                futureImprovements: [
                    "Integrate real-time code execution using Web Workers",
                    "Add interactive problem sets with real-time feedback"
                ]
            }
        }
    ],

    skills: [
        {
            category: "Client-Side Engineering",
            icon: "Code2",
            skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js"]
        },
        {
            category: "Server-Side & Data",
            icon: "Server",
            skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Firebase", "Supabase"]
        },
        {
            category: "Data Structures & Algorithms",
            icon: "Binary",
            skills: ["Dynamic Programming", "Graph Theory", "Complex Data Structures", "Trees", "Sorting & Searching"]
        },
        {
            category: "Systems & Tools",
            icon: "Wrench",
            skills: ["Git", "GitHub", "Cursor", "Stitch", "GPT"]
        }
    ],

    certifications: [
        {
            id: "edu-1",
            title: "B.Tech in Computer Science & Engineering",
            organization: "Vidya Jyothi Institute of Technology",
            year: "2024-2028",
            credentialUrl: "GPA: 8.76"
        },
        {
            id: "edu-2",
            title: "High School (Intermediate)",
            organization: "Narayana Junior College",
            year: "2024",
            credentialUrl: "94.8%"
        },
        {
            id: "edu-3",
            title: "Secondary School",
            organization: "ZPHS Nagole",
            year: "2022",
            credentialUrl: "93%"
        }
    ],

    experience: [
        {
            id: "exp-1",
            role: "Frontend Intern",
            roleTag: "Intern",
            company: "InviGuide",
            duration: "Jan 2026 – March 2026",
            description: [
                "Built responsive UI components using React and optimized for modern web standards.",
                "Integrated REST APIs for dynamic data handling and real-time state synchronization.",
                "Improved component performance and reusability through modular design patterns.",
                "Collaborated with backend team for seamless feature delivery and performance tuning."
            ],
            techStack: ["React", "TypeScript", "Figma", "Modern UI"]
        }
    ],

    vision: "I'm becoming an engineer who doesn't just write code, but crafts experiences. My goal is to build products that solve real problems and make technology accessible to everyone. I believe in continuous learning, clean code, and the power of collaboration.",

    buildLog: [
        {
            id: "log-1",
            date: "Dec 2025",
            description: "Ranked Top 10 Among 1000+ vibe coders. Finalist in 36-hour Vibeathon Bangalore."
        }
    ],

    coreValues: [
        {
            id: "v1",
            title: "Performance First",
            description: "Architecting systems where 60fps and low latency aren't features, but requirements.",
            icon: "Zap"
        },
        {
            id: "v2",
            title: "Scalable Thinking",
            description: "Designing components and APIs that grow without friction.",
            icon: "Maximize"
        },
        {
            id: "v3",
            title: "User-Centric DSA",
            description: "Applying complex algorithms to solve human problems, not just pass tests.",
            icon: "User"
        }
    ],

    socials: [
        {
            platform: 'LeetCode',
            url: 'https://leetcode.com/u/Jaswanth_Reddy_2006/',
            username: 'Jaswanth_Reddy_2006',
            metrics: {
                solved: 450,
                easy: 150,
                medium: 220,
                hard: 80,
                ranking: 'Top 5%'
            }
        },
        {
            platform: 'GitHub',
            url: 'https://github.com/Jaswanth-Reddy-2006',
            username: 'Jaswanth-Reddy-2006',
            metrics: {
                repos: 24,
                stars: 45,
                contributions: 1200,
                followers: 50
            }
        },
        {
            platform: 'Codeforces',
            url: 'https://codeforces.com/profile/jaswanthre9',
            username: 'jaswanthre9',
            metrics: {
                rating: 1450,
                rank: 'Specialist',
                solved: 320,
                maxRating: 1510
            }
        },
        {
            platform: 'LinkedIn',
            url: 'https://www.linkedin.com/in/jasreaug/',
            username: 'jasreaug',
            metrics: {
                connections: '500+',
                posts: 12,
                profileViews: '1.2k'
            }
        }
    ]
};
