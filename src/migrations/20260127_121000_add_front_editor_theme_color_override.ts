import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE "public"."enum_front_editor_featured_posts_theme_color_override" AS ENUM('default', 'beige', 'blue', 'gray', 'yellow', 'black');
  ALTER TABLE "front_editor_featured_posts" ADD COLUMN "theme_color_override" "enum_front_editor_featured_posts_theme_color_override" DEFAULT 'default';
  `)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "front_editor_featured_posts" DROP COLUMN "theme_color_override";
  DROP TYPE "public"."enum_front_editor_featured_posts_theme_color_override";
  `)
}
