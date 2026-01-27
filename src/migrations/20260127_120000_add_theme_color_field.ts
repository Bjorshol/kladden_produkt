import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE "public"."enum_posts_theme_color" AS ENUM('default', 'beige', 'blue', 'gray', 'yellow', 'black');
  CREATE TYPE "public"."enum__posts_v_version_theme_color" AS ENUM('default', 'beige', 'blue', 'gray', 'yellow', 'black');

  ALTER TABLE "posts" ADD COLUMN "theme_color" "enum_posts_theme_color" DEFAULT 'default';
  ALTER TABLE "_posts_v" ADD COLUMN "version_theme_color" "enum__posts_v_version_theme_color" DEFAULT 'default';
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "posts" DROP COLUMN "theme_color";
  ALTER TABLE "_posts_v" DROP COLUMN "version_theme_color";

  DROP TYPE "public"."enum_posts_theme_color";
  DROP TYPE "public"."enum__posts_v_version_theme_color";
  `)
}
