

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";



DROP TABLE IF EXISTS `tbl_student`;
CREATE TABLE IF NOT EXISTS `tbl_student` (
  `email_id` varchar(255) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



INSERT INTO `tbl_student` (`email_id`, `password`) VALUES
('shubham@gmail.com', '123'),
('shubh@gmail.com', '123'),
('Nitin@gmail.com', '123'),
('tushar', '123');
COMMIT;
