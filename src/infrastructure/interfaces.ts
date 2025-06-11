export interface EnhanceAction {
	formElement: HTMLFormElement;
	formData: FormData;
	action: URL;
	cancel: () => void;
	submitter: HTMLElement | null;
}

export interface EnhanceActionCallback<T extends Record<string, unknown> | undefined> {
	result: Promise<T>;
	update: () => Promise<void>;
}

export enum HireStatus {
	PendingToInterview = 'pending_to_interview',
	PassedInterview = 'passed_interview',
	FailedInterview = 'failed_interview',
	Hired = 'hired',
	Fired = 'fired'
}

export enum ProjectStatus {
	Started = 'started',
	Finished = 'finished',
	Presale = 'presale',
	PresaleFailed = 'presale_failed'
}

export enum ProjectRole {
	PM = 'PM',
	BDM = 'BDM',
	FINANCES = 'FINANCES',
	ARCHITECT = 'ARCHITECT'
}