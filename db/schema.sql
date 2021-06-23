DROP DATABASE IF EXISTS questions_answers;

CREATE DATABASE questions_answers;

\c questions_answers

CREATE TABLE IF NOT EXISTS questions(
  question_id serial PRIMARY KEY,
  product_id INT NOT NULL,
  question_body TEXT,
  question_date DATE,
  asker_name TEXT,
  email TEXT,
  question_helpfulness INT,
  reported INT
);

CREATE TABLE IF NOT EXISTS answers(
  id serial PRIMARY KEY,
  question_id INT REFERENCES questions (question_id),
  body TEXT,
  answer_date DATE,
  answerer_name TEXT,
  answerer_email TEXT,
  question_helpfulness INT,
  reported INT
);

CREATE TABLE IF NOT EXISTS photos(
  id serial,
  answer_id INT REFERENCES answers (id),
  photo_url TEXT
);