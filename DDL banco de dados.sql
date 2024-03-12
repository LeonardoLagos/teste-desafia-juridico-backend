CREATE TABLE "users" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "email" varchar NOT NULL,
  "password" varchar NOT NULL,
  "status" int NOT NULL
);

CREATE TABLE "status" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "descricao" varchar NOT NULL
);

CREATE TABLE "coord_clients" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "id_client" uuid NOT NULL,
  "coord_x" int NOT NULL,
  "coord_y" int NOT NULL
);

ALTER TABLE "users" ADD FOREIGN KEY ("status") REFERENCES "status" ("id");

ALTER TABLE "coord_clients" ADD FOREIGN KEY ("id_client") REFERENCES "users" ("id");
