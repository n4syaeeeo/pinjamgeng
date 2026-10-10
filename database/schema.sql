-- Smart Event Equipment Booking and Inventory Management System
-- Faculty of Computing & Multimedia, Universiti Poly-Tech Malaysia (UPTM)
-- Final Year Project by Nursyafiqah Zulaikha Binti Zilkamal (AM2412018113)

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS maintenance_records;
DROP TABLE IF EXISTS returns_log;
DROP TABLE IF EXISTS booking_items;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS package_items;
DROP TABLE IF EXISTS packages;
DROP TABLE IF EXISTS equipment;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

-- 1. USERS TABLE
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    matric_staff_id VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    user_type ENUM('student', 'lecturer', 'staff', 'committee') DEFAULT 'student',
    faculty_department VARCHAR(100) DEFAULT 'Faculty of Computing & Multimedia',
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. CATEGORIES TABLE
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50) DEFAULT 'fa-box',
    color_class VARCHAR(50) DEFAULT 'bg-blue-500',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. EQUIPMENT TABLE
CREATE TABLE equipment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    asset_tag VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    brand_model VARCHAR(100),
    description TEXT,
    total_qty INT NOT NULL DEFAULT 1,
    available_qty INT NOT NULL DEFAULT 1,
    location VARCHAR(100) NOT NULL DEFAULT 'Main IT Store / AV Lab',
    condition_status ENUM('Good', 'Fair', 'Needs Maintenance', 'Damaged') DEFAULT 'Good',
    item_status ENUM('Available', 'Borrowed', 'Under Maintenance', 'Damaged', 'Reserved') DEFAULT 'Available',
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. PACKAGES TABLE (Core FYP Objective 2: Event-Based Packages)
CREATE TABLE packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    event_type ENUM('Seminar', 'Workshop', 'Meeting', 'Photography', 'Sports', 'Other') NOT NULL,
    description TEXT NOT NULL,
    target_audience VARCHAR(100) DEFAULT 'Students & Staff',
    suggested_attendees VARCHAR(50) DEFAULT '20 - 100 pax',
    icon VARCHAR(50) DEFAULT 'fa-cubes',
    badge_color VARCHAR(50) DEFAULT 'blue',
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. PACKAGE ITEMS TABLE
CREATE TABLE package_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    package_id INT NOT NULL,
    equipment_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    notes VARCHAR(255),
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,
    FOREIGN KEY (equipment_id) REFERENCES equipment(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. BOOKINGS TABLE
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_reference VARCHAR(30) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    package_id INT NULL,
    event_name VARCHAR(150) NOT NULL,
    event_type ENUM('Seminar', 'Workshop', 'Meeting', 'Photography', 'Sports', 'Other') NOT NULL,
    event_location VARCHAR(150) NOT NULL,
    expected_attendees INT DEFAULT 0,
    start_datetime DATETIME NOT NULL,
    end_datetime DATETIME NOT NULL,
    purpose TEXT NOT NULL,
    status ENUM('Pending', 'Approved', 'Rejected', 'Borrowed', 'Returned', 'Cancelled') DEFAULT 'Pending',
    admin_remarks TEXT,
    approved_by INT NULL,
    approved_at DATETIME NULL,
    issued_at DATETIME NULL,
    returned_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE SET NULL,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. BOOKING ITEMS TABLE
CREATE TABLE booking_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    equipment_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    return_condition ENUM('Good', 'Fair', 'Damaged', 'Lost') NULL,
    return_notes VARCHAR(255) NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (equipment_id) REFERENCES equipment(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. RETURNS LOG TABLE (Detailed return inspections)
CREATE TABLE returns_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    equipment_id INT NOT NULL,
    received_by INT NOT NULL,
    return_datetime DATETIME NOT NULL,
    condition_on_return ENUM('Good', 'Fair', 'Damaged', 'Lost') NOT NULL DEFAULT 'Good',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (equipment_id) REFERENCES equipment(id) ON DELETE CASCADE,
    FOREIGN KEY (received_by) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. MAINTENANCE RECORDS TABLE
CREATE TABLE maintenance_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_id INT NOT NULL,
    reported_by INT NOT NULL,
    issue_description TEXT NOT NULL,
    start_date DATE NOT NULL,
    completion_date DATE NULL,
    status ENUM('Pending', 'In Progress', 'Completed', 'Scrapped') DEFAULT 'Pending',
    cost DECIMAL(10,2) DEFAULT 0.00,
    service_vendor VARCHAR(150),
    resolution_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (equipment_id) REFERENCES equipment(id) ON DELETE CASCADE,
    FOREIGN KEY (reported_by) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
