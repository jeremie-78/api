export interface Game {
	TITLE: string;
	CONSOLE: string;
	REGION: string;
	LANGUAGE: string;
	EDITION: string;
	COMPLETE: boolean;
	CASE_TYPE: string;
	MISC: string | null;
}