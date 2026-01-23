import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_size" AS ENUM('large', 'small');
  CREATE TYPE "public"."enum__posts_v_version_size" AS ENUM('large', 'small');
  ALTER TABLE "posts" ADD COLUMN "size" "enum_posts_size" DEFAULT 'large';
  ALTER TABLE "_posts_v" ADD COLUMN "version_size" "enum__posts_v_version_size" DEFAULT 'large';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" DROP COLUMN "size";
  ALTER TABLE "_posts_v" DROP COLUMN "version_size";
  DROP TYPE "public"."enum_posts_size";
  DROP TYPE "public"."enum__posts_v_version_size";`)
}
