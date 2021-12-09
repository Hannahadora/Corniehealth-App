export default class LocalStore {
	private workingData!: IIndexableObject;
	private expiryDates!: IIndexableObject;
	private signature!: string;

	constructor(signature: string) {
		this.signature = signature
		const data = window.localStorage.getItem(`${signature}data`) || ''
		const dates = window.localStorage.getItem(`${signature}dates`) || ''

		let parsedData = null
		let parsedDates = null
		try {
			parsedData = JSON.parse(data)
			parsedDates = JSON.parse(dates)
		} catch (error) {

		}

		if (parsedData) this.workingData = parsedData
		else this.workingData = {} as IIndexableObject
		if (parsedDates) this.expiryDates = parsedDates
		else this.expiryDates = {} as IIndexableObject
	}

	has(key: string): boolean {
		return Boolean(this.workingData[key]) && !this.expired(key)
	}

	get(key: string): any {
		if (this.has(key)) return this.workingData[key]
	}

	put(key: string, value: any, days = 7) {
		this.setExpiry(key, days)
		this.store(key, value)
	}

	remove(key: string) {
		if (!this.has(key)) return
		delete this.expiryDates[key]
		delete this.workingData[key]
		this.commit('dates', this.expiryDates)
		this.commit('data', this.workingData)
	}
	private store(key: string, value: any) {
		this.workingData[key] = value
		this.commit('data', this.workingData)
	}

	private expired(key: string): boolean {
		const expiryDateStamp = parseInt(this.expiryDates[key])
		if (!expiryDateStamp) return false
		const expiryDate = new Date(expiryDateStamp)
		const now = new Date()
		const expired = now > expiryDate
		if (expired) {
			delete this.expiryDates[key]
			delete this.workingData[key]
			this.commit('dates', this.expiryDates)
			this.commit('data', this.workingData)
		}
		return expired
	}

	private setExpiry(key: string, days: number) {
		const now = new Date()
		const expiryDate = new Date()
		expiryDate.setDate(now.getDate() + days)
		this.expiryDates[key] = expiryDate.getTime()
		this.commit('dates', this.expiryDates)
	}

	private commit(key: string, payload: any) {
		const data = JSON.stringify(payload)
		const customKey = `${this.signature}${key}`
		try {
			window.localStorage.setItem(customKey, data)
		} catch (error) {
		}
	}
}
