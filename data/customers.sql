INSERT INTO customers (
    first_name, last_name, email, phone, address1, address2, city, province, zip, notes, active, created_at, updated_at
)
VALUES
('John', 'Doe', 'john.doe1@example.com', '1234567890', '123 Main St', 'Apt 101', 'Springfield', 'IL', '62701', 'VIP customer', true, NOW(), NOW()),
('Jane', 'Smith', 'jane.smith2@example.com', '1234567891', '456 Elm St', NULL, 'Hometown', 'CA', '90210', 'Frequent buyer', true, NOW(), NOW()),
('Alice', 'Johnson', 'alice.johnson3@example.com', '1234567892', '789 Maple St', 'Suite 500', 'Capital City', 'NY', '10001', 'No special notes', true, NOW(), NOW()),
('Bob', 'Brown', 'bob.brown4@example.com', '1234567893', '101 Oak St', NULL, 'River City', 'TX', '73301', NULL, false, NOW(), NOW()),
('Charlie', 'Davis', 'charlie.davis5@example.com', '1234567894', '102 Pine St', NULL, 'Sunnyvale', 'FL', '33101', 'Prefers email communication', true, NOW(), NOW()),
('Diana', 'Evans', 'diana.evans6@example.com', '1234567895', '103 Cedar St', 'Apt 22B', 'Metropolis', 'WA', '98101', NULL, true, NOW(), NOW()),
('Frank', 'Green', 'frank.green7@example.com', '1234567896', '104 Birch St', NULL, 'Big Town', 'OR', '97201', 'Allergic to certain materials', true, NOW(), NOW()),
('Grace', 'Harris', 'grace.harris8@example.com', '1234567897', '105 Walnut St', 'Unit 7', 'Riverdale', 'MA', '02101', 'Prefers phone calls', false, NOW(), NOW()),
('Henry', 'Jackson', 'henry.jackson9@example.com', '1234567898', '106 Willow St', NULL, 'Centerville', 'NV', '89001', NULL, true, NOW(), NOW()),
('Isabel', 'King', 'isabel.king10@example.com', '1234567899', '107 Poplar St', 'Floor 2', 'Harbor City', 'NC', '27501', 'Special discount eligible', true, NOW(), NOW()),
('Jack', 'Lee', 'jack.lee11@example.com', '1234567800', '108 Chestnut St', NULL, 'Mountain View', 'CO', '80301', NULL, true, NOW(), NOW()),
('Karen', 'Martin', 'karen.martin12@example.com', '1234567801', '109 Redwood St', 'Apt 10C', 'Beachside', 'HI', '96801', 'Customer since 2015', false, NOW(), NOW()),
('Liam', 'Nelson', 'liam.nelson13@example.com', '1234567802', '110 Ash St', NULL, 'Portland', 'ME', '04101', 'Frequent complaints', true, NOW(), NOW()),
('Mona', 'Olsen', 'mona.olsen14@example.com', '1234567803', '111 Spruce St', NULL, 'Greenwood', 'IN', '46201', NULL, true, NOW(), NOW()),
('Nina', 'Perez', 'nina.perez15@example.com', '1234567804', '112 Fir St', 'Apt B', 'Blue Lake', 'VA', '20101', 'No return policy applied', true, NOW(), NOW()),
('Oscar', 'Quinn', 'oscar.quinn16@example.com', '1234567805', '113 Palm St', NULL, 'Orangeville', 'AZ', '85001', 'High-priority orders', true, NOW(), NOW()),
('Pat', 'Reed', 'pat.reed17@example.com', '1234567806', '114 Sycamore St', 'Suite 300', 'Red Valley', 'UT', '84101', 'Customer is very punctual', true, NOW(), NOW()),
('Quincy', 'Stone', 'quincy.stone18@example.com', '1234567807', '115 Cypress St', NULL, 'Yellow Springs', 'WI', '53701', NULL, false, NOW(), NOW()),
('Rachel', 'Turner', 'rachel.turner19@example.com', '1234567808', '116 Beech St', 'Unit 1A', 'Blacksburg', 'TN', '37901', 'Prefers weekend calls', true, NOW(), NOW()),
('Steve', 'Upton', 'steve.upton20@example.com', '1234567809', '117 Olive St', NULL, 'Whitetown', 'KY', '40501', NULL, true, NOW(), NOW());

