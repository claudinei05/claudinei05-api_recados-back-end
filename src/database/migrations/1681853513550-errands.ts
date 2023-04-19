import { MigrationInterface, QueryRunner } from "typeorm";

export class errands1681853513550 implements MigrationInterface {
    name = 'errands1681853513550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "errands"."users" ("id" character varying NOT NULL, "nome" character varying(50) NOT NULL, "usuario" character varying NOT NULL, "senha" character varying(10) NOT NULL, "confirmPassword" character varying(10) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "errands"."message" ("id_message" character varying NOT NULL, "description" character varying(50) NOT NULL, "detailing" character varying(50) NOT NULL, "id_user" character varying NOT NULL, CONSTRAINT "PK_0bd32177fd414164100da928d77" PRIMARY KEY ("id_message"))`);
        await queryRunner.query(`ALTER TABLE "errands"."message" ADD CONSTRAINT "FK_b82506a76f1e8276b955a21bb13" FOREIGN KEY ("id_user") REFERENCES "errands"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "errands"."message" DROP CONSTRAINT "FK_b82506a76f1e8276b955a21bb13"`);
        await queryRunner.query(`DROP TABLE "errands"."message"`);
        await queryRunner.query(`DROP TABLE "errands"."users"`);
    }

}
