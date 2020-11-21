DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    user_id         INT(6) UNSIGNED AUTO_INCREMENT,
    username        VARCHAR(20) NOT NULL,
    email           VARCHAR(40) NOT NULL,
	password		VARCHAR(255) NOT NULL,
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
	genre_id		INT(6),
	PRIMARY KEY (user_id, genre_id),
	FOREIGN KEY (user_id)
		REFERENCES Users(user_id),
	FOREIGN KEY (genre_id)
		REFERENCES Genre(genre_id)
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
    instr_name      VARCHAR(30) NOT NULL,
    PRIMARY KEY (instr_id)
);

DROP TABLE IF EXISTS User_Instruments;
CREATE TABLE User_Instruments (
	user_id			INT(6),
	instr_id		INT(6),
	PRIMARY KEY (user_id, instr_id),
	FOREIGN KEY (user_id)
		REFERENCES Users(user_id),
	FOREIGN KEY (instr_id)
		REFERENCES Instrument(instr_id)
);

DROP TABLE IF EXISTS Songs;
CREATE TABLE Songs (
    song_id         INT(8) UNSIGNED AUTO_INCREMENT,
    user_id         INT(6),
    song_title      VARCHAR(20) NOT NULL,
    tempo           SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (user_id, song_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

DROP TABLE IF EXISTS Song_Tracks;
CREATE TABLE Song_Tracks (
    track_id        INT(16) UNSIGNED AUTO_INCREMENT,
    song_id         INT(8),
    instr_id        INT(6),
    track_data      TEXT,
    PRIMARY KEY (track_id, song_id),
    FOREIGN KEY (song_id) REFERENCES Songs(song_id),
    FOREIGN KEY (instr_id) REFERENCES Instrument(instr_id)
);