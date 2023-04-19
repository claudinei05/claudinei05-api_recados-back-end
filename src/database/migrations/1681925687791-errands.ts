import { MigrationInterface, QueryRunner } from "typeorm";

export class errands1681925687791 implements MigrationInterface {
    name = 'errands1681925687791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "errands"."users" DROP COLUMN "dthrAtualizacao"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "errands"."users" ADD "dthrAtualizacao" TIMESTAMP NOT NULL`);
    }

}
