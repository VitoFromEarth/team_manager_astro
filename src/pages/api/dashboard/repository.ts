import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@infrastructure/supabase/supabase.ts";
import { getCurrentUser } from "@infrastructure/helpers/auth";

export interface TeamStatistics {
	team_id: number;
	hired_count: number;
	projects: number[];
	pending_or_passed_count: number;
}

export interface TeamStatusResponse {
	data: TeamStatistics[] | null;
	error: null | string;
}

class DashboardRepository {
	supabaseClient: SupabaseClient;
	constructor() {
		this.supabaseClient = supabase;
	}

	async getTeamEmployeeStatus(): Promise<TeamStatusResponse> {
		const currentUser = await getCurrentUser(this.supabaseClient);
		if (!currentUser) {
			return { data: null, error: "User not found" };
		}

		const { data, error } = await supabase.rpc("get_team_statistics", { user_id: currentUser.id });
		if (error) {
			return { data: null, error: error.message };
		}

		return { data: data as TeamStatistics[], error: null };
	}
}

export default DashboardRepository;
