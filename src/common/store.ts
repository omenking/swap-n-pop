import * as electron        from 'electron'
import * as fs              from 'fs'
import * as path            from 'path'
import * as DotProp         from 'dot-prop'
import * as mkdir           from 'make-dir'
import * as writeFileAtomic from 'write-file-atomic'

const obj = () => Object.create(null)

class Store {
  private path : string
	constructor() {
		const data_path = (electron.app || electron.remote.app).getPath('userData')
		this.path       = path.resolve(data_path, 'config.json')
	}

	get(key) {
		return DotProp.get(this.data, key, undefined)
	}
	set(key, val) {
		if (typeof key !== 'string' && typeof key !== 'object')
			throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof key}`)

		const data = this.data

		if (typeof key === 'object') {
			for (const k of Object.keys(key)) {
				DotProp.set(data, k, key[k])
			}
    } else {
			DotProp.set(data, key, val)
    }

		this.data = data
	}
	has(key) {
		return DotProp.has(this.data, key)
	}
	delete(key) {
		const data = this.data
		DotProp.delete(data, key)
		this.data = data
	}
	clear() {
		this.data = obj()
	}
	get size() {
		return Object.keys(this.data).length
	}

	get data() {
		try {
			let data = fs.readFileSync(this.path,'utf8')
			return Object.assign(obj(), JSON.parse(data))
		} catch (err) {
			if (err.code === 'ENOENT') {
				mkdir.sync(path.dirname(this.path))
				return obj()
			}

			if (err.name === 'SyntaxError')
				return obj()
			throw err
		}
	}
	set data(val) {
		mkdir.sync(path.dirname(this.path))
		let data = JSON.stringify(val, null, '\t')
		writeFileAtomic.sync(this.path, data)
	}
}

export default Store
