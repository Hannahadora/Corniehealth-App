export interface IObservationValue {
    quantity: null,
    code: null,
    string: null,
    boolean: null,
    integer: number,
    range: {
        unit: null,
        min: number,
        max: number
    },
    ratio: null,
    sampleData: null,
    time: null,
    dateTime: null,
    period: {
        start: null,
        end: null
    }
}