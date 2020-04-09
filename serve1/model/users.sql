/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 80015
Source Host           : localhost:3306
Source Database       : vue_vant_app

Target Server Type    : MYSQL
Target Server Version : 80015
File Encoding         : 65001

Date: 2020-04-06 11:33:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `UserId` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `UserAccount` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `NickName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `PhoneNo` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `Password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `NickImg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
