import schema from '../__dependencies__/validators/schema';

export default schema.object({
  nome: schema.string().required(),
  email: schema.email().required(),
  senha: schema.string().required(),
  telefones: schema
    .array(
      schema.object({
        numero: schema.string().required(),
        ddd: schema.string().required(),
      })
    )
    .required(),
});
