import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
  name: "user",
})
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    length: 50,
  })
  nome: string;

  @Column()
  usuario: string;

  @Column({
    length: 10,
  })
  senha: string;

  @Column({
    type: "timestamp",
    name: "dthr_atualizacao",
  })
  dthrAtualizacao: Date;
}
