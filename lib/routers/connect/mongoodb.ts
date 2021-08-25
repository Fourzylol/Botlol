import { ConnectMongoo } from '../../functions/log'
import { config } from 'dotenv'
config({ path: './env' })
const mongoose = require('monk')

export class Mongoose {
    public Client = mongoose(String(process.env.MONGO_URI))
    constructor() {
        ConnectMongoo()
        this.Client.addMiddleware(require('monk-middleware-wrap-non-dollar-update'))
    }
}
