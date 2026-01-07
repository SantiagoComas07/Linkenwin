export declare enum Modality {
    REMOTE = "remote",
    HYBRID = "hybrid",
    ONSITE = "presencial"
}
export declare class Vacancy {
    id: string;
    title: string;
    description: string;
    technologies: string;
    seniority: string;
    softSkills: string;
    location: string;
    modality: Modality;
    salaryRange: string;
    company: string;
    maxApplicants: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
