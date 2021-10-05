import { Schema } from 'mongoose';

export class UserSchema extends Schema {
  constructor() {
    super(
      {
        nome: {
          type: String,
          required: true,
        },
        email: { type: String, required: true, unique: true },
        senha: { type: String, required: true },
        token: { type: String, default: null },
        ultimo_login: { type: String, default: new Date().toISOString() },
        telefones: [
          {
            _id: false,
            numero: { type: String, required: true },
            ddd: { type: String, required: true },
          },
        ],
        data_criacao: { type: String, default: new Date().toISOString() },
        data_atualizacao: { type: String, default: new Date().toISOString() },
      },
      {
        toJSON: {
          transform: (_, ret): void => {
            ret.id = ret._id;
            delete ret.__v;
            delete ret._id;
          },
        },
      }
    );
  }
}
