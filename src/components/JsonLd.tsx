export default function JsonLd() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Sharan Raj VK",
        "alternateName": ["Sharan Raj", "Sharan"],
        "url": "https://sharan.voxels.in",
        "image": "https://sharan.voxels.in/og-image.png",
        "jobTitle": "CEO & Co-Founder",
        "description": "Sharan Raj VK is an AI & Machine Learning Engineer and the CEO & Co-Founder of Voxels Digital Agency (voxels.in). Based in Bangalore, India, he specializes in production AI systems, voice AI, computer vision, and generative AI.",
        "email": "vksharanraj@gmail.com",
        "nationality": {
            "@type": "Country",
            "name": "India"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bangalore",
            "addressRegion": "Karnataka",
            "addressCountry": "India"
        },
        "worksFor": {
            "@type": "Organization",
            "name": "Voxels Digital Agency",
            "url": "https://voxels.in",
            "description": "Premium digital and AI solutions company in Bangalore, India"
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
            "Software Engineering",
            "Python",
            "TensorFlow",
            "PyTorch",
            "Web Development",
            "Business Strategy",
            "Digital Marketing"
        ]
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Sharan Raj VK Portfolio",
        "url": "https://sharan.voxels.in",
        "description": "Professional portfolio of Sharan Raj VK - AI & ML Engineer",
        "author": {
            "@type": "Person",
            "name": "Sharan Raj VK"
        }
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
        </>
    );
}
