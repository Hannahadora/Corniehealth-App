const constructDateFromDateAndTime = (date: string, time: string) =>
	new Date(`${new Date(date).toLocaleDateString()}, ${time}`)

const compareDates = (date1: Date | string, date2: Date | string) => {
	if (new Date(date1) > new Date(date2)) return 1
	if (new Date(date1) < new Date(date2)) return 2
	return 0
}

const getPractitionersForSlot = (
	schedules: any[],
	startDate: string | Date,
	endDate: string | Date
) => {
	const schs = schedules.filter((i) => {
		console.log(
			constructDateFromDateAndTime(i.startDate, i.startTime) >=
        new Date(startDate) &&
        constructDateFromDateAndTime(i.endDate, i.endTime) <= new Date(endDate)
		)

		if (
			constructDateFromDateAndTime(i.startDate, i.startTime) >=
        new Date(startDate) &&
      constructDateFromDateAndTime(i.endDate, i.endTime) <= new Date(endDate)
		) {
			return i
		}
	})
	console.log(schs)

	const arr: any = []
	schs.forEach((j) => {
		if (j.practitioners.length > 0) {
			j.practitioners.forEach((m: any) => {
				if (arr.findIndex((n: any) => n.id === m.id) < 0) arr.push(m)
			})
		}
	})
	console.log(arr, 'ARR')
	return arr
}

export default {
	constructDateFromDateAndTime,
	compareDates,
	getPractitionersForSlot,
}
