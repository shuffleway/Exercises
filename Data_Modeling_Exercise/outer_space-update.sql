-- Drop and recreate database
DROP DATABASE IF EXISTS outer_space;
CREATE DATABASE outer_space;
\c outer_space;

-- Create galaxies table
CREATE TABLE galaxies
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Create celestial objects table
CREATE TABLE celestial_objects
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,  -- e.g., Star, Black Hole, Planet
  galaxy_id INTEGER REFERENCES galaxies(id) ON DELETE CASCADE
);

-- Create planets table
CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  orbits_around_id INTEGER REFERENCES celestial_objects(id) ON DELETE CASCADE,
  galaxy_id INTEGER REFERENCES galaxies(id) ON DELETE CASCADE
);

-- Create moons table
CREATE TABLE moons
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  planet_id INTEGER REFERENCES planets(id) ON DELETE CASCADE
);

INSERT INTO galaxies (name)
VALUES 
  ('Milky Way'),
  ('Andromeda'),
  ('Triangulum'),
  ('IC 1101');

INSERT INTO celestial_objects (name, type, galaxy_id)
VALUES
  ('The Sun', 'Star', 1),
  ('Proxima Centauri', 'Star', 1),
  ('Gliese 876', 'Star', 1),
  ('Sagittarius A*', 'Black Hole', 1);  -- A black hole in the Milky Way

INSERT INTO planets (name, orbital_period_in_years, orbits_around_id, galaxy_id)
VALUES 
  ('Earth', 1.00, 1, 1),
  ('Mars', 1.88, 1, 1),
  ('Venus', 0.62, 1, 1),
  ('Neptune', 164.8, 1, 1),
  ('Proxima Centauri b', 0.03, 2, 1),
  ('Gliese 876 b', 0.23, 3, 1);

INSERT INTO moons (name, planet_id)
VALUES 
  ('The Moon', 1),
  ('Phobos', 2),
  ('Deimos', 2),
  ('Naiad', 4),
  ('Thalassa', 4),
  ('Despina', 4),
  ('Galatea', 4),
  ('Larissa', 4),
  ('Proteus', 4),
  ('Triton', 4),
  ('Nereid', 4),
  ('Halimede', 4),
  ('Sao', 4),
  ('Laomedeia', 4),
  ('Psamathe', 4),
  ('Neso', 4);


-- Benefits of the Updated Schema:
-- Better Data Normalization: Moons, celestial objects, and galaxies are separated into their own tables, which avoids redundancy and makes the schema more flexible.
-- Referential Integrity: Foreign key relationships ensure that data is correctly linked, and cascading deletes help maintain data integrity.
-- Easier Queries and Updates: With normalized tables, querying specific moons, planets, or celestial objects becomes easier and more efficie