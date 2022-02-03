import { Messages } from ".";


export interface HistoryDB {
	data: DataHistorys[];
}
export interface DataHistorys {
	id: string;
	sender: string;
	msg:  Messages.IMessages;
	botNumber: string;
	time: number;
}