-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: movietheater_v2
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `enable` int NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `id_card` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `total_point` int NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `verification_code` varchar(255) DEFAULT NULL,
  `is_enabled` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,NULL,NULL,'admin@gmail.com',1,'Admin',NULL,NULL,NULL,'$2a$10$FYJ9Vhqo5xU4PyDgp39z/.y5OuJsDR.Ybe.OZw/EXe1TyJjPHtsXO',NULL,'local',0,NULL,NULL,_binary ''),(2,'Quang Nam','2001-12-12','nguyenvansy091201@gmail.com',1,'Nguyev Van Sy',NULL,NULL,NULL,'$2a$12$vCO466s.8yR200wQq6Xsb.N06K9VuhlDYABYjw8mIa01kJdMlDAOi',NULL,'local',0,' ',NULL,_binary '');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_role`
--

DROP TABLE IF EXISTS `account_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_role` (
  `account_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`account_id`,`role_id`),
  KEY `FKrs2s3m3039h0xt8d5yhwbuyam` (`role_id`),
  CONSTRAINT `FK1f8y4iy71kb1arff79s71j0dh` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `FKrs2s3m3039h0xt8d5yhwbuyam` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_role`
--

LOCK TABLES `account_role` WRITE;
/*!40000 ALTER TABLE `account_role` DISABLE KEYS */;
INSERT INTO `account_role` VALUES (1,1),(2,1),(1,2),(1,3);
/*!40000 ALTER TABLE `account_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `booking_code` varchar(255) DEFAULT NULL,
  `day_time_booking` datetime(6) DEFAULT NULL,
  `img_qr_code` varchar(255) DEFAULT NULL,
  `received` int NOT NULL,
  `total_price` double NOT NULL,
  `account_id` bigint DEFAULT NULL,
  `movie_showtime_id` bigint DEFAULT NULL,
  `payment_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7hunottedmjhtdcvhv4sx6x4a` (`account_id`),
  KEY `FK13f9m60max557jkv3hnreh0to` (`movie_showtime_id`),
  KEY `FK70t92vvx289ayx2hq2v4hdcjl` (`payment_id`),
  CONSTRAINT `FK13f9m60max557jkv3hnreh0to` FOREIGN KEY (`movie_showtime_id`) REFERENCES `movie_show_time` (`id`),
  CONSTRAINT `FK70t92vvx289ayx2hq2v4hdcjl` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`),
  CONSTRAINT `FK7hunottedmjhtdcvhv4sx6x4a` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_food`
--

DROP TABLE IF EXISTS `booking_food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_food` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `total` int DEFAULT NULL,
  `booking_id` bigint DEFAULT NULL,
  `food_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbtvnblykvoh4hlq4drr4apmcu` (`booking_id`),
  KEY `FK2n3r52x8el2j3lem4kkn32t5u` (`food_id`),
  CONSTRAINT `FK2n3r52x8el2j3lem4kkn32t5u` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`),
  CONSTRAINT `FKbtvnblykvoh4hlq4drr4apmcu` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_food`
--

LOCK TABLES `booking_food` WRITE;
/*!40000 ALTER TABLE `booking_food` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking_food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_seat`
--

DROP TABLE IF EXISTS `booking_seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_seat` (
  `seat_id` bigint NOT NULL,
  `booking_id` bigint NOT NULL,
  PRIMARY KEY (`seat_id`,`booking_id`),
  KEY `FK3gcy7w2me25kc4qp8nobmg4q6` (`booking_id`),
  CONSTRAINT `FK3gcy7w2me25kc4qp8nobmg4q6` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`id`),
  CONSTRAINT `FK3y806wtfhomwvu02t1u7u2136` FOREIGN KEY (`seat_id`) REFERENCES `seat` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_seat`
--

LOCK TABLES `booking_seat` WRITE;
/*!40000 ALTER TABLE `booking_seat` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking_seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_bot`
--

DROP TABLE IF EXISTS `chat_bot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_bot` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `keyword` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_bot`
--

LOCK TABLES `chat_bot` WRITE;
/*!40000 ALTER TABLE `chat_bot` DISABLE KEYS */;
INSERT INTO `chat_bot` VALUES (1,'Phim đang chiếu'),(2,'Phim sắp chiếu'),(3,'Phim mới ra mắt'),(4,'Phim best seller'),(5,'Giá vé'),(6,'Thực phẩm và đồ uống'),(7,'Thông tin liên hệ');
/*!40000 ALTER TABLE `chat_bot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `rate` int DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  `movie_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKp41h5al2ajp1q0u6ox3i68w61` (`account_id`),
  KEY `FKj6owqni09n6r5rspfx1xtfu23` (`movie_id`),
  CONSTRAINT `FKj6owqni09n6r5rspfx1xtfu23` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`),
  CONSTRAINT `FKp41h5al2ajp1q0u6ox3i68w61` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (1,'1 bình Jungle Brown + 1 nước siêu lớn\n** Mua thêm 1 bắp ngọt chỉ với 29k tại rạp\n** Nhận trong ngày xem phim**\n*** Mẫu ly phụ thuộc vào số lượng tại rạp',259000,'JUNGLE BROWN MY COMBO '),(2,'1 ly Fast X + 1 nước siêu lớn + 1 bắp tùy chọn vị \n** Nhận trong ngày xem phim**\n*** Mẫu ly phụ thuộc vào số lượng tại rạp',169000,'FAST X MY COMBO'),(3,'1 bình Lật Mặt (kèm nước)+ 1 bắp lớn tùy chọn vị \n** Nhận trong ngày xem phim **\n** Đổi vị phô mai phụ thu thêm tiền **',219000,'LAT MAT 6 MY COMBO'),(4,'1 ly Kakao Friend (kèm nước)+ 1 bắp lớn tùy chọn vị \n** Nhận trong ngày xem phim **\n** Đổi vị phô mai phụ thu thêm tiền **',229000,'KAKAO FRIEND MY COMBO'),(5,'2 ly Kakao Friend (kèm nước)+ 1 bắp lớn tùy chọn vị \n** Nhận trong ngày xem phim **\n** Đổi vị phô mai phụ thu thêm tiền **',399000,'KAKAO FRIEND COUPLE COMBO'),(6,'1 bắp lớn + 1 nước siêu lớn\n* Miễn phí đổi vị bắp Caramel *\n** Nhận trong ngày xem phim **\n** Đổi vị phô mai phụ thu thêm tiền **',89000,'MY COMBO'),(7,'1 bắp lớn + 2 nước siêu lớn * Miễn phí đổi vị bắp Caramel * ** Nhận trong ngày xem phim ** ** Đổi vị phô mai phụ thu thêm tiền **',115000,'HST COMBO');
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Hành động'),(2,'Kinh dị'),(3,'Gia đình'),(4,'Hài '),(5,'Tình cảm'),(6,'Tâm lý'),(7,'Phiêu Lưu'),(8,'Thần thoại'),(9,'Bí ẩn'),(10,'Hồi hộp'),(11,'Tội phạm');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre_movie`
--

DROP TABLE IF EXISTS `genre_movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre_movie` (
  `genre_id` bigint NOT NULL,
  `movie_id` bigint NOT NULL,
  PRIMARY KEY (`genre_id`,`movie_id`),
  KEY `FK1i84wjq2rxoijqg6miscan9v1` (`movie_id`),
  CONSTRAINT `FK1i84wjq2rxoijqg6miscan9v1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`),
  CONSTRAINT `FKmink7rsh2tpclo43knndfhylq` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre_movie`
--

LOCK TABLES `genre_movie` WRITE;
/*!40000 ALTER TABLE `genre_movie` DISABLE KEYS */;
INSERT INTO `genre_movie` VALUES (1,1),(2,1),(1,2),(1,3),(7,3),(8,3),(1,4),(1,5),(6,6),(1,7),(3,8),(1,9),(9,9),(10,9),(2,10),(1,13),(1,14),(10,14),(1,15),(4,15),(6,15),(10,15),(6,16),(1,17),(11,17),(4,18),(6,18);
/*!40000 ALTER TABLE `genre_movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cast` varchar(255) DEFAULT NULL,
  `content` longtext,
  `director` varchar(255) DEFAULT NULL,
  `is3d` int NOT NULL,
  `production` varchar(255) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `running_time` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `trailer_url` varchar(255) DEFAULT NULL,
  `create_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,'Russell Crowe, Daniel Zovatto, Alex Essoe, Franco Nero, Laurel Marsden','Review Khắc Tinh Của Quỷ và lịch chiếu Khắc Tinh Của Quỷ tại Moveek. Lấy cảm hứng từ những hồ sơ có thật của Cha Gabriele Amorth, Trưởng Trừ Tà của Vatican, bộ phim The Pope\'s Exorcist theo chân Amorth trong cuộc điều tra về vụ quỷ ám kinh hoàng của một cậu bé và dần khám phá ra những bí mật hàng thế kỷ mà Vatican đã cố gắng giấu kín.','Julius Avery',1,'Jeff Katz, Doug Belgrad, Michael Patrick Kaczmarek','2023-04-14',104,'Khắc Tinh Của Quỷ','https://www.youtube.com/watch?v=MVj0NnV-cG8','2023-04-04 00:00:00.000000'),(2,'Chris Pratt, Anya Taylor-Joy, Charlie Day, Jack Black, Keegan-Michael Key','Cuộc phiêu lưu đến Vương quốc Nấm của anh chàng thợ sửa ống nước Mario và quá trình anh vươn lên trở thành một huyền thoại. Xem lịch chiếu, review phim và mua vé xem phim dễ dàng hơn tại Moveek','Michael Jelenic, Aaron Horvath',1,'Christopher Meledandri, Janet Healy, Shigeru Miyamoto','2023-05-03',93,'Anh Em Super Mario','https://www.youtube.com/watch?v=sqAyx4uDYN4','2023-03-27 00:00:00.000000'),(3,'Chris Pratt, Zoe Saldana, Dave Bautista, Karen Gillan, Pom Klementieff','Review Vệ Binh Dải Ngân Hà 3 và lịch chiếu Vệ Binh Dải Ngân Hà 3 tại Moveek. Cho dù vũ trụ này có bao la đến đâu, các Vệ Binh của chúng ta cũng không thể trốn chạy mãi mãi.','James Gunn',1,'Kevin Feige','2023-05-03',149,'Vệ Binh Dải Ngân Hà 3','https://www.youtube.com/watch?v=89aYxQcGGA4','2023-04-24 00:00:00.000000'),(4,'John Francis Daley, Jonathan M. Goldstein','Review Ngục Tối Và Rồng: Danh Dự Của Kẻ Trộm và lịch chiếu Ngục Tối Và Rồng: Danh Dự Của Kẻ Trộm xem tại Moveek. Phim theo chân một tên trộm quyến rũ và một nhóm những kẻ bịp bợm nghiệp dư thực hiện vụ trộm sử thi nhằm lấy lại một di vật đã mất. Nhưng mọi thứ trở nên nguy hiểm khó lường hơn bao giờ hết khi họ đã chạm trán nhầm người trong.','Brian Goldner, Roy Lee, Courtney Solomon',1,NULL,'2023-05-20',124,'Ngục Tối Và Rồng','https://www.youtube.com/watch?v=SYkZHSDdkz0','2023-05-10 00:00:00.000000'),(5,'Vin Diesel, Michelle Rodriguez, Tyrese Gibson, Ludacris, Jason Momoa','Review Fast & Furious 10 và lịch chiếu Fast & Furious 10 xem tại Moveek','Louis Leterrier',1,'Neal H. Moritz, Vin Diesel, Jeff Kirschenbaum','2023-05-12',130,'Fast & Furious 10','https://www.youtube.com/watch?v=X8oZ0tlXqh0','2023-05-02 00:00:00.000000'),(6,'Halle Bailey, Jonah Hauer-King, Daveed Diggs, Awkwafina, Jacob Tremblay','Nàng Tiên Cá là câu chuyện được yêu thích về Ariel - một nàng tiên cá trẻ xinh đẹp và mạnh mẽ với khát khao phiêu lưu. Ariel là con gái út của Vua Triton và cũng là người ngang ngạnh nhất, nàng khao khát khám phá về thế giới bên kia đại dương. Trong một lần ghé thăm đất liền, nàng đã phải lòng Hoàng tử Eric bảnh bao. Trong khi tiên cá bị cấm tiếp xúc với con người, Ariel đã làm theo trái tim mình. Nàng đã thỏa thuận với phù thủy biển Ursula hung ác để cơ hội sống cuộc sống trên đất liền. Nhưng cuối cùng việc này lại đe dọa tới mạng sống của Ariel và vương miện của cha nàng.','Rob Marshall',1,'Rob Marshall, Marc Platt, Lin-Manuel Miranda','2023-05-23',135,'Nàng Tiên Cá','https://www.youtube.com/watch?v=jEmhFdnS_wE','2023-05-13 00:00:00.000000'),(7,'Ezra Miller, Kiersey Clemons, Billy Crudup, Johnny Depp','Review The Flash và lịch chiếu The Flash xem tại Moveek. Bối cảnh phim có thể sẽ được lấy từ sự kiện Flashpoint. Trong nguyên tác truyện tranh, anh chàng Barry Allen sẽ quay ngược thời gian để cứu người mẹ khỏi cái chết. Chuyến đi này của anh đã làm thay đổi nhiều sự kiện trong quá khứ và từ đó kéo theo một loạt rắc rối.','Andy Muschietti',1,'Richard Suckle, Geoff Johns','2023-06-16',122,'The Flash','https://www.youtube.com/watch?v=2H6WkgW-hCA','2023-06-06 00:00:00.000000'),(8,'Olivia Cooke, Kenneth Branagh, William Shatner, Laurie Holden, Kevin Dennis','Cô Bé Cứu Hoả (tên tiếng Anh: Fireheart) đưa người xem bước vào hành trình phiêu lưu kỳ thú của Georgia Nolan - một cô bé thông minh, nhiệt huyết với ước mơ trở thành lính cứu hoả như ba mình. Tuy nhiên, năm 1932 tại New York, phụ nữ không được phép làm công việc này. Nhưng cơ hội “vàng” đã đến khi Georgia nảy ra ý định cải trang thành Joe - một chàng trai vụng về gia nhập đội cứu hoả do chính ba mình thành lập. Vừa phải bảo vệ danh tính thật, vừa phải dấn thân vào phi vụ mạo hiểm: Giải cứu những người lính cứu hoả của thành phố đã lần lượt biến mất trong ngọn lửa bí ẩn thiêu rụi Nhà hát Broadway, liệu Georgia có dũng cảm vượt qua tất cả và thành công?','Laurent Zeitoun, Theodore Anthony Lee Ty',1,'André Rouleau, Laurent Zeitoun, Yann Zenou','2023-05-12',92,'Cô Bé Cứu Hỏa','https://www.youtube.com/watch?v=ORB1bzj_naY','2023-05-02 00:00:00.000000'),(9,'Ben Affleck, Alice Braga, William Fichtner, J. D. Pardo, Jeff Fahey','Review Những Kẻ Thao Túng và lịch chiếu Những Kẻ Thao Túng tại Moveek. Phim theo chân thám tử Daniel Rourke (Ben Affleck) trong hành trình tìm kiếm cô con gái bị mất tích. Anh sớm nhận ra tất cả những chuyện bí ẩn này đều liên quan đến một người đàn ông có sức mạnh thôi miên. Với sự hỗ trợ từ nhà ngoại cảm Diana Cruz (Alice Braga), Daniel bắt đầu truy đuổi hắn và phải tìm mọi cách để đưa con gái mình trở về nhà an toàn.','Robert Rodriguez',1,'Robert Rodriguez, Lisa Ellzey, Jeffrey Robinov','2023-05-15',93,'Những Kẻ Thao Túng','https://www.youtube.com/watch?v=VHHN08_tKjI','2023-05-05 00:00:00.000000'),(10,'Sarah Grey, Meg Foster, Sarah Dumont, Alexis Knapp, Mena Suvari','Câu chuyện bắt đầu khi Elly được gia đình của một người bạn nhờ chăm sóc một người phụ nữ lớn tuổi sống trong một căn nhà gỗ hẻo lánh trong vài ngày. Nhận lời đồng ý, nhưng sau đó Elly phát hiện ra sự xuất hiện của một con quỷ đang ẩn náu trong người phụ nữ chỉ chực chờ để thoát ra. Cùng lúc đó, những bí ẩn về cái chết của mẹ cô dần dần được gợi mở bởi những cơn ác mộng mà Elly phải trải qua.','Kevin Lewis',1,'Marcus Englefield','2023-05-12',96,'Cơn Thịnh Nộ Từ Cõi Âm','https://www.youtube.com/watch?v=4fu2txmIV9I','2023-05-02 00:00:00.000000'),(13,'Jorma Tommila, Aksel Hennie, Jack Doolan…','Lấy bối cảnh năm 1944, SISU kể câu chuyện về một cựu binh phát hiện ra mỏ vàng trong vùng hoang dã của Phần Lan. Trên đường vào thành phố bán vàng, những tên lính Phát Xít tàn bạo đang thực hiện nhiệm vụ tàn phá khắp nơi đã phát hiện ra kho báu và cướp lấy nó từ tay anh ta. Cựu binh quyết tâm đòi lại tất cả, từ nợ cho đến thù, thậm chí nếu điều đó có nghĩa là giết hết tất cả lính Phát Xít.','Jalmari Helande',0,NULL,'2023-05-12',90,'SuSi - Già Gân Báo Thù','https://www.youtube.com/watch?v=BUmsTtsLSAc','2023-05-02 00:00:00.000000'),(14,'Julio Cesar, Josh Lucas','Quái Vật Đen xoay quanh câu chuyện khi kỳ nghỉ bình dị của gia đình Oilman Paul Sturges biến thành cơn ác mộng. Bởi họ đã gặp phải một con cá mập Megalodon hung dữ, không từ bất kỳ khoảnh khắc nào để bảo vệ lãnh thổ của mình. Bị mắc kẹt và tấn công liên tục, Paul và gia đình của mình phải tìm cách để an toàn sống sót trở về bờ trước khi con cá mập khát máu này tấn công lần nữa.','Adrian Grunberg',0,NULL,'2023-05-12',100,'Quái Vật Đen','https://www.youtube.com/watch?v=GBh3CLB46UQ','2023-05-02 00:00:00.000000'),(15,'Lý Hải, Quốc Cường, Trung Dũng, Huy Khánh, Thanh Thức, Trần Kim Hải, Huỳnh Thi, Diệp Bảo Ngọc, Tú Tri, Quỳnh Như, Tạ Lâm, bé Thùy Linh…','Lật mặt 6 sẽ thuộc thể loại giật gân, tâm lý pha hành động, hài hước.','Lý Hải',0,NULL,'2023-04-28',132,'Lật Mặt 6: Tấm Vé Định Mệnh','https://www.youtube.com/watch?v=o3FoowSoNr4','2023-04-18 00:00:00.000000'),(16,'Jae-hong Ahn, Jinwoon Jeong, Geon-joo Jung','Hành trình kỳ diệu gây chấn động nền bóng rổ trung học vào năm 2012, một người thầy nghiệp dư dẫn dắt 6 cậu học trò tạo nên kỳ tích trong 8 ngày thi đấu liên tục.','Hang-jun Jang',0,NULL,'2023-05-12',122,'REBOUND BẬT BẢNG','https://www.youtube.com/watch?v=w0tJp2PzY6A','2023-05-02 00:00:00.000000'),(17,'Joe Sowerbutts, Haruka Abe, Joel Basman,…','Matt, một học sinh thông minh với việc làm thêm buổi tối tại một bãi đậu xe hạng sang, phải chứng minh sự trong sạch của mình khi bị buộc phải tham gia vào một vụ trộm táo bạo tại nhà đấu giá nổi tiếng London. Một cuộc hành trình trốn chạy xuyên thành phố khỏi những tên truy sát diễn ra ngay trong đêm. Với khả năng tương tác giúp khán giả hoá thân vào nhân vật Matt, bạn sẽ làm gì khi bị cả thế giới quay lưng trong giây phút tính mạng gặp nguy hiểm?','Tobias Weber',0,NULL,'2023-05-12',97,'PHI VỤ NỬA ĐÊM (CHIẾU LẠI)','https://www.youtube.com/watch?v=O2pi3HMEVJo','2023-05-02 00:00:00.000000'),(18,'Thái Hòa, Thu Trang, Tiến Luật, NSND Hồng Vân, Huỳnh Phương, Vinh Râu, Thái Vũ,...','Lấy cảm hứng từ web drama Chuyện Xóm Tui, phiên bản điện ảnh sẽ mang một màu sắc hoàn toàn khác: hài hước hơn, gần gũi và nhiều cảm xúc hơn Bộ phim là câu chuyện của Nhót - người phụ nữ “chưa kịp già” đã sắp bị mãn kinh, vội vàng đi tìm chồng. Nhưng sâu thẳm trong cô, là khao khát muốn có một đứa con và luôn muốn hàn gắn với người cha suốt ngày say xỉn của mình.','Vũ Ngọc Đãng',0,NULL,'2023-04-28',112,'CON NHÓT MÓT CHỒNG','https://www.youtube.com/watch?v=QDLyLlmex-Y','2023-04-18 00:00:00.000000');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie_image`
--

DROP TABLE IF EXISTS `movie_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie_image` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `movie_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK171int0q4s8nv3exygxte7xls` (`movie_id`),
  CONSTRAINT `FK171int0q4s8nv3exygxte7xls` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie_image`
--

LOCK TABLES `movie_image` WRITE;
/*!40000 ALTER TABLE `movie_image` DISABLE KEYS */;
INSERT INTO `movie_image` VALUES (1,'https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/p/o/pope_sexorcist_poster_h_m_ng_c.jpg',1),(2,'https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/s/u/super_mario_bros._payoff_poster.jpg',2),(3,'https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/3/5/350x495_1.png',3),(4,'https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/7/0/700x1000___2.jpg',4),(5,'https://moveek.com/storage/media/cache/tall/644047fbbefbc079765585.jpg',5),(6,'https://moveek.com/storage/media/cache/tall/64113905caeca623368219.jpeg',6),(7,'https://moveek.com/storage/media/cache/tall/6448e397d04d6301077542.jpeg',7),(8,'https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/f/i/fireheart_main-poster_sneak-show_1_.jpg',8),(9,'https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/p/o/poster_nktt_4.jpg',9),(10,'https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/t/h/the_accursed.c_n_th_nh_n_t_c_i_m_-_payoff_poster_-_kc_12.05.2023_1_.jpg',10),(14,'https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/p/o/poster-50x70cm-1.jpg',13),(15,'https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/7/0/700x1000_5_.jpg',14),(16,'https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/l/m/lm6_2x3_layout.jpg',15),(17,'https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/8/0/800x1000_1_.jpg',16),(18,'https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/l/a/late_shift_-_700x1000.jpg',17),(19,'https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/240x388/c88460ec71d04fa96e628a21494d2fd3/7/0/700x1000_2_.jpg',18);
/*!40000 ALTER TABLE `movie_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie_show_time`
--

DROP TABLE IF EXISTS `movie_show_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie_show_time` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `show_date` date DEFAULT NULL,
  `movie_id` bigint DEFAULT NULL,
  `screen_id` bigint DEFAULT NULL,
  `showtime_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKr2qla559u8mer7015y953dka0` (`movie_id`),
  KEY `FKr27wj5qyn3cc31xfgtl5b7unl` (`screen_id`),
  KEY `FKsxpmp3yl2sg5cc19j2c7wx2q0` (`showtime_id`),
  CONSTRAINT `FKr27wj5qyn3cc31xfgtl5b7unl` FOREIGN KEY (`screen_id`) REFERENCES `screen` (`id`),
  CONSTRAINT `FKr2qla559u8mer7015y953dka0` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`),
  CONSTRAINT `FKsxpmp3yl2sg5cc19j2c7wx2q0` FOREIGN KEY (`showtime_id`) REFERENCES `showtime` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie_show_time`
--

LOCK TABLES `movie_show_time` WRITE;
/*!40000 ALTER TABLE `movie_show_time` DISABLE KEYS */;
INSERT INTO `movie_show_time` VALUES (7,'2023-05-03',2,1,1),(8,'2023-05-03',2,1,3),(9,'2023-05-03',2,1,5),(10,'2023-05-03',2,1,7),(11,'2023-05-03',2,2,2),(12,'2023-05-03',2,2,4),(13,'2023-05-03',2,2,6),(14,'2023-05-03',2,2,8),(15,'2023-05-04',2,1,1),(16,'2023-05-04',2,1,3),(17,'2023-05-04',2,1,5),(18,'2023-05-04',2,1,7),(19,'2023-05-04',2,2,2),(20,'2023-05-04',2,2,4),(21,'2023-05-04',2,2,6),(22,'2023-05-04',2,2,8),(23,'2023-05-05',2,1,1),(24,'2023-05-05',2,1,3),(25,'2023-05-05',2,1,5),(26,'2023-05-05',2,1,7),(27,'2023-05-05',2,2,2),(28,'2023-05-05',2,2,4),(29,'2023-05-05',2,2,6),(30,'2023-05-05',2,2,8),(31,'2023-05-06',2,1,1),(32,'2023-05-06',2,1,3),(33,'2023-05-06',2,1,5),(34,'2023-05-06',2,1,7),(35,'2023-05-06',2,2,2),(36,'2023-05-06',2,2,4),(37,'2023-05-06',2,2,6),(38,'2023-05-06',2,2,8),(39,'2023-05-07',2,1,1),(40,'2023-05-07',2,1,3),(41,'2023-05-07',2,2,2),(42,'2023-05-07',2,2,4),(43,'2023-05-07',2,2,6),(44,'2023-05-07',2,2,8),(45,'2023-05-09',2,1,1),(46,'2023-05-09',2,1,3),(47,'2023-05-09',2,1,5),(48,'2023-05-09',2,1,7),(49,'2023-05-07',2,1,5),(50,'2023-05-07',2,1,7),(51,'2023-05-09',2,2,2),(52,'2023-05-09',2,2,4),(53,'2023-05-09',2,2,6),(54,'2023-05-09',2,2,8),(55,'2023-05-08',2,1,1),(56,'2023-05-08',2,1,3),(57,'2023-05-08',2,1,5),(58,'2023-05-08',2,1,7),(59,'2023-05-08',2,2,2),(60,'2023-05-08',2,2,4),(61,'2023-05-08',2,2,6),(62,'2023-05-08',2,2,8),(63,'2023-05-10',2,1,1),(64,'2023-05-10',2,1,3),(65,'2023-05-10',2,1,5),(66,'2023-05-10',2,1,7),(67,'2023-05-10',2,2,2),(68,'2023-05-10',2,2,4),(69,'2023-05-10',2,2,6),(70,'2023-05-10',2,2,8),(71,'2023-05-11',2,1,1),(94,'2023-05-11',2,1,3),(95,'2023-05-11',2,1,5),(96,'2023-05-11',2,1,7),(97,'2023-05-11',2,2,2),(98,'2023-05-11',2,2,4),(99,'2023-05-11',2,2,6),(100,'2023-05-11',2,2,8),(116,'2023-05-21',2,1,1),(117,'2023-05-21',2,1,3),(118,'2023-05-21',2,1,5),(119,'2023-05-21',2,1,7),(120,'2023-05-21',2,2,2),(121,'2023-05-21',2,2,4),(122,'2023-05-21',2,2,6),(123,'2023-05-21',2,2,8),(124,'2023-05-22',2,1,1),(125,'2023-05-22',2,1,3),(126,'2023-05-22',2,1,5),(127,'2023-05-22',2,1,7),(128,'2023-05-22',2,2,2),(129,'2023-05-22',2,2,4),(130,'2023-05-22',2,2,6),(131,'2023-05-22',2,2,8),(132,'2023-05-23',2,1,1),(133,'2023-05-23',2,1,3),(134,'2023-05-23',2,1,5),(135,'2023-05-23',2,1,7),(136,'2023-05-23',2,2,2),(137,'2023-05-23',2,2,4),(138,'2023-05-23',2,2,6),(139,'2023-05-23',2,2,8),(140,'2023-05-24',2,1,1),(141,'2023-05-24',2,1,3),(142,'2023-05-24',2,1,5),(143,'2023-05-24',2,1,7),(144,'2023-05-24',2,2,2),(145,'2023-05-24',2,2,4),(146,'2023-05-24',2,2,6),(147,'2023-05-24',2,2,8),(148,'2023-05-25',2,1,1),(149,'2023-05-25',2,1,3),(150,'2023-05-25',2,1,5),(151,'2023-05-25',2,1,7),(152,'2023-05-25',2,2,2),(153,'2023-05-25',2,2,4),(154,'2023-05-25',2,2,6),(155,'2023-05-25',2,2,8),(156,'2023-05-26',2,1,1),(157,'2023-05-26',2,1,3),(158,'2023-05-26',2,1,5),(159,'2023-05-26',2,1,7),(160,'2023-05-26',2,2,2),(161,'2023-05-26',2,2,4),(162,'2023-05-26',2,2,6),(163,'2023-05-26',2,2,8),(164,'2023-05-27',2,1,1),(165,'2023-05-27',2,1,3),(166,'2023-05-27',2,1,5),(167,'2023-05-27',2,1,7),(168,'2023-05-27',2,2,2),(169,'2023-05-27',2,2,4),(170,'2023-05-27',2,2,6),(171,'2023-05-27',2,2,8),(172,'2023-05-28',2,1,1),(173,'2023-05-28',2,1,3),(174,'2023-05-28',2,1,5),(175,'2023-05-28',2,1,7),(176,'2023-05-28',2,2,2),(177,'2023-05-28',2,2,4),(178,'2023-05-28',2,2,6),(179,'2023-05-28',2,2,8),(180,'2023-05-29',2,1,1),(181,'2023-05-29',2,1,3),(182,'2023-05-29',2,1,5),(183,'2023-05-29',2,1,7),(184,'2023-05-29',2,2,2),(185,'2023-05-29',2,2,4),(186,'2023-05-29',2,2,6),(187,'2023-05-29',2,2,8),(188,'2023-05-30',2,1,1),(189,'2023-05-30',2,1,3),(190,'2023-05-30',2,1,5),(191,'2023-05-30',2,1,7),(192,'2023-05-30',2,2,2),(193,'2023-05-30',2,2,4),(194,'2023-05-30',2,2,6),(195,'2023-05-30',2,2,8),(196,'2023-04-14',1,1,1),(197,'2023-04-14',1,1,3),(198,'2023-04-14',1,1,5),(199,'2023-04-14',1,1,7),(200,'2023-04-14',1,2,2),(201,'2023-04-14',1,2,4),(202,'2023-04-14',1,2,6),(203,'2023-04-14',1,2,8),(204,'2023-04-15',1,1,1),(205,'2023-04-15',1,1,3),(206,'2023-04-15',1,1,5),(207,'2023-04-15',1,1,7),(208,'2023-04-15',1,2,2),(209,'2023-04-15',1,2,4),(210,'2023-04-15',1,2,6),(211,'2023-04-15',1,2,8),(212,'2023-04-16',1,1,1),(213,'2023-04-16',1,1,3),(214,'2023-04-16',1,1,5),(215,'2023-04-16',1,1,7),(216,'2023-04-16',1,2,2),(217,'2023-04-16',1,2,4),(218,'2023-04-16',1,2,6),(219,'2023-04-16',1,2,8),(220,'2023-04-17',1,1,1),(221,'2023-04-17',1,1,3),(222,'2023-04-17',1,1,5),(223,'2023-04-17',1,1,7),(224,'2023-04-17',1,2,2),(225,'2023-04-17',1,2,4),(226,'2023-04-17',1,2,6),(227,'2023-04-17',1,2,8),(228,'2023-04-18',1,1,1),(229,'2023-04-18',1,1,3),(230,'2023-04-18',1,1,5),(231,'2023-04-18',1,1,7),(232,'2023-04-18',1,2,2),(233,'2023-04-18',1,2,4),(234,'2023-04-18',1,2,6),(235,'2023-04-18',1,2,8),(236,'2023-04-19',1,1,1),(237,'2023-04-19',1,1,3),(238,'2023-04-19',1,1,5),(239,'2023-04-19',1,1,7),(240,'2023-04-19',1,2,2),(241,'2023-04-19',1,2,4),(242,'2023-04-19',1,2,6),(243,'2023-04-19',1,2,8),(244,'2023-05-22',1,1,1),(245,'2023-05-22',1,1,3),(246,'2023-05-22',1,1,5),(247,'2023-05-22',1,1,7),(248,'2023-05-22',1,2,2),(249,'2023-05-22',1,2,4),(250,'2023-05-22',1,2,6),(251,'2023-05-22',1,2,8),(252,'2023-05-23',1,1,1),(253,'2023-05-23',1,1,3),(254,'2023-05-23',1,1,5),(255,'2023-05-23',1,1,7),(256,'2023-05-23',1,2,2),(257,'2023-05-23',1,2,4),(258,'2023-05-23',1,2,6),(259,'2023-05-23',1,2,8),(260,'2023-05-24',1,1,1),(261,'2023-05-24',1,1,3),(262,'2023-05-24',1,1,5),(263,'2023-05-24',1,1,7),(264,'2023-05-24',1,2,2),(265,'2023-05-24',1,2,4),(266,'2023-05-24',1,2,6),(267,'2023-05-24',1,2,8),(268,'2023-05-25',1,1,1),(269,'2023-05-25',1,1,3),(270,'2023-05-25',1,1,5),(271,'2023-05-25',1,1,7),(272,'2023-05-25',1,2,2),(273,'2023-05-25',1,2,4),(274,'2023-05-25',1,2,6),(275,'2023-05-25',1,2,8),(276,'2023-05-26',1,1,1),(277,'2023-05-26',1,1,3),(278,'2023-05-26',1,1,5),(279,'2023-05-26',1,1,7),(280,'2023-05-26',1,2,2),(281,'2023-05-26',1,2,4),(282,'2023-05-26',1,2,6),(283,'2023-05-26',1,2,8),(284,'2023-05-27',1,1,1),(285,'2023-05-27',1,1,3),(286,'2023-05-27',1,1,5),(287,'2023-05-27',1,1,7),(288,'2023-05-27',1,2,2),(289,'2023-05-27',1,2,4),(290,'2023-05-27',1,2,6),(291,'2023-05-27',1,2,8),(292,'2023-05-28',1,1,1),(293,'2023-05-28',1,1,3),(294,'2023-05-28',1,1,5),(295,'2023-05-28',1,1,7),(296,'2023-05-28',1,2,2),(297,'2023-05-28',1,2,4),(298,'2023-05-28',1,2,6),(299,'2023-05-28',1,2,8),(300,'2023-05-29',1,1,1),(301,'2023-05-29',1,1,3),(302,'2023-05-29',1,1,5),(303,'2023-05-29',1,1,7),(304,'2023-05-29',1,2,2),(305,'2023-05-29',1,2,4),(306,'2023-05-29',1,2,6),(307,'2023-05-29',1,2,8),(308,'2023-05-24',15,1,1),(309,'2023-05-24',15,1,3),(310,'2023-05-24',15,1,5),(311,'2023-05-24',15,1,7),(312,'2023-05-24',15,2,2),(313,'2023-05-24',15,2,4),(314,'2023-05-24',15,2,6),(315,'2023-05-24',15,2,8),(316,'2023-05-25',15,1,1),(317,'2023-05-25',15,1,3),(318,'2023-05-25',15,1,5),(319,'2023-05-25',15,1,7),(320,'2023-05-25',15,2,2),(321,'2023-05-25',15,2,4),(322,'2023-05-25',15,2,6),(323,'2023-05-25',15,2,8),(324,'2023-05-20',15,1,1),(325,'2023-05-20',15,1,3),(326,'2023-05-20',15,1,5),(327,'2023-05-20',15,1,7),(328,'2023-05-20',15,2,2),(329,'2023-05-20',15,2,4),(330,'2023-05-20',15,2,6),(331,'2023-05-20',15,2,8),(332,'2023-05-21',15,1,1),(333,'2023-05-21',15,1,3),(334,'2023-05-21',15,1,5),(335,'2023-05-21',15,1,7),(336,'2023-05-21',15,2,2),(337,'2023-05-21',15,2,4),(338,'2023-05-21',15,2,6),(339,'2023-05-21',15,2,8),(340,'2023-05-22',15,1,1),(341,'2023-05-22',15,1,3),(342,'2023-05-22',15,1,5),(343,'2023-05-22',15,1,7),(344,'2023-05-22',15,2,2),(345,'2023-05-22',15,2,4),(346,'2023-05-22',15,2,6),(347,'2023-05-22',15,2,8),(348,'2023-05-23',15,1,1),(349,'2023-05-23',15,1,3),(350,'2023-05-23',15,1,5),(351,'2023-05-23',15,1,7),(352,'2023-05-23',15,2,2),(353,'2023-05-23',15,2,4),(354,'2023-05-23',15,2,6),(355,'2023-05-23',15,2,8),(356,'2023-05-26',15,1,1),(357,'2023-05-26',15,1,3),(358,'2023-05-26',15,1,5),(359,'2023-05-26',15,1,7),(360,'2023-05-26',15,2,2),(361,'2023-05-26',15,2,4),(362,'2023-05-26',15,2,6),(363,'2023-05-26',15,2,8),(364,'2023-04-28',15,1,1),(365,'2023-04-28',15,1,3),(366,'2023-04-28',15,1,5),(367,'2023-04-28',15,1,7),(368,'2023-04-28',15,2,2),(369,'2023-04-28',15,2,4),(370,'2023-04-28',15,2,6),(371,'2023-04-28',15,2,8),(372,'2023-05-27',15,1,1),(373,'2023-05-27',15,1,3),(374,'2023-05-27',15,1,5),(375,'2023-05-27',15,1,7),(376,'2023-05-27',15,2,2),(377,'2023-05-27',15,2,4),(378,'2023-05-27',15,2,6),(379,'2023-05-27',15,2,8),(380,'2023-05-28',15,1,1),(381,'2023-05-28',15,1,3),(382,'2023-05-28',15,1,5),(383,'2023-05-28',15,1,7),(384,'2023-05-28',15,2,2),(385,'2023-05-28',15,2,4),(386,'2023-05-28',15,2,6),(387,'2023-05-28',15,2,8),(388,'2023-05-29',15,1,1),(389,'2023-05-29',15,1,3),(390,'2023-05-29',15,1,5),(391,'2023-05-29',15,1,7),(392,'2023-05-29',15,2,2),(393,'2023-05-29',15,2,4),(394,'2023-05-29',15,2,6),(395,'2023-05-29',15,2,8),(396,'2023-05-30',15,1,1),(397,'2023-05-30',15,1,3),(398,'2023-05-30',15,1,5),(399,'2023-05-30',15,1,7),(400,'2023-05-30',15,2,2),(401,'2023-05-30',15,2,4),(402,'2023-05-30',15,2,6),(403,'2023-05-30',15,2,8),(404,'2023-05-25',18,1,1),(405,'2023-05-25',18,1,3),(406,'2023-05-25',18,1,5),(407,'2023-05-25',18,1,7),(408,'2023-05-25',18,2,2),(409,'2023-05-25',18,2,4),(410,'2023-05-25',18,2,6),(411,'2023-05-25',18,2,8),(412,'2023-05-26',18,1,1),(413,'2023-05-26',18,1,3),(414,'2023-05-26',18,1,5),(415,'2023-05-26',18,1,7),(416,'2023-05-26',18,2,2),(417,'2023-05-26',18,2,4),(418,'2023-05-26',18,2,6),(419,'2023-05-26',18,2,8),(420,'2023-05-27',18,1,1),(421,'2023-05-27',18,1,3),(422,'2023-05-27',18,1,5),(423,'2023-05-27',18,1,7),(424,'2023-05-27',18,2,2),(425,'2023-05-27',18,2,4),(426,'2023-05-27',18,2,6),(427,'2023-05-27',18,2,8),(428,'2023-05-28',18,1,1),(429,'2023-05-28',18,1,3),(430,'2023-05-28',18,1,5),(431,'2023-05-28',18,1,7),(432,'2023-05-28',18,2,2),(433,'2023-05-28',18,2,4),(434,'2023-05-28',18,2,6),(435,'2023-05-28',18,2,8),(436,'2023-05-24',18,1,1),(437,'2023-05-24',18,1,3),(438,'2023-05-24',18,1,5),(439,'2023-05-24',18,1,7),(440,'2023-05-24',18,2,2),(441,'2023-05-24',18,2,4),(442,'2023-05-24',18,2,6),(443,'2023-05-24',18,2,8),(444,'2023-05-29',18,1,1),(445,'2023-05-29',18,1,3),(446,'2023-05-29',18,1,5),(447,'2023-05-29',18,1,7),(448,'2023-05-29',18,2,2),(449,'2023-05-29',18,2,4),(450,'2023-05-29',18,2,6),(451,'2023-05-29',18,2,8),(452,'2023-05-22',18,1,1),(453,'2023-05-22',18,1,3),(454,'2023-05-22',18,1,5),(455,'2023-05-22',18,1,7),(456,'2023-05-22',18,2,2),(457,'2023-05-22',18,2,4),(458,'2023-05-22',18,2,6),(459,'2023-05-22',18,2,8),(460,'2023-05-23',18,1,1),(461,'2023-05-23',18,1,3),(462,'2023-05-23',18,1,5),(463,'2023-05-23',18,1,7),(464,'2023-05-23',18,2,2),(465,'2023-05-23',18,2,4),(466,'2023-05-23',18,2,6),(467,'2023-05-23',18,2,8),(468,'2023-05-20',18,1,1),(469,'2023-05-20',18,1,3),(470,'2023-05-20',18,1,5),(471,'2023-05-20',18,1,7),(472,'2023-05-20',18,2,2),(473,'2023-05-20',18,2,4),(474,'2023-05-20',18,2,6),(475,'2023-05-20',18,2,8),(476,'2023-05-21',18,1,1),(477,'2023-05-21',18,1,3),(478,'2023-05-21',18,1,5),(479,'2023-05-21',18,1,7),(480,'2023-05-21',18,2,2),(481,'2023-05-21',18,2,4),(482,'2023-05-21',18,2,6),(483,'2023-05-21',18,2,8),(484,'2023-05-20',3,1,1),(485,'2023-05-20',3,1,3),(486,'2023-05-20',3,1,5),(487,'2023-05-20',3,1,7),(488,'2023-05-20',3,2,2),(489,'2023-05-20',3,2,4),(490,'2023-05-20',3,2,6),(491,'2023-05-20',3,2,8),(492,'2023-05-21',3,1,1),(493,'2023-05-21',3,1,3),(494,'2023-05-21',3,1,5),(495,'2023-05-21',3,1,7),(496,'2023-05-21',3,2,2),(497,'2023-05-21',3,2,4),(498,'2023-05-21',3,2,6),(499,'2023-05-21',3,2,8),(500,'2023-05-22',3,1,1),(501,'2023-05-22',3,1,3),(502,'2023-05-22',3,1,5),(503,'2023-05-22',3,1,7),(504,'2023-05-22',3,2,2),(505,'2023-05-22',3,2,4),(506,'2023-05-22',3,2,6),(507,'2023-05-22',3,2,8),(508,'2023-05-23',3,1,1),(509,'2023-05-23',3,1,3),(510,'2023-05-23',3,1,5),(511,'2023-05-23',3,1,7),(512,'2023-05-23',3,2,2),(513,'2023-05-23',3,2,4),(514,'2023-05-23',3,2,6),(515,'2023-05-23',3,2,8),(516,'2023-05-24',3,1,1),(517,'2023-05-24',3,1,3),(518,'2023-05-24',3,1,5),(519,'2023-05-24',3,1,7),(520,'2023-05-24',3,2,2),(521,'2023-05-24',3,2,4),(522,'2023-05-24',3,2,6),(523,'2023-05-24',3,2,8),(524,'2023-05-25',3,1,1),(525,'2023-05-25',3,1,3),(526,'2023-05-25',3,1,5),(527,'2023-05-25',3,1,7),(528,'2023-05-25',3,2,2),(529,'2023-05-25',3,2,4),(530,'2023-05-25',3,2,6),(531,'2023-05-25',3,2,8),(532,'2023-05-26',3,1,1),(533,'2023-05-26',3,1,3),(534,'2023-05-26',3,1,5),(535,'2023-05-26',3,1,7),(536,'2023-05-26',3,2,2),(537,'2023-05-26',3,2,4),(538,'2023-05-26',3,2,6),(539,'2023-05-26',3,2,8),(540,'2023-05-27',3,1,1),(541,'2023-05-27',3,1,3),(542,'2023-05-27',3,1,5),(543,'2023-05-27',3,1,7),(544,'2023-05-27',3,2,2),(545,'2023-05-27',3,2,4),(546,'2023-05-27',3,2,6),(547,'2023-05-27',3,2,8),(548,'2023-05-28',3,1,1),(549,'2023-05-28',3,1,3),(550,'2023-05-28',3,1,5),(551,'2023-05-28',3,1,7),(552,'2023-05-28',3,2,2),(553,'2023-05-28',3,2,4),(554,'2023-05-28',3,2,6),(555,'2023-05-28',3,2,8),(556,'2023-05-20',5,1,1),(557,'2023-05-20',5,1,3),(558,'2023-05-20',5,1,5),(559,'2023-05-20',5,1,7),(560,'2023-05-20',5,2,2),(561,'2023-05-20',5,2,4),(562,'2023-05-20',5,2,6),(563,'2023-05-20',5,2,8),(564,'2023-05-21',5,1,1),(565,'2023-05-21',5,1,3),(566,'2023-05-21',5,1,5),(567,'2023-05-21',5,1,7),(568,'2023-05-21',5,2,2),(569,'2023-05-21',5,2,4),(570,'2023-05-21',5,2,6),(571,'2023-05-21',5,2,8),(572,'2023-05-22',5,1,1),(573,'2023-05-22',5,1,3),(574,'2023-05-22',5,1,5),(575,'2023-05-22',5,1,7),(576,'2023-05-22',5,2,2),(577,'2023-05-22',5,2,4),(578,'2023-05-22',5,2,6),(579,'2023-05-22',5,2,8),(580,'2023-05-23',5,1,1),(581,'2023-05-23',5,1,3),(582,'2023-05-23',5,1,5),(583,'2023-05-23',5,1,7),(584,'2023-05-23',5,2,2),(585,'2023-05-23',5,2,4),(586,'2023-05-23',5,2,6),(587,'2023-05-23',5,2,8),(588,'2023-05-24',5,1,1),(589,'2023-05-24',5,1,3),(590,'2023-05-24',5,1,5),(591,'2023-05-24',5,1,7),(592,'2023-05-24',5,2,2),(593,'2023-05-24',5,2,4),(594,'2023-05-24',5,2,6),(595,'2023-05-24',5,2,8),(596,'2023-05-25',5,1,1),(597,'2023-05-25',5,1,3),(598,'2023-05-25',5,1,5),(599,'2023-05-25',5,1,7),(600,'2023-05-25',5,2,2),(601,'2023-05-25',5,2,4),(602,'2023-05-25',5,2,6),(603,'2023-05-25',5,2,8),(604,'2023-05-26',5,1,1),(605,'2023-05-26',5,1,3),(606,'2023-05-26',5,1,5),(607,'2023-05-26',5,1,7),(608,'2023-05-26',5,2,2),(609,'2023-05-26',5,2,4),(610,'2023-05-26',5,2,6),(611,'2023-05-26',5,2,8),(612,'2023-05-27',5,1,1),(613,'2023-05-27',5,1,3),(614,'2023-05-27',5,1,5),(615,'2023-05-27',5,1,7),(616,'2023-05-27',5,2,2),(617,'2023-05-27',5,2,4),(618,'2023-05-27',5,2,6),(619,'2023-05-27',5,2,8),(620,'2023-05-28',5,1,1),(621,'2023-05-28',5,1,3),(622,'2023-05-28',5,1,5),(623,'2023-05-28',5,1,7),(624,'2023-05-28',5,2,2),(625,'2023-05-28',5,2,4),(626,'2023-05-28',5,2,6),(627,'2023-05-28',5,2,8),(628,'2023-05-20',8,1,1),(629,'2023-05-20',8,1,3),(630,'2023-05-20',8,1,5),(631,'2023-05-20',8,1,7),(632,'2023-05-20',8,2,2),(633,'2023-05-20',8,2,4),(634,'2023-05-20',8,2,6),(635,'2023-05-20',8,2,8),(636,'2023-05-21',8,1,1),(637,'2023-05-21',8,1,3),(638,'2023-05-21',8,1,5),(639,'2023-05-21',8,1,7),(640,'2023-05-21',8,2,2),(641,'2023-05-21',8,2,4),(642,'2023-05-21',8,2,6),(643,'2023-05-21',8,2,8),(644,'2023-05-22',8,1,1),(645,'2023-05-22',8,1,3),(646,'2023-05-22',8,1,5),(647,'2023-05-22',8,1,7),(648,'2023-05-22',8,2,2),(649,'2023-05-22',8,2,4),(650,'2023-05-22',8,2,6),(651,'2023-05-22',8,2,8),(652,'2023-05-23',8,1,1),(653,'2023-05-23',8,1,3),(654,'2023-05-23',8,1,5),(655,'2023-05-23',8,1,7),(656,'2023-05-23',8,2,2),(657,'2023-05-23',8,2,4),(658,'2023-05-23',8,2,6),(659,'2023-05-23',8,2,8),(660,'2023-05-24',8,1,1),(661,'2023-05-24',8,1,3),(662,'2023-05-24',8,1,5),(663,'2023-05-24',8,1,7),(664,'2023-05-24',8,2,2),(665,'2023-05-24',8,2,4),(666,'2023-05-24',8,2,6),(667,'2023-05-24',8,2,8),(668,'2023-05-25',8,1,1),(669,'2023-05-25',8,1,3),(670,'2023-05-25',8,1,5),(671,'2023-05-25',8,1,7),(672,'2023-05-25',8,2,2),(673,'2023-05-25',8,2,4),(674,'2023-05-25',8,2,6),(675,'2023-05-25',8,2,8),(676,'2023-05-26',8,1,1),(677,'2023-05-26',8,1,3),(678,'2023-05-26',8,1,5),(679,'2023-05-26',8,1,7),(680,'2023-05-26',8,2,2),(681,'2023-05-26',8,2,4),(682,'2023-05-26',8,2,6),(683,'2023-05-26',8,2,8),(684,'2023-05-27',8,1,1),(685,'2023-05-27',8,1,3),(686,'2023-05-27',8,1,5),(687,'2023-05-27',8,1,7),(688,'2023-05-27',8,2,2),(689,'2023-05-27',8,2,4),(690,'2023-05-27',8,2,6),(691,'2023-05-27',8,2,8),(692,'2023-05-28',8,1,1),(693,'2023-05-28',8,1,3),(694,'2023-05-28',8,1,5),(695,'2023-05-28',8,1,7),(696,'2023-05-28',8,2,2),(697,'2023-05-28',8,2,4),(698,'2023-05-28',8,2,6),(699,'2023-05-28',8,2,8),(700,'2023-05-20',9,1,1),(701,'2023-05-20',9,1,3),(702,'2023-05-20',9,1,5),(703,'2023-05-20',9,1,7),(704,'2023-05-20',9,2,2),(705,'2023-05-20',9,2,4),(706,'2023-05-20',9,2,6),(707,'2023-05-20',9,2,8),(708,'2023-05-21',9,1,1),(709,'2023-05-21',9,1,3),(710,'2023-05-21',9,1,5),(711,'2023-05-21',9,1,7),(712,'2023-05-21',9,2,2),(713,'2023-05-21',9,2,4),(714,'2023-05-21',9,2,6),(715,'2023-05-21',9,2,8),(716,'2023-05-22',9,1,1),(717,'2023-05-22',9,1,3),(718,'2023-05-22',9,1,5),(719,'2023-05-22',9,1,7),(720,'2023-05-22',9,2,2),(721,'2023-05-22',9,2,4),(722,'2023-05-22',9,2,6),(723,'2023-05-22',9,2,8),(724,'2023-05-23',9,1,1),(725,'2023-05-23',9,1,3),(726,'2023-05-23',9,1,5),(727,'2023-05-23',9,1,7),(728,'2023-05-23',9,2,2),(729,'2023-05-23',9,2,4),(730,'2023-05-23',9,2,6),(731,'2023-05-23',9,2,8),(732,'2023-05-24',9,1,1),(733,'2023-05-24',9,1,3),(734,'2023-05-24',9,1,5),(735,'2023-05-24',9,1,7),(736,'2023-05-24',9,2,2),(737,'2023-05-24',9,2,4),(738,'2023-05-24',9,2,6),(739,'2023-05-24',9,2,8),(740,'2023-05-25',9,1,1),(741,'2023-05-25',9,1,3),(742,'2023-05-25',9,1,5),(743,'2023-05-25',9,1,7),(744,'2023-05-25',9,2,2),(745,'2023-05-25',9,2,4),(746,'2023-05-25',9,2,6),(747,'2023-05-25',9,2,8),(748,'2023-05-26',9,1,1),(749,'2023-05-26',9,1,3),(750,'2023-05-26',9,1,5),(751,'2023-05-26',9,1,7),(752,'2023-05-26',9,2,2),(753,'2023-05-26',9,2,4),(754,'2023-05-26',9,2,6),(755,'2023-05-26',9,2,8),(756,'2023-05-27',9,1,1),(757,'2023-05-27',9,1,3),(758,'2023-05-27',9,1,5),(759,'2023-05-27',9,1,7),(760,'2023-05-27',9,2,2),(761,'2023-05-27',9,2,4),(762,'2023-05-27',9,2,6),(763,'2023-05-27',9,2,8),(764,'2023-05-28',9,1,1),(765,'2023-05-28',9,1,3),(766,'2023-05-28',9,1,5),(767,'2023-05-28',9,1,7),(768,'2023-05-28',9,2,2),(769,'2023-05-28',9,2,4),(770,'2023-05-28',9,2,6),(771,'2023-05-28',9,2,8),(772,'2023-05-20',10,1,1),(773,'2023-05-20',10,1,3),(774,'2023-05-20',10,1,5),(775,'2023-05-20',10,1,7),(776,'2023-05-20',10,2,2),(777,'2023-05-20',10,2,4),(778,'2023-05-20',10,2,6),(779,'2023-05-20',10,2,8),(780,'2023-05-21',10,1,1),(781,'2023-05-21',10,1,3),(782,'2023-05-21',10,1,5),(783,'2023-05-21',10,1,7),(784,'2023-05-21',10,2,2),(785,'2023-05-21',10,2,4),(786,'2023-05-21',10,2,6),(787,'2023-05-21',10,2,8),(788,'2023-05-22',10,1,1),(789,'2023-05-22',10,1,3),(790,'2023-05-22',10,1,5),(791,'2023-05-22',10,1,7),(792,'2023-05-22',10,2,2),(793,'2023-05-22',10,2,4),(794,'2023-05-22',10,2,6),(795,'2023-05-22',10,2,8),(796,'2023-05-23',10,1,1),(797,'2023-05-23',10,1,3),(798,'2023-05-23',10,1,5),(799,'2023-05-23',10,1,7),(800,'2023-05-23',10,2,2),(801,'2023-05-23',10,2,4),(802,'2023-05-23',10,2,6),(803,'2023-05-23',10,2,8),(804,'2023-05-24',10,1,1),(805,'2023-05-24',10,1,3),(806,'2023-05-24',10,1,5),(807,'2023-05-24',10,1,7),(808,'2023-05-24',10,2,2),(809,'2023-05-24',10,2,4),(810,'2023-05-24',10,2,6),(811,'2023-05-24',10,2,8),(812,'2023-05-25',10,1,1),(813,'2023-05-25',10,1,3),(814,'2023-05-25',10,1,5),(815,'2023-05-25',10,1,7),(816,'2023-05-25',10,2,2),(817,'2023-05-25',10,2,4),(818,'2023-05-25',10,2,6),(819,'2023-05-25',10,2,8),(820,'2023-05-26',10,1,1),(821,'2023-05-26',10,1,3),(822,'2023-05-26',10,1,5),(823,'2023-05-26',10,1,7),(824,'2023-05-26',10,2,2),(825,'2023-05-26',10,2,4),(826,'2023-05-26',10,2,6),(827,'2023-05-26',10,2,8),(828,'2023-05-27',10,1,1),(829,'2023-05-27',10,1,3),(830,'2023-05-27',10,1,5),(831,'2023-05-27',10,1,7),(832,'2023-05-27',10,2,2),(833,'2023-05-27',10,2,4),(834,'2023-05-27',10,2,6),(835,'2023-05-27',10,2,8),(836,'2023-05-28',10,1,1),(837,'2023-05-28',10,1,3),(838,'2023-05-28',10,1,5),(839,'2023-05-28',10,1,7),(840,'2023-05-28',10,2,2),(841,'2023-05-28',10,2,4),(842,'2023-05-28',10,2,6),(843,'2023-05-28',10,2,8),(844,'2023-05-20',13,1,1),(845,'2023-05-20',13,1,3),(846,'2023-05-20',13,1,5),(847,'2023-05-20',13,1,7),(848,'2023-05-20',13,2,2),(849,'2023-05-20',13,2,4),(850,'2023-05-20',13,2,6),(851,'2023-05-20',13,2,8),(852,'2023-05-21',13,1,1),(853,'2023-05-21',13,1,3),(854,'2023-05-21',13,1,5),(855,'2023-05-21',13,1,7),(856,'2023-05-21',13,2,2),(857,'2023-05-21',13,2,4),(858,'2023-05-21',13,2,6),(859,'2023-05-21',13,2,8),(860,'2023-05-22',13,1,1),(861,'2023-05-22',13,1,3),(862,'2023-05-22',13,1,5),(863,'2023-05-22',13,1,7),(864,'2023-05-22',13,2,2),(865,'2023-05-22',13,2,4),(866,'2023-05-22',13,2,6),(867,'2023-05-22',13,2,8),(868,'2023-05-23',13,1,1),(869,'2023-05-23',13,1,3),(870,'2023-05-23',13,1,5),(871,'2023-05-23',13,1,7),(872,'2023-05-23',13,2,2),(873,'2023-05-23',13,2,4),(874,'2023-05-23',13,2,6),(875,'2023-05-23',13,2,8),(876,'2023-05-24',13,1,1),(877,'2023-05-24',13,1,3),(878,'2023-05-24',13,1,5),(879,'2023-05-24',13,1,7),(880,'2023-05-24',13,2,2),(881,'2023-05-24',13,2,4),(882,'2023-05-24',13,2,6),(883,'2023-05-24',13,2,8),(884,'2023-05-25',13,1,1),(885,'2023-05-25',13,1,3),(886,'2023-05-25',13,1,5),(887,'2023-05-25',13,1,7),(888,'2023-05-25',13,2,2),(889,'2023-05-25',13,2,4),(890,'2023-05-25',13,2,6),(891,'2023-05-25',13,2,8),(892,'2023-05-26',13,1,1),(893,'2023-05-26',13,1,3),(894,'2023-05-26',13,1,5),(895,'2023-05-26',13,1,7),(896,'2023-05-26',13,2,2),(897,'2023-05-26',13,2,4),(898,'2023-05-26',13,2,6),(899,'2023-05-26',13,2,8),(900,'2023-05-27',13,1,1),(901,'2023-05-27',13,1,3),(902,'2023-05-27',13,1,5),(903,'2023-05-27',13,1,7),(904,'2023-05-27',13,2,2),(905,'2023-05-27',13,2,4),(906,'2023-05-27',13,2,6),(907,'2023-05-27',13,2,8),(908,'2023-05-28',13,1,1),(909,'2023-05-28',13,1,3),(910,'2023-05-28',13,1,5),(911,'2023-05-28',13,1,7),(912,'2023-05-28',13,2,2),(913,'2023-05-28',13,2,4),(914,'2023-05-28',13,2,6),(915,'2023-05-28',13,2,8),(916,'2023-05-20',14,1,1),(917,'2023-05-20',14,1,3),(918,'2023-05-20',14,1,5),(919,'2023-05-20',14,1,7),(920,'2023-05-20',14,2,2),(921,'2023-05-20',14,2,4),(922,'2023-05-20',14,2,6),(923,'2023-05-20',14,2,8),(924,'2023-05-21',14,1,1),(925,'2023-05-21',14,1,3),(926,'2023-05-21',14,1,5),(927,'2023-05-21',14,1,7),(928,'2023-05-21',14,2,2),(929,'2023-05-21',14,2,4),(930,'2023-05-21',14,2,6),(931,'2023-05-21',14,2,8),(932,'2023-05-22',14,1,1),(933,'2023-05-22',14,1,3),(934,'2023-05-22',14,1,5),(935,'2023-05-22',14,1,7),(936,'2023-05-22',14,2,2),(937,'2023-05-22',14,2,4),(938,'2023-05-22',14,2,6),(939,'2023-05-22',14,2,8),(940,'2023-05-23',14,1,1),(941,'2023-05-23',14,1,3),(942,'2023-05-23',14,1,5),(943,'2023-05-23',14,1,7),(944,'2023-05-23',14,2,2),(945,'2023-05-23',14,2,4),(946,'2023-05-23',14,2,6),(947,'2023-05-23',14,2,8),(948,'2023-05-24',14,1,1),(949,'2023-05-24',14,1,3),(950,'2023-05-24',14,1,5),(951,'2023-05-24',14,1,7),(952,'2023-05-24',14,2,2),(953,'2023-05-24',14,2,4),(954,'2023-05-24',14,2,6),(955,'2023-05-24',14,2,8),(956,'2023-05-25',14,1,1),(957,'2023-05-25',14,1,3),(958,'2023-05-25',14,1,5),(959,'2023-05-25',14,1,7),(960,'2023-05-25',14,2,2),(961,'2023-05-25',14,2,4),(962,'2023-05-25',14,2,6),(963,'2023-05-25',14,2,8),(964,'2023-05-26',14,1,1),(965,'2023-05-26',14,1,3),(966,'2023-05-26',14,1,5),(967,'2023-05-26',14,1,7),(968,'2023-05-26',14,2,2),(969,'2023-05-26',14,2,4),(970,'2023-05-26',14,2,6),(971,'2023-05-26',14,2,8),(972,'2023-05-27',14,1,1),(973,'2023-05-27',14,1,3),(974,'2023-05-27',14,1,5),(975,'2023-05-27',14,1,7),(976,'2023-05-27',14,2,2),(977,'2023-05-27',14,2,4),(978,'2023-05-27',14,2,6),(979,'2023-05-27',14,2,8),(980,'2023-05-28',14,1,1),(981,'2023-05-28',14,1,3),(982,'2023-05-28',14,1,5),(983,'2023-05-28',14,1,7),(984,'2023-05-28',14,2,2),(985,'2023-05-28',14,2,4),(986,'2023-05-28',14,2,6),(987,'2023-05-28',14,2,8),(988,'2023-05-20',16,1,1),(989,'2023-05-20',16,1,3),(990,'2023-05-20',16,1,5),(991,'2023-05-20',16,1,7),(992,'2023-05-20',16,2,2),(993,'2023-05-20',16,2,4),(994,'2023-05-20',16,2,6),(995,'2023-05-20',16,2,8),(996,'2023-05-21',16,1,1),(997,'2023-05-21',16,1,3),(998,'2023-05-21',16,1,5),(999,'2023-05-21',16,1,7),(1000,'2023-05-21',16,2,2),(1001,'2023-05-21',16,2,4),(1002,'2023-05-21',16,2,6),(1003,'2023-05-21',16,2,8),(1004,'2023-05-22',16,1,1),(1005,'2023-05-22',16,1,3),(1006,'2023-05-22',16,1,5),(1007,'2023-05-22',16,1,7),(1008,'2023-05-22',16,2,2),(1009,'2023-05-22',16,2,4),(1010,'2023-05-22',16,2,6),(1011,'2023-05-22',16,2,8),(1012,'2023-05-23',16,1,1),(1013,'2023-05-23',16,1,3),(1014,'2023-05-23',16,1,5),(1015,'2023-05-23',16,1,7),(1016,'2023-05-23',16,2,2),(1017,'2023-05-23',16,2,4),(1018,'2023-05-23',16,2,6),(1019,'2023-05-23',16,2,8),(1020,'2023-05-24',16,1,1),(1021,'2023-05-24',16,1,3),(1022,'2023-05-24',16,1,5),(1023,'2023-05-24',16,1,7),(1024,'2023-05-24',16,2,2),(1025,'2023-05-24',16,2,4),(1026,'2023-05-24',16,2,6),(1027,'2023-05-24',16,2,8),(1028,'2023-05-25',16,1,1),(1029,'2023-05-25',16,1,3),(1030,'2023-05-25',16,1,5),(1031,'2023-05-25',16,1,7),(1032,'2023-05-25',16,2,2),(1033,'2023-05-25',16,2,4),(1034,'2023-05-25',16,2,6),(1035,'2023-05-25',16,2,8),(1036,'2023-05-26',16,1,1),(1037,'2023-05-26',16,1,3),(1038,'2023-05-26',16,1,5),(1039,'2023-05-26',16,1,7),(1040,'2023-05-26',16,2,2),(1041,'2023-05-26',16,2,4),(1042,'2023-05-26',16,2,6),(1043,'2023-05-26',16,2,8),(1044,'2023-05-27',16,1,1),(1045,'2023-05-27',16,1,3),(1046,'2023-05-27',16,1,5),(1047,'2023-05-27',16,1,7),(1048,'2023-05-27',16,2,2),(1049,'2023-05-27',16,2,4),(1050,'2023-05-27',16,2,6),(1051,'2023-05-27',16,2,8),(1052,'2023-05-28',16,1,1),(1053,'2023-05-28',16,1,3),(1054,'2023-05-28',16,1,5),(1055,'2023-05-28',16,1,7),(1056,'2023-05-28',16,2,2),(1057,'2023-05-28',16,2,4),(1058,'2023-05-28',16,2,6),(1059,'2023-05-28',16,2,8),(1060,'2023-05-20',17,1,1),(1061,'2023-05-20',17,1,3),(1062,'2023-05-20',17,1,5),(1063,'2023-05-20',17,1,7),(1064,'2023-05-20',17,2,2),(1065,'2023-05-20',17,2,4),(1066,'2023-05-20',17,2,6),(1067,'2023-05-20',17,2,8),(1068,'2023-05-21',17,1,1),(1069,'2023-05-21',17,1,3),(1070,'2023-05-21',17,1,5),(1071,'2023-05-21',17,1,7),(1072,'2023-05-21',17,2,2),(1073,'2023-05-21',17,2,4),(1074,'2023-05-21',17,2,6),(1075,'2023-05-21',17,2,8),(1076,'2023-05-22',17,1,1),(1077,'2023-05-22',17,1,3),(1078,'2023-05-22',17,1,5),(1079,'2023-05-22',17,1,7),(1080,'2023-05-22',17,2,2),(1081,'2023-05-22',17,2,4),(1082,'2023-05-22',17,2,6),(1083,'2023-05-22',17,2,8),(1084,'2023-05-23',17,1,1),(1085,'2023-05-23',17,1,3),(1086,'2023-05-23',17,1,5),(1087,'2023-05-23',17,1,7),(1088,'2023-05-23',17,2,2),(1089,'2023-05-23',17,2,4),(1090,'2023-05-23',17,2,6),(1091,'2023-05-23',17,2,8),(1092,'2023-05-24',17,1,1),(1093,'2023-05-24',17,1,3),(1094,'2023-05-24',17,1,5),(1095,'2023-05-24',17,1,7),(1096,'2023-05-24',17,2,2),(1097,'2023-05-24',17,2,4),(1098,'2023-05-24',17,2,6),(1099,'2023-05-24',17,2,8),(1100,'2023-05-25',17,1,1),(1101,'2023-05-25',17,1,3),(1102,'2023-05-25',17,1,5),(1103,'2023-05-25',17,1,7),(1104,'2023-05-25',17,2,2),(1105,'2023-05-25',17,2,4),(1106,'2023-05-25',17,2,6),(1107,'2023-05-25',17,2,8),(1108,'2023-05-26',17,1,1),(1109,'2023-05-26',17,1,3),(1110,'2023-05-26',17,1,5),(1111,'2023-05-26',17,1,7),(1112,'2023-05-26',17,2,2),(1113,'2023-05-26',17,2,4),(1114,'2023-05-26',17,2,6),(1115,'2023-05-26',17,2,8),(1116,'2023-05-27',17,1,1),(1117,'2023-05-27',17,1,3),(1118,'2023-05-27',17,1,5),(1119,'2023-05-27',17,1,7),(1120,'2023-05-27',17,2,2),(1121,'2023-05-27',17,2,4),(1122,'2023-05-27',17,2,6),(1123,'2023-05-27',17,2,8),(1124,'2023-05-28',17,1,1),(1125,'2023-05-28',17,1,3),(1126,'2023-05-28',17,1,5),(1127,'2023-05-28',17,1,7),(1128,'2023-05-28',17,2,2),(1129,'2023-05-28',17,2,4),(1130,'2023-05-28',17,2,6),(1131,'2023-05-28',17,2,8),(1132,'2023-05-27',16,1,1),(1133,'2023-05-27',16,1,3),(1134,'2023-05-27',16,1,5),(1135,'2023-05-27',16,1,7),(1136,'2023-05-27',16,2,2),(1137,'2023-05-27',16,2,4),(1138,'2023-05-27',16,2,6),(1139,'2023-05-27',16,2,8),(1140,'2023-05-28',16,1,3),(1141,'2023-05-28',16,1,5),(1142,'2023-05-28',16,1,7),(1143,'2023-05-28',16,2,2),(1144,'2023-05-28',16,2,4),(1145,'2023-05-28',16,2,6),(1146,'2023-05-28',16,2,8),(1147,'2023-05-28',16,1,1);
/*!40000 ALTER TABLE `movie_show_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,'Paypal');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_USER'),(2,'ROLE_ADMIN'),(3,'ROLE_MODERATOR'),(4,'ROLE_EMPLOYEE');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screen`
--

DROP TABLE IF EXISTS `screen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `screen` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `total_seat` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screen`
--

LOCK TABLES `screen` WRITE;
/*!40000 ALTER TABLE `screen` DISABLE KEYS */;
INSERT INTO `screen` VALUES (1,'1',80),(2,'2',64),(3,'3',48),(4,'4',32);
/*!40000 ALTER TABLE `screen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `vip` int NOT NULL,
  `screen_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKa20kk7r8mh61c0khpxmx7uqcp` (`screen_id`),
  CONSTRAINT `FKa20kk7r8mh61c0khpxmx7uqcp` FOREIGN KEY (`screen_id`) REFERENCES `screen` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=225 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (1,'A1',0,1),(2,'A2',0,1),(3,'A3',0,1),(4,'A4',0,1),(5,'A5',0,1),(6,'A6',0,1),(7,'A7',0,1),(8,'A8',0,1),(9,'A9',0,1),(10,'A10',0,1),(11,'A11',0,1),(12,'A12',0,1),(13,'A13',0,1),(14,'A14',0,1),(15,'A15',0,1),(16,'A16',0,1),(17,'B1',0,1),(18,'B2',0,1),(19,'B3',0,1),(20,'B4',0,1),(21,'B5',0,1),(22,'B6',0,1),(23,'B7',0,1),(24,'B8',0,1),(25,'B9',0,1),(26,'B10',0,1),(27,'B11',0,1),(28,'B12',0,1),(29,'B13',0,1),(30,'B14',0,1),(31,'B15',0,1),(32,'B16',0,1),(33,'C1',0,1),(34,'C2',0,1),(35,'C3',0,1),(36,'C4',0,1),(37,'C5',0,1),(38,'C6',0,1),(39,'C7',0,1),(40,'C8',0,1),(41,'C9',0,1),(42,'C10',0,1),(43,'C11',0,1),(44,'C12',0,1),(45,'C13',0,1),(46,'C14',0,1),(47,'C15',0,1),(48,'C16',0,1),(49,'D1',0,1),(50,'D2',0,1),(51,'D3',0,1),(52,'D4',0,1),(53,'D5',0,1),(54,'D6',0,1),(55,'D7',0,1),(56,'D8',0,1),(57,'D9',0,1),(58,'D10',0,1),(59,'D11',0,1),(60,'D12',0,1),(61,'D13',0,1),(62,'D14',0,1),(63,'D15',0,1),(64,'D16',0,1),(65,'E1',0,1),(66,'E2',0,1),(67,'E3',0,1),(68,'E4',0,1),(69,'E5',0,1),(70,'E6',0,1),(71,'E7',0,1),(72,'E8',0,1),(73,'E9',0,1),(74,'E10',0,1),(75,'E11',0,1),(76,'E12',0,1),(77,'E13',0,1),(78,'E14',0,1),(79,'E15',0,1),(80,'E16',0,1),(81,'A1',0,2),(82,'A2',0,2),(83,'A3',0,2),(84,'A4',0,2),(85,'A5',0,2),(86,'A6',0,2),(87,'A7',0,2),(88,'A8',0,2),(89,'A9',0,2),(90,'A10',0,2),(91,'A11',0,2),(92,'A12',0,2),(93,'A13',0,2),(94,'A14',0,2),(95,'A15',0,2),(96,'A16',0,2),(97,'B1',0,2),(98,'B2',0,2),(99,'B3',0,2),(100,'B4',0,2),(101,'B5',0,2),(102,'B6',0,2),(103,'B7',0,2),(104,'B8',0,2),(105,'B9',0,2),(106,'B10',0,2),(107,'B11',0,2),(108,'B12',0,2),(109,'B13',0,2),(110,'B14',0,2),(111,'B15',0,2),(112,'B16',0,2),(113,'C1',0,2),(114,'C2',0,2),(115,'C3',0,2),(116,'C4',0,2),(117,'C5',0,2),(118,'C6',0,2),(119,'C7',0,2),(120,'C8',0,2),(121,'C9',0,2),(122,'C10',0,2),(123,'C11',0,2),(124,'C12',0,2),(125,'C13',0,2),(126,'C14',0,2),(127,'C15',0,2),(128,'C16',0,2),(129,'D1',0,2),(130,'D2',0,2),(131,'D3',0,2),(132,'D4',0,2),(133,'D5',0,2),(134,'D6',0,2),(135,'D7',0,2),(136,'D8',0,2),(137,'D9',0,2),(138,'D10',0,2),(139,'D11',0,2),(140,'D12',0,2),(141,'D13',0,2),(142,'D14',0,2),(143,'D15',0,2),(144,'D16',0,2),(145,'A1',0,3),(146,'A2',0,3),(147,'A3',0,3),(148,'A4',0,3),(149,'A5',0,3),(150,'A6',0,3),(151,'A7',0,3),(152,'A8',0,3),(153,'A9',0,3),(154,'A10',0,3),(155,'A11',0,3),(156,'A12',0,3),(157,'A13',0,3),(158,'A14',0,3),(159,'A15',0,3),(160,'A16',0,3),(161,'B1',0,3),(162,'B2',0,3),(163,'B3',0,3),(164,'B4',0,3),(165,'B5',0,3),(166,'B6',0,3),(167,'B7',0,3),(168,'B8',0,3),(169,'B9',0,3),(170,'B10',0,3),(171,'B11',0,3),(172,'B12',0,3),(173,'B13',0,3),(174,'B14',0,3),(175,'B15',0,3),(176,'B16',0,3),(177,'C1',0,3),(178,'C2',0,3),(179,'C3',0,3),(180,'C4',0,3),(181,'C5',0,3),(182,'C6',0,3),(183,'C7',0,3),(184,'C8',0,3),(185,'C9',0,3),(186,'C10',0,3),(187,'C11',0,3),(188,'C12',0,3),(189,'C13',0,3),(190,'C14',0,3),(191,'C15',0,3),(192,'C16',0,3),(193,'A1',0,4),(194,'A2',0,4),(195,'A3',0,4),(196,'A4',0,4),(197,'A5',0,4),(198,'A6',0,4),(199,'A7',0,4),(200,'A8',0,4),(201,'A9',0,4),(202,'A10',0,4),(203,'A11',0,4),(204,'A12',0,4),(205,'A13',0,4),(206,'A14',0,4),(207,'A15',0,4),(208,'A16',0,4),(209,'B1',0,4),(210,'B2',0,4),(211,'B3',0,4),(212,'B4',0,4),(213,'B5',0,4),(214,'B6',0,4),(215,'B7',0,4),(216,'B8',0,4),(217,'B9',0,4),(218,'B10',0,4),(219,'B11',0,4),(220,'B12',0,4),(221,'B13',0,4),(222,'B14',0,4),(223,'B15',0,4),(224,'B16',0,4);
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `showtime`
--

DROP TABLE IF EXISTS `showtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `showtime` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `show_time` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `showtime`
--

LOCK TABLES `showtime` WRITE;
/*!40000 ALTER TABLE `showtime` DISABLE KEYS */;
INSERT INTO `showtime` VALUES (1,'09:00:00'),(2,'11:00:00'),(3,'13:00:00'),(4,'15:00:00'),(5,'17:00:00'),(6,'19:00:00'),(7,'21:00:00'),(8,'23:00:00');
/*!40000 ALTER TABLE `showtime` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-17 17:47:59
