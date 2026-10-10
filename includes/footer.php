    </main>

    <!-- Footer Component: PinjamGeng -->
    <footer class="bg-coffee-950 text-coffee-400 text-sm mt-16 border-t border-coffee-900 no-print">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <!-- Col 1: System info -->
                <div class="md:col-span-2 space-y-3">
                    <div class="flex items-center space-x-3">
                        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-caramel to-amber-gold flex items-center justify-center text-white shadow-sm">
                            <i class="fa-solid fa-boxes-packing text-base"></i>
                        </div>
                        <span class="font-display font-extrabold text-white text-lg tracking-tight">Pinjam<span class="text-amber-gold">Geng</span></span>
                    </div>
                    <p class="text-xs text-coffee-300 leading-relaxed max-w-md">
                        Campus Smart Event Equipment Booking and Inventory Management System. Facilitating seamless equipment loan reservations and curated package bookings across campus without schedule overlaps.
                    </p>
                    <div class="pt-2">
                        <span class="inline-flex items-center px-3 py-1 rounded-full bg-coffee-900 text-amber-gold text-xs border border-coffee-800">
                            <i class="fa-solid fa-university mr-1.5"></i> Universiti Poly-Tech Malaysia (UPTM)
                        </span>
                    </div>
                </div>

                <!-- Col 2: Academic Info -->
                <div class="space-y-2">
                    <h4 class="text-xs font-bold text-coffee-200 uppercase tracking-wider font-display">FYP Project Details</h4>
                    <ul class="text-xs space-y-1.5 text-coffee-300">
                        <li><strong class="text-coffee-100">Student:</strong> Nursyafiqah Zulaikha Binti Zilkamal</li>
                        <li><strong class="text-coffee-100">Matric No.:</strong> AM2412018113</li>
                        <li><strong class="text-coffee-100">Supervisor:</strong> Madam Jihadah Binti Ahmad</li>
                        <li><strong class="text-coffee-100">Faculty:</strong> Faculty of Computing & Multimedia (FCM)</li>
                    </ul>
                </div>

                <!-- Col 3: Quick Navigation -->
                <div class="space-y-2">
                    <h4 class="text-xs font-bold text-coffee-200 uppercase tracking-wider font-display">Quick Links</h4>
                    <ul class="text-xs space-y-1.5">
                        <li><a href="<?= base_url('user/packages.php') ?>" class="hover:text-amber-gold transition-colors">Smart Event Packages (Star Feature)</a></li>
                        <li><a href="<?= base_url('user/equipment.php') ?>" class="hover:text-amber-gold transition-colors">Catalog & Stock Check</a></li>
                        <li><a href="<?= base_url('user/book.php') ?>" class="hover:text-amber-gold transition-colors">New Booking Request</a></li>
                        <li><a href="<?= base_url('admin/returns.php') ?>" class="hover:text-amber-gold transition-colors">Return Inspection Desk</a></li>
                        <li><a href="<?= base_url('admin/maintenance.php') ?>" class="hover:text-amber-gold transition-colors">Maintenance Records</a></li>
                    </ul>
                </div>
            </div>

            <div class="pt-6 border-t border-coffee-900 flex flex-col sm:flex-row justify-between items-center text-xs text-coffee-500">
                <p>&copy; <?= date('Y') ?> PinjamGeng • Universiti Poly-Tech Malaysia (UPTM). Final Year Project (FYP).</p>
                <p class="mt-2 sm:mt-0 flex items-center space-x-3 text-coffee-400">
                    <span>PHP 8.2 • MySQL • Tailwind Brown Aesthetic • Apache</span>
                </p>
            </div>
        </div>
    </footer>

    <!-- Global Scripts -->
    <script>
        function dismissAlert(btn) {
            const alert = btn.closest('.animate-fade-in');
            if (alert) {
                alert.style.opacity = '0';
                setTimeout(() => alert.remove(), 250);
            }
        }
    </script>
</body>
</html>
