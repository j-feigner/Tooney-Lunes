DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    user_id         INT(6) UNSIGNED AUTO_INCREMENT,
    username        VARCHAR(20) NOT NULL,
    email           VARCHAR(40) NOT NULL,
	password		VARCHAR(40) NOT NULL,
	exp_id			VARCHAR(20),
    PRIMARY KEY (user_id),
	FOREIGN KEY (exp_id)
		REFERENCES Experience(exp_id)
);

DROP TABLE IF EXISTS Genre;
CREATE TABLE Genre (
	genre_id		INT(6) UNSIGNED AUTO_INCREMENT,
	genre_title		VARCHAR(20),
	PRIMARY KEY	(genre_id)
);

DROP TABLE IF EXISTS User_Genres;
CREATE TABLE User_Genres (
	user_id			INT(6),
	genre_id		INT(6)
);

DROP TABLE IF EXISTS Experience;
CREATE TABLE Experience (
	exp_id			INT(6) UNSIGNED AUTO_INCREMENT,
	exp_title		VARCHAR(20),
	PRIMARY KEY	(exp_id)
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

DROP TABLE IF EXISTS User_Instruments;
CREATE TABLE User_Instruments (
	user_id			INT(6),
	instr_id		INT(6)
);
