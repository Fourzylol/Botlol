import chalk from 'chalk';
import type { Log } from "../types"

const color = (text: string, color: string) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}
export function Start (owner: string | number, nama_bot: string) {
    console.clear()
    console.log(color('..............', 'red'))
    console.log(color('            ..,;:ccc,.', 'red'))
    console.log(color("          ......''';lxO.", 'red'))
    console.log(color(".....''''..........,:ld;", 'red'))
    console.log(color("           .';;;:::;,,.x,", 'red'))
    console.log(color("      ..'''.            0Xxoc:,.  ...", 'red'))
    console.log(color("  ....                ,ONkc;,;cokOdc',.", 'red'))
    console.log(color(" .                   OMo           ':ddo.", 'red'))
    console.log(color('                    dMc               :OO;', 'red'))
    console.log(color('                    0M.                 .:o.', 'red'))
    console.log(color('                    ;Wd', 'red'))
    console.log(color('                     ;XO,', 'red'))
    console.log(color('                       ,d0Odlc;,..', 'red'))
    console.log(color("                           ..',;:cdOOd::,.", 'red'))
    console.log(color("                                    .:d;.':;.", 'red'))
    console.log(color("                                       'd,  .'", 'red'))
    console.log(color('                                         ;l   ..', 'red'))
    console.log(color('                                          .o', 'red'))
    console.log(color(`    [=] Bot: ${nama_bot} [=]            `, 'cyan'), color('c', 'red'))
    console.log(color(`    [=] Number : ${owner} [=]             `, 'cyan'), color(".'", 'red'))
    console.log(color('                                              ', 'cyan'), color(".'", 'red'))
    console.log('')
    console.log('')
}
const Logger: Log = {
	error: (text: any) => {
		console.log(color(`[${new Date().toLocaleString()}]`, 'red'), color(`[ERROR]`, 'red'), color(text, 'red'))
	},
	warn: (text: any) => {
		console.log(color(`[${new Date().toLocaleString()}]`, 'yellow'), color(`[WARNING]`, 'yellow'), color(text, 'yellow'))
	},
	info: (msg: any, ...optionalParams: any[]) => {
		console.info(msg, ...optionalParams)
	},
	log: (text: any) => {
		console.log(color(`[${new Date().toLocaleString()}]`, 'green'), color(`[LOG]`, 'green'), color(text, 'green'))
	}
}

export default Logger;