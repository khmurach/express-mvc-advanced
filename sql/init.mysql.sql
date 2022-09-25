CREATE TABLE users (
     id MEDIUMINT NOT NULL AUTO_INCREMENT,
     username VARCHAR(100) NOT NULL,
     PRIMARY KEY (id)
);

INSERT INTO users (username) VALUES
    ('Something'),('anonymouse'),('Everybody'),
    ('crazy_cat_lady'),('unfriendme'),('Babushka'),
    ('coolshirtbra'),('bigfootisreal');

SELECT * FROM users;