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
    name: "Your Name",
    tagline: "Second Year CS Student | Problem Solver | Builder",
    introduction: "A curious mind exploring the intersection of code and creativity. Building solutions that matter, one line at a time.",

    projects: [
        {
            id: "1",
            title: "AlgoScope - Algorithm Visualizer",
            description: "An interactive platform for visualizing data structures and algorithms",
            techStack: ["React", "TypeScript", "TailwindCSS", "Framer Motion"],
            problem: "Students struggle to understand complex algorithms through static diagrams",
            outcome: "Created an engaging learning tool with step-by-step visualizations and practice problems",
            year: "2026",
            impactBadge: "Educational Impact",
            metrics: [
                { label: "Performance", value: "60 FPS" },
                { label: "Engagement", value: "+40%" }
            ],
            decisions: {
                why: "React's component-based architecture allowed for reusable visualization blocks. Framer Motion provided the most declarative API for complex state-driven animations.",
                tradeoffs: [
                    "Chosen Client-Side Rendering (CSR) over SSR to ensure 60fps interaction during visualizations",
                    "Used Context API instead of Redux to minimize boilerplate for simple theme/speed state"
                ],
                scalability: "Modular algorithm implementations allow for easy addition of new data structures without refactoring core logic.",
                futureImprovements: [
                    "Implement Web Workers for heavy algorithm computations to prevent main thread blocking",
                    "Add backend for user progress tracking"
                ]
            }
        },
        {
            id: "2",
            title: "Smart Campus Navigator",
            description: "Indoor navigation system for university campus",
            techStack: ["React Native", "Firebase", "Google Maps API"],
            problem: "New students get lost navigating the large campus",
            outcome: "Reduced navigation time by 60% with real-time indoor positioning",
            year: "2025",
            impactBadge: "Operational Efficiency",
            metrics: [
                { label: "Navigation", value: "-60% Time" },
                { label: "Accuracy", value: "95%" }
            ],
            decisions: {
                why: "React Native enabled cross-platform deployment with a single codebase. Firebase provided real-time database capabilities for location sharing with minimal setup.",
                tradeoffs: [
                    "Accepted larger bundle size of React Native compared to native development for faster iteration speed",
                    "Used Firebase's NoSQL structure which required careful data modeling to avoid N+1 query issues"
                ],
                scalability: "Geo-hashing is implemented to query nearby points of interest efficiently as the campus database grows.",
                futureImprovements: [
                    "Implement offline caching for maps using MMKV",
                    "Switch to a graph-based routing algorithm for more accurate indoor pathfinding"
                ]
            }
        },
        {
            id: "3",
            title: "CodeCollab - Real-time Code Editor",
            description: "Collaborative coding platform with live syntax highlighting",
            techStack: ["Node.js", "Socket.io", "Monaco Editor", "Express"],
            problem: "Remote pair programming lacks seamless collaboration tools",
            outcome: "Enabled real-time collaboration for 500+ users with low latency",
            year: "2025",
            impactBadge: "Real-time Scale",
            metrics: [
                { label: "Latency", value: "<50ms" },
                { label: "Users", value: "500+ Concurrent" }
            ],
            decisions: {
                why: "Socket.io fits perfectly for event-based real-time communication. Monaco Editor (VS Code core) offers the best developer experience.",
                tradeoffs: [
                    "Used Operational Transformation (OT) libraries which are complex but necessary for conflict resolution",
                    "Node.js single thread could be a bottleneck, necessitating clustering for production"
                ],
                scalability: "Horizontal scaling is achieved using Redis adapter for Socket.io to distribute events across multiple nodes.",
                futureImprovements: [
                    "Migrate to CRDTs (Yjs) for better decentralized conflict resolution",
                    "Implement Docker containers for isolated code execution environments"
                ]
            }
        }
    ],

    skills: [
        {
            category: "Frontend Development",
            icon: "Code2",
            skills: ["React", "TypeScript", "TailwindCSS", "Next.js", "Framer Motion"]
        },
        {
            category: "Backend Development",
            icon: "Server",
            skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs"]
        },
        {
            category: "Data Structures & Algorithms",
            icon: "Binary",
            skills: ["Dynamic Programming", "Graph Algorithms", "Trees", "Sorting", "Searching"]
        },
        {
            category: "Tools & Technologies",
            icon: "Wrench",
            skills: ["Git", "Docker", "VS Code", "Postman", "Figma"]
        }
    ],

    certifications: [
        {
            id: "1",
            title: "Full Stack Web Development",
            organization: "Coursera",
            year: "2025",
            credentialUrl: "#"
        },
        {
            id: "2",
            title: "Data Structures & Algorithms",
            organization: "LeetCode",
            year: "2025",
            credentialUrl: "#"
        },
        {
            id: "3",
            title: "Cloud Practitioner",
            organization: "AWS",
            year: "2024",
            credentialUrl: "#"
        }
    ],

    experience: [
        {
            id: "1",
            role: "Frontend Engineering Intern",
            roleTag: "Frontend",
            company: "TechStart Solutions",
            duration: "May 2025 - Aug 2025",
            description: [
                "Led the migration of a legacy dashboard to React, improving load times by 40% and enhancing user interactivity.",
                "Collaborated with UX designers to implement a new component library, ensuring design consistency across 3 products.",
                "Optimized API integration layers, reducing data fetch latency by 25% through efficient caching strategies."
            ],
            techStack: ["React", "Redux Toolkit", "Jest", "Figma"]
        },
        {
            id: "2",
            role: "Freelance Full Stack Developer",
            roleTag: "Full-stack",
            company: "Self-Employed",
            duration: "Jan 2024 - Present",
            description: [
                "Developed and deployed 5+ custom web applications for local businesses, driving a 15% increase in their online engagement.",
                "Architected scalable backend systems using Node.js and PostgreSQL to handle growing user data.",
                "Implemented secure authentication and payment gateway integrations, ensuring 100% transaction reliability."
            ],
            techStack: ["Next.js", "Node.js", "PostgreSQL", "Stripe"]
        }
    ],

    vision: "I'm becoming an engineer who doesn't just write code, but crafts experiences. My goal is to build products that solve real problems and make technology accessible to everyone. I believe in continuous learning, clean code, and the power of collaboration.",

    buildLog: [
        {
            id: "1",
            date: "Feb 2026",
            description: "Refactored portfolio architecture to include global state management and modular overlays."
        },
        {
            id: "2",
            date: "Jan 2026",
            description: "Optimized AlgoScope rendering engine, improving frame rate by 40% on low-end devices."
        },
        {
            id: "3",
            date: "Dec 2025",
            description: "Deployed Smart Campus Navigator v1.0 to university beta testers layer."
        },
        {
            id: "4",
            date: "Nov 2025",
            description: "Completed comprehensive Data Structures course, solving 150+ problems on LeetCode."
        }
    ]
};
