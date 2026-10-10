const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imgDir = path.join(__dirname, 'images');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// Helper CSS
const headHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1280, initial-scale=1.0">
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          coffee: {
            50: '#fdfbf7',
            100: '#f7f2ea',
            200: '#ece3d5',
            300: '#ded0bf',
            400: '#c2a88f',
            500: '#a68263',
            600: '#8c6544',
            700: '#6f4a2d',
            800: '#52341d',
            900: '#382112',
            950: '#231308',
          },
          caramel: {
            light: '#fff5ed',
            DEFAULT: '#d97736',
            hover: '#c46222',
            dark: '#9a4714'
          },
          amber: {
            gold: '#e5a953'
          }
        },
        fontFamily: {
          sans: ['Plus Jakarta Sans', 'Inter', 'Segoe UI', 'sans-serif'],
          display: ['Outfit', 'Segoe UI', 'sans-serif']
        }
      }
    }
  }
</script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #fdfbf7; margin: 0; padding: 0; color: #231308; }
  .font-display { font-family: 'Outfit', sans-serif; }
</style>
</head>
<body class="bg-[#fdfbf7] min-h-[900px] text-coffee-950">
`;

// 1. ADD NEW EQUIPMENT MODAL HTML
const addEquipmentHtml = `${headHtml}
<!-- Fake Admin Background Page -->
<div class="relative w-[1280px] h-[850px] bg-[#fdfbf7] overflow-hidden">
  <!-- Top bar -->
  <div class="bg-coffee-950 text-coffee-300 text-xs py-2 px-8 flex justify-between items-center border-b border-coffee-900">
    <div class="flex items-center space-x-3">
      <span class="text-amber-gold font-bold"><i class="fa-solid fa-graduation-cap mr-2"></i> Universiti Poly-Tech Malaysia (UPTM)</span>
      <span class="text-coffee-600">•</span>
      <span>Faculty of Computing & Multimedia (FCOM)</span>
    </div>
    <div class="flex items-center space-x-4 text-coffee-400">
      <span><i class="fa-solid fa-shield-halved text-amber-gold mr-1"></i> Admin Portal</span>
      <span>System Date: 18 Oct 2026</span>
    </div>
  </div>

  <!-- Header Nav -->
  <div class="bg-white border-b border-coffee-200 px-8 py-3.5 flex justify-between items-center shadow-sm">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-caramel to-coffee-800 flex items-center justify-center text-white shadow-md">
        <i class="fa-solid fa-boxes-stacked text-lg text-amber-gold"></i>
      </div>
      <div>
        <h1 class="font-display font-extrabold text-lg text-coffee-950 leading-tight">PinjamGeng <span class="text-caramel font-normal text-xs px-2 py-0.5 rounded-full bg-caramel/10 border border-caramel/20">ADMIN</span></h1>
        <p class="text-[11px] text-coffee-600">Smart Campus Equipment Inventory Suite</p>
      </div>
    </div>
    <div class="flex items-center space-x-6 text-xs font-semibold text-coffee-700">
      <span class="hover:text-caramel cursor-pointer">Dashboard</span>
      <span class="hover:text-caramel cursor-pointer">Reservations</span>
      <span class="text-caramel border-b-2 border-caramel pb-1 font-bold">Equipment Inventory</span>
      <span class="hover:text-caramel cursor-pointer">Return Desk</span>
      <span class="hover:text-caramel cursor-pointer">Reports</span>
    </div>
    <div class="flex items-center space-x-3">
      <div class="text-right">
        <div class="text-xs font-bold text-coffee-950">Ts. Dr. Ahmad Razali</div>
        <div class="text-[10px] text-coffee-500">Chief Lab Technologist</div>
      </div>
      <div class="w-9 h-9 rounded-full bg-coffee-200 text-coffee-800 font-bold flex items-center justify-center border border-coffee-300">AR</div>
    </div>
  </div>

  <!-- Background Content (blurred under backdrop) -->
  <div class="p-8 filter blur-[2px] opacity-40 select-none pointer-events-none">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="font-display text-2xl font-bold text-coffee-950">Master Equipment Inventory</h2>
        <p class="text-xs text-coffee-600">Manage 94 institutional assets across audio, visual, and computing labs</p>
      </div>
      <button class="bg-caramel text-white text-xs font-bold px-4 py-2.5 rounded-xl"><i class="fa-solid fa-plus mr-1.5"></i> Add New Equipment</button>
    </div>
    <div class="bg-white rounded-2xl border border-coffee-200 p-4 shadow">
      <table class="w-full text-xs text-left">
        <thead class="bg-coffee-100/60 border-b border-coffee-200 text-coffee-700 uppercase font-bold">
          <tr>
            <th class="p-3">Asset Tag</th>
            <th class="p-3">Equipment Name</th>
            <th class="p-3">Category</th>
            <th class="p-3">Storage Location</th>
            <th class="p-3">Total Qty</th>
            <th class="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-coffee-100">
            <td class="p-3 font-mono font-bold">UPTM-PRJ-001</td>
            <td class="p-3">Epson EB-2250U 5000-Lumen Projector</td>
            <td class="p-3">Visual & Projection</td>
            <td class="p-3">AV Lab Shelf 2</td>
            <td class="p-3">4 / 4 Available</td>
            <td class="p-3"><span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">Good Condition</span></td>
          </tr>
          <tr class="border-b border-coffee-100">
            <td class="p-3 font-mono font-bold">UPTM-MIC-001</td>
            <td class="p-3">Shure BLX288 Dual Wireless Mic System</td>
            <td class="p-3">Audio & Sound</td>
            <td class="p-3">Cabinet A - Ground Floor</td>
            <td class="p-3">3 / 4 Available</td>
            <td class="p-3"><span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">Good Condition</span></td>
          </tr>
          <tr class="border-b border-coffee-100">
            <td class="p-3 font-mono font-bold">UPTM-PA-004</td>
            <td class="p-3">JBL EON ONE MK2 Portable Line Array</td>
            <td class="p-3">Audio & Sound</td>
            <td class="p-3">Sound Store Unit 1</td>
            <td class="p-3">2 / 2 Available</td>
            <td class="p-3"><span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">Good Condition</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- POPUP MODAL OVERLAY -->
  <div class="absolute inset-0 bg-coffee-950/70 backdrop-blur-[3px] flex items-center justify-center p-6 z-50">
    <div class="bg-white rounded-3xl border border-coffee-200 shadow-2xl w-[720px] max-h-[800px] overflow-hidden animate-fade-in">
      <!-- Modal Header -->
      <div class="bg-gradient-to-r from-coffee-900 to-coffee-950 px-7 py-5 flex justify-between items-center text-white border-b border-coffee-800">
        <div class="flex items-center space-x-3">
          <div class="w-9 h-9 rounded-xl bg-caramel/20 border border-caramel/40 flex items-center justify-center text-amber-gold">
            <i class="fa-solid fa-box-open text-base"></i>
          </div>
          <div>
            <h3 class="font-display font-bold text-base tracking-wide text-white">Register New Equipment Asset</h3>
            <p class="text-[11px] text-coffee-300">Add physical inventory item to UPTM PinjamGeng catalog database</p>
          </div>
        </div>
        <button class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-coffee-300 hover:text-white flex items-center justify-center transition-colors">
          <i class="fa-solid fa-xmark text-sm"></i>
        </button>
      </div>

      <!-- Modal Body Form -->
      <div class="p-7 space-y-4 text-xs text-coffee-900 overflow-y-auto max-h-[640px]">
        <div class="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start space-x-3">
          <i class="fa-solid fa-circle-info text-caramel mt-0.5"></i>
          <p class="text-[11px] text-coffee-800 leading-relaxed">
            Ensure the Asset Tag matches the physical barcode label stamped on the hardware casing. New assets will be immediately available in the live booking catalog upon saving.
          </p>
        </div>

        <!-- Row 1: Asset Tag & Category -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Asset Tag Code *</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-coffee-400 font-mono text-xs"><i class="fa-solid fa-barcode"></i></span>
              <input type="text" value="UPTM-PRJ-015" class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-coffee-300 bg-white font-mono font-bold text-coffee-950 focus:ring-2 focus:ring-caramel focus:outline-none" />
            </div>
            <span class="text-[10px] text-coffee-500 mt-1 block">Format: UPTM-[CAT]-[NUM]</span>
          </div>

          <div>
            <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Category *</label>
            <div class="relative">
              <select class="w-full px-3 py-2.5 rounded-xl border border-coffee-300 bg-white font-medium text-coffee-950 focus:ring-2 focus:ring-caramel focus:outline-none">
                <option selected>Visual & Projection Systems</option>
                <option>Audio & Sound Reinforcement</option>
                <option>Staging & Ambient Lighting</option>
                <option>Computing Hardware & Hubs</option>
                <option>Cables, Adapters & Peripherals</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Row 2: Equipment Name -->
        <div>
          <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Equipment / Item Name *</label>
          <input type="text" value="Epson EB-2250U Full HD Presentation Projector (5000 Lumens)" class="w-full px-3 py-2.5 rounded-xl border border-coffee-300 bg-white font-semibold text-coffee-950 focus:ring-2 focus:ring-caramel focus:outline-none" />
        </div>

        <!-- Row 3: Brand & Model, Storage Location -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Brand & Specific Model</label>
            <input type="text" value="Epson EB-2250U 3LCD 1080p" class="w-full px-3 py-2.5 rounded-xl border border-coffee-300 bg-white text-coffee-950 focus:ring-2 focus:ring-caramel focus:outline-none" />
          </div>

          <div>
            <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Physical Storage Location *</label>
            <input type="text" value="IT Store Shelf 2A - Multimedia Locker" class="w-full px-3 py-2.5 rounded-xl border border-coffee-300 bg-white text-coffee-950 focus:ring-2 focus:ring-caramel focus:outline-none" />
          </div>
        </div>

        <!-- Row 4: Total Units, Condition, Status -->
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Total Inventory Units *</label>
            <input type="number" value="5" class="w-full px-3 py-2.5 rounded-xl border border-coffee-300 bg-white font-bold text-coffee-950 focus:ring-2 focus:ring-caramel focus:outline-none" />
          </div>

          <div>
            <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Physical Condition *</label>
            <select class="w-full px-3 py-2.5 rounded-xl border border-coffee-300 bg-white text-coffee-950 font-medium focus:ring-2 focus:ring-caramel focus:outline-none">
              <option selected>Good Condition (100% Functional)</option>
              <option>Fair (Minor Cosmetic Scratches)</option>
              <option>Under Maintenance / Quarantine</option>
            </select>
          </div>

          <div>
            <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Package Eligibility</label>
            <div class="flex items-center h-[38px] px-2">
              <input type="checkbox" checked class="w-4 h-4 text-caramel rounded border-coffee-300 focus:ring-caramel mr-2" />
              <span class="text-[11px] text-coffee-800 font-semibold">Available for Smart Packages</span>
            </div>
          </div>
        </div>

        <!-- Row 5: Notes & Specification Details -->
        <div>
          <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Technical Specifications & Custodian Notes</label>
          <textarea rows="2" class="w-full px-3 py-2 rounded-xl border border-coffee-300 bg-white text-coffee-900 focus:ring-2 focus:ring-caramel focus:outline-none">Equipped with 2x HDMI 2.0 ports, VGA input, remote controller, and 10m power cord. Compatible with Seminar and Workshop smart packages.</textarea>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="bg-coffee-50 px-7 py-4 border-t border-coffee-200 flex justify-between items-center">
        <span class="text-[11px] text-coffee-500"><i class="fa-solid fa-lock text-coffee-400 mr-1"></i> Admin Audit Log Entry: Active</span>
        <div class="flex items-center space-x-3">
          <button class="px-4 py-2 rounded-xl text-xs font-bold text-coffee-700 bg-white hover:bg-coffee-100 border border-coffee-200 transition-colors">Cancel</button>
          <button class="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 shadow-md transition-all flex items-center">
            <i class="fa-solid fa-floppy-disk mr-1.5 text-amber-gold"></i> Save to PinjamGeng Inventory
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</body></html>`;

// 2. EDIT EQUIPMENT MODAL HTML
const editEquipmentHtml = `${headHtml}
<!-- Fake Admin Background Page -->
<div class="relative w-[1280px] h-[850px] bg-[#fdfbf7] overflow-hidden">
  <!-- Top bar -->
  <div class="bg-coffee-950 text-coffee-300 text-xs py-2 px-8 flex justify-between items-center border-b border-coffee-900">
    <div class="flex items-center space-x-3">
      <span class="text-amber-gold font-bold"><i class="fa-solid fa-graduation-cap mr-2"></i> Universiti Poly-Tech Malaysia (UPTM)</span>
      <span class="text-coffee-600">•</span>
      <span>Faculty of Computing & Multimedia (FCOM)</span>
    </div>
    <div class="flex items-center space-x-4 text-coffee-400">
      <span><i class="fa-solid fa-shield-halved text-amber-gold mr-1"></i> Admin Portal</span>
      <span>System Date: 18 Oct 2026</span>
    </div>
  </div>

  <!-- Header Nav -->
  <div class="bg-white border-b border-coffee-200 px-8 py-3.5 flex justify-between items-center shadow-sm">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-caramel to-coffee-800 flex items-center justify-center text-white shadow-md">
        <i class="fa-solid fa-boxes-stacked text-lg text-amber-gold"></i>
      </div>
      <div>
        <h1 class="font-display font-extrabold text-lg text-coffee-950 leading-tight">PinjamGeng <span class="text-caramel font-normal text-xs px-2 py-0.5 rounded-full bg-caramel/10 border border-caramel/20">ADMIN</span></h1>
        <p class="text-[11px] text-coffee-600">Smart Campus Equipment Inventory Suite</p>
      </div>
    </div>
    <div class="flex items-center space-x-6 text-xs font-semibold text-coffee-700">
      <span class="hover:text-caramel cursor-pointer">Dashboard</span>
      <span class="hover:text-caramel cursor-pointer">Reservations</span>
      <span class="text-caramel border-b-2 border-caramel pb-1 font-bold">Equipment Inventory</span>
      <span class="hover:text-caramel cursor-pointer">Return Desk</span>
      <span class="hover:text-caramel cursor-pointer">Reports</span>
    </div>
    <div class="flex items-center space-x-3">
      <div class="text-right">
        <div class="text-xs font-bold text-coffee-950">Ts. Dr. Ahmad Razali</div>
        <div class="text-[10px] text-coffee-500">Chief Lab Technologist</div>
      </div>
      <div class="w-9 h-9 rounded-full bg-coffee-200 text-coffee-800 font-bold flex items-center justify-center border border-coffee-300">AR</div>
    </div>
  </div>

  <!-- Background Content (blurred under backdrop) -->
  <div class="p-8 filter blur-[2px] opacity-40 select-none pointer-events-none">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="font-display text-2xl font-bold text-coffee-950">Master Equipment Inventory</h2>
        <p class="text-xs text-coffee-600">Active Record Details and Physical Allocation Management</p>
      </div>
    </div>
  </div>

  <!-- POPUP EDIT MODAL OVERLAY -->
  <div class="absolute inset-0 bg-coffee-950/70 backdrop-blur-[3px] flex items-center justify-center p-6 z-50">
    <div class="bg-white rounded-3xl border border-coffee-200 shadow-2xl w-[720px] max-h-[800px] overflow-hidden animate-fade-in">
      <!-- Modal Header -->
      <div class="bg-gradient-to-r from-coffee-900 to-coffee-950 px-7 py-5 flex justify-between items-center text-white border-b border-coffee-800">
        <div class="flex items-center space-x-3">
          <div class="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-gold">
            <i class="fa-solid fa-pen-to-square text-base"></i>
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <h3 class="font-display font-bold text-base tracking-wide text-white">Update Equipment Record</h3>
              <span class="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-400/30">ID #42</span>
            </div>
            <p class="text-[11px] text-coffee-300">Modify asset specifications, storage assignments, and operational condition</p>
          </div>
        </div>
        <button class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-coffee-300 hover:text-white flex items-center justify-center transition-colors">
          <i class="fa-solid fa-xmark text-sm"></i>
        </button>
      </div>

      <!-- Modal Body Form -->
      <div class="p-7 space-y-4 text-xs text-coffee-900 overflow-y-auto max-h-[640px]">
        <!-- Real-time Status Card -->
        <div class="bg-coffee-100/70 border border-coffee-200 rounded-2xl p-3.5 flex justify-between items-center">
          <div>
            <span class="text-[10px] text-coffee-500 uppercase font-bold tracking-wider block">Current Allocation Snapshot</span>
            <span class="text-xs font-bold text-coffee-900">Total: 4 Units | Currently Available: 3 Units | Active Loan: 1 Unit</span>
          </div>
          <span class="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-[11px] border border-emerald-200 flex items-center">
            <i class="fa-solid fa-circle-check mr-1.5 text-emerald-600"></i> Good Condition
          </span>
        </div>

        <!-- Row 1: Asset Tag & Category -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Asset Tag Code</label>
            <div class="relative">
              <input type="text" value="UPTM-MIC-001" readonly class="w-full px-3 py-2.5 rounded-xl border border-coffee-300 bg-coffee-100/60 font-mono font-bold text-coffee-900 cursor-not-allowed" />
              <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-coffee-400 text-xs"><i class="fa-solid fa-lock"></i></span>
            </div>
            <span class="text-[10px] text-coffee-500 mt-1 block">Institutional tag code is immutable</span>
          </div>

          <div>
            <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Category *</label>
            <select class="w-full px-3 py-2.5 rounded-xl border border-coffee-300 bg-white font-medium text-coffee-950 focus:ring-2 focus:ring-caramel focus:outline-none">
              <option selected>Audio & Sound Reinforcement</option>
              <option>Visual & Projection Systems</option>
              <option>Staging & Ambient Lighting</option>
              <option>Computing Hardware & Hubs</option>
            </select>
          </div>
        </div>

        <!-- Row 2: Equipment Name -->
        <div>
          <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Equipment / Item Name *</label>
          <input type="text" value="Shure BLX288/PG58 Dual Wireless Vocal Microphone System" class="w-full px-3 py-2.5 rounded-xl border border-coffee-300 bg-white font-semibold text-coffee-950 focus:ring-2 focus:ring-caramel focus:outline-none" />
        </div>

        <!-- Row 3: Brand & Model, Storage Location -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Brand & Model</label>
            <input type="text" value="Shure BLX288 Dual Channel / PG58 Transmitters" class="w-full px-3 py-2.5 rounded-xl border border-coffee-300 bg-white text-coffee-950 focus:ring-2 focus:ring-caramel focus:outline-none" />
          </div>

          <div>
            <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Storage Location *</label>
            <input type="text" value="Audio Rack Cabinet C - Level 1 Sound Lab" class="w-full px-3 py-2.5 rounded-xl border border-coffee-300 bg-white text-coffee-950 focus:ring-2 focus:ring-caramel focus:outline-none" />
          </div>
        </div>

        <!-- Row 4: Quantities & Maintenance Status -->
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Total Quantity</label>
            <input type="number" value="4" class="w-full px-3 py-2.5 rounded-xl border border-coffee-300 bg-white font-bold text-coffee-950 focus:ring-2 focus:ring-caramel focus:outline-none" />
          </div>

          <div>
            <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Available Quantity</label>
            <input type="number" value="3" class="w-full px-3 py-2.5 rounded-xl border border-coffee-300 bg-white font-bold text-coffee-950 focus:ring-2 focus:ring-caramel focus:outline-none" />
          </div>

          <div>
            <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Physical Condition *</label>
            <select class="w-full px-3 py-2.5 rounded-xl border border-coffee-300 bg-white text-coffee-950 font-medium focus:ring-2 focus:ring-caramel focus:outline-none">
              <option selected>Good Condition (Cleaned & Tested)</option>
              <option>Minor Wear (Fully Usable)</option>
              <option>Under Maintenance (Requires Tuning)</option>
              <option>Damaged (Quarantined)</option>
            </select>
          </div>
        </div>

        <!-- Row 5: Notes & Service History -->
        <div>
          <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Maintenance History & Custodian Notes</label>
          <textarea rows="2" class="w-full px-3 py-2 rounded-xl border border-coffee-300 bg-white text-coffee-900 focus:ring-2 focus:ring-caramel focus:outline-none">Routine preventative maintenance performed on 12 Jan 2026. Battery compartments cleaned with contact cleaner and RF frequencies recalibrated.</textarea>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="bg-coffee-50 px-7 py-4 border-t border-coffee-200 flex justify-between items-center">
        <button class="px-3 py-2 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 transition-colors flex items-center">
          <i class="fa-solid fa-trash-can mr-1.5"></i> Archive Equipment
        </button>
        <div class="flex items-center space-x-3">
          <button class="px-4 py-2 rounded-xl text-xs font-bold text-coffee-700 bg-white hover:bg-coffee-100 border border-coffee-200 transition-colors">Cancel</button>
          <button class="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 shadow-md transition-all flex items-center">
            <i class="fa-solid fa-check mr-1.5 text-amber-gold"></i> Update Equipment Record
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</body></html>`;

// 3. ACTION CONFIRMATION MODAL HTML
const confirmActionHtml = `${headHtml}
<!-- Fake Admin Background Page -->
<div class="relative w-[1280px] h-[850px] bg-[#fdfbf7] overflow-hidden">
  <!-- Top bar -->
  <div class="bg-coffee-950 text-coffee-300 text-xs py-2 px-8 flex justify-between items-center border-b border-coffee-900">
    <div class="flex items-center space-x-3">
      <span class="text-amber-gold font-bold"><i class="fa-solid fa-graduation-cap mr-2"></i> Universiti Poly-Tech Malaysia (UPTM)</span>
      <span class="text-coffee-600">•</span>
      <span>Faculty of Computing & Multimedia</span>
    </div>
    <div class="flex items-center space-x-4 text-coffee-400">
      <span><i class="fa-solid fa-shield-halved text-amber-gold mr-1"></i> Admin Decision Console</span>
      <span>System Date: 18 Oct 2026</span>
    </div>
  </div>

  <!-- Header Nav -->
  <div class="bg-white border-b border-coffee-200 px-8 py-3.5 flex justify-between items-center shadow-sm">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-caramel to-coffee-800 flex items-center justify-center text-white shadow-md">
        <i class="fa-solid fa-clipboard-check text-lg text-amber-gold"></i>
      </div>
      <div>
        <h1 class="font-display font-extrabold text-lg text-coffee-950 leading-tight">PinjamGeng <span class="text-caramel font-normal text-xs px-2 py-0.5 rounded-full bg-caramel/10 border border-caramel/20">APPROVAL DESK</span></h1>
        <p class="text-[11px] text-coffee-600">Booking Application Review & Inventory Allocation</p>
      </div>
    </div>
    <div class="flex items-center space-x-4 text-xs">
      <span class="font-mono bg-coffee-100 text-coffee-800 px-3 py-1 rounded-xl border border-coffee-200 font-bold">Requisition: #UPTM-BK-2026-001</span>
    </div>
  </div>

  <!-- Background Content (blurred under backdrop) -->
  <div class="p-8 filter blur-[2px] opacity-40 select-none pointer-events-none">
    <div class="bg-white rounded-3xl border border-coffee-200 p-6 shadow mb-6">
      <h2 class="font-display text-xl font-bold text-coffee-950">National AI & IoT Innovation Hackathon 2026</h2>
      <p class="text-xs text-coffee-600 mt-1">Applicant: Nursyafiqah Zulaikha Binti Zilkamal (AM2412018113) • Dewan Gemilang Level 2</p>
      <div class="mt-4 border-t border-coffee-100 pt-4 grid grid-cols-3 text-xs">
        <div>Pickup: 18 Oct 2026, 08:30 AM</div>
        <div>Return: 20 Oct 2026, 05:00 PM</div>
        <div>Expected Attendees: 150 pax</div>
      </div>
    </div>
  </div>

  <!-- POPUP CONFIRMATION MODAL OVERLAY -->
  <div class="absolute inset-0 bg-coffee-950/70 backdrop-blur-[3px] flex items-center justify-center p-6 z-50">
    <div class="bg-white rounded-3xl border border-coffee-200 shadow-2xl w-[680px] overflow-hidden animate-fade-in">
      <!-- Modal Header -->
      <div class="bg-gradient-to-r from-emerald-800 to-coffee-950 px-7 py-5 flex justify-between items-center text-white border-b border-emerald-700/50">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
            <i class="fa-solid fa-gavel text-lg"></i>
          </div>
          <div>
            <h3 class="font-display font-bold text-base tracking-wide text-white">Confirm Booking Approval & Stock Allocation</h3>
            <p class="text-[11px] text-emerald-200/90">Formal Lab Custodian Authorization Dialog</p>
          </div>
        </div>
        <button class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white flex items-center justify-center transition-colors">
          <i class="fa-solid fa-xmark text-sm"></i>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-7 space-y-4 text-xs text-coffee-900">
        <!-- Requisition Summary Card -->
        <div class="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Target Requisition</span>
              <h4 class="font-bold text-sm text-emerald-950">#UPTM-BK-2026-001</h4>
            </div>
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-[10px]">Pending -> Approved</span>
          </div>
          <div class="grid grid-cols-2 gap-2 text-[11px] text-emerald-900 border-t border-emerald-200/70 pt-2.5">
            <div><strong>Borrower:</strong> Nursyafiqah Zulaikha (AM2412018113)</div>
            <div><strong>Event:</strong> National AI Hackathon 2026</div>
            <div><strong>Duration:</strong> 18 Oct 2026 - 20 Oct 2026</div>
            <div><strong>Total Units:</strong> 22 Items (Audio, Visual, Staging)</div>
          </div>
        </div>

        <!-- Inventory Deduction Warning -->
        <div class="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-start space-x-3">
          <i class="fa-solid fa-triangle-exclamation text-caramel text-base mt-0.5"></i>
          <div>
            <strong class="font-bold text-coffee-950 block text-xs">Automated Stock Deduction Notice</strong>
            <p class="text-[11px] text-coffee-800 leading-relaxed mt-0.5">
              Confirming this approval will immediately lock and deduct all 22 requested units from the active campus inventory pool for the specified dates, preventing concurrent double-booking.
            </p>
          </div>
        </div>

        <!-- Official Remarks / Instructions -->
        <div>
          <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">
            Lab Officer Authorization Remarks & Pickup Instructions *
          </label>
          <textarea rows="3" class="w-full px-3 py-2.5 rounded-xl border border-coffee-300 bg-white text-coffee-950 focus:ring-2 focus:ring-emerald-600 focus:outline-none">Approved. All items inspected and reserved. Please present your student matric card and this printed agreement slip at Counter B, Block C Level 2, 30 minutes before event kickoff.</textarea>
          <span class="text-[10px] text-coffee-500 mt-1 block">These remarks will appear printed on Section D of the borrower's official loan agreement voucher.</span>
        </div>

        <!-- Verification Checkbox -->
        <div class="bg-coffee-100/70 p-3 rounded-xl border border-coffee-200 flex items-start space-x-2.5">
          <input type="checkbox" checked class="mt-0.5 w-4 h-4 text-emerald-700 rounded border-coffee-300 focus:ring-emerald-600" />
          <label class="text-[11px] text-coffee-900 font-medium">
            I certify that the requested equipment schedule has been verified and all hardware is physically staged for handover.
          </label>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="bg-coffee-50 px-7 py-4 border-t border-coffee-200 flex justify-between items-center">
        <button class="px-4 py-2 rounded-xl text-xs font-bold text-coffee-700 bg-white hover:bg-coffee-100 border border-coffee-200 transition-colors">
          Cancel & Return
        </button>
        <div class="flex items-center space-x-3">
          <button class="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-700 to-emerald-900 hover:from-emerald-800 hover:to-emerald-950 shadow-md transition-all flex items-center">
            <i class="fa-solid fa-check-double mr-1.5"></i> Confirm & Authorize Booking
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</body></html>`;

// 4. USER PROFILE & CHANGE PASSWORD PAGE HTML
const userProfileHtml = `${headHtml}
<div class="w-[1280px] bg-[#fdfbf7] min-h-[920px]">
  <!-- Top bar -->
  <div class="bg-coffee-950 text-coffee-300 text-xs py-2 px-8 flex justify-between items-center border-b border-coffee-900">
    <div class="flex items-center space-x-3">
      <span class="text-amber-gold font-bold"><i class="fa-solid fa-graduation-cap mr-2"></i> Universiti Poly-Tech Malaysia (UPTM)</span>
      <span class="text-coffee-600">•</span>
      <span>Faculty of Computing & Multimedia</span>
    </div>
    <div class="flex items-center space-x-4 text-coffee-400">
      <span><i class="fa-solid fa-circle-check text-emerald-400 mr-1"></i> Active Student Session</span>
      <span>Semester 5 • 2026/2027</span>
    </div>
  </div>

  <!-- Header Nav -->
  <div class="bg-white border-b border-coffee-200 px-8 py-3.5 flex justify-between items-center shadow-sm">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-caramel to-coffee-800 flex items-center justify-center text-white shadow-md">
        <i class="fa-solid fa-calendar-check text-lg text-amber-gold"></i>
      </div>
      <div>
        <h1 class="font-display font-extrabold text-lg text-coffee-950 leading-tight">PinjamGeng</h1>
        <p class="text-[11px] text-coffee-600">Smart Event Equipment Booking Portal</p>
      </div>
    </div>
    <div class="flex items-center space-x-6 text-xs font-semibold text-coffee-700">
      <span class="hover:text-caramel cursor-pointer">Dashboard</span>
      <span class="hover:text-caramel cursor-pointer">Browse Equipment</span>
      <span class="hover:text-caramel cursor-pointer">Smart Packages</span>
      <span class="hover:text-caramel cursor-pointer">My Bookings</span>
      <span class="text-caramel border-b-2 border-caramel pb-1 font-bold">Profile & Settings</span>
    </div>
    <div class="flex items-center space-x-3">
      <div class="text-right">
        <div class="text-xs font-bold text-coffee-950">Nursyafiqah Zulaikha</div>
        <div class="text-[10px] text-coffee-500 font-mono">AM2412018113</div>
      </div>
      <div class="w-9 h-9 rounded-full bg-caramel text-white font-bold flex items-center justify-center shadow-sm">NZ</div>
    </div>
  </div>

  <!-- Main Content Container -->
  <div class="max-w-6xl mx-auto px-8 py-8">
    <!-- Breadcrumb & Title -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <div class="text-xs text-coffee-500 flex items-center space-x-2 mb-1">
          <span>Student Portal</span>
          <span><i class="fa-solid fa-chevron-right text-[10px]"></i></span>
          <span class="text-caramel font-semibold">User Account Settings</span>
        </div>
        <h2 class="font-display text-2xl font-extrabold text-coffee-950">Borrower Profile & Security Settings</h2>
        <p class="text-xs text-coffee-600">Manage your institutional identity, verified contact details, and account security credentials</p>
      </div>
      <div class="flex items-center space-x-2">
        <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center">
          <i class="fa-solid fa-shield-halved mr-1.5 text-emerald-600"></i> Account Verified
        </span>
      </div>
    </div>

    <!-- Grid Layout: Profile Card + Security Card -->
    <div class="grid grid-cols-12 gap-8">
      <!-- Left Column: User Profile Info (5 cols) -->
      <div class="col-span-5 space-y-6">
        <!-- Profile Overview Card -->
        <div class="bg-white rounded-3xl border border-coffee-200 p-6 shadow-sm">
          <div class="flex items-center space-x-4 pb-6 border-b border-coffee-100">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-caramel to-coffee-800 text-white font-display font-bold text-2xl flex items-center justify-center shadow-md">
              NZ
            </div>
            <div>
              <h3 class="font-display font-bold text-base text-coffee-950">Nursyafiqah Zulaikha</h3>
              <p class="text-xs text-coffee-500 font-mono">Binti Zilkamal</p>
              <div class="flex items-center space-x-2 mt-1.5">
                <span class="px-2 py-0.5 rounded-md bg-coffee-100 text-coffee-800 font-mono font-bold text-[10px] border border-coffee-200">AM2412018113</span>
                <span class="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[10px]">Club Secretariat</span>
              </div>
            </div>
          </div>

          <!-- Academic & Contact Particulars -->
          <div class="py-5 space-y-3.5 text-xs text-coffee-800 border-b border-coffee-100">
            <div class="flex justify-between">
              <span class="text-coffee-500 font-semibold">Faculty:</span>
              <span class="font-bold text-coffee-950 text-right">Faculty of Computing & Multimedia</span>
            </div>
            <div class="flex justify-between">
              <span class="text-coffee-500 font-semibold">Program:</span>
              <span class="font-bold text-coffee-950 text-right">Diploma in Computer Science (CC101)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-coffee-500 font-semibold">Campus Email:</span>
              <span class="font-mono font-bold text-coffee-950 text-right">syafiqah@student.uptm.edu.my</span>
            </div>
            <div class="flex justify-between">
              <span class="text-coffee-500 font-semibold">Mobile Contact:</span>
              <span class="font-mono font-bold text-coffee-950 text-right">+60 18-294 8192</span>
            </div>
            <div class="flex justify-between">
              <span class="text-coffee-500 font-semibold">Registered Club:</span>
              <span class="font-bold text-caramel text-right">Multimedia & Computing Club</span>
            </div>
          </div>

          <!-- Account Historical Metrics -->
          <div class="pt-5 grid grid-cols-3 gap-2 text-center">
            <div class="bg-coffee-50 rounded-2xl p-2.5 border border-coffee-100">
              <span class="block text-base font-extrabold text-coffee-950">3</span>
              <span class="block text-[10px] text-coffee-500 font-semibold">Bookings</span>
            </div>
            <div class="bg-emerald-50 rounded-2xl p-2.5 border border-emerald-100">
              <span class="block text-base font-extrabold text-emerald-800">100%</span>
              <span class="block text-[10px] text-emerald-700 font-semibold">Clean Return</span>
            </div>
            <div class="bg-amber-50 rounded-2xl p-2.5 border border-amber-100">
              <span class="block text-base font-extrabold text-amber-900">RM 0</span>
              <span class="block text-[10px] text-amber-700 font-semibold">Penalties</span>
            </div>
          </div>
        </div>

        <!-- Notification Preferences -->
        <div class="bg-white rounded-3xl border border-coffee-200 p-6 shadow-sm text-xs">
          <h4 class="font-display font-bold text-sm text-coffee-950 mb-3 flex items-center">
            <i class="fa-solid fa-bell text-caramel mr-2"></i> Notification Reminders
          </h4>
          <div class="space-y-3 text-coffee-800">
            <div class="flex items-center justify-between">
              <div>
                <span class="font-bold block">Approval Email Alerts</span>
                <span class="text-[10px] text-coffee-500">Receive digital slip link upon admin sign-off</span>
              </div>
              <input type="checkbox" checked class="w-4 h-4 text-caramel rounded border-coffee-300" />
            </div>
            <div class="flex items-center justify-between border-t border-coffee-100 pt-3">
              <div>
                <span class="font-bold block">Due Date Return Reminder</span>
                <span class="text-[10px] text-coffee-500">Alert 2 hours before scheduled return slot</span>
              </div>
              <input type="checkbox" checked class="w-4 h-4 text-caramel rounded border-coffee-300" />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Change Password & Security Management (7 cols) -->
      <div class="col-span-7 space-y-6">
        <!-- Security Card -->
        <div class="bg-white rounded-3xl border border-coffee-200 p-7 shadow-sm">
          <div class="flex items-center space-x-3 pb-5 border-b border-coffee-100 mb-6">
            <div class="w-10 h-10 rounded-2xl bg-caramel/10 border border-caramel/20 flex items-center justify-center text-caramel">
              <i class="fa-solid fa-key text-base"></i>
            </div>
            <div>
              <h3 class="font-display font-bold text-base text-coffee-950">Security & Password Management</h3>
              <p class="text-xs text-coffee-600">Update your account login password and security settings</p>
            </div>
          </div>

          <!-- Security Callout -->
          <div class="bg-coffee-100/70 border border-coffee-200 rounded-2xl p-4 mb-6 flex items-start space-x-3 text-xs">
            <i class="fa-solid fa-shield-halved text-caramel text-base mt-0.5"></i>
            <div>
              <strong class="font-bold text-coffee-950 block">Cryptographic Protection Active</strong>
              <p class="text-[11px] text-coffee-700 leading-relaxed mt-0.5">
                Passwords are never stored in plaintext. PinjamGeng utilizes PHP's native BCrypt hashing algorithm with automated anti-CSRF token verification and failed login throttling (5 attempts maximum).
              </p>
            </div>
          </div>

          <!-- Password Change Form -->
          <form class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Current Password *</label>
              <div class="relative">
                <input type="password" value="••••••••••••" class="w-full px-3.5 py-2.5 rounded-xl border border-coffee-300 bg-white text-coffee-950 focus:ring-2 focus:ring-caramel focus:outline-none" />
                <span class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-coffee-400 cursor-pointer"><i class="fa-solid fa-eye-slash"></i></span>
              </div>
            </div>

            <div>
              <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">New Password *</label>
              <div class="relative">
                <input type="password" value="Syafiqah@Uptm2026!" class="w-full px-3.5 py-2.5 rounded-xl border border-coffee-300 bg-white text-coffee-950 focus:ring-2 focus:ring-caramel focus:outline-none font-mono" />
                <span class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-coffee-400 cursor-pointer"><i class="fa-solid fa-eye"></i></span>
              </div>
              <!-- Strength meter -->
              <div class="mt-2 flex items-center space-x-2">
                <div class="flex-1 h-1.5 bg-emerald-500 rounded-full"></div>
                <div class="flex-1 h-1.5 bg-emerald-500 rounded-full"></div>
                <div class="flex-1 h-1.5 bg-emerald-500 rounded-full"></div>
                <div class="flex-1 h-1.5 bg-emerald-500 rounded-full"></div>
                <span class="text-[10px] font-bold text-emerald-700">Strong Password</span>
              </div>
              <span class="text-[10px] text-coffee-500 mt-1 block">Minimum 8 characters with a mix of uppercase, numbers, and symbols.</span>
            </div>

            <div>
              <label class="block font-bold text-coffee-800 uppercase tracking-wider text-[10px] mb-1.5">Confirm New Password *</label>
              <div class="relative">
                <input type="password" value="Syafiqah@Uptm2026!" class="w-full px-3.5 py-2.5 rounded-xl border border-coffee-300 bg-white text-coffee-950 focus:ring-2 focus:ring-caramel focus:outline-none font-mono" />
                <span class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-emerald-600"><i class="fa-solid fa-check"></i></span>
              </div>
            </div>

            <div class="pt-4 flex items-center justify-between border-t border-coffee-100">
              <span class="text-[11px] text-coffee-500"><i class="fa-solid fa-clock-rotate-left mr-1"></i> Last changed: 15 Feb 2026</span>
              <button type="button" class="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-caramel to-coffee-800 hover:from-caramel-hover hover:to-coffee-900 shadow-md transition-all flex items-center">
                <i class="fa-solid fa-shield-halved mr-1.5 text-amber-gold"></i> Update Password & Save
              </button>
            </div>
          </form>
        </div>

        <!-- Session & Device Info -->
        <div class="bg-white rounded-3xl border border-coffee-200 p-6 shadow-sm text-xs">
          <h4 class="font-display font-bold text-sm text-coffee-950 mb-3 flex items-center">
            <i class="fa-solid fa-laptop text-caramel mr-2"></i> Active Device Sessions
          </h4>
          <div class="flex items-center justify-between bg-coffee-50/70 p-3.5 rounded-2xl border border-coffee-200/80">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-xl bg-coffee-200 flex items-center justify-center text-coffee-700">
                <i class="fa-solid fa-desktop"></i>
              </div>
              <div>
                <strong class="font-bold text-coffee-950 block">Campus Lab Workstation • Chrome 124</strong>
                <span class="text-[10px] text-coffee-500">IP: 10.20.14.88 (UPTM Campus Intranet) • Current Session</span>
              </div>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">This Device</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</body></html>`;

// Write HTML and capture PNG
const tasks = [
  { file: 'modal_add_equipment.html', png: 'modal_add_equipment.png', html: addEquipmentHtml, w: 1280, h: 860 },
  { file: 'modal_edit_equipment.html', png: 'modal_edit_equipment.png', html: editEquipmentHtml, w: 1280, h: 860 },
  { file: 'modal_confirm_action.html', png: 'modal_confirm_action.png', html: confirmActionHtml, w: 1280, h: 860 },
  { file: 'screen_user_profile.html', png: 'screen_user_profile.png', html: userProfileHtml, w: 1280, h: 930 },
];

tasks.forEach(t => {
  const htmlPath = path.join(__dirname, t.file);
  const pngPath = path.join(imgDir, t.png);
  fs.writeFileSync(htmlPath, t.html, 'utf8');
  console.log('Written HTML:', htmlPath);

  const cmd = `"${chromePath}" --headless --disable-gpu --window-size=${t.w},${t.h} --screenshot="${pngPath}" "${htmlPath}"`;
  execSync(cmd);
  console.log('Saved screenshot:', pngPath);
});

console.log('All 4 actual modal & profile screenshots captured successfully!');
