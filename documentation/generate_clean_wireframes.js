const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const wfDir = path.join(__dirname, 'images', 'wireframes');
if (!fs.existsSync(wfDir)) {
  fs.mkdirSync(wfDir, { recursive: true });
}

// Lowkey blank wireframe styling
const commonCss = `
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: Arial, sans-serif; }
  body { background: #FFFFFF; padding: 30px; display: flex; justify-content: center; }
  .wireframe-browser {
    width: 900px;
    border: 2px solid #4B5563;
    border-radius: 6px;
    background: #FFFFFF;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    overflow: hidden;
  }
  .browser-bar {
    background: #F3F4F6;
    border-bottom: 1.5px solid #4B5563;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .browser-dot { width: 10px; height: 10px; border: 1.5px solid #6B7280; border-radius: 50%; display: inline-block; }
  .browser-url {
    flex: 1;
    background: #FFFFFF;
    border: 1px solid #9CA3AF;
    border-radius: 4px;
    padding: 3px 10px;
    font-size: 11px;
    color: #4B5563;
    margin-left: 10px;
  }
  .wf-header {
    border-bottom: 1.5px solid #9CA3AF;
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #FAFAFA;
  }
  .wf-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: bold;
    color: #111827;
  }
  .wf-logo-box {
    width: 28px;
    height: 28px;
    border: 1.5px solid #374151;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    background: #E5E7EB;
  }
  .wf-nav {
    display: flex;
    gap: 16px;
    font-size: 12px;
    color: #4B5563;
  }
  .wf-nav-item { border-bottom: 2px solid transparent; padding: 4px 2px; }
  .wf-nav-item.active { border-bottom: 2px solid #111827; font-weight: bold; color: #111827; }
  .wf-body { padding: 24px; background: #FFFFFF; min-height: 480px; }
  .wf-box {
    border: 1.5px solid #9CA3AF;
    border-radius: 4px;
    background: #FFFFFF;
  }
  .wf-input {
    width: 100%;
    border: 1.5px solid #9CA3AF;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 12px;
    color: #6B7280;
    background: #FAFAFA;
    margin-top: 4px;
  }
  .wf-btn {
    border: 1.5px solid #111827;
    background: #E5E7EB;
    color: #111827;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    display: inline-block;
    cursor: default;
    text-align: center;
  }
  .wf-btn-primary { background: #374151; color: #FFFFFF; }
  .image-placeholder {
    border: 1.5px solid #9CA3AF;
    background: #F3F4F6;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6B7280;
    font-size: 11px;
  }
  .image-placeholder::before, .image-placeholder::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: #D1D5DB;
  }
  .image-placeholder::before { transform: rotate(24deg); }
  .image-placeholder::after { transform: rotate(-24deg); }
  .wf-badge {
    display: inline-block;
    border: 1px solid #6B7280;
    background: #F3F4F6;
    color: #374151;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 3px;
    font-weight: bold;
  }
  .wf-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
  }
  .wf-table th, .wf-table td {
    border: 1px solid #9CA3AF;
    padding: 8px 10px;
    text-align: left;
  }
  .wf-table th { background: #E5E7EB; color: #111827; font-weight: bold; }
  .wf-caption {
    font-size: 11px;
    color: #6B7280;
    margin-top: 4px;
  }
`;

// 1. Wireframe 3.1: Student Authentication & Portal Login
const wf1Html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${commonCss}</style></head><body>
<div class="wireframe-browser">
  <div class="browser-bar">
    <span class="browser-dot"></span><span class="browser-dot"></span><span class="browser-dot"></span>
    <span class="browser-url">https://pinjamgeng.uptm.edu.my/login.php</span>
  </div>
  <div class="wf-header">
    <div class="wf-logo"><div class="wf-logo-box">PG</div> PinjamGeng Portal</div>
    <div class="wf-nav"><span class="wf-nav-item">UPTM Campus Home</span><span class="wf-nav-item">Equipment Guidelines</span></div>
  </div>
  <div class="wf-body" style="display: flex; justify-content: center; align-items: center; min-height: 440px;">
    <div class="wf-box" style="width: 360px; padding: 28px; text-align: center;">
      <div class="image-placeholder" style="width: 54px; height: 54px; margin: 0 auto 12px; border-radius: 50%;"></div>
      <h3 style="font-size: 16px; color: #111827; margin-bottom: 4px;">Sign In to PinjamGeng</h3>
      <p style="font-size: 11px; color: #6B7280; margin-bottom: 20px;">UPTM Smart Event Equipment Requisition</p>
      
      <div style="text-align: left; margin-bottom: 12px;">
        <label style="font-size: 11px; font-weight: bold; color: #374151;">Student ID / Staff Email</label>
        <div class="wf-input">AM2412018113@student.uptm.edu.my</div>
      </div>

      <div style="text-align: left; margin-bottom: 18px;">
        <label style="font-size: 11px; font-weight: bold; color: #374151;">Password</label>
        <div class="wf-input">••••••••••••</div>
      </div>

      <div class="wf-btn wf-btn-primary" style="width: 100%; padding: 10px; margin-bottom: 14px;">Sign In to Dashboard</div>
      
      <div style="font-size: 11px; color: #6B7280; display: flex; justify-content: space-between;">
        <span>[ Remember me ]</span>
        <span style="text-decoration: underline;">Forgot password?</span>
      </div>
    </div>
  </div>
</div>
</body></html>`;

// 2. Wireframe 3.2: Equipment Catalog & Real-Time Stock Availability
const wf2Html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${commonCss}</style></head><body>
<div class="wireframe-browser">
  <div class="browser-bar">
    <span class="browser-dot"></span><span class="browser-dot"></span><span class="browser-dot"></span>
    <span class="browser-url">https://pinjamgeng.uptm.edu.my/catalog.php</span>
  </div>
  <div class="wf-header">
    <div class="wf-logo"><div class="wf-logo-box">PG</div> PinjamGeng • Borrower Portal</div>
    <div class="wf-nav">
      <span class="wf-nav-item active">Catalog & Stock</span>
      <span class="wf-nav-item">Smart Packages</span>
      <span class="wf-nav-item">Booking Wizard</span>
      <span class="wf-nav-item">My Loan Slips</span>
      <span class="wf-nav-item">[ User Profile ]</span>
    </div>
  </div>
  <div class="wf-body">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <div>
        <h2 style="font-size: 16px; color: #111827;">Live Equipment Inventory Catalog</h2>
        <p style="font-size: 11px; color: #6B7280;">Real-time stock indicators updated continuously from central repository</p>
      </div>
      <div style="display: flex; gap: 8px; width: 340px;">
        <div class="wf-input" style="margin: 0;">Search equipment by name or model...</div>
        <div class="wf-btn">Filter</div>
      </div>
    </div>

    <!-- Category Filter Bar -->
    <div style="display: flex; gap: 8px; margin-bottom: 18px;">
      <span class="wf-badge" style="background: #374151; color: #fff;">All Items (24)</span>
      <span class="wf-badge">Audio & Sound (8)</span>
      <span class="wf-badge">Visual & Projection (6)</span>
      <span class="wf-badge">Stage & Electrical (6)</span>
      <span class="wf-badge">Photography / Media (4)</span>
    </div>

    <!-- 4-Card Grid -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;">
      <!-- Card 1 -->
      <div class="wf-box" style="padding: 10px;">
        <div class="image-placeholder" style="height: 100px; margin-bottom: 8px;"><span style="position: relative; z-index: 1;">Projector 1080p</span></div>
        <div style="font-size: 12px; font-weight: bold; margin-bottom: 4px;">EPSON EB-E01 Projector</div>
        <div style="font-size: 10px; color: #6B7280; margin-bottom: 6px;">Visual / Stage • HDMI Support</div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="wf-badge" style="background: #E5E7EB; color: #111827;">Stock: 4 / 6 Avail</span>
          <div class="wf-btn" style="padding: 4px 8px; font-size: 10px;">+ Select</div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="wf-box" style="padding: 10px;">
        <div class="image-placeholder" style="height: 100px; margin-bottom: 8px;"><span style="position: relative; z-index: 1;">Wireless Mic Set</span></div>
        <div style="font-size: 12px; font-weight: bold; margin-bottom: 4px;">Shure Dual Wireless Mic</div>
        <div style="font-size: 10px; color: #6B7280; margin-bottom: 6px;">Audio • 2x Handheld + Receiver</div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="wf-badge" style="background: #E5E7EB; color: #111827;">Stock: 5 / 8 Avail</span>
          <div class="wf-btn" style="padding: 4px 8px; font-size: 10px;">+ Select</div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="wf-box" style="padding: 10px;">
        <div class="image-placeholder" style="height: 100px; margin-bottom: 8px;"><span style="position: relative; z-index: 1;">PA Speaker Kit</span></div>
        <div style="font-size: 12px; font-weight: bold; margin-bottom: 4px;">Yamaha StagePas 400BT</div>
        <div style="font-size: 10px; color: #6B7280; margin-bottom: 6px;">Audio • Portable Speaker + Stand</div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="wf-badge" style="background: #E5E7EB; color: #111827;">Stock: 2 / 3 Avail</span>
          <div class="wf-btn" style="padding: 4px 8px; font-size: 10px;">+ Select</div>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="wf-box" style="padding: 10px;">
        <div class="image-placeholder" style="height: 100px; margin-bottom: 8px;"><span style="position: relative; z-index: 1;">Tripod Projection Screen</span></div>
        <div style="font-size: 12px; font-weight: bold; margin-bottom: 4px;">70" x 70" Tripod Screen</div>
        <div style="font-size: 10px; color: #6B7280; margin-bottom: 6px;">Visual • Matte White Retractable</div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="wf-badge" style="background: #E5E7EB; color: #111827;">Stock: 3 / 4 Avail</span>
          <div class="wf-btn" style="padding: 4px 8px; font-size: 10px;">+ Select</div>
        </div>
      </div>
    </div>
  </div>
</div>
</body></html>`;

// 3. Wireframe 3.3: Pre-Configured "Smart Event Packages" Selection
const wf3Html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${commonCss}</style></head><body>
<div class="wireframe-browser">
  <div class="browser-bar">
    <span class="browser-dot"></span><span class="browser-dot"></span><span class="browser-dot"></span>
    <span class="browser-url">https://pinjamgeng.uptm.edu.my/packages.php</span>
  </div>
  <div class="wf-header">
    <div class="wf-logo"><div class="wf-logo-box">PG</div> PinjamGeng • Borrower Portal</div>
    <div class="wf-nav">
      <span class="wf-nav-item">Catalog & Stock</span>
      <span class="wf-nav-item active">Smart Packages</span>
      <span class="wf-nav-item">Booking Wizard</span>
      <span class="wf-nav-item">My Loan Slips</span>
    </div>
  </div>
  <div class="wf-body">
    <div style="margin-bottom: 16px;">
      <h2 style="font-size: 16px; color: #111827;">Pre-Configured "Smart Event Packages"</h2>
      <p style="font-size: 11px; color: #6B7280;">1-Click Bundled equipment tailored for standard university student club events</p>
    </div>

    <!-- 4 Package Grid -->
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
      <!-- Pkg 1 -->
      <div class="wf-box" style="padding: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <div>
            <span class="wf-badge">PKG-01</span>
            <h3 style="font-size: 14px; font-weight: bold; margin-top: 4px;">Seminar & Exhibition Setup</h3>
          </div>
          <span class="wf-badge" style="background: #374151; color: #fff;">All Items In Stock</span>
        </div>
        <p style="font-size: 11px; color: #4B5563; margin-bottom: 10px;">Recommended for formal talks, symposiums, and auditorium lectures.</p>
        <div style="background: #F9FAFB; border: 1px solid #D1D5DB; border-radius: 4px; padding: 10px; font-size: 11px; margin-bottom: 12px;">
          <div>• 1x High-Lumen HDMI Projector + VGA Adapter</div>
          <div>• 1x 70" Retractable Tripod Projection Screen</div>
          <div>• 2x Shure Wireless Handheld Microphones</div>
          <div>• 1x 10m Heavy-Duty Power Extension Reel</div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 10px; color: #6B7280;">Replaces 4 manual individual bookings</span>
          <div class="wf-btn wf-btn-primary" style="padding: 6px 14px;">Select Package & Book ></div>
        </div>
      </div>

      <!-- Pkg 2 -->
      <div class="wf-box" style="padding: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <div>
            <span class="wf-badge">PKG-02</span>
            <h3 style="font-size: 14px; font-weight: bold; margin-top: 4px;">Workshop & Hands-On Bundle</h3>
          </div>
          <span class="wf-badge" style="background: #374151; color: #fff;">All Items In Stock</span>
        </div>
        <p style="font-size: 11px; color: #4B5563; margin-bottom: 10px;">Tailored for technical workshops, hackathons, and laboratory practicals.</p>
        <div style="background: #F9FAFB; border: 1px solid #D1D5DB; border-radius: 4px; padding: 10px; font-size: 11px; margin-bottom: 12px;">
          <div>• 3x Power Extension Strips (4-Gang Surge Protected)</div>
          <div>• 1x Desktop Audio Monitor / Portable Speaker</div>
          <div>• 1x Presenter Clicker with Red Laser Pointer</div>
          <div>• 2x HDMI to USB-C Display Converters</div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 10px; color: #6B7280;">Replaces 4 manual individual bookings</span>
          <div class="wf-btn wf-btn-primary" style="padding: 6px 14px;">Select Package & Book ></div>
        </div>
      </div>

      <!-- Pkg 3 -->
      <div class="wf-box" style="padding: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <div>
            <span class="wf-badge">PKG-03</span>
            <h3 style="font-size: 14px; font-weight: bold; margin-top: 4px;">AGM & Committee Meeting Set</h3>
          </div>
          <span class="wf-badge" style="background: #374151; color: #fff;">All Items In Stock</span>
        </div>
        <p style="font-size: 11px; color: #4B5563; margin-bottom: 10px;">Compact audio-visual kit for boardroom and club committee AGMs.</p>
        <div style="background: #F9FAFB; border: 1px solid #D1D5DB; border-radius: 4px; padding: 10px; font-size: 11px; margin-bottom: 12px;">
          <div>• 1x Portable Bluetooth / Wired PA System</div>
          <div>• 2x Gooseneck / Lapel Clip-on Microphones</div>
          <div>• 1x Compact Portable Display Projector</div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 10px; color: #6B7280;">Replaces 3 manual individual bookings</span>
          <div class="wf-btn wf-btn-primary" style="padding: 6px 14px;">Select Package & Book ></div>
        </div>
      </div>

      <!-- Pkg 4 -->
      <div class="wf-box" style="padding: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <div>
            <span class="wf-badge">PKG-04</span>
            <h3 style="font-size: 14px; font-weight: bold; margin-top: 4px;">Outdoor Sports & Carnival Rig</h3>
          </div>
          <span class="wf-badge" style="background: #374151; color: #fff;">All Items In Stock</span>
        </div>
        <p style="font-size: 11px; color: #4B5563; margin-bottom: 10px;">High-powered audio and weather-resistant gear for outdoor carnivals.</p>
        <div style="background: #F9FAFB; border: 1px solid #D1D5DB; border-radius: 4px; padding: 10px; font-size: 11px; margin-bottom: 12px;">
          <div>• 1x Heavy-Duty Megaphone with Siren Mode</div>
          <div>• 1x High-Output Battery Powered Speaker</div>
          <div>• 2x Wireless Long-Range VHF Microphones</div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 10px; color: #6B7280;">Replaces 3 manual individual bookings</span>
          <div class="wf-btn wf-btn-primary" style="padding: 6px 14px;">Select Package & Book ></div>
        </div>
      </div>
    </div>
  </div>
</div>
</body></html>`;

// 4. Wireframe 3.4: 2-Step Booking Wizard & Date Validation
const wf4Html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${commonCss}</style></head><body>
<div class="wireframe-browser">
  <div class="browser-bar">
    <span class="browser-dot"></span><span class="browser-dot"></span><span class="browser-dot"></span>
    <span class="browser-url">https://pinjamgeng.uptm.edu.my/booking_wizard.php</span>
  </div>
  <div class="wf-header">
    <div class="wf-logo"><div class="wf-logo-box">PG</div> PinjamGeng • Booking Wizard</div>
    <div class="wf-nav">
      <span class="wf-nav-item">Catalog & Stock</span>
      <span class="wf-nav-item">Smart Packages</span>
      <span class="wf-nav-item active">Booking Wizard</span>
      <span class="wf-nav-item">My Loan Slips</span>
    </div>
  </div>
  <div class="wf-body">
    <!-- Stepper Header -->
    <div style="display: flex; justify-content: center; margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; font-size: 12px;">
        <span style="background: #111827; color: #fff; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</span>
        <span style="font-weight: bold; color: #111827;">Step 1: Event Particulars & Date Validation</span>
        <span style="width: 40px; height: 2px; background: #9CA3AF;"></span>
        <span style="background: #E5E7EB; color: #6B7280; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</span>
        <span style="color: #6B7280;">Step 2: Selected Equipment Review & Submission</span>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 20px;">
      <!-- Left: Form -->
      <div class="wf-box" style="padding: 18px;">
        <h3 style="font-size: 13px; font-weight: bold; margin-bottom: 12px;">Requisition Details</h3>
        
        <div style="margin-bottom: 10px;">
          <label style="font-size: 11px; font-weight: bold; color: #374151;">Official Event Title</label>
          <div class="wf-input">UPTM Computer Science Career Fair 2026</div>
        </div>

        <div style="margin-bottom: 10px;">
          <label style="font-size: 11px; font-weight: bold; color: #374151;">Organizing Student Club / Society</label>
          <div class="wf-input">Computer Science Students Society (COMSS)</div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
          <div>
            <label style="font-size: 11px; font-weight: bold; color: #374151;">Borrow Date & Time</label>
            <div class="wf-input">2026-11-15 08:30</div>
          </div>
          <div>
            <label style="font-size: 11px; font-weight: bold; color: #374151;">Return Date & Time</label>
            <div class="wf-input">2026-11-17 17:00</div>
          </div>
        </div>

        <div style="margin-bottom: 14px;">
          <label style="font-size: 11px; font-weight: bold; color: #374151;">Event Venue / Campus Location</label>
          <div class="wf-input">Main Auditorium & FCOM Concourse, Level 3</div>
        </div>

        <!-- Real-Time Conflict Badge -->
        <div style="background: #F3F4F6; border: 1.5px solid #4B5563; border-radius: 4px; padding: 8px 12px; font-size: 11px; display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: bold; color: #111827;">[ Automated Conflict Check: PASS ✓ ]</span>
          <span style="color: #4B5563;">No double-booking detected for requested items and dates.</span>
        </div>
      </div>

      <!-- Right: Summary Box -->
      <div class="wf-box" style="padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <h3 style="font-size: 13px; font-weight: bold; margin-bottom: 12px;">Selected Items Summary (3)</h3>
          <table class="wf-table">
            <thead>
              <tr><th>Item</th><th>Qty</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td>EPSON Projector</td><td>1</td><td>In Stock</td></tr>
              <tr><td>Retractable Screen</td><td>1</td><td>In Stock</td></tr>
              <tr><td>Shure Wireless Mic</td><td>2</td><td>In Stock</td></tr>
            </tbody>
          </table>
          <div style="margin-top: 10px; font-size: 11px; color: #4B5563;">
            Total items reserved: <strong>4 units</strong><br>
            Estimated pickup: <strong>15 Nov 2026, 08:30 AM</strong>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
          <div class="wf-btn" style="padding: 8px 12px;">Back to Catalog</div>
          <div class="wf-btn wf-btn-primary" style="padding: 8px 16px;">Next: Review & Confirm ></div>
        </div>
      </div>
    </div>
  </div>
</div>
</body></html>`;

// 5. Wireframe 3.5: Downloadable / Printable A4 Loan Agreement Slip
const wf5Html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${commonCss}</style></head><body>
<div class="wireframe-browser" style="width: 780px;">
  <div class="browser-bar">
    <span class="browser-dot"></span><span class="browser-dot"></span><span class="browser-dot"></span>
    <span class="browser-url">https://pinjamgeng.uptm.edu.my/loan_slip.php?id=PG-2026-0842</span>
  </div>
  <div class="wf-body" style="padding: 30px;">
    <!-- Slip Header -->
    <div style="border: 1.5px solid #111827; padding: 20px; background: #FFFFFF;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #111827; padding-bottom: 12px; margin-bottom: 14px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="wf-logo-box" style="width: 36px; height: 36px; font-size: 12px;">UPTM</div>
          <div>
            <div style="font-size: 14px; font-weight: bold; letter-spacing: 0.5px;">UNIVERSITI POLY-TECH MALAYSIA</div>
            <div style="font-size: 11px; color: #4B5563;">FACULTY OF COMPUTING & MULTIMEDIA (FCOM)</div>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 14px; font-weight: bold; color: #111827;">OFFICIAL EQUIPMENT LOAN VOUCHER</div>
          <div style="font-size: 11px; font-weight: bold; color: #4B5563;">REF: PG-2026-0842</div>
        </div>
      </div>

      <!-- Applicant Details Grid -->
      <table class="wf-table" style="margin-bottom: 14px;">
        <tr>
          <td style="width: 25%; font-weight: bold; background: #F3F4F6;">Applicant Name:</td>
          <td>Nursyafiqah Zulaikha Binti Zilkamal</td>
          <td style="width: 20%; font-weight: bold; background: #F3F4F6;">Student ID:</td>
          <td>AM2412018113</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background: #F3F4F6;">Club / Society:</td>
          <td>Computer Science Society (COMSS)</td>
          <td style="font-weight: bold; background: #F3F4F6;">Contact Phone:</td>
          <td>011-23456789</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background: #F3F4F6;">Event Name:</td>
          <td>UPTM Career Fair 2026</td>
          <td style="font-weight: bold; background: #F3F4F6;">Loan Duration:</td>
          <td>15/11/2026 – 17/11/2026</td>
        </tr>
      </table>

      <!-- Itemized Table -->
      <h4 style="font-size: 11px; font-weight: bold; margin-bottom: 6px; text-transform: uppercase;">Equipment Schedule & Custody Log</h4>
      <table class="wf-table" style="margin-bottom: 14px;">
        <thead>
          <tr>
            <th style="width: 40px; text-align: center;">No</th>
            <th>Item Description</th>
            <th style="width: 90px;">Serial / Tag</th>
            <th style="width: 50px; text-align: center;">Qty</th>
            <th style="width: 110px;">Issue Condition</th>
            <th style="width: 110px;">Return Condition</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="text-align: center;">1</td><td>EPSON EB-E01 Projector</td><td>UPTM-PRJ-014</td><td style="text-align: center;">1</td><td>Good / Complete</td><td>[ Good ]</td></tr>
          <tr><td style="text-align: center;">2</td><td>Retractable 70" Screen</td><td>UPTM-SCR-008</td><td style="text-align: center;">1</td><td>Good / Complete</td><td>[ Good ]</td></tr>
          <tr><td style="text-align: center;">3</td><td>Shure Wireless Mic (Pair)</td><td>UPTM-MIC-021</td><td style="text-align: center;">2</td><td>Good / Complete</td><td>[ Good ]</td></tr>
        </tbody>
      </table>

      <!-- Terms & Disclaimer -->
      <div style="border: 1px solid #9CA3AF; background: #F9FAFB; padding: 8px 10px; font-size: 9.5px; color: #4B5563; line-height: 1.4; margin-bottom: 16px;">
        <strong>Terms & Borrower Liability:</strong> The borrower accepts total custodial responsibility for items listed above. Equipment must be returned in identical operational condition on or before the stated return datetime. Any physical defects, missing cables, or damage will result in maintenance ticket logging and student penalty computation under UPTM asset bylaws.
      </div>

      <!-- Dual Signatures -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 24px;">
        <div style="text-align: center; border-top: 1.5px solid #111827; padding-top: 6px;">
          <div style="font-size: 11px; font-weight: bold;">Applicant / Borrower Signature</div>
          <div style="font-size: 10px; color: #6B7280;">Nursyafiqah Zulaikha (Date: 15/11/2026)</div>
        </div>
        <div style="text-align: center; border-top: 1.5px solid #111827; padding-top: 6px;">
          <div style="font-size: 11px; font-weight: bold;">Authorized Equipment Officer Signature</div>
          <div style="font-size: 10px; color: #6B7280;">FCOM Lab Technician / Admin (Date: 15/11/2026)</div>
        </div>
      </div>
    </div>
  </div>
</div>
</body></html>`;

// 6. Wireframe 3.6: Admin Dashboard & Return Desk Inspection
const wf6Html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${commonCss}</style></head><body>
<div class="wireframe-browser">
  <div class="browser-bar">
    <span class="browser-dot"></span><span class="browser-dot"></span><span class="browser-dot"></span>
    <span class="browser-url">https://pinjamgeng.uptm.edu.my/admin/returns.php</span>
  </div>
  <div class="wf-header">
    <div class="wf-logo"><div class="wf-logo-box">PG</div> PinjamGeng • Administrator Console</div>
    <div class="wf-nav">
      <span class="wf-nav-item">Overview</span>
      <span class="wf-nav-item">Approvals Desk</span>
      <span class="wf-nav-item active">Return & Maintenance</span>
      <span class="wf-nav-item">Asset Inventory</span>
      <span class="wf-nav-item">Reports</span>
      <span class="wf-nav-item">[ Admin Logout ]</span>
    </div>
  </div>
  <div class="wf-body">
    <!-- Stat KPI Row -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 18px;">
      <div class="wf-box" style="padding: 12px;">
        <div style="font-size: 10px; color: #6B7280; font-weight: bold;">PENDING APPROVALS</div>
        <div style="font-size: 20px; font-weight: bold; color: #111827; margin: 4px 0;">3</div>
        <div style="font-size: 9.5px; color: #4B5563;">Awaiting officer review</div>
      </div>
      <div class="wf-box" style="padding: 12px;">
        <div style="font-size: 10px; color: #6B7280; font-weight: bold;">ACTIVE CAMPUS LOANS</div>
        <div style="font-size: 20px; font-weight: bold; color: #111827; margin: 4px 0;">8</div>
        <div style="font-size: 9.5px; color: #4B5563;">Currently on dispatch</div>
      </div>
      <div class="wf-box" style="padding: 12px;">
        <div style="font-size: 10px; color: #6B7280; font-weight: bold;">UNDER MAINTENANCE</div>
        <div style="font-size: 20px; font-weight: bold; color: #111827; margin: 4px 0;">2</div>
        <div style="font-size: 9.5px; color: #4B5563;">Locked from student pool</div>
      </div>
      <div class="wf-box" style="padding: 12px;">
        <div style="font-size: 10px; color: #6B7280; font-weight: bold;">TOTAL ASSETS LOGGED</div>
        <div style="font-size: 20px; font-weight: bold; color: #111827; margin: 4px 0;">38</div>
        <div style="font-size: 9.5px; color: #4B5563;">100% cloud tracked</div>
      </div>
    </div>

    <!-- Return Desk Inspection Interface -->
    <div class="wf-box" style="padding: 18px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <h3 style="font-size: 13px; font-weight: bold;">Return Desk Physical Inspection & Check-in</h3>
        <span class="wf-badge" style="background: #374151; color: #fff;">Processing: PG-2026-0842</span>
      </div>

      <table class="wf-table" style="margin-bottom: 16px;">
        <thead>
          <tr>
            <th>Item & Tag</th>
            <th style="width: 80px; text-align: center;">Qty</th>
            <th style="width: 220px;">Physical Condition Check</th>
            <th>Inspection Action & Maintenance Trigger</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>EPSON EB-E01 Projector</strong><br><span style="font-size: 10px; color: #6B7280;">Tag: UPTM-PRJ-014</span></td>
            <td style="text-align: center;">1</td>
            <td>
              <span style="font-size: 11px;">(•) Good / Complete &nbsp; ( ) Damaged</span>
            </td>
            <td><span class="wf-badge" style="background: #E5E7EB;">Restock into available pool</span></td>
          </tr>
          <tr>
            <td><strong>Retractable 70" Screen</strong><br><span style="font-size: 10px; color: #6B7280;">Tag: UPTM-SCR-008</span></td>
            <td style="text-align: center;">1</td>
            <td>
              <span style="font-size: 11px;">(•) Good / Complete &nbsp; ( ) Damaged</span>
            </td>
            <td><span class="wf-badge" style="background: #E5E7EB;">Restock into available pool</span></td>
          </tr>
          <tr>
            <td><strong>Shure Wireless Mic (Pair)</strong><br><span style="font-size: 10px; color: #6B7280;">Tag: UPTM-MIC-021</span></td>
            <td style="text-align: center;">1</td>
            <td>
              <span style="font-size: 11px;">( ) Good &nbsp; (•) Damaged (Broken Ant.)</span>
            </td>
            <td>
              <span class="wf-badge" style="border: 1.5px solid #111827; background: #374151; color: #fff;">! Auto-log Maintenance Ticket & Quarantine</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 11px; color: #6B7280;">1 item quarantined to maintenance desk; 2 items immediately restocked.</span>
        <div style="display: flex; gap: 8px;">
          <div class="wf-btn">Cancel</div>
          <div class="wf-btn wf-btn-primary">Confirm Return & Finalize Ticket</div>
        </div>
      </div>
    </div>
  </div>
</div>
</body></html>`;

// Write all HTML files
const wfs = [
  { file: 'wf_01_login.html', outPng: 'wf_01_login.png', html: wf1Html },
  { file: 'wf_02_catalog.html', outPng: 'wf_02_catalog.png', html: wf2Html },
  { file: 'wf_03_smart_packages.html', outPng: 'wf_03_smart_packages.png', html: wf3Html },
  { file: 'wf_04_booking_wizard.html', outPng: 'wf_04_booking_wizard.png', html: wf4Html },
  { file: 'wf_05_loan_slip.html', outPng: 'wf_05_loan_slip.png', html: wf5Html },
  { file: 'wf_06_admin_return_desk.html', outPng: 'wf_06_admin_return_desk.png', html: wf6Html },
];

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

wfs.forEach(w => {
  const htmlPath = path.join(wfDir, w.file);
  const pngPath = path.join(wfDir, w.outPng);
  fs.writeFileSync(htmlPath, w.html, 'utf8');
  console.log('Written:', htmlPath);

  // Take high res screenshot using headless chrome
  const cmd = `"${chromePath}" --headless --disable-gpu --window-size=1000,750 --screenshot="${pngPath}" "${htmlPath}"`;
  execSync(cmd);
  console.log('Saved wireframe screenshot:', pngPath);
});

console.log('ALL WIREFRAMES GENERATED AND CAPTURED!');
