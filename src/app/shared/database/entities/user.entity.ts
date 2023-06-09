import {
  BaseEntity,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { ErrandsEntity } from "./errands.entity";

@Entity({
  name: "users",
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
    length: 10,
  })
  confirmPassword: string;

  @CreateDateColumn({
    name: "dthr_criacao",
  })
  dthrCriacao: Date;

  @OneToMany(() => ErrandsEntity, (errands) => errands.user)
  errands: ErrandsEntity[];
}
