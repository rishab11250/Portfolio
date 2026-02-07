import React, { useState } from 'react';
import { motion } from 'framer-motion';

const techData = [
    { name: 'HTML', category: 'Language', img: 'https://camo.githubusercontent.com/4e39004843387226e83eaacfb24a8df02adb769152f2f7f3db1926cb04500f6d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f68746d6c352d2532334533344632362e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465' },
    { name: 'CSS', category: 'Language', img: 'https://camo.githubusercontent.com/3f1b0ba4fa782af96fd436adcddc8716248a6b5c93d78c8ad742611357bed209/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f637373332d2532333135373242362e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d63737333266c6f676f436f6c6f723d7768697465' },
    { name: 'JavaScript', category: 'Language', img: 'https://camo.githubusercontent.com/dc050359857b187d9f7a075b1a03dccb9606b32b30f3178a1ba5973ac17d1c08/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a6176617363726970742d2532333332333333302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d253233463744463145' },
    { name: 'React', category: 'Framework', img: 'https://camo.githubusercontent.com/18f8a526265952d1a4ed04eff457c936721e64e5bf4e3f35cca938efe3f30de5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742d3230323332413f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d363144414642' },
    { name: 'Node.js', category: 'Framework', img: 'https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white' },
    { name: 'MongoDB', category: 'Tools', img: 'https://camo.githubusercontent.com/4fa6254f7d7266db902652f588f31985c2c55579795b4186278c9c252fccb053/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d6f6e676f44422d3445413934423f7374796c653d666f722d7468652d6261646765266c6f676f3d6d6f6e676f6462266c6f676f436f6c6f723d7768697465' },
    { name: 'Git', category: 'Tools', img: 'https://camo.githubusercontent.com/c3a7d3cc6487c43dd1c8a38a64bcfb450cb7a5ac24ae978e16f9a64b636f0b18/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4769742d6634346432373f7374796c653d666f722d7468652d6261646765266c6f676f3d676974266c6f676f436f6c6f723d7768697465' },
    { name: 'GitHub', category: 'Tools', img: 'https://camo.githubusercontent.com/4fcd516e2fde608afc9ddd1330de295d23981c27a9b9d695f8abe51f70a1efc5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4769744875622d3130303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d7768697465' },
    { name: 'Postman', category: 'Tools', img: 'https://camo.githubusercontent.com/ecf1157c275bad36069fde9c71393c519aad837fe4991755856269d148d55d38/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f506f73746d616e2d4646364333373f7374796c653d666f722d7468652d6261646765266c6f676f3d706f73746d616e266c6f676f436f6c6f723d7768697465' },
    { name: 'Figma', category: 'Tools', img: 'https://camo.githubusercontent.com/2684b93f4cb6b49c08dbbc155bb7d7e28bf1537af18c401565f63d824bf9207a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4669676d612d4632344531452e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6669676d61266c6f676f436f6c6f723d7768697465' },
    { name: 'Netlify', category: 'Tools', img: 'https://camo.githubusercontent.com/27b67e5a8d9ba601a95ba5de924ea8ace56d4e488a98feceb8ebe69e1ac333a5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e65746c6966792d2532333030303030302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6e65746c696679266c6f676f436f6c6f723d23303043374237' },
    { name: 'C', category: 'Language', img: 'https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white' },
];

const TechStack = () => {
    const [filter, setFilter] = useState('All');

    const filteredTech = filter === 'All'
        ? techData
        : techData.filter(tech => tech.category === filter);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <section className="page-section tech-stack" id="tech-stack">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Tech Stack
            </motion.h1>

            <motion.div
                className="tech-filters"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {['All', 'Language', 'Framework', 'Tools'].map(category => (
                    <button
                        key={category}
                        className={`filter-btn ${filter === category ? 'active' : ''}`}
                        onClick={() => setFilter(category)}
                    >
                        {category}
                    </button>
                ))}
            </motion.div>

            <motion.ul
                className="tech-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                key={filter} // Re-animate when filter changes
            >
                {filteredTech.map((tech, index) => (
                    <motion.li
                        key={tech.name}
                        className="tech-item-img"
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.1,
                            rotate: 5,
                            filter: "brightness(1.2)",
                            zIndex: 10
                        }}
                    >
                        <img src={tech.img} alt={tech.name} />
                    </motion.li>
                ))}
            </motion.ul>
        </section>
    );
};

export default TechStack;
