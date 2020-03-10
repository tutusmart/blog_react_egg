# Host: localhost  (Version: 5.7.26)
# Date: 2020-03-10 01:05:15
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "admin_user"
#

DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

#
# Data for table "admin_user"
#

/*!40000 ALTER TABLE `admin_user` DISABLE KEYS */;
INSERT INTO `admin_user` VALUES (1,'jspang','123456'),(2,'admin','123456');
/*!40000 ALTER TABLE `admin_user` ENABLE KEYS */;

#
# Structure for table "article"
#

DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL DEFAULT '0',
  `title` varchar(255) DEFAULT NULL,
  `article_content` text,
  `introduce` text,
  `addTime` int(11) DEFAULT NULL,
  `view_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

#
# Data for table "article"
#

/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,1,'文章标题1','#fdf','文章简介文章简介',1571394242,0),(2,1,'文章标题2','1111111111`hajfaj`','\n文章简介22222222',1571328000,1),(5,3,'6666','666','6666',1578758400,1088),(6,1,'111111','1111111','111111',1578758400,1060),(7,1,'22222222','2222222\n2222222\n222222','2222',1578758400,1094);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

#
# Structure for table "type"
#

DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) DEFAULT NULL,
  `orderNum` int(11) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Data for table "type"
#

/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'视频教程',1,'youtube'),(2,'javascript',2,'message'),(3,'热爱生活',3,'smile');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;

#
# Structure for table "blog_content"
#
DROP TABLE IF EXISTS `blog_content`;
CREATE TABLE `blog_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `introduce` text(255) DEFAULT NULL,
  `content` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` int(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Data for table "blog_content"
#

/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `blog_content` VALUES (1,'视频教程',1,'youtube',1);
/*!40000 ALTER TABLE `type` ENABLE KEYS */;