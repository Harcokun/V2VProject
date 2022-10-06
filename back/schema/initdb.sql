GRANT USAGE ON *.* TO 'adhoc'@'%' IDENTIFIED BY 'adhoc';
use Car;
CREATE TABLE IF NOT EXISTS `car` (
  `car_registration` int(11) NOT NULL,
  `model` varchar(255) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`car_registration`)
);

CREATE TABLE IF NOT EXISTS `accident` (
    `car_id` int(11) NOT NULL, 
    `time_stamp` timestamp NOT NULL
);