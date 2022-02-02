import { IEventsCmd,  Messages } from "../../types";
import type Clients from "../clients/Cli";

export default class IMessages {
	public eventName: string | undefined;
	public config: IEventsCmd | undefined;
	constructor (){};
	public callback?: getCallback;
}
export const Cmd = (eventName: string, config: IEventsCmd) => {
	return(target: Function) => {
		target.prototype.eventName = eventName;
		target.prototype.config = { eventName, ...config }
	}
}
export declare type getCallback = (client: Clients, message: Messages.Messages) => void | Promise<void| any> | any;