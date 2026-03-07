import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "student_activities" ADD COLUMN "hero_image_id" integer;
    ALTER TABLE "student_activities" ADD COLUMN "content" jsonb;
    ALTER TABLE "_student_activities_v" ADD COLUMN "version_hero_image_id" integer;
    ALTER TABLE "_student_activities_v" ADD COLUMN "version_content" jsonb;

    ALTER TABLE "student_activities"
      ADD CONSTRAINT "student_activities_hero_image_id_media_id_fk"
      FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    ALTER TABLE "_student_activities_v"
      ADD CONSTRAINT "_student_activities_v_version_hero_image_id_media_id_fk"
      FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX "student_activities_hero_image_idx" ON "student_activities" USING btree ("hero_image_id");
    CREATE INDEX "_student_activities_v_version_hero_image_idx" ON "_student_activities_v" USING btree ("version_hero_image_id");
  `)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "_student_activities_v" DROP CONSTRAINT "_student_activities_v_version_hero_image_id_media_id_fk";
    ALTER TABLE "student_activities" DROP CONSTRAINT "student_activities_hero_image_id_media_id_fk";

    DROP INDEX "_student_activities_v_version_hero_image_idx";
    DROP INDEX "student_activities_hero_image_idx";

    ALTER TABLE "_student_activities_v" DROP COLUMN "version_content";
    ALTER TABLE "_student_activities_v" DROP COLUMN "version_hero_image_id";
    ALTER TABLE "student_activities" DROP COLUMN "content";
    ALTER TABLE "student_activities" DROP COLUMN "hero_image_id";
  `)
}