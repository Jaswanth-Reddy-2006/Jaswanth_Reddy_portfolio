export const scenes = [
    {
        headline: "I am Jaswanth Reddy.",
        subtext: "A Full-Stack Developer & System Architect.",
        insights: [
            "Passionate about clean code.",
            "Focused on system architecture.",
            "Building the future of web tech."
        ]
    },
    {
        headline: "The Builder Phase.",
        subtext: "Crafting scalable systems from the ground up.",
        insights: [
            "React & Next.js mastery.",
            "Node.js & Go backends.",
            "Full-stack engineering excellence."
        ]
    },
    {
        headline: "Real World Experience.",
        subtext: "Delivering value through internships and industry projects.",
        insights: [
            "Internship at top tech labs.",
            "Building production-ready apps.",
            "Collaborative agile development."
        ]
    },
    {
        headline: "The Tech Arena.",
        subtext: "My technical arsenal for solving complex problems.",
        insights: [
            "Distributed Systems.",
            "Cloud Infrastructure.",
            "Performance Engineering."
        ]
    }
];

export const pathPoints = [
    { position: [0, 0, 0], rotation: 0 },
    { position: [15, 0, 0], rotation: 0 },
    { position: [30, 0, 0], rotation: 0 },
    { position: [45, 0, 0], rotation: 0 }
];

export const SLIDE_X = [0, 30, 60, 90];
export const SHIP_Y = 0;
export const themes = ["#00ffcc", "#3b82f6", "#ffffff", "#f97316"];
export const CAM_Z = 12;
export const TRAVEL_DURATION = 3.0; // Slower for walking

// Path points for the Map journey in FullPortfolio
export const MAP_NODES = [
    { id: 'chapter-1', title: 'Origin Phase', pos: [0, 0, 0], rot: Math.PI / 2, mapX: 10, mapY: 15 },
    { id: 'chapter-2', title: 'Builder Phase', pos: [20, 1, -15], rot: Math.PI / 4, mapX: 40, mapY: 25 },
    { id: 'chapter-experience', title: 'Real World', pos: [45, -1, -5], rot: Math.PI / 1.5, mapX: 70, mapY: 35 },
    { id: 'chapter-3', title: 'Skills & Intel', pos: [70, 0, 10], rot: Math.PI / 2, mapX: 90, mapY: 50 },
    { id: 'chapter-4', title: 'Education', pos: [90, 2, -20], rot: Math.PI / 6, mapX: 60, mapY: 65 },
    { id: 'chapter-6', title: 'Certifications', pos: [115, -2, 5], rot: Math.PI / 1.2, mapX: 30, mapY: 75 },
    { id: 'chapter-5', title: 'The Vision', pos: [135, 1, -10], rot: Math.PI / 3, mapX: 15, mapY: 90 },
    { id: 'socials', title: 'Uplink Center', pos: [160, 0, 0], rot: Math.PI / 2, mapX: 90, mapY: 90 }
];


export const mindsets = [
    {
        id: "solver",
        title: "Problem Solver",
        description: "Turning complex constraints into elegant, creative solutions.",
        insights: [
            "Deconstructing complex technical challenges into manageable architectural modules.",
            "Applying rigorous logic to ensure system stability and performance efficiency.",
            "Crafting innovative solutions that balance technical depth with user experience."
        ],
        icon: "Zap",
        color: "#22d3ee"
    },
    {
        id: "builder",
        title: "Builder",
        description: "Crafting scalable systems and robust architectures from scratch.",
        insights: [
            "Architecting high-concurrency systems using modern distributed patterns.",
            "Ensuring long-term scalability through modular and maintainable codebases.",
            "Establishing rock-solid reliability in mission-critical backend environments."
        ],
        icon: "Hammer",
        color: "#a855f7"
    },
    {
        id: "learner",
        title: "Fast Learner",
        description: "Rapidly mastering new technologies and paradigms.",
        insights: [
            "Adapting to evolving tech stacks with a focus on core engineering principles.",
            "Mastering complex modern frameworks through deep internal technical research.",
            "Consistently growing expertise to stay at the cutting edge of software development."
        ],
        icon: "Rocket",
        color: "#22d3ee"
    },
    {
        id: "thinker",
        title: "Systems Thinker",
        description: "Understanding the intricate connections within the big picture.",
        insights: [
            "Visualizing the holistic impact of individual components on the entire system.",
            "Identifying and resolving bottlenecks across multiple interconnected services.",
            "Analyzing deep architectural relationships to prevent future system regression."
        ],
        icon: "Cpu",
        color: "#a855f7"
    },
    {
        id: "innovator",
        title: "Innovator",
        description: "Pushing the boundaries of what is possible in tech.",
        insights: [
            "Envisioning future-proof technologies that solve tomorrow's digital problems.",
            "Thinking outside conventional patterns to deliver transformative user value.",
            "Pioneering novel engineering strategies to overcome traditional tech limitations."
        ],
        icon: "Lightbulb",
        color: "#22d3ee"
    }
];

export const NEON_BLUE = "#22d3ee";
export const NEON_PURPLE = "#a855f7";

export const MINDSET_EXPERIENCES = mindsets;
