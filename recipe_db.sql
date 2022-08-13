CREATE DATABASE recipe;

USE recipe;

CREATE TABLE user (
	id varchar(15) not null primary key,
    pw varchar(15) not null,
    name varchar(10) not null,
    tel varchar(13) default "",
    email varchar(30) not null
);