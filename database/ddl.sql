-- -----------------------------------------------------
-- Schema adventure_time
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `adventure_time`;
USE `adventure_time` ;

-- -----------------------------------------------------
-- Table `adventure_time`.`app_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adventure_time`.`app_role` (
  `app_role_id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`app_role_id`));
  
-- -----------------------------------------------------
-- Table `adventure_time`.`app_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adventure_time`.`app_user` (
  `app_user_id` INT NOT NULL,
  `username` VARCHAR(50) NULL,
  `password_hash` VARCHAR(2048) NULL,
  `disabled` TINYINT NULL,
  PRIMARY KEY (`app_user_id`));

-- -----------------------------------------------------
-- Table `adventure_time`.`app_user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adventure_time`.`app_user_role` (
  `app_user_id` INT NOT NULL,
  `app_role_id` INT NOT NULL,
  INDEX `app_user_id_idx` (`app_user_id` ASC) VISIBLE,
  INDEX `app_role_id_idx` (`app_role_id` ASC) VISIBLE,
  CONSTRAINT `fk_app_user_id`
    FOREIGN KEY (`app_user_id`)
    REFERENCES `adventure_time`.`app_user` (`app_user_id`),
  CONSTRAINT `fk_app_role_id`
    FOREIGN KEY (`app_role_id`)
    REFERENCES `adventure_time`.`app_role` (`app_role_id`);

-- -----------------------------------------------------
-- Table `adventure_time`.`trip`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adventure_time`.`trip` (
  `trip_id` INT NOT NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `review` INT NULL,
  `total_distance` INT NULL,
  PRIMARY KEY (`trip_id`));
  
-- -----------------------------------------------------
-- Table `adventure_time`.`user_trip`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adventure_time`.`user_trip` (
  `user_trip_app_user_id` INT NOT NULL,
  `user_trip_id` INT NOT NULL,
  INDEX `app_user_id_idx` (`user_trip_app_user_id` ASC) VISIBLE,
  INDEX `trip_id_idx` (`user_trip_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_trip_app_user_id`
    FOREIGN KEY (`user_trip_app_user_id`)
    REFERENCES `adventure_time`.`app_user` (`app_user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_trip_id`
    FOREIGN KEY (`user_trip_id`)
    REFERENCES `adventure_time`.`trip` (`trip_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `adventure_time`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adventure_time`.`location` (
  `location_id` INT NOT NULL,
  `latitude` VARCHAR(45) NOT NULL,
  `longitude` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `photo_url` VARCHAR(45) NULL,
  PRIMARY KEY (`location_id`));


-- -----------------------------------------------------
-- Table `adventure_time`.`trip_location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adventure_time`.`trip_location` (
  `trip_location_trip_id` INT NOT NULL,
  `trip_location_location_id` INT NOT NULL,
  `trip_location_id` INT NOT NULL,
  INDEX `location_id_idx` (`trip_location_location_id` ASC) VISIBLE,
  PRIMARY KEY (`trip_location_id`),
  CONSTRAINT `fk_trip_location_trip_id`
    FOREIGN KEY (`trip_location_trip_id`)
    REFERENCES `adventure_time`.`trip` (`trip_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_location_location_id`
    FOREIGN KEY (`trip_location_location_id`)
    REFERENCES `adventure_time`.`location` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `adventure_time`.`profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adventure_time`.`profile` (
  `profile_id` INT NOT NULL,
  `profile_photo` VARCHAR(45) NULL,
  `about_me` VARCHAR(100) NULL,
  `profile_app_user_id` INT NOT NULL,
  PRIMARY KEY (`profile_id`),
  INDEX `app_user_id_idx` (`profile_app_user_id` ASC) VISIBLE,
  UNIQUE INDEX `profile_id_UNIQUE` (`profile_id` ASC) VISIBLE,
  CONSTRAINT `fk_profile_app_user_id`
    FOREIGN KEY (`profile_app_user_id`)
    REFERENCES `adventure_time`.`app_user` (`app_user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `adventure_time`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adventure_time`.`comment` (
  `comment_id` INT NOT NULL,
  `comment_trip_id` INT NOT NULL,
  `comment_body` TEXT NOT NULL,
  PRIMARY KEY (`comment_id`),
  INDEX `trip_id_idx` (`comment_trip_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_trip_id`
    FOREIGN KEY (`comment_trip_id`)
    REFERENCES `adventure_time`.`trip` (`trip_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `adventure_time`.`packlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adventure_time`.`packlist` (
  `packlist_id` INT NOT NULL,
  `trip_id` INT NOT NULL,
  PRIMARY KEY (`packlist_id`),
  INDEX `trip_id_idx` (`trip_id` ASC) VISIBLE,
  CONSTRAINT `trip_id`
    FOREIGN KEY (`trip_id`)
    REFERENCES `adventure_time`.`trip` (`trip_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `adventure_time`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adventure_time`.`item` (
  `item_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `packlist_id` INT NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`item_id`),
  INDEX `packlist_id_idx` (`packlist_id` ASC) VISIBLE,
  CONSTRAINT `packlist_id`
    FOREIGN KEY (`packlist_id`)
    REFERENCES `adventure_time`.`packlist` (`packlist_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);