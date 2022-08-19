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
    user_id varchar(15) not null,
    title varchar(100) not null,
    comment mediumtext,
    video_link varchar(100),
    category_kind varchar(20),
    category_food varchar(20),
    material mediumtext,
    FOREIGN KEY ( user_id ) REFERENCES user(id)
);

CREATE TABLE user_recipe_step (
	food_id int,
    FOREIGN KEY ( food_id ) REFERENCES user_recipe(id),
    stage int unsigned,
    description mediumtext,
    filename varchar(20)
);

CREATE TABLE user_recipe_picture (
	food_id int,
    FOREIGN KEY ( food_id ) REFERENCES user_recipe(id),
    filename varchar(20)
);

CREATE TABLE user_recipe_like (
	user_id varchar(15),
    FOREIGN KEY ( user_id ) REFERENCES user(id),
	food_id int,
    FOREIGN KEY ( food_id ) REFERENCES user_recipe(id)
);