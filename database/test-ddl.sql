drop database if exists `adventure_time_test`;
create database `adventure_time_test`;
use `adventure_time_test`;


CREATE TABLE `app_role` (
  `app_role_id` INT PRIMARY KEY NOT NULL auto_increment,
  `name` VARCHAR(50) NOT NULL
);

CREATE TABLE `app_user` (
  `app_user_id` INT PRIMARY KEY NOT NULL auto_increment,
  `username` VARCHAR(50) NULL,
  `password_hash` VARCHAR(2048) NULL,
  `disabled` TINYINT NULL
);


CREATE TABLE `app_user_role` (
  `app_user_id` INT NOT NULL,
  `app_role_id` INT NOT NULL,
  CONSTRAINT `fk_app_user_id`
    FOREIGN KEY (`app_user_id`)
    REFERENCES `app_user` (`app_user_id`),
  CONSTRAINT `fk_app_role_id`
    FOREIGN KEY (`app_role_id`)
    REFERENCES `app_role` (`app_role_id`)
);

CREATE TABLE `trip` (
  `trip_id` INT PRIMARY KEY NOT NULL auto_increment,
  `start_time` DATE NULL,
  `end_time` DATE NULL,
  `review` INT NULL,
  `total_distance` INT NULL,
  `name` VARCHAR(45) NOT NULL,
  `disabled` TINYINT NULL
);

CREATE TABLE `profile` (
  `profile_id` INT PRIMARY KEY NOT NULL auto_increment,
  `profile_photo` BLOB NULL,
  `about_me` VARCHAR(100) NULL,
  `name` VARCHAR(100) NOT NULL,
  `app_user_id` INT NOT NULL,
  UNIQUE INDEX `profile_id_UNIQUE` (`profile_id` ASC) VISIBLE,
  CONSTRAINT `fk_profile_app_user_id`
    FOREIGN KEY (`app_user_id`)
    REFERENCES `app_user` (`app_user_id`)
);
  
CREATE TABLE `profile_trip` (
  `profile_id` INT NOT NULL,
  `trip_id` INT NOT NULL,
  CONSTRAINT `fk_profile_trip_profile_id`
    FOREIGN KEY (`profile_id`)
    REFERENCES `profile` (`profile_id`),
  CONSTRAINT `fk_profile_trip_id`
    FOREIGN KEY (`trip_id`)
    REFERENCES `trip` (`trip_id`)
);


CREATE TABLE `location` (
  `location_id` INT PRIMARY KEY NOT NULL auto_increment,
  `latitude` VARCHAR(45) NOT NULL,
  `longitude` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `photo_url` TEXT NULL,
  `disabled` TINYINT NULL
);


CREATE TABLE `trip_location` (
  `trip_id` INT NOT NULL,
  `location_id` INT NOT NULL,
  `trip_location_id` INT PRIMARY KEY NOT NULL auto_increment,
  `sort_order` INT NOT NULL,
  CONSTRAINT `fk_trip_location_trip_id`
    FOREIGN KEY (`trip_id`)
    REFERENCES `trip` (`trip_id`),
  CONSTRAINT `fk_trip_location_location_id`
    FOREIGN KEY (`location_id`)
    REFERENCES `location` (`location_id`)
);

CREATE TABLE `comment` (
  `comment_id` INT PRIMARY KEY NOT NULL auto_increment,
  `trip_id` INT NOT NULL,
  `comment_body` TEXT NOT NULL,
  `profile_id` INT NOT NULL,
  CONSTRAINT `fk_comment_trip_id`
    FOREIGN KEY (`trip_id`)
    REFERENCES `trip` (`trip_id`),
  CONSTRAINT `fk_comment_profile_id`
	FOREIGN KEY (`profile_id`)
    REFERENCES `profile` (`profile_id`)
);

CREATE TABLE `item` (
  `item_id` INT PRIMARY KEY NOT NULL auto_increment,
  `name` VARCHAR(45) NOT NULL,
  `trip_id` INT NOT NULL,
  `profile_id` INT NULL,
  `description` TEXT NULL,
  `quantity` INT NOT NULL,
  `is_packed` TINYINT NOT NULL,
  CONSTRAINT `fk_item_trip_id`
    FOREIGN KEY (`trip_id`)
    REFERENCES `trip` (`trip_id`),
  CONSTRAINT `fk_item_profile_id`
	FOREIGN KEY (`profile_id`)
    REFERENCES `profile` (`profile_id`)
);

CREATE TABLE `photo` (
	`photo_id` INT PRIMARY KEY NOT NULL auto_increment,
    `photo` BLOB NOT NULL,
    `trip_location_id` INT NOT NULL,
    `caption` VARCHAR(45) NULL,
    CONSTRAINT `fk_photo_trip_location_id`
		FOREIGN KEY (`trip_location_id`)
        REFERENCES `trip_location` (`trip_location_id`)
);

delimiter //
create procedure set_known_good_state()
begin
	delete from `photo`;
    alter table `photo` auto_increment = 1;
    delete from `trip_location`;
    alter table `trip_location` auto_increment = 1;
    delete from `profile_trip`;
    alter table `profile_trip`;
    delete from `app_user_role`;
    alter table `app_user_role`;
    delete from `comment`;
    alter table `comment` auto_increment = 1;
    delete from `item`;
    alter table `item` auto_increment = 1;
    delete from `profile`;
    alter table `profile` auto_increment = 1;
    delete from `app_user`;
    alter table `app_user` auto_increment = 1;
    delete from `app_role`;
    alter table `app_role` auto_increment = 1;
    delete from `trip`;
    alter table `trip` auto_increment = 1;
    delete from `location`;
    alter table `location` auto_increment = 1;
    
    insert into location (latitude, longitude, `name`, `type`, photo_url, disabled) values
		("41.081444","-81.519005", "Akron,OH","City","https://uploads-ssl.webflow.com/58e984c0a0e2f91e7c795e7a/60cb3c0ce6b1c3d8df753e9a_akron-oh-real-estate.jpg",0),
        ("41.499321","-81.694359",null,null,null,0),
        ("39.961178","-82.998795","Columbus,OH","City",null,0),
        ("41.447019","-81.713324","Cleveland Metroparks Zoo","Zoo","https://www.clevelandmetroparks.com/getmedia/4755d368-c69b-436e-85a3-65fddb2e35c5/KCL_5322.jpg.ashx?width=1440&height=864&ext=.jpg&w=1440&h=863",0);
        
	insert into trip (start_time, end_time, review, total_distance, `name`, disabled) values
		("2022-01-20","2022-01-22",3,165,"Major Ohio Cities",0),
        ("2021-11-11","2021-11-12",4,81,"Zoo to Akron",0);
        
	insert into trip_location (trip_id, location_id, sort_order) values
		(1,2,1),
		(1,1,2),
		(1,3,3),
        (2,2,1),
        (2,4,2),
        (2,1,3),
        (2,2,4);
        
	insert into app_role (`name`) values
		("USER"),
        ("ADMIN");
        
	insert into app_user (username, password_hash, disabled) values
		('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
		('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0);

	insert into app_user_role
		values
		(1, 2),
		(2, 1);
        
	insert into photo (photo, trip_location_id, caption) values
		("photo of cleveland",1, "This is a photo of cleveland"),
        ("photo of elephant",5,"This is a photo of an elephant");
        
	insert into `profile` (profile_photo, about_me, app_user_id, `name`) values
		("photo of John", "I have a generic name", 1, "John Smith"),
        ("photo of Sally", "I like turtles", 2, "Sally Jones");
        
	insert into profile_trip (`profile_id`, `trip_id`) values
		(1,1),
        (2,2);
        
	insert into `comment` (trip_id, comment_body, profile_id) values
		(1,"I think John is ugly",2),
        (2,"I like animals",1);
    
    insert into item (`name`, trip_id, `description`, profile_id, quantity, is_packed) values
		("Sunscreen",2,null,null,1,0),
        ("Snacks",1,"soda,slim jims, napkins",1,1,0);
    

end //
delimiter ;



