export class Curriculo {
  constructor(
    public id: string,
    public cpf: string,
    public nome: string,
    public descricao: string,
    public referencias: string,
    public area: string
  ) {}

  toMap(): {[key:string]:any } {
    return {
      id: this.id,
      cpf: this.cpf,
      nome: this.nome,
      descricao: this.descricao,
      referencias: this.referencias,
      area: this.area
    };
  }

  static fromMap(map: any): Curriculo {
    return new Curriculo(
      map.id,
      map.cpf,
      map.nome,
      map.descricao,
      map.referencias,
      map.area
    );
  }
}
