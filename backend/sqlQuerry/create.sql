CREATE TABLE IF NOT EXISTS users(
    user_id serial primary key,
    username varchar(50) not null,
    email varchar(100) UNIQUE not null,
    password varchar(100) not null,
    created_at timestamp
);
CREATE TABLE IF NOT EXISTS tests(
    test_id serial primary key,
    mode varchar(40) not null,
    description varchar (100),
    text_test text not null
);
CREATE TABLE IF NOT EXISTS tests_results(
<<<<<<< HEAD
    results_id serial primary key,
    user_id int,
    mode varchar(40),
    finish_time timestamp,
    wpm real,
    char_correct int,
    char_incorrect int,
    accuracy real,
    foreign key (user_id) references users(user_id)
);
=======
    results_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    mode VARCHAR(40) not null,
    finish_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    wpm REAL not null,
    char_correct INT NOT NULL,
    char_incorrect INT NOT NULL,
    accuracy REAL not null,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
>>>>>>> c9f4a87 (asd)
