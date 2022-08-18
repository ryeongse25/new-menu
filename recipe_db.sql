CREATE DATABASE recipe;

USE recipe;

CREATE TABLE user (
	id varchar(15) not null primary key,
    pw varchar(15) not null,
    name varchar(10) not null,
    tel varchar(13) default "",
    email varchar(30) not null
);

CREATE TABLE user_recipe (
	id int not null primary key auto_increment,
    title varchar(100) not null,
    heart boolean not null default false,
    comment mediumtext,
    video_link varchar(100),
    category_kind varchar(20),
    category_food varchar(20),
    material mediumtext not null,
    desc_1 mediumtext,
    pic_1 varchar(50),
    desc_2 mediumtext,
    pic_2 varchar(50),
    desc_3 mediumtext,
    pic_3 varchar(50),
    desc_4 mediumtext,
    pic_4 varchar(50),
    desc_5 mediumtext,
    pic_5 varchar(50),
    desc_6 mediumtext,
    pic_6 varchar(50),
    desc_7 mediumtext,
    pic_7 varchar(50),
    desc_8 mediumtext,
    pic_8 varchar(50),
    desc_9 mediumtext,
    pic_9 varchar(50),
    desc_10 mediumtext,
    pic_10 varchar(50),
    food_pic1 varchar(50),
    food_pic2 varchar(50),
    food_pic3 varchar(50),
    food_pic4 varchar(50),
    food_pic5 varchar(50)
);

CREATE TABLE user_recipe_like (
	user_id varchar(15),
    FOREIGN KEY ( user_id ) REFERENCES user(id),
	food_id int,
    FOREIGN KEY ( food_id ) REFERENCES user_recipe(id)
);