export interface Project {
    id: string;
    title: string;
    category: string;
    image: string; // URL to image
    description: string;
    tags: string[];
    link?: string;
    year: string;
    span?: string;
}
