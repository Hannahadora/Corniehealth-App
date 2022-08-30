export interface FormRef {
  validate: () => Promise<{ valid: boolean }>;
}
