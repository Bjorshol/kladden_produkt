import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "front_editor" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);
CREATE TABLE "front_editor_featured_posts" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"post_id" integer,
	"size" enum_front_editor_featured_posts_size DEFAULT 'large'
);
CREATE TYPE "enum_front_editor_featured_posts_size" AS ENUM('large', 'small');
CREATE INDEX "front_editor_featured_posts_order_idx" ON "front_editor_featured_posts" USING btree ("_order");
CREATE INDEX "front_editor_featured_posts_parent_id_idx" ON "front_editor_featured_posts" USING btree ("_parent_id");
ALTER TABLE "front_editor_featured_posts" ADD CONSTRAINT "front_editor_featured_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."front_editor"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "front_editor_featured_posts" ADD CONSTRAINT "front_editor_featured_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "front_editor_featured_posts";
DROP TABLE "front_editor";
DROP TYPE "enum_front_editor_featured_posts_size";`)
}