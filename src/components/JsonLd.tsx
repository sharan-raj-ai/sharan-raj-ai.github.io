export default function JsonLd() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://sharan.voxels.in/#person",
        "name": "Sharan Raj VK",
        "alternateName": ["Sharan Raj", "Sharan", "Sharan VK"],
        "url": "https://sharan.voxels.in",
        "image": "https://sharan.voxels.in/og-image.png",
        "jobTitle": "AI & Machine Learning Engineer",
        "description": "Emerging AI & Machine Learning Engineer based in Bangalore, India. CEO & Co-Founder of Voxels Digital Agency. Focused on building production-grade AI systems — from Voice AI agents and computer vision models to generative AI applications. Continuously learning, shipping, and contributing to the AI/ML community.",
        "email": "vksharanraj@gmail.com",
        "nationality": {
            "@type": "Country",
            "name": "India"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bangalore",
            "addressRegion": "Karnataka",
            "addressCountry": "IN"
        },
        "hasOccupation": [
            {
                "@type": "Occupation",
                "name": "AI & Machine Learning Engineer",
                "occupationLocation": {
                    "@type": "City",
                    "name": "Bangalore"
                },
                "skills": "Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, Natural Language Processing, Voice AI, Generative AI, Large Language Models, Python, TensorFlow, PyTorch"
            },
            {
                "@type": "Occupation",
                "name": "Chief Executive Officer",
                "occupationLocation": {
                    "@type": "City",
                    "name": "Bangalore"
                }
            }
        ],
        "worksFor": {
            "@type": "Organization",
            "name": "Voxels Digital Agency",
            "url": "https://voxels.in",
            "description": "Premium digital and AI solutions company in Bangalore, India",
            "founder": {
                "@type": "Person",
                "name": "Sharan Raj VK"
            }
        },
        "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "B.E. in Artificial Intelligence & Machine Learning"
        },
        "sameAs": [
            "https://www.linkedin.com/in/sharan-raj-vk",
            "https://github.com/sharan-raj-ai"
        ],
        "knowsAbout": [
            "Artificial Intelligence",
            "Machine Learning",
            "Deep Learning",
            "Computer Vision",
            "Natural Language Processing",
            "Generative AI",
            "Voice AI",
            "Large Language Models",
            "LLM Applications",
            "AI Agents",
            "Retrieval Augmented Generation",
            "Software Engineering",
            "Python",
            "TensorFlow",
            "PyTorch",
            "LiveKit WebRTC",
            "FastAPI",
            "Next.js",
            "MLOps",
            "AI System Design",
            "Production ML Systems",
            "Business Strategy",
            "Digital Marketing",
            "AI Engine Optimization"
        ],
        "memberOf": {
            "@type": "Organization",
            "name": "Bangalore AI/ML Community"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Sharan Raj VK — AI & ML Engineer Portfolio",
        "url": "https://sharan.voxels.in",
        "description": "Portfolio of Sharan Raj VK — an emerging AI & Machine Learning engineer in Bangalore, India. Real-world projects in Voice AI, Computer Vision, Generative AI, and production ML systems.",
        "author": {
            "@type": "Person",
            "@id": "https://sharan.voxels.in/#person"
        }
    };

    const profilePageSchema = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
            "@type": "Person",
            "@id": "https://sharan.voxels.in/#person"
        },
        "name": "Sharan Raj VK | AI & ML Engineer Portfolio",
        "url": "https://sharan.voxels.in",
        "description": "Professional portfolio of Sharan Raj VK — an emerging AI & ML engineer based in Bangalore, India, building production-grade intelligent systems"
    };

    const projectsSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "AI & ML Projects by Sharan Raj VK",
        "description": "Real-world AI and ML projects built by Sharan Raj VK — spanning Voice AI, Computer Vision, Generative AI, and Multi-Modal AI. Each project solves a real problem with production-grade engineering.",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "item": {
                    "@type": "SoftwareApplication",
                    "name": "Real-Time Voice AI Agent",
                    "description": "Production-grade voice AI agent with LiveKit WebRTC, Sarvam STT/TTS, Groq LLM, and Langfuse observability",
                    "applicationCategory": "Conversational AI",
                    "author": { "@type": "Person", "name": "Sharan Raj VK" },
                    "url": "https://github.com/sharan-raj-ai/VoiceAgent-AI"
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                    "@type": "SoftwareApplication",
                    "name": "VideoSearch AI",
                    "description": "Multi-modal Video RAG system with Llama 4 Vision, Whisper transcription, and semantic search",
                    "applicationCategory": "Multi-Modal AI",
                    "author": { "@type": "Person", "name": "Sharan Raj VK" },
                    "url": "https://github.com/sharan-raj-ai/VideoSearch-AI"
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                    "@type": "SoftwareApplication",
                    "name": "Personalised Image Generation",
                    "description": "StyleGAN-based facial attribute manipulation using pSp framework",
                    "applicationCategory": "Generative AI",
                    "author": { "@type": "Person", "name": "Sharan Raj VK" },
                    "url": "https://github.com/sharan-raj-ai/Personalised-Image-Generation"
                }
            },
            {
                "@type": "ListItem",
                "position": 4,
                "item": {
                    "@type": "SoftwareApplication",
                    "name": "Dog Vision — Multi-Class Image Classifier",
                    "description": "MobileNetV2-based image classifier for 120 dog breeds using transfer learning",
                    "applicationCategory": "Computer Vision",
                    "author": { "@type": "Person", "name": "Sharan Raj VK" },
                    "url": "https://github.com/sharan-raj-ai/Dog-Vision"
                }
            },
            {
                "@type": "ListItem",
                "position": 5,
                "item": {
                    "@type": "SoftwareApplication",
                    "name": "Stock Price Prediction",
                    "description": "Ensemble ML prediction model with real-time sentiment analysis of financial news",
                    "applicationCategory": "Machine Learning & Finance",
                    "author": { "@type": "Person", "name": "Sharan Raj VK" },
                    "url": "https://github.com/sharan-raj-ai/Stock-Price-Prediction"
                }
            },
            {
                "@type": "ListItem",
                "position": 6,
                "item": {
                    "@type": "SoftwareApplication",
                    "name": "Heart Disease Classifier",
                    "description": "Healthcare diagnostic ML pipeline using clinical parameters for heart disease prediction",
                    "applicationCategory": "Healthcare AI",
                    "author": { "@type": "Person", "name": "Sharan Raj VK" },
                    "url": "https://github.com/sharan-raj-ai/Heart-Disease-Classifier-"
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
            />
        </>
    );
}
