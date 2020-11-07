TRUNCATE TABLE Users;

INSERT INTO Users (username, email)
VALUES ('jordan-feigner', 'jrf76@humboldt.edu');

INSERT INTO Users (username, email)
VALUES ('james-pelligra', 'jmp192@humboldt.edu');

INSERT INTO Users (username, email)
VALUES ('brian-corbett', 'bac18@humboldt.edu');

INSERT INTO Users (username, email)
VALUES ('matthew-nicholson', 'mdn117@humboldt.edu');


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