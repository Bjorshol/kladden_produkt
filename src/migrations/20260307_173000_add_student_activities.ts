import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_student_activities_category" AS ENUM('social', 'academic', 'career', 'volunteer', 'sports', 'wellbeing');
    CREATE TYPE "public"."enum_student_activities_campus" AS ENUM('all', 'lillehammer', 'hamar', 'elverum', 'rena', 'gjovik', 'digital');
    CREATE TYPE "public"."enum_student_activities_status" AS ENUM('draft', 'published');
    CREATE TYPE "public"."enum__student_activities_v_version_category" AS ENUM('social', 'academic', 'career', 'volunteer', 'sports', 'wellbeing');
    CREATE TYPE "public"."enum__student_activities_v_version_campus" AS ENUM('all', 'lillehammer', 'hamar', 'elverum', 'rena', 'gjovik', 'digital');
    CREATE TYPE "public"."enum__student_activities_v_version_status" AS ENUM('draft', 'published');

    CREATE TABLE "student_activities" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "summary" varchar,
      "start_at" timestamp(3) with time zone,
      "end_at" timestamp(3) with time zone,
      "all_day" boolean DEFAULT false,
      "featured" boolean DEFAULT false,
      "requires_signup" boolean DEFAULT false,
      "category" "enum_student_activities_category",
      "campus" "enum_student_activities_campus" DEFAULT 'all',
      "location_name" varchar,
      "organizer" varchar,
      "location_details" varchar,
      "signup_url" varchar,
      "signup_label" varchar DEFAULT 'Les mer / meld deg på',
      "published_at" timestamp(3) with time zone,
      "generate_slug" boolean DEFAULT true,
      "slug" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "_status" "enum_student_activities_status" DEFAULT 'draft'
    );

    CREATE TABLE "_student_activities_v" (
      "id" serial PRIMARY KEY NOT NULL,
      "parent_id" integer,
      "version_title" varchar,
      "version_summary" varchar,
      "version_start_at" timestamp(3) with time zone,
      "version_end_at" timestamp(3) with time zone,
      "version_all_day" boolean DEFAULT false,
      "version_featured" boolean DEFAULT false,
      "version_requires_signup" boolean DEFAULT false,
      "version_category" "enum__student_activities_v_version_category",
      "version_campus" "enum__student_activities_v_version_campus" DEFAULT 'all',
      "version_location_name" varchar,
      "version_organizer" varchar,
      "version_location_details" varchar,
      "version_signup_url" varchar,
      "version_signup_label" varchar DEFAULT 'Les mer / meld deg på',
      "version_published_at" timestamp(3) with time zone,
      "version_generate_slug" boolean DEFAULT true,
      "version_slug" varchar,
      "version_updated_at" timestamp(3) with time zone,
      "version_created_at" timestamp(3) with time zone,
      "version__status" "enum__student_activities_v_version_status" DEFAULT 'draft',
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "latest" boolean,
      "autosave" boolean
    );

    ALTER TABLE "_student_activities_v"
      ADD CONSTRAINT "_student_activities_v_parent_id_student_activities_id_fk"
      FOREIGN KEY ("parent_id") REFERENCES "public"."student_activities"("id") ON DELETE set null ON UPDATE no action;

    CREATE UNIQUE INDEX "student_activities_slug_idx" ON "student_activities" USING btree ("slug");
    CREATE INDEX "student_activities_start_at_idx" ON "student_activities" USING btree ("start_at");
    CREATE INDEX "student_activities_category_idx" ON "student_activities" USING btree ("category");
    CREATE INDEX "student_activities_campus_idx" ON "student_activities" USING btree ("campus");
    CREATE INDEX "student_activities_updated_at_idx" ON "student_activities" USING btree ("updated_at");
    CREATE INDEX "student_activities_created_at_idx" ON "student_activities" USING btree ("created_at");
    CREATE INDEX "student_activities__status_idx" ON "student_activities" USING btree ("_status");

    CREATE INDEX "_student_activities_v_parent_idx" ON "_student_activities_v" USING btree ("parent_id");
    CREATE INDEX "_student_activities_v_version_start_at_idx" ON "_student_activities_v" USING btree ("version_start_at");
    CREATE INDEX "_student_activities_v_version_category_idx" ON "_student_activities_v" USING btree ("version_category");
    CREATE INDEX "_student_activities_v_version_campus_idx" ON "_student_activities_v" USING btree ("version_campus");
    CREATE INDEX "_student_activities_v_version_slug_idx" ON "_student_activities_v" USING btree ("version_slug");
    CREATE INDEX "_student_activities_v_version_updated_at_idx" ON "_student_activities_v" USING btree ("version_updated_at");
    CREATE INDEX "_student_activities_v_version_created_at_idx" ON "_student_activities_v" USING btree ("version_created_at");
    CREATE INDEX "_student_activities_v_version__status_idx" ON "_student_activities_v" USING btree ("version__status");
    CREATE INDEX "_student_activities_v_created_at_idx" ON "_student_activities_v" USING btree ("created_at");
    CREATE INDEX "_student_activities_v_updated_at_idx" ON "_student_activities_v" USING btree ("updated_at");
    CREATE INDEX "_student_activities_v_latest_idx" ON "_student_activities_v" USING btree ("latest");
    CREATE INDEX "_student_activities_v_autosave_idx" ON "_student_activities_v" USING btree ("autosave");
  `)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE "_student_activities_v";
    DROP TABLE "student_activities";

    DROP TYPE "public"."enum__student_activities_v_version_status";
    DROP TYPE "public"."enum__student_activities_v_version_campus";
    DROP TYPE "public"."enum__student_activities_v_version_category";
    DROP TYPE "public"."enum_student_activities_status";
    DROP TYPE "public"."enum_student_activities_campus";
    DROP TYPE "public"."enum_student_activities_category";
  `)
}