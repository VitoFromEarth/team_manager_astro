import {ProjectStatus} from "@infrastructure/interfaces.ts";

export function projectStatusToBadge(status: ProjectStatus): string {
	switch (status) {
		case ProjectStatus.Presale:
			return 'badge-primary';
		case ProjectStatus.Started:
		case ProjectStatus.Finished:
			return 'badge-success';
		case ProjectStatus.PresaleFailed:
			return 'badge-error';
		default:
			return 'badge-info';
	}
}
