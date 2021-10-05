export interface Phones {
  phoneList: Phone[];
}

export interface Phone {
  numero: string;
  ddd: string;
}

export interface IUser {
  nome: string;
  email: string;
  senha: string;
  telefones: Phones;
  id?: string;
  data_criacao?: string;
  data_atualizacao?: string;
  ultimo_login?: string;
  token?: string;
}
