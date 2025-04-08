CREATE DATABASE IF NOT exists STUDENT_DETAILS;

CREATE TABLE admissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  mobile VARCHAR(10) unique ,
  email VARCHAR(100) unique,
  dob DATE,
  gender VARCHAR(10),
  address TEXT,
  parent_name VARCHAR(100),
  parent_mobile VARCHAR(10),
  college_name VARCHAR(100),
  degree VARCHAR(100),
  stream_degree VARCHAR(100),
  passing_year VARCHAR(4),
  cgpa VARCHAR(10),
  course_name VARCHAR(100),
  course_mode VARCHAR(20),
  experience_status VARCHAR(20),
  experience_year VARCHAR(10),
  company_name VARCHAR(100),
  designation VARCHAR(100),
  resume VARCHAR(255),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
