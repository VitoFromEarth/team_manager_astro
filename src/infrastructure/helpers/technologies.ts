import type { SupabaseClient } from "@supabase/supabase-js";

export interface Technology {
    technology_id: number;
    technology_name: string;
    specialty_name: string;
}

export interface TechnologyGroup {
    [specialty: string]: {
        technology_id: number;
        technology_name: string;
    }[];
}

export async function getTechnologies(supabase: SupabaseClient, technologyName?: string | null): Promise<Technology[]> {
    const { data, error } = await supabase.rpc('get_technologies', { specialty_filter: technologyName });
    if (error) {
        return [];
    }
    return data as Technology[];
}

export function organizeTechnologiesBySpecialty(technologies: Technology[]): TechnologyGroup {
    const result: TechnologyGroup = {};

    result["unclassified"] = [];

    for (const tech of technologies) {
        const category = tech.specialty_name || "unclassified";

        if (!result[category]) {
            result[category] = [];
        }

        result[category].push({
            technology_id: tech.technology_id,
            technology_name: tech.technology_name
        });
    }

    if (result["unclassified"].length === 0) {
        delete result["unclassified"];
    }

    return result;
}