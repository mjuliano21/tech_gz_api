CREATE DATABASE bancogazin;

SET search_path TO public;
DROP EXTENSION IF EXISTS "uuid-ossp";

CREATE EXTENSION "uuid-ossp" SCHEMA public;

CREATE TABLE IF NOT EXISTS niveis (
  id UUID NOT NULL UNIQUE DEFAULT public.uuid_generate_v4(),
  descricao VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS desenvolvedores (
  id UUID NOT NULL UNIQUE DEFAULT public.uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  sexo char(1),
  datanascimento date,
  idade integer,
  hobby varchar,
  nivel_id UUID,
  FOREIGN KEY(nivel_id) REFERENCES niveis(id)
);



