import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" ADD COLUMN "stikktittel" text;
   ALTER TABLE "_posts_v" ADD COLUMN "version_stikktittel" text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" DROP COLUMN "stikktittel";
   ALTER TABLE "_posts_v" DROP COLUMN "version_stikktittel";`)
}