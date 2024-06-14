-- CREATE TABLE IF NOT EXISTS users(
--     user_id serial primary key,
--     username varchar(50) not null,
--     email varchar(100) UNIQUE not null,
--     password varchar(100) not null,
--     created_at timestamp
-- );
CREATE TABLE IF NOT EXISTS tests(
    test_id serial primary key,
    mode varchar(40) not null,
    symbols int not null,
    description varchar (100),
    text_test text not null
);
-- CREATE TABLE IF NOT EXISTS tests_results(
--     results_id serial primary key,
--     user_id int,
--     mode varchar(40),
--     finish_time timestamp,
--     wpm real,
--     char_correct int,
--     char_incorrect int,
--     accuracy real,
--     foreign key (user_id) references users(user_id)
-- );
-- drop TABLE tests;

-- INSERT INTO users(username, email, password)
-- VALUES
-- ('admin', 'admin', 'admin'),
-- ('user', 'user', 'user');