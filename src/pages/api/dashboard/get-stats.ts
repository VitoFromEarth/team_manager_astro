import DashboardRepository, { type TeamStatistics } from "./repository";

export interface TeamStatusResponse {
	teamStatistics: TeamStatistics[];
	error: string | null;
}

export const getStats = async (): Promise<TeamStatusResponse> => {
	const repository = new DashboardRepository();
	const { data: teamStatistics, error: teamStatisticsError } = await repository.getTeamEmployeeStatus();

	if (teamStatisticsError || !teamStatistics) {
		return { teamStatistics: [], error: teamStatisticsError };
	}

	return { teamStatistics, error: null };
};
