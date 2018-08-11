const applescript = require('applescript')
const env = require('process').env
const fs = require('fs')
const path = require('path')
const jsonfile = require('jsonfile')

class Klass {
    constructor() {
        this.script = path.join(__dirname, './bin/batchRunner.applescript'),
            this.files = [],
            this.input_dir = path.join(__dirname, './input/')
    }

    init() {
        return new Promise(async (resolve, reject) => {
            this.files = fs.readdirSync(this.input_dir)
            .filter(file => !(/(^|\/)\.[^\/\.]/g).test(file))
            .map(file => {return {name: file, date: fs.statSync(this.input_dir+file).mtime.getTime()}})
            .sort((file1, file2) => file1.date - file2.date)
            console.log(this.files) 
            jsonfile.writeFileSync(`${path.join(__dirname), './bin/files.json'}`, this.files, err => err ? console.error(err) : null)
             await applescript.execFile(this.script, (err, result) => err ? console.log(err) : console.log(result))
        })
    }

}
const App = new Klass()
 App.init()

