import { Muted } from ".";


export class Note extends Muted {
	private _dataNotes = this.Client.db().collection('notesgc')
	constructor() {
        super()
    }
	public async AddNotes (from: string, id: string, notes: string, penambah: string) {
		if (await this.checkNotes(from)) {
			if (await this.checkIdNotes(from, id)) return
			let result: { from: string, data: { id: string, notes: string, adder: string }}[] = []
			const Format: { from: string, data: { id: string, notes: string, adder: string }} = {
				from: from,
				data: {
					id: id,
					notes: notes,
					adder: penambah
				}
			}
			result.push(Format)
			return void await this._dataNotes.insertOne(result)
		} else {
		}
	}
	public async checkIdNotes (from: string, id: string) {
		if (!await this.checkNotes(from)) return false;
		let status: boolean = false;
		if (await this._dataNotes.findOne({ id: id })) {
			status = true
		}
		return status
	}
	public async checkNotes (from: string): Promise <boolean> {
		let status: boolean = false;
		if (await this._dataNotes.findOne({ from: from })) {
			status = true
		}
		return status
	}
}