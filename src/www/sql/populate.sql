TRUNCATE TABLE Users;

INSERT INTO Users (username, email, password, exp_id)
VALUES ('jordan-feigner', 'jrf76@humboldt.edu', 'pass1', 4);

INSERT INTO Users (username, email, password, exp_id)
VALUES ('james-pelligra', 'jmp192@humboldt.edu', 'pass2', 2);

INSERT INTO Users (username, email, password, exp_id)
VALUES ('brian-corbett', 'bac18@humboldt.edu', 'pass3', 3);

INSERT INTO Users (username, email, password, exp_id)
VALUES ('matthew-nicholson', 'mdn117@humboldt.edu', 'pass4', 1);


TRUNCATE TABLE Genre;

INSERT INTO Genre (genre_title)
VALUES ('Rock');

INSERT INTO Genre (genre_title)
VALUES ('Country');

INSERT INTO Genre (genre_title)
VALUES ('Hip-Hop');

INSERT INTO Genre (genre_title)
VALUES ('R&B');

INSERT INTO Genre (genre_title)
VALUES ('Classical');

INSERT INTO Genre (genre_title)
VALUES ('Jazz');

INSERT INTO Genre (genre_title)
VALUES ('Punk');

INSERT INTO Genre (genre_title)
VALUES ('Folk');


TRUNCATE TABLE User_Genres;

INSERT INTO User_Genres (user_id, genre_id)
VALUES (1, 3), (1, 4), (1, 5);

INSERT INTO User_Genres (user_id, genre_id)
VALUES (2, 1), (2, 2), (2, 3), (2, 7);

INSERT INTO User_Genres (user_id, genre_id)
VALUES (3, 4), (3, 5);

INSERT INTO User_Genres (user_id, genre_id)
VALUES (4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8);


TRUNCATE TABLE Experience;

INSERT INTO Experience (exp_title)
VALUES ('Beginner'), ('Intermediate'), ('Expert'), ('Master');


TRUNCATE TABLE Song;

INSERT INTO Song (user_id, song_title, tempo, song_key)
VALUES (1, 'Forgot About Dre', 135, 'G#M');

INSERT INTO Song (user_id, song_title, tempo, song_key)
VALUES (1, 'G.O.A.T.', 120, 'Cm');

INSERT INTO Song (user_id, song_title, tempo, song_key)
VALUES (1, 'Get to Heaven', 90, 'D#m');

INSERT INTO Song (user_id, song_title, tempo, song_key)
VALUES (2, 'Really Doe', 160, 'FM');

INSERT INTO Song (user_id, song_title, tempo, song_key)
VALUES (2, 'Stayin Alive', 180, 'Bm');

INSERT INTO Song (user_id, song_title, tempo, song_key)
VALUES (3, 'WAP', 105, 'EM');

INSERT INTO Song (user_id, song_title, tempo, song_key)
VALUES (4, 'Man in the Mirror', 90, 'CM');

INSERT INTO Song (user_id, song_title, tempo, song_key)
VALUES (4, 'Party Rock Anthem', 110, 'Gm');

INSERT INTO Song (user_id, song_title, tempo, song_key)
VALUES (4, 'Flash in the Pan', 160, 'GM');


TRUNCATE TABLE Instrument;

INSERT INTO Instrument (instr_name)
VALUES ('Piano');

INSERT INTO Instrument (instr_name)
VALUES ('Guitar');

INSERT INTO Instrument (instr_name)
VALUES ('Drums');

INSERT INTO Instrument (instr_name)
VALUES ('Synth');


TRUNCATE TABLE User_Instruments;

INSERT INTO User_Instruments (user_id, instr_id)
VALUES (1, 1), (2, 2), (2, 3), (3, 3), (4, 1), (4, 4);