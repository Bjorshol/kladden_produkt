import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."enum_posts_theme_color" ADD VALUE IF NOT EXISTS 'red';
    ALTER TYPE "public"."enum__posts_v_version_theme_color" ADD VALUE IF NOT EXISTS 'red';
    ALTER TYPE "public"."enum_front_editor_featured_posts_theme_color_override" ADD VALUE IF NOT EXISTS 'red';
  `)
}

export async function down({ db: _db }: MigrateDownArgs): Promise<void> {
  // No-op: removing enum values in Postgres requires recreating dependent types.
}
