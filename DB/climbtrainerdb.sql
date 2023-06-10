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
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `image_url` VARCHAR(2000) NULL,
  `video_url` VARCHAR(2000) NULL,
  `description` VARCHAR(5000) NULL,
  `type` VARCHAR(45) NULL,
  `reps` INT NULL,
  `sets` INT NULL,
  `duration` TIME NULL,
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
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `photo_URL` VARCHAR(45) NULL,
  `role` VARCHAR(20) NULL,
  `enabled` TINYINT NULL,
  `usercol` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `session`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `session` ;

CREATE TABLE IF NOT EXISTS `session` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NULL,
  `location` VARCHAR(45) NULL,
  `notes` VARCHAR(5000) NULL,
  `complete` TINYINT NOT NULL DEFAULT 0,
  `user_id` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_training_session_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_training_session_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
    REFERENCES `session` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_training_session_has_training_session_training_session1`
    FOREIGN KEY (`training_session_idworkout1`)
    REFERENCES `session` (`id`)
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
    REFERENCES `session` (`id`)
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
INSERT INTO `exercise` (`id`, `name`, `image_url`, `video_url`, `description`, `type`, `reps`, `sets`, `duration`, `dicipline`) VALUES (1, 'Pull Up', NULL, NULL, 'hands slightly past shoulder width, keeping chest up and back engaged pull to chin above bar. add or remove weight to meet suggested reps', 'Pull', 10, 3, NULL, NULL);
INSERT INTO `exercise` (`id`, `name`, `image_url`, `video_url`, `description`, `type`, `reps`, `sets`, `duration`, `dicipline`) VALUES (2, 'Bench Press', NULL, NULL, 'always use a spotter or safety bars.With your back lieing on a bench, lower a barbell to your chest, and then press it back up using your chest, shoulders, and triceps.', 'Push', 7, 3, NULL, NULL);
INSERT INTO `exercise` (`id`, `name`, `image_url`, `video_url`, `description`, `type`, `reps`, `sets`, `duration`, `dicipline`) VALUES (3, 'System Board Repeaters', NULL, NULL, 'repeat the mirrored version of climbs', 'Climb', 5, 1, NULL, NULL);
INSERT INTO `exercise` (`id`, `name`, `image_url`, `video_url`, `description`, `type`, `reps`, `sets`, `duration`, `dicipline`) VALUES (4, 'Max Pull Through', NULL, NULL, 'campus up with one hand, latch the rung, pull through and latch with the other hand', 'Pull', 2, 3, NULL, NULL);
INSERT INTO `exercise` (`id`, `name`, `image_url`, `video_url`, `description`, `type`, `reps`, `sets`, `duration`, `dicipline`) VALUES (5, 'Finger Block Dead Lift', NULL, NULL, 'preform a modified dead lift using a finger block, 1/2 crimp', 'Pull', 1, 5, '00:00:10', NULL);
INSERT INTO `exercise` (`id`, `name`, `image_url`, `video_url`, `description`, `type`, `reps`, `sets`, `duration`, `dicipline`) VALUES (6, 'Dead Lift', NULL, NULL, 'lift a loaded barbell from the ground to a standing position, utilizing multiple muscle groups and emphasizing the posterior chain.', 'Push', 5, 3, NULL, NULL);
INSERT INTO `exercise` (`id`, `name`, `image_url`, `video_url`, `description`, `type`, `reps`, `sets`, `duration`, `dicipline`) VALUES (7, 'Four by Four', NULL, NULL, 'repeat four different climbs four times each', 'Climb', 1, 1, NULL, NULL);
INSERT INTO `exercise` (`id`, `name`, `image_url`, `video_url`, `description`, `type`, `reps`, `sets`, `duration`, `dicipline`) VALUES (8, 'Hammer Curl', NULL, NULL, 'person holds dumbbells with a neutral grip (palms facing each other) and curls them up towards the shoulders, targeting the biceps brachii', 'Pull', 12, 4, NULL, NULL);
INSERT INTO `exercise` (`id`, `name`, `image_url`, `video_url`, `description`, `type`, `reps`, `sets`, `duration`, `dicipline`) VALUES (9, 'Nordic Curl', NULL, NULL, ' It involves kneeling on a pad or soft surface with the feet secured, and then slowly lowering the upper body towards the ground by flexing at the knees and hips, before using the hamstrings to push back up to the starting position', 'Pull', 3, 3, NULL, NULL);
INSERT INTO `exercise` (`id`, `name`, `image_url`, `video_url`, `description`, `type`, `reps`, `sets`, `duration`, `dicipline`) VALUES (10, 'Flash or Trash', NULL, NULL, 'one attempt per climb, regardless of grade', 'Climb', 15, 1, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `equipment`
-- -----------------------------------------------------
START TRANSACTION;
USE `climbtrainerdb`;
INSERT INTO `equipment` (`id`, `name`, `type`, `weight`) VALUES (1, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `climbtrainerdb`;
INSERT INTO `user` (`id`, `username`, `password`, `email`, `photo_URL`, `role`, `enabled`, `usercol`) VALUES (1, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `session`
-- -----------------------------------------------------
START TRANSACTION;
USE `climbtrainerdb`;
INSERT INTO `session` (`id`, `date`, `location`, `notes`, `complete`, `user_id`) VALUES (1, '2023-04-05', '40.025587,-105.2541109', 'wrecked! rough session', DEFAULT, 1);
INSERT INTO `session` (`id`, `date`, `location`, `notes`, `complete`, `user_id`) VALUES (2, '2023-04-07', '40.1588713,-105.107395,15', 'felt good', DEFAULT, 1);
INSERT INTO `session` (`id`, `date`, `location`, `notes`, `complete`, `user_id`) VALUES (3, '2023-04-08', '40.025587,-105.2541109', 'pr on max pulls', DEFAULT, 1);
INSERT INTO `session` (`id`, `date`, `location`, `notes`, `complete`, `user_id`) VALUES (4, '2023-04-10', '39.9657298,-105.1191341', 'im hungry', DEFAULT, 1);
INSERT INTO `session` (`id`, `date`, `location`, `notes`, `complete`, `user_id`) VALUES (5, '2023-04-12', '40.1588713,-105.107395,15', 'new shoes are too small', DEFAULT, 1);
INSERT INTO `session` (`id`, `date`, `location`, `notes`, `complete`, `user_id`) VALUES (6, '2023-04-14', '39.9657298,-105.1191341', 'awesome set', DEFAULT, 1);
INSERT INTO `session` (`id`, `date`, `location`, `notes`, `complete`, `user_id`) VALUES (7, '2023-04-16', '39.9657298,-105.1191341', 'Matt\'s birthday Challenge', DEFAULT, 1);
INSERT INTO `session` (`id`, `date`, `location`, `notes`, `complete`, `user_id`) VALUES (8, '2023-04-17', '40.1588713,-105.107395,15', 'BenchPress pr', DEFAULT, 1);
INSERT INTO `session` (`id`, `date`, `location`, `notes`, `complete`, `user_id`) VALUES (9, '2023-04-19', '39.9657298,-105.1191341', 'raawr', DEFAULT, 1);
INSERT INTO `session` (`id`, `date`, `location`, `notes`, `complete`, `user_id`) VALUES (10, '2023-04-20', '40.1588713,-105.107395,15', 'knee injury', DEFAULT, 1);
INSERT INTO `session` (`id`, `date`, `location`, `notes`, `complete`, `user_id`) VALUES (DEFAULT, NULL, NULL, NULL, DEFAULT, 1);

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

