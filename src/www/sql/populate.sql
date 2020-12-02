TRUNCATE TABLE Users;

TRUNCATE TABLE Bandmates;

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

INSERT INTO Instrument (instr_name, display_name)
VALUES ('piano', 'Piano'), ('guitar','Guitar'), ('drum','Drum'), ('synth_clean_supersaw','Synth');


TRUNCATE TABLE User_Instruments;