DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist


CREATE TABLE regions
(
  region_id SERIAL PRIMARY KEY,
  region_name TEXT NOT NULL
);

CREATE TABLE users
(
  user_id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  preferred_region_id INTEGER REFERENCES regions(region_id)
);

CREATE TABLE posts
(
  post_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id INTEGER REFERENCES users(user_id),
  location TEXT NOT NULL,  -- Location details (e.g., city, neighborhood)
  region_id INTEGER REFERENCES regions(region_id),
  post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories
(
  category_id SERIAL PRIMARY KEY,
  category_name TEXT NOT NULL
);

CREATE TABLE post_categories
(
  post_category_id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(post_id),
  category_id INTEGER REFERENCES categories(category_id)
);

INSERT INTO regions (region_name)
VALUES 
('San Francisco'),
('Atlanta'),
('Seattle');

INSERT INTO users (username, email, password, preferred_region_id)
VALUES 
('john_doe', 'john@example.com', 'hashed_password_1', 1),
('jane_smith', 'jane@example.com', 'hashed_password_2', 2);

INSERT INTO categories (category_name)
VALUES 
('Housing'),
('Jobs'),
('Services'),
('For Sale');

INSERT INTO posts (title, content, user_id, location, region_id)
VALUES 
('2 Bedroom Apartment for Rent', 'Spacious 2-bedroom apartment in downtown SF', 1, 'Downtown SF', 1),
('Full-time Software Engineer', 'We are looking for a full-time software engineer', 2, 'Midtown', 2);

INSERT INTO post_categories (post_id, category_id)
VALUES 
(1, 1),  -- Post 1 is in the Housing category
(2, 2);  -- Post 2 is in the Jobs category
