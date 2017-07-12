DROP DATABASE IF EXISTS karianu;
CREATE DATABASE karianu;

\c karianu;

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  category VARCHAR,
  img VARCHAR DEFAULT NULL
);

INSERT INTO ingredients (name, description, category)
  VALUES ('Salt', 'A natural mineral that is added to food to make it taste better or to preserve it', 'Spice');

  --set up recipe tables here
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  category VARCHAR,
  img VARCHAR DEFAULT NULL
);

CREATE TABLE recipe_ingredients (
  ingredient_id integer REFERENCES ingredients(id),
  recipe_id integer REFERENCES recipes(id),
  PRIMARY KEY ( ingredient_id, recipe_id )
);