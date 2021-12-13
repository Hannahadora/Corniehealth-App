import IProcedure from '@/types/IProcedure'

const mapSelectedProcedure = (selectedProcedure: IProcedure) => {
	const result = {
		...selectedProcedure,
		basedOn: {
			type: 'location',
			id: 'd25cc910-0830-40cf-a0c8-7c303f381b29',
		},
		partOf: {
			type: 'location',
			id: 'd25cc910-0830-40cf-a0c8-7c303f381b29',
		},
		performedPeriod: {
			start: new Date().toLocaleDateString(),
			end: new Date().toLocaleDateString(),
		},
	}

	return result
}

const formatReqBody = (procedure: IProcedure) => {
	const data = Object.fromEntries(
		Object.entries(procedure).filter(([_, v]) => v != null)
	)
	const reqBody = {
		...data,
		performedPeriod: {
			start: new Date(data.performedPeriod?.start).toISOString(),
			end: new Date(data.performedPeriod?.end).toISOString(),
		},
	} as IProcedure

	return reqBody
}

export default {
	mapSelectedProcedure,
	formatReqBody,
}
