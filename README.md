# PinjamGeng: Smart Event Equipment Booking and Inventory Management System

**Universiti Poly-Tech Malaysia (UPTM) — Faculty of Computing & Multimedia (FCOM)**  
*Final Year Project (FYP3024) — Diploma in Computer Science (CC101)*

---

## 📌 Project Overview
**PinjamGeng** is a web-based equipment booking and inventory management platform designed to replace manual paper requisition forms for student campus events. The system streamlines equipment reservations, prevents schedule clashes with automated conflict checking, bundles equipment through **Smart Event Packages**, and enforces accountability via an administrative **Return Desk & Physical Condition Inspection** workflow.

---

## 🚀 Key Features

### For Student Borrowers:
- **Authentication & Security:** Role-based access with BCrypt password hashing and Anti-CSRF protection.
- **Live Inventory Catalog:** Real-time stock status progress bars and category filtering.
- **Smart Event Packages:** Pre-configured equipment bundles (AGM, Seminar, Workshop, Outdoor Sports) for one-click reservation.
- **2-Step Booking Wizard:** Intuitive step-by-step reservation with automated date-clash checking.
- **Official Downloadable Loan Slip:** Dynamic printable A4 voucher (#UPTM-BK-...) with applicant details and handover signatures.
- **Borrower Profile:** Track active bookings, clean return rate (100%), and manage account security.

### For Laboratory Administrators:
- **Executive Status Cockpit:** Real-time metrics on total assets, active loans, pending approvals, and maintenance tickets.
- **Booking Approval Desk:** Review requests, verify date ranges, add custodian remarks, and allocate inventory.
- **Return Desk & Condition Audit:** Inspect returned hardware (Good vs Damaged) with automated maintenance ticket generation.
- **Master Inventory Management (CRUD):** Register new equipment assets via modal, edit specifications, and track storage locations.
- **Audit Logging & Reports:** Centralized record-keeping for university compliance.

---

## 🛠️ Technology Stack
- **Backend:** PHP 8.2 (Procedural / Modular Architecture)
- **Database:** MySQL / MariaDB (3NF Relational Schema)
- **Frontend:** HTML5, Tailwind CSS, FontAwesome 6, JavaScript (ES6)
- **Development Server:** XAMPP (Apache & MySQL)

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/n4syaeeeo/pinjamgeng.git
   cd pinjamgeng
   ```

2. **Move to XAMPP htdocs:**
   Place the project folder inside `C:/xampp/htdocs/smart_event_equipment`.

3. **Database Configuration:**
   - Start Apache and MySQL in **XAMPP Control Panel**.
   - Open phpMyAdmin (`http://localhost/phpmyadmin`).
   - Create a new database named `smart_event_equipment`.
   - Import the schema from `database/schema.sql` (or run `setup_database.php`).
   - Update database credentials in `config/db.php` if required.

4. **Run the Application:**
   Open your browser and navigate to:
   ```text
   http://localhost/smart_event_equipment/
   ```

---

## 👤 Author & Academic Details
- **Student Name:** Nursyafiqah Zulaikha Binti Zilkamal
- **Student ID:** AM2412018113
- **Program:** Diploma in Computer Science (CC101)
- **Supervisor:** Madam Jihadah Binti Ahmad
- **Institution:** Universiti Poly-Tech Malaysia (UPTM)
