

\c questions_answers

CREATE TABLE IF NOT EXISTS questions(
  question_id serial PRIMARY KEY,
  product_id INT NOT NULL,
  question_body TEXT,
  question_date TEXT,
  asker_name TEXT,
  email TEXT,
  question_helpfulness INT DEFAULT 0 NOT NULL,
  reported INT DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS answers(
  answer_id serial PRIMARY KEY,
  question_id INT REFERENCES questions (question_id),
  body TEXT,
  answer_date TEXT,
  answerer_name TEXT,
  answerer_email TEXT,
  question_helpfulness INT DEFAULT 0 NOT NULL,
  reported INT DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS photos(
  photo_id serial,
  answer_id INT REFERENCES answers (answer_id),
  photo_url TEXT
);

COPY questions(question_id, product_id, question_body, question_date, asker_name, email, question_helpfulness, reported)
FROM '/usr/share/app/questions.csv'
DELIMITER ','
CSV HEADER;

UPDATE questions
SET question_date = to_timestamp(questions.question_date::numeric/1000);

COPY answers(answer_id, question_id, body, answer_date, answerer_name, answerer_email, question_helpfulness, reported)
FROM '/usr/share/app/answers.csv'
DELIMITER ','
CSV HEADER;

UPDATE answers
SET answer_date = to_timestamp(answers.answer_date::numeric/1000);

COPY photos(photo_id, answer_id, photo_url)
FROM '/usr/share/app/answers_photos.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX products_index ON questions (product_id ASC);
CREATE INDEX reviews_index ON answers (question_id ASC);
CREATE INDEX photos_index ON photos (answer_id ASC);
CREATE INDEX reviewReported ON questions (reported)
  WHERE (reported = 0);
CREATE INDEX answerReported ON answers (reported)
  WHERE (reported = 0);

SELECT setval('"questions_question_id_seq"', (SELECT MAX(question_id) FROM questions));
SELECT setval('"answers_answer_id_seq"', (SELECT MAX(answer_id) FROM answers));
SELECT setval('"photos_photo_id_seq"', (SELECT MAX(photo_id) FROM photos));


-- select to_timestamp(questions.question_date::numeric/1000) from questions;