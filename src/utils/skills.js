export const getSkillStyle = (skill) => {
    const colors = {
        "HTML": { bg: "rgba(227, 79, 38, 0.15)", text: "#E34F26", border: "#E34F26" },
        "CSS": { bg: "rgba(21, 114, 182, 0.15)", text: "#1572B6", border: "#1572B6" },
        "JavaScript": { bg: "rgba(247, 223, 30, 0.15)", text: "#F7DF1E", border: "#F7DF1E" },
        "TypeScript": { bg: "rgba(49, 120, 198, 0.15)", text: "#3178C6", border: "#3178C6" },
        "React": { bg: "rgba(97, 218, 251, 0.15)", text: "#61DAFB", border: "#61DAFB" },
        "Node.js": { bg: "rgba(51, 153, 51, 0.15)", text: "#339933", border: "#339933" },
        "Express.js": { bg: "rgba(0, 0, 0, 0.15)", text: "#444444", border: "#444444" },
        "MongoDB": { bg: "rgba(71, 162, 72, 0.15)", text: "#47A248", border: "#47A248" },
        "SQL": { bg: "rgba(225, 129, 33, 0.15)", text: "#E18121", border: "#E18121" },
        "Firebase": { bg: "rgba(255, 202, 40, 0.15)", text: "#FFCA28", border: "#FFCA28" },
        "Tailwind CSS": { bg: "rgba(56, 189, 248, 0.15)", text: "#38BDF8", border: "#38BDF8" },
        "Python": { bg: "rgba(55, 118, 171, 0.15)", text: "#3776AB", border: "#3776AB" },
        "C": { bg: "rgba(65, 105, 225, 0.15)", text: "#4169E1", border: "#4169E1" },
        "C++": { bg: "rgba(0, 73, 144, 0.15)", text: "#004999", border: "#004999" },
        "AI": { bg: "rgba(100, 100, 255, 0.15)", text: "#6464FF", border: "#6464FF" },
    };

    const style = colors[skill] || { bg: "var(--card-bg)", text: "var(--text-color)", border: "var(--glass-border)" };

    return {
        backgroundColor: style.bg,
        color: style.text,
        border: `1px solid ${style.border}`,
    };
};
