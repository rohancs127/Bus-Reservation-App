CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100)
);

INSERT INTO users (name, email, password)
VALUES 
('John Doe', 'john.doe@example.com', 'password123'),
('Jane Smith', 'jane.smith@example.com', 'mypassword'),
('Michael Brown', 'michael.brown@example.com', 'brownie123'),
('Emily Davis', 'emily.davis@example.com', 'emilyd123'),
('David Wilson', 'david.wilson@example.com', 'davidpass'),
('Sophia Johnson', 'sophia.johnson@example.com', 'sophiapass'),
('James Lee', 'james.lee@example.com', 'leejames123'),
('Emma Martinez', 'emma.martinez@example.com', 'emmapass'),
('Chris Taylor', 'chris.taylor@example.com', 'taylorpass'),
('Olivia Anderson', 'olivia.anderson@example.com', 'oliviapass');


CREATE TABLE buses (
  bus_id SERIAL PRIMARY KEY,
  bus_number VARCHAR(10),
  capacity INT,
  type VARCHAR(20),
  status VARCHAR(20)
);

INSERT INTO buses (bus_number, capacity, type, status)
VALUES 
('AB123', 50, 'AC', 'active'),
('BC234', 45, 'Non-AC', 'active'),
('CD345', 60, 'AC', 'maintenance'),
('DE456', 40, 'AC', 'active'),
('EF567', 55, 'Non-AC', 'active'),
('FG678', 50, 'AC', 'maintenance'),
('GH789', 35, 'Non-AC', 'active'),
('HI890', 45, 'AC', 'active'),
('IJ901', 60, 'Non-AC', 'active'),
('JK012', 50, 'AC', 'inactive');


CREATE TABLE routes (
  route_id SERIAL PRIMARY KEY,
  source VARCHAR(50),
  destination VARCHAR(50),
  duration INTERVAL,
  fare DECIMAL(10, 2)
);

INSERT INTO routes (source, destination, duration, fare)
VALUES 
('New York', 'Boston', '4:30', 50.00),
('Chicago', 'Detroit', '5:00', 60.00),
('San Francisco', 'Los Angeles', '6:00', 70.00),
('Houston', 'Dallas', '3:45', 40.00),
('Miami', 'Orlando', '4:00', 45.00),
('Seattle', 'Portland', '3:30', 55.00),
('Atlanta', 'Nashville', '5:15', 65.00),
('Denver', 'Salt Lake City', '6:45', 75.00),
('Las Vegas', 'Phoenix', '4:00', 50.00),
('Philadelphia', 'Washington D.C.', '3:15', 55.00);


CREATE TABLE schedules (
  schedule_id SERIAL PRIMARY KEY,
  bus_id INT REFERENCES buses(bus_id),
  route_id INT REFERENCES routes(route_id),
  departure_time TIMESTAMP,
  arrival_time TIMESTAMP,
  available_seats INT
);

INSERT INTO schedules (bus_id, route_id, departure_time, arrival_time, available_seats)
VALUES 
(1, 1, '2024-09-21 08:00', '2024-09-21 12:30', 50),
(2, 2, '2024-09-22 09:00', '2024-09-22 14:00', 45),
(3, 3, '2024-09-23 10:00', '2024-09-23 16:00', 60),
(4, 4, '2024-09-24 07:30', '2024-09-24 11:15', 40),
(5, 5, '2024-09-25 12:00', '2024-09-25 16:00', 55),
(6, 6, '2024-09-26 13:00', '2024-09-26 16:30', 50),
(7, 7, '2024-09-27 14:00', '2024-09-27 17:30', 35),
(8, 8, '2024-09-28 15:00', '2024-09-28 21:45', 45),
(9, 9, '2024-09-29 11:00', '2024-09-29 15:00', 60),
(10, 10, '2024-09-30 09:30', '2024-09-30 12:45', 50);


CREATE TABLE bookings (
  booking_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id),
  schedule_id INT REFERENCES schedules(schedule_id),
  seat_number INT,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20)
);

INSERT INTO bookings (user_id, schedule_id, seat_number, booking_date, status)
VALUES 
(1, 1, 12, '2024-09-21 09:00', 'confirmed'),
(2, 2, 22, '2024-09-22 10:00', 'confirmed'),
(3, 3, 35, '2024-09-23 11:00', 'confirmed'),
(4, 4, 18, '2024-09-24 08:30', 'canceled'),
(5, 5, 44, '2024-09-25 13:00', 'confirmed'),
(6, 6, 8, '2024-09-26 14:00', 'confirmed'),
(7, 7, 27, '2024-09-27 15:30', 'confirmed'),
(8, 8, 30, '2024-09-28 16:30', 'confirmed'),
(9, 9, 40, '2024-09-29 12:00', 'confirmed'),
(10, 10, 19, '2024-09-30 10:45', 'confirmed');
