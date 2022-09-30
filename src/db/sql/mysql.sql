create database multi;

create table users (
    id int not null AUTO_INCREMENT,
    username varchar (100) not null,
    primary key (id)
);

insert into users (username)
values ('admin'), ('manager'), ('usesr1');

CREATE USER 'multi_user'@'%' IDENTIFIED WITH mysql_native_password BY '<pass>';

GRANT ALL PRIVILEGES ON *.* TO 'multi_user'@'%';

FLUSH PRIVILEGES;