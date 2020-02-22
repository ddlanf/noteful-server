TRUNCATE TABLE notes,folders RESTART IDENTITY CASCADE;
INSERT INTO folders (name)
VALUES
    ('First folder'),
    ('Second folder'),
    ('Third folder'),
    ('Fourth folder');