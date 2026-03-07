import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_student_activity_tips_status" AS ENUM('new', 'reviewing', 'converted', 'rejected');
    CREATE TYPE "public"."enum_student_activity_tips_campus" AS ENUM('all', 'lillehammer', 'hamar', 'elverum', 'rena', 'gjovik', 'digital');

    CREATE TABLE "student_activity_tips" (
      "id" serial PRIMARY KEY NOT NULL,
      "status" "enum_student_activity_tips_status" DEFAULT 'new',
      "title" varchar,
      "description" varchar,
      "proposed_start_at" timestamp(3) with time zone,
      "campus" "enum_student_activity_tips_campus" DEFAULT 'all',
      "location_name" varchar,
      "organizer" varchar,
      "tipster_name" varchar,
      "tipster_email" varchar,
      "tipster_phone" varchar,
      "linked_activity_id" integer,
      "editor_notes" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "student_activity_tips"
      ADD CONSTRAINT "student_activity_tips_linked_activity_id_student_activities_id_fk"
      FOREIGN KEY ("linked_activity_id") REFERENCES "public"."student_activities"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX "student_activity_tips_status_idx" ON "student_activity_tips" USING btree ("status");
    CREATE INDEX "student_activity_tips_campus_idx" ON "student_activity_tips" USING btree ("campus");
    CREATE INDEX "student_activity_tips_created_at_idx" ON "student_activity_tips" USING btree ("created_at");
    CREATE INDEX "student_activity_tips_linked_activity_idx" ON "student_activity_tips" USING btree ("linked_activity_id");
  `)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE "student_activity_tips";

    DROP TYPE "public"."enum_student_activity_tips_campus";
    DROP TYPE "public"."enum_student_activity_tips_status";
  `)
}