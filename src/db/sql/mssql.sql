create database multi;

create table users (
    id int not null identity primary key,
    username varchar (100) not null
);

insert into users (username)
values ('admin'), ('manager'), ('usesr1');

