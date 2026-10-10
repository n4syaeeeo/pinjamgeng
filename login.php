<?php
// User & Admin Secure Login Portal
// Smart Event Equipment Booking and Inventory Management System (UPTM)

require_once __DIR__ . '/config/db.php';
require_once __DIR__ . '/config/auth.php';
require_once __DIR__ . '/config/helpers.php';

// If already logged in, redirect to respective dashboard
if (isLoggedIn()) {
    header("Location: " . (isAdmin() ? base_url('admin/dashboard.php') : base_url('user/dashboard.php')));
    exit;
}

$error = '';
$isLocked = isLoginLocked();
$lockoutSeconds = getRemainingLockoutSeconds();

// Optional URL pre-fill for demo convenience (populates text boxes only; does NOT log in or bypass authentication)
$prefillIdentifier = '';
$prefillPassword = '';
if (isset($_GET['fill'])) {
    if ($_GET['fill'] === 'admin') {
        $prefillIdentifier = 'admin@uptm.edu.my';
        $prefillPassword = 'password123';
    } elseif ($_GET['fill'] === 'student') {
        $prefillIdentifier = 'syafiqah@student.uptm.edu.my';
        $prefillPassword = 'password123';
    }
}

// Handle Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1. Check Brute-Force Lockout
    if ($isLocked) {
        $error = "Account login temporarily locked due to too many failed attempts. Please wait {$lockoutSeconds} seconds.";
    } else {
        // 2. Validate Anti-CSRF Token
        $token = $_POST['csrf_token'] ?? '';
        if (!verifyCsrfToken($token)) {
            $error = "Security validation failed (Invalid or expired CSRF token). Please refresh the page and try again.";
        } else {
            $identifier = trim($_POST['identifier'] ?? '');
            $password = trim($_POST['password'] ?? '');

            if (empty($identifier) || empty($password)) {
                $error = "Please enter both your Email / Matric ID and password.";
            } else {
                // 3. Query User with Prepared Statement (SQL-Injection Safe)
                $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? OR matric_staff_id = ?");
                $stmt->execute([$identifier, $identifier]);
                $user = $stmt->fetch();

                // 4. Verify Cryptographic Password Hash (BCrypt)
                if ($user && password_verify($password, $user['password_hash'])) {
                    // Successful authentication -> establish session with ID regeneration
                    loginUser($user);
                    setFlash('success', "Welcome back, {$user['full_name']}! Authenticated as " . strtoupper($user['role']) . ".");
                    
                    $destination = ($user['role'] === 'admin') ? base_url('admin/dashboard.php') : base_url('user/dashboard.php');
                    header("Location: {$destination}");
                    exit;
                } else {
                    // Failed attempt -> record and throttle
                    $attempts = recordFailedLogin();
                    $remaining = MAX_LOGIN_ATTEMPTS - $attempts;

                    if ($remaining > 0) {
                        $error = "Invalid credentials. {$remaining} attempts remaining before temporary lockout.";
                    } else {
                        $isLocked = true;
                        $lockoutSeconds = LOCKOUT_DURATION_SECONDS;
                        $error = "Too many failed attempts! Account login locked for 5 minutes.";
                    }
                }
            }
        }
    }
}

$pageTitle = "Secure Login";
include __DIR__ . '/includes/header.php';
?>

<div class="min-h-[calc(100vh-14rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-6">
        
        <!-- Header -->
        <div class="text-center">
            <div class="mx-auto w-14 h-14 rounded-3xl bg-gradient-to-br from-caramel to-amber-gold text-coffee-950 flex items-center justify-center shadow-warm text-2xl">
                <i class="fa-solid fa-boxes-packing"></i>
            </div>
            <h2 class="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-coffee-950 tracking-tight">
                Sign In to <span class="text-caramel">PinjamGeng</span>
            </h2>
            <p class="mt-1 text-xs text-coffee-600">
                Event Equipment Booking & Inventory System • UPTM
            </p>
        </div>

        <!-- Security Features Notice Badge -->
        <div class="flex items-center justify-center space-x-2 text-[10px] text-coffee-600 font-semibold bg-white p-2.5 rounded-2xl border border-coffee-200 shadow-warm">
            <span class="inline-flex items-center text-emerald-700">
                <i class="fa-solid fa-lock mr-1"></i> BCrypt Hashed
            </span>
            <span class="text-coffee-300">•</span>
            <span class="inline-flex items-center text-caramel">
                <i class="fa-solid fa-fingerprint mr-1"></i> Anti-CSRF
            </span>
            <span class="text-coffee-300">•</span>
            <span class="inline-flex items-center text-coffee-800">
                <i class="fa-solid fa-shield-virus mr-1"></i> Anti Fixation
            </span>
        </div>

        <!-- Quick Credential Autofill Helper (Client-side typing only; NO bypass) -->
        <div class="bg-coffee-100/70 border border-coffee-200 rounded-3xl p-4 shadow-sm">
            <div class="flex items-center justify-between mb-2">
                <span class="text-[11px] font-bold uppercase tracking-wider text-coffee-900 flex items-center font-display">
                    <i class="fa-solid fa-wand-magic-sparkles mr-1.5 text-caramel"></i> Presentation Demo Assistant (Autofill)
                </span>
                <span class="text-[10px] text-coffee-500">Quick fill</span>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <button type="button" 
                        onclick="fillInputs('admin@uptm.edu.my', 'password123', 'admin')" 
                        class="px-3 py-2 rounded-2xl text-xs font-bold bg-coffee-900 text-amber-gold hover:bg-coffee-800 text-center shadow-sm transition-all flex items-center justify-center space-x-1.5">
                    <i class="fa-solid fa-user-shield text-amber-gold"></i>
                    <span>Fill Admin Account</span>
                </button>
                <button type="button" 
                        onclick="fillInputs('syafiqah@student.uptm.edu.my', 'password123', 'student')" 
                        class="px-3 py-2 rounded-2xl text-xs font-bold bg-caramel text-white hover:bg-caramel-hover text-center shadow-sm transition-all flex items-center justify-center space-x-1.5">
                    <i class="fa-solid fa-user-graduate"></i>
                    <span>Fill Student Account</span>
                </button>
            </div>
            <p class="text-[10px] text-coffee-500 mt-2 text-center">
                <em>Note:</em> Click a button to auto-fill input fields. You still need to click <strong>"Sign In to Portal"</strong> for secure verification.
            </p>
        </div>

        <!-- Login Form Card -->
        <div class="bg-white py-8 px-6 sm:px-8 shadow-warm-lg rounded-3xl border border-coffee-200">
            <?php include __DIR__ . '/includes/alerts.php'; ?>

            <?php if (!empty($error)): ?>
                <div class="mb-5 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center">
                    <i class="fa-solid fa-circle-exclamation text-base mr-2.5 text-rose-600 flex-shrink-0"></i>
                    <div><?= sanitize($error) ?></div>
                </div>
            <?php endif; ?>

            <?php if ($isLocked): ?>
                <div class="mb-5 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs">
                    <div class="font-bold flex items-center mb-1">
                        <i class="fa-solid fa-clock mr-1.5 text-amber-600"></i> Rate Limiting / Lockout Active
                    </div>
                    <p>Too many invalid password attempts. Please wait <strong id="lockoutTimer"><?= $lockoutSeconds ?></strong> seconds before trying again.</p>
                </div>
            <?php endif; ?>

            <form class="space-y-5" method="POST" action="" id="loginForm">
                <!-- Anti-CSRF Token -->
                <?= csrfField() ?>

                <div>
                    <label for="identifier" class="block text-xs font-bold text-coffee-800 uppercase tracking-wider mb-1 font-display">
                        Email Address or Matric / Staff ID <span class="text-rose-500">*</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-coffee-400">
                            <i class="fa-regular fa-envelope"></i>
                        </div>
                        <input id="identifier" name="identifier" type="text" required 
                               value="<?= sanitize($prefillIdentifier) ?>"
                               <?= $isLocked ? 'disabled' : '' ?>
                               placeholder="e.g. admin@uptm.edu.my or AM2412018113" 
                               class="block w-full pl-10 pr-3.5 py-2.5 border border-coffee-200 rounded-2xl text-xs sm:text-sm placeholder-coffee-300 focus:outline-none focus:ring-2 focus:ring-caramel focus:border-transparent disabled:bg-coffee-100 disabled:text-coffee-400 bg-[#fdfbf7]">
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between mb-1">
                        <label for="password" class="block text-xs font-bold text-coffee-800 uppercase tracking-wider font-display">
                            Password <span class="text-rose-500">*</span>
                        </label>
                        <button type="button" onclick="togglePasswordVisibility()" class="text-[11px] text-caramel hover:text-caramel-hover font-semibold">
                            <span id="pwdToggleText">Show</span>
                        </button>
                    </div>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-coffee-400">
                            <i class="fa-solid fa-key"></i>
                        </div>
                        <input id="password" name="password" type="password" required 
                               value="<?= sanitize($prefillPassword) ?>"
                               <?= $isLocked ? 'disabled' : '' ?>
                               placeholder="Enter your password" 
                               class="block w-full pl-10 pr-10 py-2.5 border border-coffee-200 rounded-2xl text-xs sm:text-sm placeholder-coffee-300 focus:outline-none focus:ring-2 focus:ring-caramel focus:border-transparent disabled:bg-coffee-100 disabled:text-coffee-400 bg-[#fdfbf7]">
                    </div>
                </div>

                <div>
                    <button type="submit" 
                            <?= $isLocked ? 'disabled' : '' ?>
                            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-2xl shadow-warm text-sm font-bold text-white bg-gradient-to-r from-caramel to-amber-gold hover:from-caramel-hover hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-caramel transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        <i class="fa-solid fa-right-to-bracket mr-2 my-auto"></i> Sign In to Portal
                    </button>
                </div>
            </form>

            <div class="mt-6 pt-6 border-t border-coffee-100 text-center">
                <p class="text-xs text-coffee-600">
                    New student or club secretariat? 
                    <a href="<?= base_url('register.php') ?>" class="font-bold text-caramel hover:text-caramel-hover">
                        Register New Account
                    </a>
                </p>
            </div>
        </div>

    </div>
</div>

<script>
    // Autofill helper for presentation convenience
    function fillInputs(email, password, role) {
        const idInput = document.getElementById('identifier');
        const pwdInput = document.getElementById('password');
        
        idInput.value = email;
        pwdInput.value = password;

        // Visual flash highlight
        [idInput, pwdInput].forEach(el => {
            el.classList.add('bg-amber-50', 'border-amber-400');
            setTimeout(() => {
                el.classList.remove('bg-amber-50', 'border-amber-400');
            }, 600);
        });
    }

    // Toggle password visibility
    function togglePasswordVisibility() {
        const pwd = document.getElementById('password');
        const txt = document.getElementById('pwdToggleText');
        if (pwd.type === 'password') {
            pwd.type = 'text';
            txt.innerText = 'Hide';
        } else {
            pwd.type = 'password';
            txt.innerText = 'Show';
        }
    }

    // Countdown timer if locked
    <?php if ($isLocked && $lockoutSeconds > 0): ?>
    let secondsLeft = <?= $lockoutSeconds ?>;
    const timerEl = document.getElementById('lockoutTimer');
    const interval = setInterval(() => {
        secondsLeft--;
        if (timerEl) timerEl.innerText = secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(interval);
            window.location.href = '<?= base_url('login.php') ?>';
        }
    }, 1000);
    <?php endif; ?>
</script>

<?php include __DIR__ . '/includes/footer.php'; ?>
