const skillBadges = {
    "HTML": "https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white",
    "CSS": "https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white",
    "JavaScript": "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=323330",
    "TypeScript": "https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white",
    "React": "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB",
    "Node.js": "https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white",
    "Express.js": "https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white",
    "MongoDB": "https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white",
    "SQL": "https://img.shields.io/badge/SQL-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white",
    "Firebase": "https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black",
    "Tailwind CSS": "https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white",
    "Python": "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
    "C": "https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=c&logoColor=white",
    "C++": "https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=cplusplus&logoColor=white",
    "AI": "https://img.shields.io/badge/AI-6464FF?style=for-the-badge&logo=openai&logoColor=white",
};

export const getSkillBadge = (skill) => {
    return skillBadges[skill] || `https://img.shields.io/badge/${skill}-555555?style=for-the-badge&logo=code&logoColor=white`;
};
