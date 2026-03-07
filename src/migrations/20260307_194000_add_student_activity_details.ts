import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "student_activities" ADD COLUMN "details" varchar;
    ALTER TABLE "_student_activities_v" ADD COLUMN "version_details" varchar;
  `)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "_student_activities_v" DROP COLUMN "version_details";
    ALTER TABLE "student_activities" DROP COLUMN "details";
  `)
}