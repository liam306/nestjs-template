export interface ISendMailOption<T = Record<string, unknown>> {
  to: string;
  subject: string;
  template: string;
  context: T;
}
