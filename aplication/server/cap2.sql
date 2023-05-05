
use movietheater;



INSERT INTO `movietheater`.`account` (`id`, `address`, `birthday`, `email`, `enable`, `password`, `provider`, `total_point`, `username`) VALUES ('2', 'Quang Nam', '2001-12-12', 'nguyenvansy091201@gmail.com', '0', '$2a$10$kn5VWyBieD8DQJY1UzMq1OJV9MXcKwlHEdP1LvOvUjfEew9yael7u', 'local', '0', 'Nguyev Van Sy');
INSERT INTO `movietheater`.`account_role` (`account_id`, `role_id`) VALUES ('2', '1');




/*ShowTime*/

INSERT INTO `movietheater`.`showtime` (`id`, `show_time`) VALUES ('1', '09:00:00');
INSERT INTO `movietheater`.`showtime` (`id`, `show_time`) VALUES ('2', '11:00:00');
INSERT INTO `movietheater`.`showtime` (`id`, `show_time`) VALUES ('3', '13:00:00');
INSERT INTO `movietheater`.`showtime` (`id`, `show_time`) VALUES ('4', '15:00:00');
INSERT INTO `movietheater`.`showtime` (`id`, `show_time`) VALUES ('5', '17:00:00');
INSERT INTO `movietheater`.`showtime` (`id`, `show_time`) VALUES ('6', '19:00:00');
INSERT INTO `movietheater`.`showtime` (`id`, `show_time`) VALUES ('7', '21:00:00');
INSERT INTO `movietheater`.`showtime` (`id`, `show_time`) VALUES ('8', '23:00:00');


/*Screen*/
INSERT INTO `movietheater`.`screen` (`id`, `name`, `total_seat`) VALUES ('1', '1', '80');
INSERT INTO `movietheater`.`screen` (`id`, `name`, `total_seat`) VALUES ('2', '2', '64');
INSERT INTO `movietheater`.`screen` (`id`, `name`, `total_seat`) VALUES ('3', '3', '48');
INSERT INTO `movietheater`.`screen` (`id`, `name`, `total_seat`) VALUES ('4', '4', '32');



/*Seat*/

INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('1', 'A1', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('2', 'A2', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('3', 'A3', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('4', 'A4', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('5', 'A5', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('6', 'A6', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('7', 'A7', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('8', 'A8', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('9', 'A9', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('10', 'A10', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('11', 'A11', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('12', 'A12', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('13', 'A13', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('14', 'A14', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('15', 'A15', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('16', 'A16', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('17', 'B1', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('18', 'B2', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('19', 'B3', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('20', 'B4', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('21', 'B5', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('22', 'B6', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('23', 'B7', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('24', 'B8', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('25', 'B9', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('26', 'B10', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('27', 'B11', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('28', 'B12', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('29', 'B13', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('30', 'B14', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('31', 'B15', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('32', 'B16', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('33', 'C1', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('34', 'C2', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('35', 'C3', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('36', 'C4', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('37', 'C5', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('38', 'C6', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('39', 'C7', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('40', 'C8', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('41', 'C9', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('42', 'C10', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('43', 'C11', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('44', 'C12', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('45', 'C13', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('46', 'C14', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('47', 'C15', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('48', 'C16', '0', '1');

INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('49', 'D1', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('50', 'D2', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('51', 'D3', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('52', 'D4', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('53', 'D5', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('54', 'D6', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('55', 'D7', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('56', 'D8', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('57', 'D9', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('58', 'D10', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('59', 'D11', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('60', 'D12', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('61', 'D13', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('62', 'D14', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('63', 'D15', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('64', 'D16', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('65', 'E1', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('66', 'E2', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('67', 'E3', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('68', 'E4', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('69', 'E5', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('70', 'E6', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('71', 'E7', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('72', 'E8', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('73', 'E9', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('74', 'E10', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('75', 'E11', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('76', 'E12', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('77', 'E13', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('78', 'E14', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('79', 'E15', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('80', 'E16', '0', '1');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('81', 'A1', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('82 ', 'A2', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('83', 'A3', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('84', 'A4', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('85', 'A5', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('86', 'A6', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('87', 'A7', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('88', 'A8', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('89', 'A9', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('90', 'A10', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('91', 'A11', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('92', 'A12', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('93', 'A13', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('94', 'A14', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('95', 'A15', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('96', 'A16', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('97', 'B1', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('98', 'B2', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('99', 'B3', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('100', 'B4', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('101', 'B5', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('102', 'B6', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('103', 'B7', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('104', 'B8', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('105', 'B9', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('106', 'B10', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('107', 'B11', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('108', 'B12', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('109', 'B13', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('110', 'B14', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('111', 'B15', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('112', 'B16', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('113', 'C1', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('114', 'C2', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('115', 'C3', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('116', 'C4', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('117', 'C5', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('118', 'C6', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('119', 'C7', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('120', 'C8', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('121', 'C9', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('122', 'C10', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('123', 'C11', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('124', 'C12', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('125', 'C13', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('126', 'C14', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('127', 'C15', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('128', 'C16', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('129', 'D1', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('130', 'D2', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('131', 'D3', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('132', 'D4', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('133', 'D5', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('134', 'D6', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('135', 'D7', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('136', 'D8', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('137', 'D9', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('138', 'D10', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('139', 'D11', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('140', 'D12', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('141', 'D13', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('142', 'D14', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('143', 'D15', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('144', 'D16', '0', '2');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('145', 'A1', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('146 ', 'A2', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('147', 'A3', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('148', 'A4', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('149', 'A5', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('150', 'A6', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('151', 'A7', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('152', 'A8', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('153', 'A9', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('154', 'A10', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('155', 'A11', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('156', 'A12', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('157', 'A13', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('158', 'A14', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('159', 'A15', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('160', 'A16', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('161', 'B1', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('162', 'B2', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('163', 'B3', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('164', 'B4', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('165', 'B5', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('166', 'B6', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('167', 'B7', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('168', 'B8', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('169', 'B9', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('170', 'B10', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('171', 'B11', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('172', 'B12', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('173', 'B13', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('174', 'B14', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('175', 'B15', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('176', 'B16', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('177', 'C1', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('178', 'C2', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('179', 'C3', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('180', 'C4', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('181', 'C5', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('182', 'C6', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('183', 'C7', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('184', 'C8', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('185', 'C9', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('186', 'C10', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('187', 'C11', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('188', 'C12', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('189', 'C13', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('190', 'C14', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('191', 'C15', '0', '3');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('192', 'C16', '0', '3');



INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('193', 'A1', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('194 ', 'A2', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('195', 'A3', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('196', 'A4', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('197', 'A5', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('198', 'A6', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('199', 'A7', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('200', 'A8', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('201', 'A9', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('202', 'A10', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('203', 'A11', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('204', 'A12', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('205', 'A13', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('206', 'A14', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('207', 'A15', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('208', 'A16', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('209', 'B1', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('210', 'B2', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('211', 'B3', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('212', 'B4', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('213', 'B5', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('214', 'B6', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('215', 'B7', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('216', 'B8', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('217', 'B9', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('218', 'B10', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('219', 'B11', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('220', 'B12', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('221', 'B13', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('222', 'B14', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('223', 'B15', '0', '4');
INSERT INTO `movietheater`.`seat` (`id`, `name`, `vip`, `screen_id`) VALUES ('224', 'B16', '0', '4');


/* Genre*/
INSERT INTO `movietheater`.`genre` (`id`, `name`) VALUES ('1', 'Hành động');
INSERT INTO `movietheater`.`genre` (`id`, `name`) VALUES ('2', 'Kinh dị');
INSERT INTO `movietheater`.`genre` (`id`, `name`) VALUES ('3', 'Gia đình');
INSERT INTO `movietheater`.`genre` (`id`, `name`) VALUES ('4', 'Hài ');
INSERT INTO `movietheater`.`genre` (`id`, `name`) VALUES ('5', 'Tình cảm');
INSERT INTO `movietheater`.`genre` (`id`, `name`) VALUES ('6', 'Tâm lý');


/* Movie*/
INSERT INTO `movietheater`.`movie` (`id`, `cast`, `content`, `director`, `is3d`, `production`, `release_date`, `running_time`, `title`, `trailer_url`) VALUES ('1', 'Russell Crowe, Daniel Zovatto, Alex Essoe, Franco Nero, Laurel Marsden', 'Review Khắc Tinh Của Quỷ và lịch chiếu Khắc Tinh Của Quỷ tại Moveek. Lấy cảm hứng từ những hồ sơ có thật của Cha Gabriele Amorth, Trưởng Trừ Tà của Vatican, bộ phim The Pope\'s Exorcist theo chân Amorth trong cuộc điều tra về vụ quỷ ám kinh hoàng của một cậu bé và dần khám phá ra những bí mật hàng thế kỷ mà Vatican đã cố gắng giấu kín.', 'Julius Avery', '1', 'Jeff Katz, Doug Belgrad, Michael Patrick Kaczmarek', '2023-04-14', '104', 'Khắc Tinh Của Quỷ', 'https://www.youtube.com/watch?v=MVj0NnV-cG8');
INSERT INTO `movietheater`.`movie` (`id`, `cast`, `content`, `director`, `is3d`, `production`, `release_date`, `running_time`, `title`, `trailer_url`) VALUES ('2', 'Chris Pratt, Anya Taylor-Joy, Charlie Day, Jack Black, Keegan-Michael Key', 'Cuộc phiêu lưu đến Vương quốc Nấm của anh chàng thợ sửa ống nước Mario và quá trình anh vươn lên trở thành một huyền thoại. Xem lịch chiếu, review phim và mua vé xem phim dễ dàng hơn tại Moveek', 'Michael Jelenic, Aaron Horvath', '1', 'Christopher Meledandri, Janet Healy, Shigeru Miyamoto', '2023-04-07', '93', 'Anh Em Super Mario', 'https://www.youtube.com/watch?v=sqAyx4uDYN4');
INSERT INTO `movietheater`.`movie` (`id`, `cast`, `content`, `director`, `is3d`, `production`, `release_date`, `running_time`, `title`, `trailer_url`) VALUES ('3', 'Chris Pratt, Zoe Saldana, Dave Bautista, Karen Gillan, Pom Klementieff', 'Review Vệ Binh Dải Ngân Hà 3 và lịch chiếu Vệ Binh Dải Ngân Hà 3 tại Moveek. Cho dù vũ trụ này có bao la đến đâu, các Vệ Binh của chúng ta cũng không thể trốn chạy mãi mãi.', 'James Gunn', '1', 'Kevin Feige', '2023-05-03', '149', 'Vệ Binh Dải Ngân Hà 3', 'https://www.youtube.com/watch?v=89aYxQcGGA4');
INSERT INTO `movietheater`.`movie` (`id`, `cast`, `content`, `director`, `is3d`, `release_date`, `running_time`, `title`, `trailer_url`) VALUES ('4', 'John Francis Daley, Jonathan M. Goldstein', 'Review Ngục Tối Và Rồng: Danh Dự Của Kẻ Trộm và lịch chiếu Ngục Tối Và Rồng: Danh Dự Của Kẻ Trộm xem tại Moveek. Phim theo chân một tên trộm quyến rũ và một nhóm những kẻ bịp bợm nghiệp dư thực hiện vụ trộm sử thi nhằm lấy lại một di vật đã mất. Nhưng mọi thứ trở nên nguy hiểm khó lường hơn bao giờ hết khi họ đã chạm trán nhầm người trong.', 'Brian Goldner, Roy Lee, Courtney Solomon', '1', '2023-05-20', '124', 'Ngục Tối Và Rồng', 'https://www.youtube.com/watch?v=SYkZHSDdkz0&embeds_euri=https%3A%2F%2Fmoveek.com%2F&source_ve_path=MjM4NTE&feature=emb_title');
INSERT INTO `movietheater`.`movie` (`id`, `cast`, `content`, `director`, `is3d`, `production`, `release_date`, `running_time`, `title`, `trailer_url`) VALUES ('5', 'Vin Diesel, Michelle Rodriguez, Tyrese Gibson, Ludacris, Jason Momoa', 'Review Fast & Furious 10 và lịch chiếu Fast & Furious 10 xem tại Moveek', 'Louis Leterrier', '1', 'Neal H. Moritz, Vin Diesel, Jeff Kirschenbaum', '2023-05-12', '130', 'Fast & Furious 10', 'https://www.youtube.com/watch?v=X8oZ0tlXqh0&embeds_euri=https%3A%2F%2Fmoveek.com%2F&source_ve_path=MjM4NTE&feature=emb_title');
INSERT INTO `movietheater`.`movie` (`id`, `cast`, `content`, `director`, `is3d`, `production`, `release_date`, `running_time`, `title`, `trailer_url`) VALUES ('6', 'Halle Bailey, Jonah Hauer-King, Daveed Diggs, Awkwafina, Jacob Tremblay', 'Nàng Tiên Cá là câu chuyện được yêu thích về Ariel - một nàng tiên cá trẻ xinh đẹp và mạnh mẽ với khát khao phiêu lưu. Ariel là con gái út của Vua Triton và cũng là người ngang ngạnh nhất, nàng khao khát khám phá về thế giới bên kia đại dương. Trong một lần ghé thăm đất liền, nàng đã phải lòng Hoàng tử Eric bảnh bao. Trong khi tiên cá bị cấm tiếp xúc với con người, Ariel đã làm theo trái tim mình. Nàng đã thỏa thuận với phù thủy biển Ursula hung ác để cơ hội sống cuộc sống trên đất liền. Nhưng cuối cùng việc này lại đe dọa tới mạng sống của Ariel và vương miện của cha nàng.', 'Rob Marshall', '1', 'Rob Marshall, Marc Platt, Lin-Manuel Miranda', '2023-05-23', '135', 'Nàng Tiên Cá', 'https://www.youtube.com/watch?v=jEmhFdnS_wE');
INSERT INTO `movietheater`.`movie` (`id`, `cast`, `content`, `director`, `is3d`, `production`, `release_date`, `running_time`, `title`, `trailer_url`) VALUES ('7', 'Ezra Miller, Kiersey Clemons, Billy Crudup, Johnny Depp', 'Review The Flash và lịch chiếu The Flash xem tại Moveek. Bối cảnh phim có thể sẽ được lấy từ sự kiện Flashpoint. Trong nguyên tác truyện tranh, anh chàng Barry Allen sẽ quay ngược thời gian để cứu người mẹ khỏi cái chết. Chuyến đi này của anh đã làm thay đổi nhiều sự kiện trong quá khứ và từ đó kéo theo một loạt rắc rối.', 'Andy Muschietti', '1', 'Richard Suckle, Geoff Johns', '2023-06-16', '122', 'Flash', 'https://www.youtube.com/watch?v=2H6WkgW-hCA&embeds_euri=https%3A%2F%2Fmoveek.com%2F&source_ve_path=MjM4NTE&feature=emb_title');
INSERT INTO `movietheater`.`movie` (`id`, `cast`, `content`, `director`, `is3d`, `production`, `release_date`, `running_time`, `title`, `trailer_url`) VALUES ('8', 'Olivia Cooke, Kenneth Branagh, William Shatner, Laurie Holden, Kevin Dennis', 'Cô Bé Cứu Hoả (tên tiếng Anh: Fireheart) đưa người xem bước vào hành trình phiêu lưu kỳ thú của Georgia Nolan - một cô bé thông minh, nhiệt huyết với ước mơ trở thành lính cứu hoả như ba mình. Tuy nhiên, năm 1932 tại New York, phụ nữ không được phép làm công việc này. Nhưng cơ hội “vàng” đã đến khi Georgia nảy ra ý định cải trang thành Joe - một chàng trai vụng về gia nhập đội cứu hoả do chính ba mình thành lập. Vừa phải bảo vệ danh tính thật, vừa phải dấn thân vào phi vụ mạo hiểm: Giải cứu những người lính cứu hoả của thành phố đã lần lượt biến mất trong ngọn lửa bí ẩn thiêu rụi Nhà hát Broadway, liệu Georgia có dũng cảm vượt qua tất cả và thành công?', 'Laurent Zeitoun, Theodore Anthony Lee Ty', '1', 'André Rouleau, Laurent Zeitoun, Yann Zenou', '2023-05-12', '92', 'Cô Bé Cứu Hỏa', 'https://www.youtube.com/watch?v=ORB1bzj_naY&embeds_euri=https%3A%2F%2Fmoveek.com%2F&source_ve_path=MjM4NTE&feature=emb_title');
INSERT INTO `movietheater`.`movie` (`id`, `cast`, `content`, `director`, `is3d`, `production`, `release_date`, `running_time`, `title`, `trailer_url`) VALUES ('9', 'Ben Affleck, Alice Braga, William Fichtner, J. D. Pardo, Jeff Fahey', 'Review Những Kẻ Thao Túng và lịch chiếu Những Kẻ Thao Túng tại Moveek. Phim theo chân thám tử Daniel Rourke (Ben Affleck) trong hành trình tìm kiếm cô con gái bị mất tích. Anh sớm nhận ra tất cả những chuyện bí ẩn này đều liên quan đến một người đàn ông có sức mạnh thôi miên. Với sự hỗ trợ từ nhà ngoại cảm Diana Cruz (Alice Braga), Daniel bắt đầu truy đuổi hắn và phải tìm mọi cách để đưa con gái mình trở về nhà an toàn.', 'Robert Rodriguez', '1', 'Robert Rodriguez, Lisa Ellzey, Jeffrey Robinov', '2023-05-15', '93', 'Những Kẻ Thao Túng', 'https://www.youtube.com/watch?v=VHHN08_tKjI&embeds_euri=https%3A%2F%2Fmoveek.com%2F&source_ve_path=MjM4NTE&feature=emb_title');
INSERT INTO `movietheater`.`movie` (`id`, `cast`, `content`, `director`, `is3d`, `production`, `release_date`, `running_time`, `title`) VALUES ('10', 'Sarah Grey, Meg Foster, Sarah Dumont, Alexis Knapp, Mena Suvari', 'Câu chuyện bắt đầu khi Elly được gia đình của một người bạn nhờ chăm sóc một người phụ nữ lớn tuổi sống trong một căn nhà gỗ hẻo lánh trong vài ngày. Nhận lời đồng ý, nhưng sau đó Elly phát hiện ra sự xuất hiện của một con quỷ đang ẩn náu trong người phụ nữ chỉ chực chờ để thoát ra. Cùng lúc đó, những bí ẩn về cái chết của mẹ cô dần dần được gợi mở bởi những cơn ác mộng mà Elly phải trải qua.', 'Kevin Lewis', '1', 'Marcus Englefield', '2023-05-12', '96', 'Cơn Thịnh Nộ Từ Cõi Âm');


/* Movie image*/
INSERT INTO `movietheater`.`movie_image` (`id`, `image_url`, `movie_id`) VALUES ('1', 'https://cdn.moveek.com/storage/media/cache/short/64365711d85a0954258046.jpeg', '1');
INSERT INTO `movietheater`.`movie_image` (`id`, `image_url`, `movie_id`) VALUES ('2', 'https://cdn.moveek.com/storage/media/cache/short/63f6ec2b17bec366639832.jpg', '2');
INSERT INTO `movietheater`.`movie_image` (`id`, `image_url`, `movie_id`) VALUES ('3', 'https://cdn.moveek.com/storage/media/cache/short/63e9bd47a31a8972003905.jpeg', '3');
INSERT INTO `movietheater`.`movie_image` (`id`, `image_url`, `movie_id`) VALUES ('4', 'https://cdn.moveek.com/storage/media/cache/short/643659893261e517212956.jpeg', '4');
INSERT INTO `movietheater`.`movie_image` (`id`, `image_url`, `movie_id`) VALUES ('5', 'https://cdn.moveek.com/storage/media/cache/short/644047fbbefbc079765585.jpg', '5');
INSERT INTO `movietheater`.`movie_image` (`id`, `image_url`, `movie_id`) VALUES ('6', 'https://cdn.moveek.com/storage/media/cache/short/64113905caeca623368219.jpeg', '6');
INSERT INTO `movietheater`.`movie_image` (`id`, `image_url`, `movie_id`) VALUES ('7', 'https://cdn.moveek.com/storage/media/cache/short/6448e397d04d6301077542.jpeg', '7');
INSERT INTO `movietheater`.`movie_image` (`id`, `image_url`, `movie_id`) VALUES ('8', 'https://cdn.moveek.com/storage/media/cache/short/644e5d9c16dfc504480771.jpeg', '8');
INSERT INTO `movietheater`.`movie_image` (`id`, `image_url`, `movie_id`) VALUES ('9', 'https://cdn.moveek.com/storage/media/cache/short/6444a431b4af8016607778.jpeg', '9');
INSERT INTO `movietheater`.`movie_image` (`id`, `image_url`, `movie_id`) VALUES ('10', 'https://cdn.moveek.com/storage/media/cache/short/644e5d0f87ae4845041709.jpg', '10');


/* Movie genre*/
INSERT INTO `movietheater`.`genre_movie` (`genre_id`, `movie_id`) VALUES ('2', '1');
INSERT INTO `movietheater`.`genre_movie` (`genre_id`, `movie_id`) VALUES ('1', '2');
INSERT INTO `movietheater`.`genre_movie` (`genre_id`, `movie_id`) VALUES ('1', '3');
INSERT INTO `movietheater`.`genre_movie` (`genre_id`, `movie_id`) VALUES ('1', '4');
INSERT INTO `movietheater`.`genre_movie` (`genre_id`, `movie_id`) VALUES ('1', '5');
INSERT INTO `movietheater`.`genre_movie` (`genre_id`, `movie_id`) VALUES ('6', '6');
INSERT INTO `movietheater`.`genre_movie` (`genre_id`, `movie_id`) VALUES ('1', '7');
INSERT INTO `movietheater`.`genre_movie` (`genre_id`, `movie_id`) VALUES ('3', '8');
INSERT INTO `movietheater`.`genre_movie` (`genre_id`, `movie_id`) VALUES ('1', '9');
INSERT INTO `movietheater`.`genre_movie` (`genre_id`, `movie_id`) VALUES ('2', '10');

/*Food*/
INSERT INTO `movietheater`.`food` (`id`, `description`, `price`, `title`) VALUES ('1', 'Sweet Combo 69oz', '88000', 'COMBO030159-09');
INSERT INTO `movietheater`.`food` (`id`, `description`, `price`, `title`) VALUES ('2', 'Beta Combo 69oz', '68000', 'COMBO030158-09');
INSERT INTO `movietheater`.`food` (`id`, `description`, `price`, `title`) VALUES ('3', 'Family Combo 69oz', '213000', 'COMBO030190-09');

/*Movie showtime*/
INSERT INTO `movietheater`.`movie_show_time` (`id`, `show_date`, `movie_id`, `screen_id`, `showtime_id`) VALUES ('1', '2023-05-03', '3', '1', '1');
INSERT INTO `movietheater`.`movie_show_time` (`id`, `show_date`, `movie_id`, `screen_id`, `showtime_id`) VALUES ('2', '2023-05-03', '3', '2', '2');
INSERT INTO `movietheater`.`movie_show_time` (`id`, `show_date`, `movie_id`, `screen_id`, `showtime_id`) VALUES ('3', '2023-05-03', '3', '1', '3');
INSERT INTO `movietheater`.`movie_show_time` (`id`, `show_date`, `movie_id`, `screen_id`, `showtime_id`) VALUES ('4', '2023-05-03', '3', '2', '4');
INSERT INTO `movietheater`.`movie_show_time` (`id`, `show_date`, `movie_id`, `screen_id`, `showtime_id`) VALUES ('5', '2023-05-03', '3', '1', '5');

/*Payment*/
INSERT INTO `movietheater`.`payment` (`id`, `name`) VALUES ('1', 'Paypal');

/*Booking*/
INSERT INTO `movietheater`.`booking` (`id`, `booking_code`, `day_time_booking`, `img_qr_code`, `received`, `total_price`, `account_id`, `movie_showtime_id`, `payment_id`) VALUES ('1', 'xe1Cc5s5kQrRtCwNOZ2ulM5O8dsXZPmAQTj6F8SMlEJ5hCkhQoRfYLOtWNG6RN1N', '2023-05-03', 'https://firebasestorage.googleapis.com/v0/b/dtu-event.appspot.com/o/qr_code_1681560285767.png?alt=media&token=2570645c-54cc-4b61-b9f4-c4b2bd297e5f', '0', '200000', '2', '1', '1');

INSERT INTO `movietheater`.`booking_seat` (`seat_id`, `booking_id`) VALUES ('1', '1');
INSERT INTO `movietheater`.`booking_seat` (`seat_id`, `booking_id`) VALUES ('2', '1');
INSERT INTO `movietheater`.`booking_seat` (`seat_id`, `booking_id`) VALUES ('3', '1');
INSERT INTO `movietheater`.`booking_seat` (`seat_id`, `booking_id`) VALUES ('4', '1');
