-- Create database
CREATE DATABASE IF NOT EXISTS benefit_illustration;
USE benefit_illustration;

-- Users table (authentication)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Policy calculation audit table
CREATE TABLE IF NOT EXISTS policy_calculations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  input_payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
