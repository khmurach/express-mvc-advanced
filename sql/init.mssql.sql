CREATE TABLE users (
     id int NOT NULL identity,
     username NVARCHAR(100) NOT NULL,
     PRIMARY KEY (id)
);

INSERT INTO users (username) VALUES
    ('coolshirtbra'),('bigfootisreal'),('FrostedCupcake'),
    ('fatBatman'),('PaniniHead'),('turkey_sandwich');

SELECT * FROM users;