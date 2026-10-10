# 🎓 PINJAMGENG: FYP PRESENTATION SCRIPT & QUICK REFERENCE GUIDE
**Final Year Project (FYP3024) — Diploma in Computer Science (CC101)**  
**Faculty of Computing & Multimedia (FCOM), Universiti Poly-Tech Malaysia (UPTM)**

* **Candidate:** Nursyafiqah Zulaikha Binti Zilkamal (AM2412018113)
* **Project Supervisor:** Madam Jihadah Binti Ahmad
* **Project Title:** Smart Event Equipment Booking and Inventory Management System (PinjamGeng)
* **Live System URL:** [https://pinjamgeng.infinityfreeapp.com/](https://pinjamgeng.infinityfreeapp.com/)

---

## ⏱️ Recommended Timing Budget (Total: 15–20 Minutes)
* **Slides 1–5 (Introduction, Problems & Objectives):** 3 minutes
* **Slides 6–10 (Scope, Methodology, Use Case, Flow & ERD):** 4 minutes
* **Slides 11–13 (Core Innovations: Conflict Check, Packages, Damage):** 3 minutes
* **Slide 14 (Live Cloud Demonstration):** 4 minutes
* **Slides 15–20 (Architecture, Testing, UAT, Comparison & Conclusion):** 3 minutes
* **Q&A Session with Panel:** 5–10 minutes

---

## 🎙️ Slide-by-Slide Speaking Script (Bilingual: EN & BM)

### Slide 1: Title & Introduction (Cover)
* **English:** "Assalamu'alaikum and a very good morning to our respected evaluation panel, examiners, and my supervisor, Madam Jihadah Binti Ahmad. My name is Nursyafiqah Zulaikha Binti Zilkamal, student ID AM2412018113 from the Diploma in Computer Science program (CC101), Faculty of Computing and Multimedia, Universiti Poly-Tech Malaysia. Today, I am proud to present my Final Year Project, 'PinjamGeng: Smart Event Equipment Booking and Inventory Management System', which is already developed, fully operational, and deployed live on the public cloud."
* **Bahasa Melayu:** "Assalamu'alaikum dan selamat pagi kepada panel penilai yang dihormati dan penyelia saya, Puan Jihadah Binti Ahmad. Nama saya Nursyafiqah Zulaikha Binti Zilkamal (AM2412018113). Hari ini saya akan membentangkan projek tahun akhir saya bertajuk PinjamGeng: Smart Event Equipment Booking and Inventory Management System yang kini telah siap dibangunkan dan beroperasi secara live di cloud."

---

### Slide 2: Presentation Agenda
* **English:** "To guide today's session, I have organized the presentation into eight core sections: problem background, objectives and scope, our empirical survey analysis, Agile methodology, system architecture and 3NF database schema, key innovations, a live system demonstration, and finally our testing, UAT results, and future roadmap."
* **Bahasa Melayu:** "Pembentangan hari ini merangkumi lapan segmen utama, bermula daripada latar belakang masalah, objektif projek, dapatan soal selidik, metodologi Agile, reka bentuk sistem dan pangkalan data 3NF, inovasi utama sistem, demonstrasi live, dan rumusan ujian UAT."

---

### Slide 3: Problem Background & Problem Statements
* **English:** "Campus equipment booking at UPTM currently suffers from four major operational bottlenecks. First, reliance on manual paper logbooks causes approvals to drag for 2 to 3 days, with paper slips frequently misplaced. Second, the absence of a synchronized calendar causes frequent double-booking collisions for popular items like PA systems and microphones. Third, inventory records are static, meaning students are not aware of real-time stock availability or maintenance statuses. And fourth, equipment returns lack structured inspection, meaning damaged or missing items are returned unnoticed without accountability."
* **Bahasa Melayu:** "Terdapat empat masalah utama dalam pengurusan peralatan di UPTM: Pertama, proses manual menggunakan borang kertas yang mengambil masa 2-3 hari untuk kelulusan dan mudah hilang. Kedua, masalah pertindihan tempahan (double-booking) akibat ketiadaan kalendar berpusat. Ketiga, baki inventori tidak dapat dilihat secara real-time. Dan keempat, tiada rekod pemeriksaan kerosakan semasa pemulangan yang menyebabkan kerugian ditanggung oleh pihak universiti."

---

### Slide 4: Empirical Requirements Analysis (Survey)
* **English:** "To ground our development in empirical facts, we administered a pre-development requirements questionnaire to 41 campus stakeholders at UPTM, comprising 97.4% student club executives and faculty advisors. The results were decisive: 94.9% experienced substantial approval delays of 1 to over 3 days, with 65.0% frustrated by physical counter trips; 90.0% encountered double-booking conflicts and 67.5% received broken equipment; 85.0% strongly demanded curated smart event packages; 82.5% requested real-time stock indicators; and 85.0% endorsed the university-wide adoption of PinjamGeng."
* **Bahasa Melayu:** "Bagi memastikan pembangunan berasaskan fakta empirikal, kami mengedarkan soal selidik keperluan kepada 41 responden warga UPTM (97.4% pimpinan kelab/persatuan dan penasihat fakulti). Dapatan kajian sangat jelas: 94.9% mengalami kelewatan kelulusan borang manual antara 1 hingga lebih 3 hari dan 65.0% terbeban dengan urusan kaunter fizikal berulang kali; 90.0% pernah berdepan konflik pertindihan tempahan dan 67.5% menerima barang rosak; 85.0% menyokong pakej peralatan acara pintar; 82.5% mahukan indikator stok masa nyata; serta 85.0% menyokong penuh pelaksanaan PinjamGeng di kampus."

---

### Slide 5: Project Objectives
* **English:** "In direct response to these issues, we set four SMART objectives: 1) To design and develop a responsive web-based booking portal; 2) To implement automated conflict detection and 1-click event package bundling; 3) To construct a return inspection and damage accountability engine with automated fine computation; and 4) To evaluate user acceptance through structured UAT testing. All four objectives have been 100% achieved."
* **Bahasa Melayu:** "Empat objektif SMART telah berjaya dicapai: 1) Membangunkan portal web responsif 24/7; 2) Melaksanakan algoritma pengesanan konflik tempahan dan pakej acara pintar; 3) Membina modul pemeriksaan kerosakan dan pengiraan denda automatik; dan 4) Menjalankan penilaian UAT yang mencatatkan kejayaan 100%."

---

### Slide 6: Project Scope & User Roles
* **English:** "Our system establishes clear role-based access control. The Student Persona can browse equipment with real-time stock counts, book individual items or bundled packages, receive instant conflict alerts, and download digital slips. The Admin Persona manages inventory CRUD, approves or rejects applications in one click, inspects returned items, logs defects, and oversees accountability."
* **Bahasa Melayu:** "Skop sistem dibahagikan kepada dua peranan utama: Pelajar boleh melihat baki stok terkini, menempah peralatan atau pakej secara satu klik, dan memuat turun resit digital. Pentadbir (Admin) pula boleh mengurus inventori, meluluskan permohonan dengan pantas, dan memeriksa keadaan barang semasa pemulangan."

---

### Slide 7: Development Methodology (Agile Scrum)
* **English:** "We adopted the Agile Scrum framework, dividing development into five two-week sprints. This allowed iterative development, rapid supervisor reviews with Madam Jihadah, and continuous adjustment of our algorithms. Sprint 1 handled architecture, Sprint 2 delivered authentication and inventory, Sprint 3 built the booking engine, Sprint 4 created the damage module, and Sprint 5 concluded with cloud deployment and UAT."
* **Bahasa Melayu:** "Metodologi Agile Scrum digunakan melalui 5 fasa sprint dua mingguan. Ini membolehkan semakan berkala bersama penyelia dan penambahbaikan berterusan dari fasa reka bentuk pangkalan data sehinggalah ke fasa cloud deployment dan UAT."

---

### Slide 8: System Design: UML Use Case Diagram
* **English:** "Our UML Use Case Diagram models two actors: Student and Admin. Common services like authentication are shared, while administrative actions—such as equipment CRUD, booking approvals, and damage logging—are protected by server-side session middleware."
* **Bahasa Melayu:** "Rajah Use Case ini menunjukkan interaksi dua aktor utama. Semua fungsi pentadbiran dilindungi oleh kawalan keselamatan session di peringkat pelayan (server-side RBAC)."

---

### Slide 9: Operational Workflows (Activity Flowcharts)
* **English:** "Here we see the dual workflows. On the student side, whenever a date range and quantity are selected, the system triggers real-time conflict checking. If valid, it enters the pending queue. On the admin side, the officer reviews details, approves the request, and upon return, conducts inspection to either close the loan or assess damage fines."
* **Bahasa Melayu:** "Carta aliran proses ini memaparkan dua perspektif: Pelajar yang memilih tarikh dan disemak secara automatik oleh sistem, serta Admin yang menyemak permohonan, meluluskan, dan menjalankan pemeriksaan kerosakan semasa pemulangan barang."

---

### Slide 10: Database Architecture (3NF Relational ERD)
* **English:** "Our relational database consists of 8 tables normalized to Third Normal Form (3NF). We eliminated partial dependencies using junction tables like `package_items` and `booking_items`, and removed transitive dependencies to ensure zero data redundancy and microsecond query response on MySQL InnoDB."
* **Bahasa Melayu:** "Pangkalan data mengandungi 8 entiti ternormalisasi mengikut piawaian 3NF bagi menghapuskan lelebihan data (zero redundancy) dan menjamin integriti rujukan kunci asing menggunakan enjin MySQL InnoDB."

---

### Slide 11: Innovation 1 — Automated Conflict Detection
* **English:** "This is our first key innovation. Unlike traditional systems that only check what is physically in the store today, PinjamGeng queries all active overlapping bookings between the requested start and end dates. Available stock equals total stock minus allocated stock. If requested quantity exceeds availability, the booking is blocked instantly with clear feedback, guaranteeing zero double bookings."
* **Bahasa Melayu:** "Inovasi pertama ialah algoritma semakan konflik tarikh pintar. Sistem mengira jumlah unit yang telah ditempah dalam julat tarikh yang dipilih. Jika baki stok tidak mencukupi, sistem akan menghalang permohonan tersebut secara serta-merta, menghapuskan risiko pertindihan 100%."

---

### Slide 12: Innovation 2 — Event Package Bundling
* **English:** "Our second innovation solves the 'forgotten accessory' dilemma. Instead of booking speakers, microphones, and cables individually across multiple pages, students can select curated sets like the 'Basic PA Sound System Set' or 'Auditorium Seminar Set' in a single click. This reduces booking submission time from 15 minutes on paper to under 60 seconds online—an 85% time reduction."
* **Bahasa Melayu:** "Inovasi kedua ialah Pakej Acara Pintar (Bundling). Pelajar boleh menempah satu set lengkap seperti Set PA Sistem atau Set Seminar dalam satu klik sahaja. Ini mengurangkan masa tempahan daripada 15 minit kepada bawah 60 saat."

---

### Slide 13: Innovation 3 — Return & Damage Tracking Engine
* **English:** "Our third innovation introduces a standardized 4-tier damage grading scale (Minor 10%, Moderate 30%, Severe 60%, and Total Loss 100%). During check-in, admins log defects, the system computes the fine automatically, locks the damaged item into maintenance mode, and issues a timestamped digital return receipt."
* **Bahasa Melayu:** "Inovasi ketiga ialah modul pengesanan kerosakan berperingkat (Minor 10%, Moderate 30%, Severe 60%, Total Loss 100%). Admin memasukkan status kerosakan, sistem mengira pampasan secara automatik, dan status peralatan dikunci kepada 'Under Maintenance'."

---

### Slide 14: System Demonstration & Live Cloud
* **English:** "PinjamGeng is deployed live on the public cloud at `https://pinjamgeng.infinityfreeapp.com/`. I will now demonstrate the student booking flow, followed by the admin approval drawer and return inspection."
* **Bahasa Melayu:** "Sistem ini kini beroperasi secara langsung di cloud. Saya akan menunjukkan demonstrasi langsung melibatkan akaun pelajar, papan pemuka admin, dan modul pemeriksaan pemulangan."

---

### Slide 15: Technology Stack & Security
* **English:** "The application uses HTML5, Bootstrap 5, PHP 8.2 with modular MVC structure, and MySQL InnoDB. Crucially, security adheres to OWASP guidelines: Bcrypt password hashing, 100% PDO prepared statements preventing SQL injection, htmlspecialchars encoding preventing XSS, and RBAC session middleware."
* **Bahasa Melayu:** "Sistem ini dibina menggunakan PHP 8.2, Bootstrap 5, dan MySQL. Aspek keselamatan diberi penekanan melalui Bcrypt hashing, PDO Prepared Statements (bebas SQL Injection), dan sanitasi input terhadap serangan XSS."

---

### Slide 16: Testing & Quality Assurance
* **English:** "Across four testing tiers—Unit, Integration, System, and Security—all 28 formal test cases documented in Chapter 4 achieved a 100% pass rate with zero critical bugs."
* **Bahasa Melayu:** "Kesemua 28 kes ujian yang merangkumi Ujian Unit, Integrasi, Sistem, dan Keselamatan telah lulus 100% tanpa sebarang ralat kritikal."

---

### Slide 17: User Acceptance Testing (UAT Results)
* **English:** "During formal User Acceptance Testing (UAT) with 30 real campus evaluators (96.7% student club executives), PinjamGeng achieved exceptional ratings: 79.3% rated system navigation easy or very easy, with 93.4% praising the 2-step booking wizard; 86.7% confirmed equipment requisition is significantly faster than paper methods; 89.7% endorsed Smart Packages and conflict elimination; 86.7% valued live stock visibility; and 90.0% expressed positive-to-neutral satisfaction with 76.7% awarding 4 to 5 stars."
* **Bahasa Melayu:** "Semasa sesi Ujian Penerimaan Pengguna (UAT) bersama 30 penilai sebenar (96.7% pimpinan kelab pelajar dan penasihat fakulti), PinjamGeng merekodkan penilaian cemerlang: 79.3% menilai navigasi sistem sebagai mudah atau sangat mudah serta 93.4% memuji wizard tempahan 2 langkah; 86.7% mengesahkan urusan tempahan jauh lebih pantas berbanding borang kertas; 89.7% menyokong inovasi Pakej Acara dan semakan konflik; 86.7% menghargai paparan stok langsung; dan 90.0% menyatakan tahap kepuasan positif dengan 76.7% memberikan penarafan 4 hingga 5 bintang."

---

### Slide 18: Comparative Analysis (Before vs After)
* **English:** "As seen in this matrix, turnaround time drops from 3 days to 2 minutes; stock visibility shifts from guesswork to real time; double booking drops to zero; and damage accountability is digitized. This delivers a complete digital transformation for UPTM."
* **Bahasa Melayu:** "Jadual perbandingan ini membuktikan impak sistem: masa tempahan disingkatkan daripada 3 hari kepada 2 minit, baki stok telus, tiada lagi isu double-booking, dan rekod kerosakan terpelihara."

---

### Slide 19: Limitations & Future Enhancements
* **English:** "Current boundaries include internet dependency and physical equipment handover. In Phase 2, we plan to integrate IoT Barcode/QR scanning for instant check-in, WhatsApp bot notifications, FPX online payment for fines, and AI predictive demand forecasting."
* **Bahasa Melayu:** "Bagi perancangan masa hadapan (Fasa 2), kami merancang untuk menambah integrasi pengimbas kod bar QR/IoT, notifikasi WhatsApp automatik, pembayaran FPX, dan ramalan pintar AI."

---

### Slide 20: Conclusion & Q&A
* **English:** "In conclusion, PinjamGeng has successfully fulfilled all four project objectives. I extend my warmest gratitude to Madam Jihadah Binti Ahmad and the panel. Thank you, and I now welcome your questions."
* **Bahasa Melayu:** "Kesimpulannya, PinjamGeng telah berjaya mencapai kesemua objektif projek. Jutaan terima kasih diucapkan kepada penyelia saya, Puan Jihadah Binti Ahmad, dan para panel penilai. Sekian, terima kasih."

---

## 💡 Anticipated Panel Questions & Best Answers

### Q1: "What if two students submit a booking for the last remaining PA system at the exact same second?"
* **Answer:** "PinjamGeng utilizes database-level transactions with MySQL InnoDB row-locking and atomic queries. The conflict detection engine calculates the remaining stock within the transaction. The first transaction to commit reserves the stock, while the second transaction immediately detects that available quantity has dropped to zero and rolls back, informing the second student that the item was just reserved."

### Q2: "How does your system prevent students from bypassing the UI and accessing admin URLs?"
* **Answer:** "Every administrative controller file includes a server-side authentication check via `config/auth.php`. It inspects the `$_SESSION['user_role']`. If a user is not logged in or has role `'student'`, the system immediately destroys the session attempt and redirects them to the login page with an unauthorized error message. It does not rely on frontend JavaScript restrictions."

### Q3: "Why did you choose free hosting like InfinityFree instead of paid cloud like AWS?"
* **Answer:** "As a diploma final year project, InfinityFree provided a zero-cost, publicly accessible cloud environment that allowed real-world testing and evaluation by supervisors and respondents anywhere without financial barrier. However, because our codebase uses modular PHP and standard MySQL, it can be migrated to AWS EC2, cPanel, or Google Cloud Run in under five minutes with zero code modifications."

### Q4: "Why wasn't QR code scanning implemented in this phase?"
* **Answer:** "Our scope for FYP3024 prioritized the core operational foundation: automated conflict checking, 1-click bundling, and the damage grading engine. Hardware-dependent features like QR scanning were prioritized for Phase 2 once the core database rules and approval workflows were verified and stabilized."
