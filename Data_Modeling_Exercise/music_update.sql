-- Drop and recreate the database
DROP DATABASE IF EXISTS music;
CREATE DATABASE music;
\c music;

-- Create 'albums' table
CREATE TABLE albums
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  release_date DATE NOT NULL
);

-- Create 'artists' table
CREATE TABLE artists
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- Create 'producers' table
CREATE TABLE producers
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- Create 'songs' table
CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  album_id INT REFERENCES albums(id)
);

-- Create linking table for many-to-many relationship between 'songs' and 'artists'
CREATE TABLE songs_artists
(
  song_id INT REFERENCES songs(id),
  artist_id INT REFERENCES artists(id),
  PRIMARY KEY (song_id, artist_id)
);

-- Create linking table for many-to-many relationship between 'songs' and 'producers'
CREATE TABLE songs_producers
(
  song_id INT REFERENCES songs(id),
  producer_id INT REFERENCES producers(id),
  PRIMARY KEY (song_id, producer_id)
);

-- Insert data into 'albums' table
INSERT INTO albums (title, release_date)
VALUES 
  ('Middle of Nowhere', '1997-04-15'),
  ('A Night at the Opera', '1975-10-31'),
  ('Daydream', '1995-11-14'),
  ('A Star Is Born', '2018-09-27'),
  ('Silver Side Up', '2001-08-21'),
  ('The Blueprint 3', '2009-10-20'),
  ('Prism', '2013-12-17'),
  ('Hands All Over', '2011-06-21'),
  ('Let Go', '2002-05-14'),
  ('The Writing\'s on the Wall', '1999-11-07');

-- Insert data into 'artists' table
INSERT INTO artists (name)
VALUES 
  ('Hanson'),
  ('Queen'),
  ('Mariah Carey'),
  ('Boyz II Men'),
  ('Lady Gaga'),
  ('Bradley Cooper'),
  ('Nickelback'),
  ('Jay Z'),
  ('Alicia Keys'),
  ('Katy Perry'),
  ('Juicy J'),
  ('Maroon 5'),
  ('Christina Aguilera'),
  ('Avril Lavigne'),
  ('Destiny\'s Child');

-- Insert data into 'producers' table
INSERT INTO producers (name)
VALUES 
  ('Dust Brothers'),
  ('Stephen Lironi'),
  ('Roy Thomas Baker'),
  ('Walter Afanasieff'),
  ('Benjamin Rice'),
  ('Rick Parashar'),
  ('Al Shux'),
  ('Max Martin'),
  ('Cirkut'),
  ('Shellback'),
  ('Benny Blanco'),
  ('The Matrix'),
  ('Darkchild');

-- Insert data into 'songs' table
INSERT INTO songs (title, duration_in_seconds, album_id)
VALUES 
  ('MMMBop', 238, 1),
  ('Bohemian Rhapsody', 355, 2),
  ('One Sweet Day', 282, 3),
  ('Shallow', 216, 4),
  ('How You Remind Me', 223, 5),
  ('New York State of Mind', 276, 6),
  ('Dark Horse', 215, 7),
  ('Moves Like Jagger', 201, 8),
  ('Complicated', 244, 9),
  ('Say My Name', 240, 10);

-- Insert data into 'songs_artists' linking table
INSERT INTO songs_artists (song_id, artist_id)
VALUES 
  (1, 1), -- MMMBop by Hanson
  (2, 2), -- Bohemian Rhapsody by Queen
  (3, 3), (3, 4), -- One Sweet Day by Mariah Carey and Boyz II Men
  (4, 5), (4, 6), -- Shallow by Lady Gaga and Bradley Cooper
  (5, 7), -- How You Remind Me by Nickelback
  (6, 8), (6, 9), -- New York State of Mind by Jay Z and Alicia Keys
  (7, 10), (7, 11), -- Dark Horse by Katy Perry and Juicy J
  (8, 12), (8, 13), -- Moves Like Jagger by Maroon 5 and Christina Aguilera
  (9, 14), -- Complicated by Avril Lavigne
  (10, 15); -- Say My Name by Destiny's Child

-- Insert data into 'songs_producers' linking table
INSERT INTO songs_producers (song_id, producer_id)
VALUES 
  (1, 1), (1, 2), -- MMMBop produced by Dust Brothers and Stephen Lironi
  (2, 3), -- Bohemian Rhapsody produced by Roy Thomas Baker
  (3, 4), -- One Sweet Day produced by Walter Afanasieff
  (4, 5), -- Shallow produced by Benjamin Rice
  (5, 6), -- How You Remind Me produced by Rick Parashar
  (6, 7), -- New York State of Mind produced by Al Shux
  (7, 8), (7, 9), -- Dark Horse produced by Max Martin and Cirkut
  (8, 10), (8, 11), -- Moves Like Jagger produced by Shellback and Benny Blanco
  (9, 12), -- Complicated produced by The Matrix
  (10, 13); -- Say My Name produced by Darkchild
