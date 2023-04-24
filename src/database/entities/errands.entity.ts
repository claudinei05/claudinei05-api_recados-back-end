import {
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: "message" })
export class ErrandsEntity {
  @PrimaryColumn({
    name: "id_message",
  })
  id: string;

  @Column({
    length: 50,
  })
  description: string;

  @Column({
    length: 50,
  })
  detailing: string;

  @Column({
    name: "id_user",
  })
  idUser: string;

  @Column({
    type: "timestamp",
    name: "dthr_Criacao",
  })
  dthrCriacao: Date;

  @UpdateDateColumn({
    name: "dthr_Atualizacao",
  })
  dthrAtualizacao: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "id_user",
  })
  user: UserEntity;

  @BeforeUpdate()
  beforeUpdate() {
    this.dthrAtualizacao = new Date();
  }
}
