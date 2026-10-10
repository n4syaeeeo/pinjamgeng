<?php
// Registration Portal - PinjamGeng
// Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/config/db.php';
require_once __DIR__ . '/config/auth.php';
require_once __DIR__ . '/config/helpers.php';

if (isLoggedIn()) {
    header("Location: " . (isAdmin() ? base_url('admin/dashboard.php') : base_url('user/dashboard.php')));
    exit;
}

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['csrf_token'] ?? '';
    if (!verifyCsrfToken($token)) {
        $error = "Security validation failed (Invalid or expired CSRF token). Please try again.";
    } else {
        $full_name = trim($_POST['full_name'] ?? '');
        $matric_id = trim($_POST['matric_id'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $phone = trim($_POST['phone'] ?? '');
        $user_type = trim($_POST['user_type'] ?? 'student');
        $faculty = trim($_POST['faculty'] ?? 'Faculty of Computing & Multimedia');
        $password = $_POST['password'] ?? '';
        $confirm_password = $_POST['confirm_password'] ?? '';

        if (empty($full_name) || empty($matric_id) || empty($email) || empty($phone) || empty($password)) {
            $error = "Please fill in all mandatory marked fields.";
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $error = "Please enter a valid campus email address.";
        } elseif ($password !== $confirm_password) {
            $error = "Password and confirm password do not match.";
        } elseif (strlen($password) < 6) {
            $error = "Password must be at least 6 characters.";
        } else {
            // Check uniqueness
            $checkStmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ? OR matric_staff_id = ?");
            $checkStmt->execute([$email, $matric_id]);
            if ($checkStmt->fetchColumn() > 0) {
                $error = "An account with this Email or Student/Staff ID already exists.";
            } else {
                $hash = password_hash($password, PASSWORD_BCRYPT);
                $insertStmt = $pdo->prepare("INSERT INTO users (full_name, matric_staff_id, email, phone, role, user_type, faculty_department, password_hash) VALUES (?, ?, ?, ?, 'user', ?, ?, ?)");
                $insertStmt->execute([$full_name, $matric_id, $email, $phone, $user_type, $faculty, $hash]);

                setFlash('success', "Registration successful! You can now sign in using your PinjamGeng account.");
                header("Location: " . base_url('login.php'));
                exit;
            }
        }
    }
}

$pageTitle = "Register New Account";
include __DIR__ . '/includes/header.php';
?>

<div class="min-h-[calc(100vh-14rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-lg w-full space-y-6">
        
        <div class="text-center">
            <div class="mx-auto w-14 h-14 rounded-3xl bg-gradient-to-br from-caramel to-amber-gold text-coffee-950 flex items-center justify-center shadow-warm text-2xl">
                <i class="fa-solid fa-id-card"></i>
            </div>
            <h2 class="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-coffee-950 tracking-tight">
                Register for <span class="text-caramel">PinjamGeng</span>
            </h2>
            <p class="mt-1 text-xs text-coffee-600">
                UPTM Campus Registration • Students, Clubs & Staff
            </p>
        </div>

        <div class="bg-white py-8 px-6 sm:px-8 shadow-warm rounded-3xl border border-coffee-200">
            <?php if (!empty($error)): ?>
                <div class="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center">
                    <i class="fa-solid fa-circle-exclamation text-base mr-2 text-rose-500"></i>
                    <?= sanitize($error) ?>
                </div>
            <?php endif; ?>

            <form class="space-y-4" method="POST" action="">
                <?= csrfField() ?>
                
                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Full Name *</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-coffee-400">
                            <i class="fa-solid fa-user"></i>
                        </span>
                        <input type="text" name="full_name" required value="<?= sanitize($_POST['full_name'] ?? '') ?>" placeholder="e.g. Nursyafiqah Zulaikha" class="block w-full pl-10 pr-3.5 py-2.5 border border-coffee-200 rounded-2xl text-sm bg-coffee-50/50 text-coffee-900 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Matric / Staff ID *</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-coffee-400">
                                <i class="fa-solid fa-id-badge"></i>
                            </span>
                            <input type="text" name="matric_id" required value="<?= sanitize($_POST['matric_id'] ?? '') ?>" placeholder="e.g. AM2412018113" class="block w-full pl-10 pr-3.5 py-2.5 border border-coffee-200 rounded-2xl text-sm bg-coffee-50/50 text-coffee-900 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">User Category *</label>
                        <select name="user_type" class="block w-full px-3.5 py-2.5 border border-coffee-200 rounded-2xl text-sm bg-coffee-50/50 text-coffee-900 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
                            <option value="student">Student</option>
                            <option value="committee">Club / Society Committee</option>
                            <option value="lecturer">Lecturer / Academic Staff</option>
                            <option value="staff">Administrative Staff</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Campus Email *</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-coffee-400">
                                <i class="fa-solid fa-envelope"></i>
                            </span>
                            <input type="email" name="email" required value="<?= sanitize($_POST['email'] ?? '') ?>" placeholder="e.g. name@student.uptm.edu.my" class="block w-full pl-10 pr-3.5 py-2.5 border border-coffee-200 rounded-2xl text-sm bg-coffee-50/50 text-coffee-900 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Phone Number / WhatsApp *</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-coffee-400">
                                <i class="fa-brands fa-whatsapp"></i>
                            </span>
                            <input type="text" name="phone" required value="<?= sanitize($_POST['phone'] ?? '') ?>" placeholder="e.g. 017-6281934" class="block w-full pl-10 pr-3.5 py-2.5 border border-coffee-200 rounded-2xl text-sm bg-coffee-50/50 text-coffee-900 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
                        </div>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Faculty / Department / Club</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-coffee-400">
                            <i class="fa-solid fa-building-columns"></i>
                        </span>
                        <input type="text" name="faculty" value="<?= sanitize($_POST['faculty'] ?? 'Faculty of Computing & Multimedia') ?>" placeholder="e.g. Faculty of Computing & Multimedia" class="block w-full pl-10 pr-3.5 py-2.5 border border-coffee-200 rounded-2xl text-sm bg-coffee-50/50 text-coffee-900 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Password *</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-coffee-400">
                                <i class="fa-solid fa-lock"></i>
                            </span>
                            <input type="password" name="password" required placeholder="Minimum 6 characters" class="block w-full pl-10 pr-3.5 py-2.5 border border-coffee-200 rounded-2xl text-sm bg-coffee-50/50 text-coffee-900 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1">Confirm Password *</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-coffee-400">
                                <i class="fa-solid fa-shield-halved"></i>
                            </span>
                            <input type="password" name="confirm_password" required placeholder="Repeat password" class="block w-full pl-10 pr-3.5 py-2.5 border border-coffee-200 rounded-2xl text-sm bg-coffee-50/50 text-coffee-900 focus:bg-white focus:ring-2 focus:ring-caramel focus:border-caramel focus:outline-none transition-all">
                        </div>
                    </div>
                </div>

                <div class="pt-2">
                    <button type="submit" class="w-full flex justify-center items-center py-3.5 px-4 rounded-2xl shadow-warm text-sm font-bold text-white bg-gradient-to-r from-caramel to-coffee-700 hover:from-caramel-hover hover:to-coffee-800 transition-all active:scale-[0.99]">
                        <i class="fa-solid fa-user-plus mr-2"></i> Complete PinjamGeng Registration
                    </button>
                </div>
            </form>

            <div class="mt-6 pt-6 border-t border-coffee-200/80 text-center">
                <p class="text-xs text-coffee-600">
                    Already have a registered account? 
                    <a href="<?= base_url('login.php') ?>" class="font-bold text-caramel hover:text-caramel-hover hover:underline ml-1">
                        Sign In Here
                    </a>
                </p>
            </div>
        </div>

    </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
