TRUNCATE TABLE Users;

TRUNCATE TABLE Genre;

TRUNCATE TABLE Songs;

TRUNCATE TABLE Song_Tracks;

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
VALUES ('piano');

INSERT INTO Instrument (instr_name)
VALUES ('guitar');

INSERT INTO Instrument (instr_name)
VALUES ('drum');

INSERT INTO Instrument (instr_name)
VALUES ('synth_clean_supersaw');


TRUNCATE TABLE User_Instruments;

INSERT INTO User_Instruments (user_id, instr_id)
VALUES (1, 1), (2, 2), (2, 3), (3, 3), (4, 1), (4, 4);