import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDthratualizaçãErrands1682361692293 implements MigrationInterface {
    name = 'AddDthratualizaçãErrands1682361692293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "errands"."message" ADD "dthr_Atualizacao" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "errands"."users" ALTER COLUMN "dthr_criacao" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "errands"."users" ALTER COLUMN "dthr_criacao" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "errands"."message" DROP COLUMN "dthr_Atualizacao"`);
    }

}
