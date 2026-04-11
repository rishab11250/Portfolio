export const getSkillStyle = (skill) => {
    const colors = {
        "HTML": { bg: "rgba(227, 79, 38, 0.15)", text: "#E34F26", border: "#E34F26" },
        "CSS": { bg: "rgba(21, 114, 182, 0.15)", text: "#1572B6", border: "#1572B6" },
        "CSS3": { bg: "rgba(21, 114, 182, 0.15)", text: "#1572B6", border: "#1572B6" },
        "JavaScript": { bg: "rgba(247, 223, 30, 0.15)", text: "#F7DF1E", border: "#F7DF1E" },
        "React": { bg: "rgba(97, 218, 251, 0.15)", text: "#61DAFB", border: "#61DAFB" },
        "Node.js": { bg: "rgba(51, 153, 51, 0.15)", text: "#339933", border: "#339933" },
        "MongoDB": { bg: "rgba(71, 162, 72, 0.15)", text: "#47A248", border: "#47A248" },
        "Firebase": { bg: "rgba(255, 202, 40, 0.15)", text: "#FFCA28", border: "#FFCA28" },
        "Tailwind CSS": { bg: "rgba(56, 189, 248, 0.15)", text: "#38BDF8", border: "#38BDF8" },
        "AI Studio": { bg: "rgba(66, 133, 244, 0.15)", text: "#4285F4", border: "#4285F4" },
        "MERN Stack": { bg: "rgba(99, 102, 241, 0.15)", text: "#6366F1", border: "#6366F1" },
        "Gemini AI": { bg: "rgba(66, 133, 244, 0.15)", text: "#4285F4", border: "#4285F4" },
        "Three.js": { bg: "var(--card-bg)", text: "var(--text-color)", border: "var(--glass-border)" },
        "Zustand": { bg: "rgba(68, 63, 53, 0.15)", text: "#443f35", border: "#443f35" },
        "GSAP": { bg: "rgba(136, 206, 2, 0.15)", text: "#88CE02", border: "#88CE02" },
        "Framer Motion": { bg: "rgba(255, 0, 255, 0.15)", text: "#ff00ff", border: "#ff00ff" },
        "JWT Auth": { bg: "rgba(0, 185, 241, 0.15)", text: "#00b9f1", border: "#00b9f1" },
        "Recharts": { bg: "rgba(34, 187, 187, 0.15)", text: "#22BBBB", border: "#22BBBB" },
        "HealthTech": { bg: "rgba(16, 185, 129, 0.15)", text: "#10B981", border: "#10B981" },
        "AI": { bg: "rgba(100, 100, 255, 0.15)", text: "#6464FF", border: "#6464FF" }
    };

    const style = colors[skill] || { bg: "var(--card-bg)", text: "var(--text-color)", border: "var(--glass-border)" };

    return {
        backgroundColor: style.bg,
        color: style.text,
        border: `1px solid ${style.border}`,
    };
};
