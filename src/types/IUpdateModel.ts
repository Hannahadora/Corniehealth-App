export default interface IUpdateStatus {
    currentStatus: string,
    lastUpdated: string | Date,
    updatedBy: string,
    statuses: Item[]
}

export interface Item {
    code: string,
    display: string,
}