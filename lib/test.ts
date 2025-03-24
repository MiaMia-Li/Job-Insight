export const resumeData = {
  score: 0,
  scoreCategories: [
    { name: "Content Quality", score: 85 },
    { name: "Keyword Optimization", score: 80 },
    { name: "Structure & Format", score: 75 },
  ],
  sections: [
    {
      id: "skills",
      name: "Skills",
      suggestions: [
        {
          title: "建议标题",
          description: "建议描述",
          priority: "high", // 或 "medium" 或 "low"
        },
      ],
    },
    {
      id: "experience",
      name: "Experience",
      suggestions: [
        {
          title: "建议标题",
          description: "建议描述",
          priority: "high", // 或 "medium" 或 "low"
        },
      ],
    },
    {
      id: "education",
      name: "Education",
      suggestions: [
        {
          title: "建议标题",
          description: "建议描述",
          priority: "high", // 或 "medium" 或 "low"
        },
      ],
    },
  ],
  basicInfo: {
    name: "MengYao Li",
    email: "sept.miamia@gmail.com",
    phone: "+65-80849936",
    education:
      "Master of Information Technology Science, Academy of Telecommunication Technology; Bachelor of Information Technology Science, Xidian University",
    summary: "",
  },
  workExperience: [
    {
      company: "Freelance",
      position: "Software Engineer",
      period: "May 2024 - Present",
      description:
        "Developed and deployed an enterprise backend management system using AntDesign, optimizing workflow automation and reducing processing time. Refactored a personal blog using NextJS and TailwindCSS, improving page load speed by 40% and enhancing mobile responsiveness. Built a photo enhancement tool with Vercel, NextJS, and TailwindCSS, achieving a Lighthouse performance score of 100.",
      achievements: [],
    },
    {
      company: "Kuaishou Technology",
      position: "Frontend Developer",
      period: "Sep 2020 - May 2024",
      description:
        "Led a 4-person frontend team using ReactJS and Redux to develop an enterprise integration platform, streamlining data processing pipelines and improving operational efficiency by 50%. Developed H5 games using VueJS and Lottie for company-wide celebrations, collaborating with 3 cross-functional teams to deliver within 2 weeks, earning company-wide recognition. Led a 3-person team to refactor a monolithic approval center using layered architecture, unifying APIs for web and mobile, improving maintainability and scalability. Increased user approval efficiency by 63% through integration with the company’s IM tool, developing custom approval workflows, and implementing external system integration using NodeJS. Standardized Git workflow and streamlined CI/CD pipelines using the company’s internal deployment tools, reducing deployment times by 10%. Built a real-time project monitoring and data tracking dashboard with automated alerts, decreasing critical issue resolution time by 20% and improving project quality.",
      achievements: [],
    },
    {
      company: "Meituan",
      position: "Frontend Developer",
      period: "Apr 2019 - Sep 2020",
      description:
        "Developed a self-service feature using VueJS, reducing the service cycle from 2 days to 10 minutes and generating¥6.6 million in revenue. Contributed to the redesign of the merchant-side system v3.0 using VueJS, improving order management for over 300,000 active merchants. Optimized homepage performance using lazy loading and tree shaking, reducing JavaScript by 37% and CSS by 66%, improving Time to Interactive by 200ms. Implemented automated testing using Jest and Cypress, reducing abnormality rates by 60% and increasing unit test coverage by 10%. Developed a network detection tool using JavaScript and NodeJS to identify user information, assess connectivity, and detect compromised resources, improving system reliability.",
      achievements: [],
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "Monorepo",
    "ReactJS",
    "VueJS",
    "NextJS",
    "NodeJS",
    "Redux",
    "Vuex",
    "Ant Design",
    "AntV",
    "Jest",
    "Cypress",
    "TailwindCSS",
    "Git",
    "Charles",
    "Postman",
    "LightHouse",
    "Babel",
    "NPM",
    "Yarn",
    "Figma",
  ],
};
