import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ErrandsEntity } from "./errands.entity";

@Entity({
  name: "users",
})
export class UserEntity extends BaseEntity {
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

  @OneToMany(() => ErrandsEntity, (errands) => errands.user)
  errands: ErrandsEntity[];

  @Column({
    type: "timestamp",
    name: "dthr_atualizacao",
  })
  dthrAtualizacao: Date;
}