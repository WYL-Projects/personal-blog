/*
SQLyog Ultimate v11.27 (32 bit)
MySQL - 5.7.26-log : Database - personal blog
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`personal blog` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `personal blog`;

/*Table structure for table `blog` */

DROP TABLE IF EXISTS `blog`;

CREATE TABLE `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `content` mediumtext NOT NULL,
  `utime` int(11) NOT NULL,
  `readCount` int(11) NOT NULL,
  `tags` varchar(256) NOT NULL,
  `ctime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_ctime` (`ctime`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

/*Data for the table `blog` */


/*Table structure for table `comments` */

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comments` text NOT NULL,
  `username` varchar(60) NOT NULL,
  `parent` int(11) NOT NULL,
  `parent_username` varchar(64) NOT NULL DEFAULT '0',
  `blog_id` int(11) NOT NULL,
  `email` varchar(128) NOT NULL,
  `ctime` int(11) NOT NULL,
  `utime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_blog_id` (`blog_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `comments` */

insert  into `comments`(`id`,`comments`,`username`,`parent`,`parent_username`,`blog_id`,`email`,`ctime`,`utime`) values (1,'我在哪，我是谁','索大',-1,'0',42,'wyl1998_666@163.com',1562561671,1562561671),(2,'ewqewqewq','范德萨',-1,'0',42,'616056876@qq.com',1562567866,1562567866),(3,'你已经死了！','香吉士',1,'索大',42,'41177132132204@qq.com',1562584314,1562584314),(4,'我是要成为海贼王的男人！','路飞',3,'香吉士',42,'lufeids@qq.com',1562584314,1562584314),(5,'这个测试可以啊','wyl',-1,'0',4,'321411771204@qq.com',1562585214,1562585214),(6,'你说可以就可以？\n傻狗','shx',5,'wyl',4,'3222134214@163.com',1562586576,1562586576),(7,'哈哈，我张良国服了呀，开心','WT',-1,'0',5,'4324322@163.com',1562587188,1562587188),(8,'傻子吧！','SHX',7,'WT',5,'4323334@qq.com',1562587563,1562587563),(9,'留言不错啊！','JN',-1,'0',-2,'3423432@163.com',1562636849,1562636849),(12,'哈哈可以的大萨达','ZTB',10,'ZY',-2,'342423@qq.com',1562638782,1562638782),(13,'那你hen666','ZTB',12,'ZTB',-2,'342432@qq.com',1562638922,1562638922),(14,'而我却二无群考虑入库了无人机','YQF',-1,'0',-3,'433242@qq.com',1562642709,1562642709);

/*Table structure for table `every_day` */

DROP TABLE IF EXISTS `every_day`;

CREATE TABLE `every_day` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `ctime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_ctime` (`ctime`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

/*Data for the table `every_day` */

insert  into `every_day`(`id`,`content`,`ctime`) values (16,'\n        Go ahead…而我却二无群',1562293171),(20,'Go ahead…二万五千二无群',1562294813),(21,'真理唯一可靠的标准是永远的自相符合                                                           ——欧文',1562294813),(22,'真理唯一可靠的标准是永远的自相符合                                                           ——欧文',1562294813),(23,'<b>的撒的撒而我却二无群若无</b><div><b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;——欧文</b></div>',1562295416),(24,'<span style=\"font-family: arial; font-size: 13px;\">土地是以它的肥沃和收获而被估价的；才能也是土地，不过它生产的不是粮食，而是真理。</span><div><span style=\"font-family: arial; font-size: 13px;\">如果只能滋生瞑想和幻想的话，即使再大的才能也只是砂地或盐池，那上面连小草也长不出来的。</span><span class=\"c-gray c-gap-left-small op-imprecise-author\" style=\"color: rgb(102, 102, 102); margin-left: 5px; white-space: nowrap; font-family: arial; font-size: 13px;\">&nbsp;</span></div><div><font color=\"#666666\" face=\"arial\"><span style=\"font-size: 13px; white-space: nowrap;\"><br></span></font><div><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><div><span class=\"c-gray c-gap-left-small op-imprecise-author\" style=\"color: rgb(102, 102, 102); margin-left: 5px; white-space: nowrap; font-family: arial; font-size: 13px;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ——<i> 别林斯基</i></span></div></blockquote></blockquote></blockquote></blockquote></blockquote></blockquote></blockquote></div></div>',1562310326),(25,'<span style=\"font-family: arial; font-size: 13px;\">土地是以它的肥沃和收获而被估价的；才能也是土地，不过它生产的不是粮食，而是真理。</span><div><span style=\"font-family: arial; font-size: 13px;\">如果只能滋生瞑想和幻想的话，即使再大的才能也只是砂地或盐池，那上面连小草也长不出来的。</span><span class=\"c-gray c-gap-left-small op-imprecise-author\" style=\"color: rgb(102, 102, 102); margin-left: 5px; white-space: nowrap; font-family: arial; font-size: 13px;\">&nbsp;</span></div><div><font color=\"#666666\" face=\"arial\"><span style=\"font-size: 13px; white-space: nowrap;\"><br></span></font><div><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><div><span class=\"c-gray c-gap-left-small op-imprecise-author\" style=\"color: rgb(102, 102, 102); margin-left: 5px; white-space: nowrap; font-family: arial; font-size: 13px;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ——<i> 别林斯基</i></span></div></blockquote></blockquote></blockquote></blockquote></blockquote></blockquote></blockquote></div></div>',1562310604),(26,'<span style=\"font-family: arial; font-size: 13px;\">土地是以它的肥沃和收获而被估价的；才能也是土地，不过它生产的不是粮食，而是真理。</span><div><span style=\"font-family: arial; font-size: 13px;\">如果只能滋生瞑想和幻想的话，即使再大的才能也只是砂地或盐池，那上面连小草也长不出来的。</span><span class=\"c-gray c-gap-left-small op-imprecise-author\" style=\"color: rgb(102, 102, 102); margin-left: 5px; white-space: nowrap; font-family: arial; font-size: 13px;\">&nbsp;</span></div><div><font color=\"#666666\" face=\"arial\"><span style=\"font-size: 13px; white-space: nowrap;\"><br></span></font><div><blockquote style=\"padding-left: 0px; margin-bottom: 0px; margin-left: 40px; border: none;\"><blockquote style=\"padding-left: 0px; margin-bottom: 0px; margin-left: 40px; border: none;\"><blockquote style=\"padding-left: 0px; margin-bottom: 0px; margin-left: 40px; border: none;\"><blockquote style=\"padding-left: 0px; margin-bottom: 0px; margin-left: 40px; border: none;\"><blockquote style=\"padding-left: 0px; margin-bottom: 0px; margin-left: 40px; border: none;\"><blockquote style=\"padding-left: 0px; margin-bottom: 0px; margin-left: 40px; border: none;\"><blockquote style=\"padding-left: 0px; margin-bottom: 0px; margin-left: 40px; border: none;\"><span class=\"c-gray c-gap-left-small op-imprecise-author\" style=\"color: rgb(102, 102, 102); margin-left: 5px; white-space: nowrap; font-family: arial; font-size: 13px;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ——<i>&nbsp;别林斯基</i></span></blockquote></blockquote></blockquote></blockquote></blockquote></blockquote></blockquote></div></div>',1562310604);

/*Table structure for table `tag_blog_mapping` */

DROP TABLE IF EXISTS `tag_blog_mapping`;

CREATE TABLE `tag_blog_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_id` int(11) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `ctime` int(11) NOT NULL,
  `utime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_tag_id` (`tag_id`,`blog_id`),
  KEY `idx_blog_id` (`blog_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

/*Data for the table `tag_blog_mapping` */

insert  into `tag_blog_mapping`(`id`,`tag_id`,`blog_id`,`ctime`,`utime`) values (3,5,4,1562414766,1562414766),(4,3,4,1562414766,1562414766),(5,4,4,1562414766,1562414766),(6,3,5,1562414766,1562414766),(7,6,6,1562465244,1562465244),(8,7,6,1562465244,1562465244),(9,7,7,1562465244,1562465244),(10,6,7,1562465244,1562465244),(11,8,8,1562468126,1562468126),(13,10,25,1562546289,1562546289),(14,11,42,1562549582,1562549582),(15,7,43,1562655030,1562655030),(16,7,44,1562727349,1562727349);

/*Table structure for table `tags` */

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag` varchar(64) NOT NULL,
  `ctime` int(11) NOT NULL,
  `utime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_u_tag` (`tag`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `tags` */

insert  into `tags`(`id`,`tag`,`ctime`,`utime`) values (3,'hggj',1562414766,1562414766),(4,'tiyt',1562414766,1562414766),(5,'ghhg',1562414766,1562414766),(6,'test6',1562465244,1562465244),(7,'test7',1562465244,1562465244),(8,'IP',1562468126,1562468126),(10,'weixin',1562546289,1562546289),(11,'chiji',1562549582,1562549582);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;