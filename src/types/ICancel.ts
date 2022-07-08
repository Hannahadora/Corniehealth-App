export default interface ICancel {
  id?: string;
  message: string;
  cancellationTimeFrame : number;
  cancellationTimeFrameUnit : string;
  lateCancellationPenalty : number;
  noShowPenalty: number;
  lateCancellationPenaltyUnit: string;
  noShowPenaltyUnit: string;
}
