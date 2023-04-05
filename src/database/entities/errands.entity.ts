import {
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({
  name: "errands",
})
export class ErrandsEntity {
  @PrimaryColumn()
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
    name: "dthr_atualizacao",
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
