export interface IObservationValue {
    quantity: string,
    code: string,
    string: string,
    boolean: string,
    integer: number,
    range: {
        unit: string,
        min: number,
        max: number
    },
    ratio: string,
    sampleData: string,
    time: string,
    dateTime: string,
    period: {
        start: string,
        end: string
    }
}