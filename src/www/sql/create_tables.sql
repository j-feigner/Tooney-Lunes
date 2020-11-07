DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    user_id         INT(6) UNSIGNED AUTO_INCREMENT,
    username        VARCHAR(20) NOT NULL,
    email           VARCHAR(40) NOT NULL,
    PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS Song;
CREATE TABLE Song (
    song_id         INT(6) UNSIGNED AUTO_INCREMENT,
    user_id         INT(6),
    song_title      VARCHAR(20) NOT NULL,
    tempo           SMALLINT UNSIGNED NOT NULL,
    song_key        VARCHAR(4),
    PRIMARY KEY (song_id),
    FOREIGN KEY (user_id)
        REFERENCES Users(user_id)
);

DROP TABLE IF EXISTS Instrument;
CREATE TABLE Instrument (
    instr_id        INT(6) UNSIGNED AUTO_INCREMENT,
    instr_name      VARCHAR(10) NOT NULL,
    PRIMARY KEY (instr_id)
);
