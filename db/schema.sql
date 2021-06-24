DROP DATABASE IF EXISTS questions_answers;

CREATE DATABASE questions_answers;

\c questions_answers

CREATE TABLE IF NOT EXISTS questions(
  question_id serial PRIMARY KEY,
  product_id INT NOT NULL,
  question_body TEXT,
  question_date TEXT,
  asker_name TEXT,
  email TEXT,
  question_helpfulness INT,
  reported INT
);

CREATE TABLE IF NOT EXISTS answers(
  id serial PRIMARY KEY,
  question_id INT REFERENCES questions (question_id),
  body TEXT,
  answer_date TEXT,
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

-- COPY questions(question_id, product_id, question_body, question_date, asker_name, email, question_helpfulness, reported)
-- FROM '/Users/ag/HR/SDC/QuestionsAnswersAPI/CSVFiles/questions.csv'
-- DELIMITER ','
-- CSV HEADER;

-- UPDATE questions
-- SET question_date = to_timestamp(questions.question_date::numeric/1000)

COPY answers(id, question_id, body, answer_date, answerer_name, answerer_email, question_helpfulness, reported)
FROM '/Users/ag/HR/SDC/QuestionsAnswersAPI/CSVFiles/answers.csv'
DELIMITER ','
CSV HEADER;

UPDATE answers
SET answer_date = to_timestamp(answers.answer_date::numeric/1000);

COPY photos(id, answer_id, photo_url)
FROM '/Users/ag/HR/SDC/QuestionsAnswersAPI/CSVFiles/answers_photos.csv'
DELIMITER ','
CSV HEADER;


-- select to_timestamp(questions.question_date::numeric/1000) from questions;


