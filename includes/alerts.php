<?php
// Alerts / Toast Notifications Component
?>
<?php if (hasFlash('success')): ?>
    <div class="mb-6 flex items-center p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg shadow-sm text-emerald-800 animate-fade-in" role="alert">
        <i class="fa-solid fa-circle-check text-xl mr-3 text-emerald-500"></i>
        <div class="flex-1 font-medium"><?= sanitize(getFlash('success')) ?></div>
        <button type="button" onclick="this.parentElement.remove()" class="text-emerald-500 hover:text-emerald-700 ml-3">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
<?php endif; ?>

<?php if (hasFlash('error')): ?>
    <div class="mb-6 flex items-center p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-lg shadow-sm text-rose-800 animate-fade-in" role="alert">
        <i class="fa-solid fa-circle-exclamation text-xl mr-3 text-rose-500"></i>
        <div class="flex-1 font-medium"><?= sanitize(getFlash('error')) ?></div>
        <button type="button" onclick="this.parentElement.remove()" class="text-rose-500 hover:text-rose-700 ml-3">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
<?php endif; ?>

<?php if (hasFlash('info')): ?>
    <div class="mb-6 flex items-center p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-lg shadow-sm text-sky-800 animate-fade-in" role="alert">
        <i class="fa-solid fa-circle-info text-xl mr-3 text-sky-500"></i>
        <div class="flex-1 font-medium"><?= sanitize(getFlash('info')) ?></div>
        <button type="button" onclick="this.parentElement.remove()" class="text-sky-500 hover:text-sky-700 ml-3">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
<?php endif; ?>
