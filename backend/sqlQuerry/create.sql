CREATE TABLE IF NOT EXISTS users(
    user_id serial primary key,
    username varchar(50) UNIQUE not null,
    email VARCHAR(255) UNIQUE NOT NULL,
    password varchar(255),
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE if NOT EXISTS oauth_accounts(
    oauth_id SERIAL PRIMARY KEY,
    user_id int not null,
    provider VARCHAR(50) NOT NULL,
    provider_user_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (user_id) references users(user_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS tests(
    test_id serial primary key,
    mode varchar(40) not null,
    description varchar (100) not null,
    text_test text not null
);
CREATE TABLE IF NOT EXISTS tests_results(
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