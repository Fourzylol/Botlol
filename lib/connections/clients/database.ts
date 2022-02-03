import { config } from "dotenv";
config({ path: "./.env" });
import { MongoClient, Db, Collection, Document, WithId } from "mongodb";


export const Monggo: MongoClient = new MongoClient(String(process.env.MONGODB_URI));

let connect: boolean = false;


export default class Database {
	public DB: MongoClient = Monggo;
	public connect: Promise<unknown>;
	public database: Collection<Document> | undefined;
	public isConnected: boolean = false;
	constructor (private modelName: string) {
		this.connect = new Promise<unknown>(async (resolve, reject) => {
			if (!connect) {
				await this.DB.connect();
				connect = true;
				this.isConnected = true;
			}
			let Data: Db =  this.DB.db("myDatabase");
			this.database = Data.collection(this.modelName)
			resolve(this.database)
		})
	}
	public async search (config: any) {
		if (connect && this.database) {
			if (!(typeof config === "object") || Array.isArray(config)) throw new Error("config must be an object");
			return  await this.database.findOne({
				...config
			}) 
		} else {
			return null
		}
	}
	public async setConfig (id: string, config: any) {
		if (connect && this.database) {
			if (!(typeof config === "object") || Array.isArray(config)) throw new Error("config must be an object");
			if (await this.Test({ id})) {
				return await this.database.updateOne({ id }, { $set: { ...config } })
			} else {
				return await this.database.insertOne({ id, ...config })
			}
		}
	}
	public async Test (config: any): Promise<boolean> {
		if (connect && this.database) {
			if (!(typeof config === "object") || Array.isArray(config)) throw new Error("config must be an object");
			if ((await this.database.findOne({ ...config }) as any) === (undefined || null)) return false;
			return true
		} else {
			return false
		}
	}
	public async getAll (): Promise<Array<WithId<Document>> | null> {
		if (connect && this.database) {
			return await this.database.find().toArray();
		} else {
			return null;
		}
	}
	public async delete (id: string) {
		if (connect && this.database) {
			if (await this.Test({ id})) {
				return await this.database.deleteOne({ id })
			} else {
				return null
			}
		}
	}
}