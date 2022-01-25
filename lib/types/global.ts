import { IEventsHandler } from "./command";

declare global {
	var Events: any;
	var ev:  import("../connections/Events/command").EventsCommand;
	var HistoryMsg: boolean;
	var UserAgent: string;
	var Publik: boolean;
}