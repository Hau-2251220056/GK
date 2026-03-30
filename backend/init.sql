-- Create database
CREATE DATABASE IF NOT EXISTS devops_db;
USE devops_db;

-- Create items table
CREATE TABLE IF NOT EXISTS items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO items (name) VALUES 
  ('Sample Item 1'),
  ('Sample Item 2'),
  ('Sample Item 3');
