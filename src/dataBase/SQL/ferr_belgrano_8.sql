
DROP SCHEMA IF EXISTS `ferr_belgrano_8` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ferr_belgrano_8` DEFAULT CHARACTER SET utf8 ;
USE `ferr_belgrano_8` ;

-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ferr_belgrano_8`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NULL,
  `lastName` VARCHAR(50) NULL,
  `email` VARCHAR(200) NULL,
  `password` VARCHAR(200) NULL,
  `type` VARCHAR(200) NULL,
  `image` VARCHAR(200) NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ferr_belgrano_8`.`product` (
  `idproduct` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  `description` TEXT(500) NULL,
  `image` VARCHAR(200) NULL,
  `category` VARCHAR(200) NULL,
  `type` VARCHAR(200) NULL,
  `price` DECIMAL(9) NULL,
  PRIMARY KEY (`idproduct`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ferr_belgrano_8`.`user_product` (
  `iduser_product` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NULL,
  `user_id` INT NULL,
  PRIMARY KEY (`iduser_product`),
  INDEX `product_id_idx` (`product_id` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `ferr_belgrano_8`.`product` (`idproduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `ferr_belgrano_8`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ferr_belgrano_8`.`category` (
  `idcategory` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`idcategory`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`product_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ferr_belgrano_8`.`product_category` (
  `idproduct_category` INT NOT NULL AUTO_INCREMENT,
  `idproduct` INT NULL,
  `idcategory` INT NULL,
  PRIMARY KEY (`idproduct_category`),
  INDEX `id_product_idx` (`idproduct` ASC) VISIBLE,
  INDEX `id_category_idx` (`idcategory` ASC) VISIBLE,
  CONSTRAINT `id_product`
    FOREIGN KEY (`idproduct`)
    REFERENCES `ferr_belgrano_8`.`product` (`idproduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_category`
    FOREIGN KEY (`idcategory`)
    REFERENCES `ferr_belgrano_8`.`category` (`idcategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

