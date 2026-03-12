CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(64) NOT NULL,
  password VARCHAR(256) NOT NULL
);
INSERT INTO users (username, password) VALUES
('demo', 'demo123'),
('admin', 'adminpassword');
