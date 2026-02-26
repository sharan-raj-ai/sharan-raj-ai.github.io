export default function JsonLd() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Sharan Raj VK",
        "url": "https://sharan.voxels.in",
        "image": "https://sharan.voxels.in/og-image.png",
        "jobTitle": "AI & ML Engineer",
        "description": "AI, Machine Learning, and Software Engineer based in Bangalore, India. Specializing in artificial intelligence, machine learning solutions, and innovative software development.",
        "email": "vksharanraj@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bangalore",
            "addressCountry": "India"
        },
        "sameAs": [
            "https://www.linkedin.com/in/sharan-raj-vk",
            "https://github.com/sharan-raj-ai"
        ],
        "knowsAbout": [
            "Artificial Intelligence",
            "Machine Learning",
            "Software Engineering",
            "Python",
            "Deep Learning",
            "Web Development"
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
