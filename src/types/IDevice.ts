interface DeviceUDICarrier {
  deviceIdentifier?: string;
  issuer?: string;
  jurisdiction?: string;
  carrierAIDC?: string;
  carrierHR?: string;
  entryType?: string;
  distinctIdentifier?: string;
  manufacturer?: string;
  manufacturerDate?: string;
  expirationDate?: string;
  lotNumber?: string;
  serialNumber?: string;
}

interface DeviceName {
  name?: string;
  nameType?: string;
  modelNumber?: string;
  partNumber?: string;
}

interface DeviceSpecialization {
  systemType?: string;
  version?: string;
}

interface DeviceVersion {
  versionType?: string;
  component?: string;
  value?: string;
}

interface DeviceProperty {
  propertyType?: string;
  valueQuantity?: string;
  valueCode?: string;
  patient?: string;
  owner?: string;
  supportContact?: string;
  location?: string;
  url?: string;
  notes?: string;
  safety?: string;
}

export default interface IDevice {
  id?: string;
  udiCarrier: DeviceUDICarrier;
  deviceName: DeviceName;
  specialization: DeviceSpecialization;
  version: DeviceVersion;
  property: DeviceProperty;
}
