export default interface IValidator<T> {
  validateSchema<K>(schema: T, value: K, errorMessage: string): K;
}
