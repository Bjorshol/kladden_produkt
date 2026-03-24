import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Ny tabell for frittstående forfattere
    CREATE TABLE "authors" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "title" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE INDEX "authors_created_at_idx" ON "authors" USING btree ("created_at");

    -- Legg til authors_id-kolonne i posts_rels for polymorft forfatter-felt
    ALTER TABLE "posts_rels" ADD COLUMN "authors_id" integer;
    ALTER TABLE "posts_rels"
      ADD CONSTRAINT "posts_rels_authors_fk"
      FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "posts_rels_authors_id_idx" ON "posts_rels" USING btree ("authors_id");

    -- Legg til authors_id-kolonne i _posts_v_rels for versjonshistorikk
    ALTER TABLE "_posts_v_rels" ADD COLUMN "authors_id" integer;
    ALTER TABLE "_posts_v_rels"
      ADD CONSTRAINT "_posts_v_rels_authors_fk"
      FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "_posts_v_rels_authors_id_idx" ON "_posts_v_rels" USING btree ("authors_id");
  `)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_authors_fk";
    ALTER TABLE "_posts_v_rels" DROP COLUMN "authors_id";

    ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_authors_fk";
    ALTER TABLE "posts_rels" DROP COLUMN "authors_id";

    DROP TABLE "authors";
  `)
}
