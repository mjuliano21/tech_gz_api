CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- CreateTable
CREATE TABLE "desenvolvedores" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "email" VARCHAR,
    "sexo" CHAR(1),
    "datanascimento" DATE,
    "idade" INTEGER,
    "hobby" VARCHAR,
    "nivel_id" UUID
);

-- CreateTable
CREATE TABLE "niveis" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "descricao" VARCHAR NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "desenvolvedores_id_key" ON "desenvolvedores"("id");

-- CreateIndex
CREATE UNIQUE INDEX "desenvolvedores_email_key" ON "desenvolvedores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "niveis_id_key" ON "niveis"("id");

-- AddForeignKey
ALTER TABLE "desenvolvedores" ADD CONSTRAINT "desenvolvedores_nivel_id_fkey" FOREIGN KEY ("nivel_id") REFERENCES "niveis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
