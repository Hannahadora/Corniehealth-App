interface IUdiCarrier {
  [x: string]: any;
}
interface IDeviceName {}
interface ISpecialization {}
interface IVersion {}
interface IProperty {}
export default interface IDevice {
  id?: string;
  udiCarrier: IUdiCarrier;
  deviceName: IDeviceName;
  specialization: ISpecialization;
  version: IVersion;
  property: IProperty;
}
