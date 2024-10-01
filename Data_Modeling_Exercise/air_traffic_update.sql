-- Drop and recreate database
DROP DATABASE IF EXISTS air_traffic;
CREATE DATABASE air_traffic;
\c air_traffic;

-- Create passengers table
CREATE TABLE passengers
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

-- Create airlines table
CREATE TABLE airlines
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Create countries table
CREATE TABLE countries
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Create cities table
CREATE TABLE cities
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country_id INTEGER REFERENCES countries(id) ON DELETE CASCADE
);

-- Create flights table
CREATE TABLE flights
(
  id SERIAL PRIMARY KEY,
  departure_time TIMESTAMP NOT NULL,
  arrival_time TIMESTAMP NOT NULL,
  airline_id INTEGER REFERENCES airlines(id) ON DELETE CASCADE,
  from_city_id INTEGER REFERENCES cities(id) ON DELETE CASCADE,
  to_city_id INTEGER REFERENCES cities(id) ON DELETE CASCADE
);

-- Create tickets table
CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
  passenger_id INTEGER REFERENCES passengers(id) ON DELETE CASCADE,
  flight_id INTEGER REFERENCES flights(id) ON DELETE CASCADE,
  seat TEXT NOT NULL
);


INSERT INTO countries (name)
VALUES
  ('United States'),
  ('Japan'),
  ('United Kingdom'),
  ('Mexico'),
  ('France'),
  ('Morocco'),
  ('UAE'),
  ('China'),
  ('Brazil'),
  ('Chile');

INSERT INTO cities (name, country_id)
VALUES
  ('Washington DC', 1),
  ('Seattle', 1),
  ('Tokyo', 2),
  ('London', 3),
  ('Los Angeles', 1),
  ('Las Vegas', 1),
  ('Mexico City', 4),
  ('Paris', 5),
  ('Casablanca', 6),
  ('Dubai', 7),
  ('Beijing', 8),
  ('New York', 1),
  ('Charlotte', 1),
  ('Cedar Rapids', 1),
  ('Chicago', 1),
  ('New Orleans', 1),
  ('Sao Paolo', 9),
  ('Santiago', 10);

INSERT INTO airlines (name)
VALUES
  ('United'),
  ('British Airways'),
  ('Delta'),
  ('TUI Fly Belgium'),
  ('Air China'),
  ('American Airlines'),
  ('Avianca Brasil');

INSERT INTO passengers (first_name, last_name)
VALUES
  ('Jennifer', 'Finch'),
  ('Thadeus', 'Gathercoal'),
  ('Sonja', 'Pauley'),
  ('Waneta', 'Skeleton'),
  ('Berkie', 'Wycliff'),
  ('Alvin', 'Leathes'),
  ('Cory', 'Squibbes');

INSERT INTO flights (departure_time, arrival_time, airline_id, from_city_id, to_city_id)
VALUES
  ('2018-04-08 09:00:00', '2018-04-08 12:00:00', 1, 1, 2),
  ('2018-12-19 12:45:00', '2018-12-19 16:15:00', 2, 3, 4),
  ('2018-01-02 07:00:00', '2018-01-02 08:03:00', 3, 5, 6),
  ('2018-04-15 16:50:00', '2018-04-15 21:00:00', 3, 2, 7),
  ('2018-08-01 18:30:00', '2018-08-01 21:50:00', 4, 8, 9),
  ('2018-10-31 01:15:00', '2018-10-31 12:55:00', 5, 10, 11),
  ('2019-02-06 06:00:00', '2019-02-06 07:47:00', 1, 12, 13),
  ('2018-12-22 14:42:00', '2018-12-22 15:56:00', 6, 14, 15),
  ('2019-02-06 16:28:00', '2019-02-06 19:18:00', 6, 13, 16),
  ('2019-01-20 19:30:00', '2019-01-20 22:45:00', 7, 17, 18);

INSERT INTO tickets (passenger_id, flight_id, seat)
VALUES
  (1, 1, '33B'),
  (2, 2, '8A'),
  (3, 3, '12F'),
  (1, 4, '20A'),
  (4, 5, '23D'),
  (2, 6, '18C'),
  (5, 7, '9E'),
  (6, 8, '1A'),
  (5, 9, '32B'),
  (7, 10, '10D');


-- Benefits of the Updated Schema:
-- Data Normalization: Reduces redundancy by normalizing passengers, airlines, cities, and countries into their own tables.
-- Referential Integrity: Ensures that relationships between passengers, flights, cities, and airlines are maintained and consistent through foreign keys.
-- Query Efficiency: Simplifies queries, such as finding all passengers who have flown on a specific airline or between two cities, since the data is organized into structured, related tables.
-- Flexibility: Allows for future expansion, such as adding more attributes to passengers, cities, or airlines, without impacting other parts of the schema.