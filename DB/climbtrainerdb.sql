-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema climbtrainerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `climbtrainerdb` ;

-- -----------------------------------------------------
-- Schema climbtrainerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `climbtrainerdb` DEFAULT CHARACTER SET utf8 ;
USE `climbtrainerdb` ;

-- -----------------------------------------------------
-- Table `exercise`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `exercise` ;

CREATE TABLE IF NOT EXISTS `exercise` (
  `id` INT NOT NULL,
  `name` VARCHAR(100) NULL,
  `image_url` VARCHAR(2000) NULL,
  `video_url` VARCHAR(2000) NULL,
  `description` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `reps` VARCHAR(45) NULL,
  `sets` VARCHAR(45) NULL,
  `duration` VARCHAR(45) NULL,
  `dicipline` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `equipment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `equipment` ;

CREATE TABLE IF NOT EXISTS `equipment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `weight` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `training_session`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `training_session` ;

CREATE TABLE IF NOT EXISTS `training_session` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `datetime` DATE NULL,
  `location` VARCHAR(45) NULL,
  `notes` VARCHAR(5000) NULL,
  `user_id` VARCHAR(45) NULL,
  `complete` TINYINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `photo_URL` VARCHAR(45) NULL,
  `admin` TINYINT NULL,
  `enabled` VARCHAR(45) NULL,
  `usercol` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `training_session_has_training_session`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `training_session_has_training_session` ;

CREATE TABLE IF NOT EXISTS `training_session_has_training_session` (
  `training_session_idworkout` INT NOT NULL,
  `training_session_idworkout1` INT NOT NULL,
  PRIMARY KEY (`training_session_idworkout`, `training_session_idworkout1`),
  INDEX `fk_training_session_has_training_session_training_session1_idx` (`training_session_idworkout1` ASC),
  INDEX `fk_training_session_has_training_session_training_session_idx` (`training_session_idworkout` ASC),
  CONSTRAINT `fk_training_session_has_training_session_training_session`
    FOREIGN KEY (`training_session_idworkout`)
    REFERENCES `training_session` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_training_session_has_training_session_training_session1`
    FOREIGN KEY (`training_session_idworkout1`)
    REFERENCES `training_session` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `exercise_has_training_session`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `exercise_has_training_session` ;

CREATE TABLE IF NOT EXISTS `exercise_has_training_session` (
  `exercise_id` INT NOT NULL AUTO_INCREMENT,
  `training_session_id` INT NOT NULL,
  PRIMARY KEY (`exercise_id`, `training_session_id`),
  INDEX `fk_exercise_has_training_session_training_session1_idx` (`training_session_id` ASC),
  INDEX `fk_exercise_has_training_session_exercise1_idx` (`exercise_id` ASC),
  CONSTRAINT `fk_exercise_has_training_session_exercise1`
    FOREIGN KEY (`exercise_id`)
    REFERENCES `exercise` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_exercise_has_training_session_training_session1`
    FOREIGN KEY (`training_session_id`)
    REFERENCES `training_session` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `exercise_has_equipment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `exercise_has_equipment` ;

CREATE TABLE IF NOT EXISTS `exercise_has_equipment` (
  `exercise_id` INT NOT NULL,
  `equipment_id` INT NOT NULL,
  PRIMARY KEY (`exercise_id`, `equipment_id`),
  INDEX `fk_exercise_has_equipment_equipment1_idx` (`equipment_id` ASC),
  INDEX `fk_exercise_has_equipment_exercise1_idx` (`exercise_id` ASC),
  CONSTRAINT `fk_exercise_has_equipment_exercise1`
    FOREIGN KEY (`exercise_id`)
    REFERENCES `exercise` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_exercise_has_equipment_equipment1`
    FOREIGN KEY (`equipment_id`)
    REFERENCES `equipment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS climbtrainer@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'climbtrainer'@'localhost' IDENTIFIED BY 'climbtrainer';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'climbtrainer'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `exercise`
-- -----------------------------------------------------
START TRANSACTION;
USE `climbtrainerdb`;
INSERT INTO `exercise` (`id`, `name`, `image_url`, `video_url`, `description`, `type`, `reps`, `sets`, `duration`, `dicipline`) VALUES (1, 'Pull Up', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `equipment`
-- -----------------------------------------------------
START TRANSACTION;
USE `climbtrainerdb`;
INSERT INTO `equipment` (`id`, `name`, `type`, `weight`) VALUES (1, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `training_session`
-- -----------------------------------------------------
START TRANSACTION;
USE `climbtrainerdb`;
INSERT INTO `training_session` (`id`, `datetime`, `location`, `notes`, `user_id`, `complete`) VALUES (1, NULL, NULL, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `climbtrainerdb`;
INSERT INTO `user` (`id`, `username`, `password`, `email`, `photo_URL`, `admin`, `enabled`, `usercol`) VALUES (1, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `exercise_has_training_session`
-- -----------------------------------------------------
START TRANSACTION;
USE `climbtrainerdb`;
INSERT INTO `exercise_has_training_session` (`exercise_id`, `training_session_id`) VALUES (1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `exercise_has_equipment`
-- -----------------------------------------------------
START TRANSACTION;
USE `climbtrainerdb`;
INSERT INTO `exercise_has_equipment` (`exercise_id`, `equipment_id`) VALUES (1, 1);

COMMIT;

