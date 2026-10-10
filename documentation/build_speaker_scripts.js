const fs = require('fs');

const malayHtml = `<!DOCTYPE html>
<html lang="ms">
<head>
  <meta charset="UTF-8">
  <title>PinjamGeng - Skrip Pembentangan Santai & Natural (Bahasa Melayu)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary-brown: #55351E;
      --title-dark: #3A2111;
      --pill-caramel: #A86538;
      --bg-cream: #FAF7F2;
      --card-border: #E8DDD2;
      --text-dark: #231F1D;
      --text-muted: #5C534D;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #FFFFFF;
      color: var(--text-dark);
      line-height: 1.55;
      padding: 30px;
      max-width: 900px;
      margin: 0 auto;
    }

    .header-box {
      border-bottom: 3px solid var(--pill-caramel);
      padding-bottom: 20px;
      margin-bottom: 28px;
    }

    .header-badge {
      display: inline-block;
      background: var(--primary-brown);
      color: #fff;
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    h1 {
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: 26px;
      color: var(--title-dark);
      margin-bottom: 6px;
      letter-spacing: -0.5px;
    }

    .meta-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px 20px;
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 12px;
    }

    .meta-grid strong {
      color: var(--text-dark);
    }

    .slide-card {
      background: #FFFFFF;
      border: 1.5px solid var(--card-border);
      border-radius: 10px;
      padding: 16px 20px;
      margin-bottom: 18px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .slide-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      border-bottom: 1px solid #F0E6DE;
      padding-bottom: 6px;
    }

    .slide-title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .slide-badge {
      background: var(--pill-caramel);
      color: #FFFFFF;
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: 13px;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .slide-title {
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      font-size: 16px;
      color: var(--title-dark);
    }

    .action-cue {
      display: inline-block;
      font-size: 12px;
      font-weight: 600;
      color: #92400E;
      background: #FEF3C7;
      padding: 2px 10px;
      border-radius: 12px;
      margin-bottom: 8px;
      font-style: italic;
    }

    .speech-text {
      font-size: 14.5px;
      line-height: 1.6;
      color: var(--text-dark);
    }

    .speech-text strong {
      color: var(--primary-brown);
    }

    @media print {
      body { padding: 0; max-width: 100%; }
      .slide-card { border: 1px solid #D9C8BA; box-shadow: none; margin-bottom: 14px; padding: 14px 16px; }
      @page { margin: 12mm 15mm; size: A4 portrait; }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <div class="header-box">
    <div class="header-badge">FYP3024 PROJEK TAHUN AKHIR • SKRIP PEMBENTANGAN LENGKAP (20 SLIDE)</div>
    <h1>PINJAMGENG: SKRIP PEMBENTANGAN SANTAI & NATURAL (BM)</h1>
    <div style="font-size: 14px; font-weight: 600; color: var(--primary-brown);">Sistem Pintar Pengurusan Inventori dan Tempahan Peralatan Acara</div>
    
    <div class="meta-grid">
      <div><strong>Calon:</strong> Nursyafiqah Zulaikha Binti Zilkamal (AM2412018113)</div>
      <div><strong>Penyelia:</strong> Madam Jihadah Binti Ahmad</div>
      <div><strong>Program:</strong> Diploma Sains Komputer (CC101)</div>
      <div><strong>Fakulti:</strong> Fakulti Komputeran & Multimedia (FCOM), UPTM</div>
      <div><strong>Sistem Live Cloud:</strong> https://pinjamgeng.infinityfreeapp.com/</div>
      <div><strong>Anggaran Durasi:</strong> 8 – 10 Minit (Santai, Jelas & Berkeyakinan)</div>
    </div>
  </div>

  <!-- SLIDE 1 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">1</div>
        <div class="slide-title">Slide Pengenalan (Cover)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Pandang panel penilai, senyum dan tarik nafas santai]</div>
    <p class="speech-text">
      "Assalamu’alaikum dan selamat pagi kepada barisan panel penilai dan juga supervisor saya, Madam Jihadah. Nama saya <strong>Nursyafiqah Zulaikha Binti Zilkamal</strong>, nombor matrik <strong>AM2412018113</strong> daripada program <strong>Diploma Sains Komputer (CC101)</strong>. Hari ini, saya akan bentangkan projek tahun akhir saya yang bertajuk: <strong>PinjamGeng: Smart Event Equipment Booking and Inventory Management System</strong>."
    </p>
  </div>

  <!-- SLIDE 2 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">2</div>
        <div class="slide-title">Latar Belakang Projek (Project Background)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide, cakap dengan nada santai & jelas]</div>
    <p class="speech-text">
      "Untuk background projek, PinjamGeng ni ialah satu sistem web yang saya bangunkan guna PHP, MySQL, dan Tailwind CSS khas untuk kelab dan persatuan pelajar di UPTM. Melalui sistem ni, student boleh check baki barang secara <strong>live</strong> dan hantar permohonan pinjam secara online bila-bila masa <strong>24/7</strong>. Jadi, tak perlu lagi guna borang kertas atau logbook manual macam sebelum ni, sekaligus elak masalah barang bertindih dan pastikan urusan pulangkan barang lebih teratur."
    </p>
  </div>

  <!-- SLIDE 3 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">3</div>
        <div class="slide-title">Pernyataan Masalah (Problem Statements)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide, tunjuk poin nombor 1 dan 2]</div>
    <p class="speech-text">
      "Sebelum saya bangunkan sistem ni, saya kaji dan jumpa dua masalah utama di kampus:<br>
      <strong>Pertama</strong>, cara lama yang manual dan tak terpusat buatkan student susah nak tahu barang ada ke tak, dan pihak admin pun lambat nak urus rekod sampai berlaku tempahan bertindih (<em>double-booking</em>), salah faham komunikasi, dan borang pinjaman hilang.<br>
      <strong>Kedua</strong>, student selalu pening nak pilih barang apa yang sesuai untuk program dorang. Lagipun, sistem yang ada sekarang cuma bagi pinjam satu-satu barang, tak ada pilihan pakej lengkap ikut jenis acara."
    </p>
  </div>

  <!-- SLIDE 4 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">4</div>
        <div class="slide-title">Objektif Projek (Project Objectives)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide]</div>
    <p class="speech-text">
      "Jadi, untuk selesaikan masalah tadi, saya tetapkan dua objektif utama dalam tempoh pembangunan 12 minggu:<br>
      <strong>Pertama</strong>, bangunkan sistem web supaya student boleh semak stok dan hantar tempahan online, manakala admin boleh urus rekod dan luluskan permohonan.<br>
      <strong>Kedua</strong>, sediakan ciri pakej peralatan siap pilih untuk sekurang-kurangnya empat jenis acara iaitu seminar, workshop, meeting, dan photography.<br>
      Alhamdulillah, kedua-dua objektif ni telah <strong>berjaya disiapkan seratus peratus</strong> dalam masa 12 minggu."
    </p>
  </div>

  <!-- SLIDE 5 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">5</div>
        <div class="slide-title">Sorotan Literatur: Sistem Sedia Ada (Literature Review)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide, terangkan 3 sistem yang dikaji secara ringkas & tepat]</div>
    <p class="speech-text">
      "Sebelum membangunkan PinjamGeng, saya telah membuat sorotan literatur terhadap tiga sistem pengurusan aset sedia ada di pasaran:<br>
      <strong>1. Cheqroom:</strong> Mempunyai ciri <em>equipment bundling</em> dan kalendar tempahan yang baik, tetapi yuran langganan tahunannya sangat mahal dan ada ciri korporat yang tidak sesuai untuk bajet kampus.<br>
      <strong>2. Booqable:</strong> Menawarkan <em>booking wizard</em> yang kemas, namun ia berorientasikan perniagaan sewa komersial dengan keperluan invois, bayaran kad kredit, dan deposit sekuriti.<br>
      <strong>3. EZOfficeInventory:</strong> Mempunyai penjejakan kitaran aset dan tiket penyelenggaraan, tetapi antaramukanya sangat padat dan rumit untuk pelajar serta tiada pakej khas acara."
    </p>
  </div>

  <!-- SLIDE 6 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">6</div>
        <div class="slide-title">Perbandingan & Jurang Kajian (Comparison & Research Gap)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide, tunjuk lajur hijau Proposed System PinjamGeng]</div>
    <p class="speech-text">
      "Berdasarkan analisis perbandingan ini, dapat dilihat jurang kajian (<em>research gap</em>) yang berjaya diselesaikan oleh PinjamGeng:<br>
      Walaupun sistem luar menyokong tempahan asas, mereka tidak menawarkan <strong>Pakej Pintar Peralatan</strong> khas acara universiti, tiada <strong>Slip Pinjaman A4 Digital Rasmi</strong> yang standard, dan kos langganan mereka sangat membebankan.<br>
      <strong>PinjamGeng mengisi jurang ini 100%</strong> dengan menyediakan sistem yang disesuaikan khas untuk budaya kampus UPTM secara percuma dan mesra pengguna."
    </p>
  </div>

  <!-- SLIDE 7 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">7</div>
        <div class="slide-title">Metodologi Agile (Agile Scrum Methodology)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide, tunjuk kitaran 5 sprint]</div>
    <p class="speech-text">
      "Untuk kaedah pembangunan, saya gunakan <strong>Agile Scrum</strong> yang dipecahkan kepada <strong>lima sprint dua mingguan</strong>. Bermula dengan Sprint 1 untuk reka bentuk database, Sprint 2 untuk login dan urus barang, Sprint 3 untuk wizard tempahan dan enjin semak pertindihan tarikh, Sprint 4 untuk kaunter pemulangan dan rekod penyelenggaraan, sampailah ke Sprint 5 untuk hosting sistem di cloud dan buat survey UAT. Kaedah ni sangat membantu saya kekal fokus dan kerap berunding dengan Madam Jihadah."
    </p>
  </div>

  <!-- SLIDE 8 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">8</div>
        <div class="slide-title">Pengujian Unit (Unit Testing)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide, tunjuk jadual UT01 hingga UT05]</div>
    <p class="speech-text">
      "Bagi Unit Testing, saya uji lima fungsi penting di bahagian backend — daripada keselamatan hashing kata laluan Bcrypt, sekatan salah login, kiraan baki stok dinamik, semakan julat tarikh, hinggalah ke <strong>UT05</strong> iaitu penjanaan tiket penyelenggaraan automatik apabila barang dipulangkan dalam keadaan 'Damaged'. Kesemua test case lulus <strong>100% Pass tanpa sebarang ralat</strong>."
    </p>
  </div>

  <!-- SLIDE 9 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">9</div>
        <div class="slide-title">Pengujian Integrasi (Integration Testing)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide]</div>
    <p class="speech-text">
      "Seterusnya untuk Integration Testing, saya pastikan semua modul bersambung dengan elok — daripada student submit borang tempahan, stok terus tolak dalam database secara live, kawalan keselamatan login admin, sampailah proses kemas kini bila barang dipulangkan. Kelima-lima ujian integrasi ni pun lulus <strong>100% dengan lancar</strong>."
    </p>
  </div>

  <!-- SLIDE 10 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">10</div>
        <div class="slide-title">Gambaran Soal Selidik UAT (UAT Overview)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide, tunjuk kad Google Form sebenar di kanan]</div>
    <p class="speech-text">
      "Lepas sistem dah live di cloud, saya jalankan User Acceptance Testing (UAT). Macam yang panel boleh nampak pada paparan Google Form sebenar di sebelah kanan, seramai <strong>30 orang responden warga UPTM</strong> sertai survey ni — termasuk presiden kelab, exco program, dan pensyarah penasihat. Survey ni merangkumi enam bahagian penilaian."
    </p>
  </div>

  <!-- SLIDE 11 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">11</div>
        <div class="slide-title">Seksyen A: Profil Responden (User Profile)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide, tunjuk 3 graf carta]</div>
    <p class="speech-text">
      "Bahagian A ialah profil responden: <strong>96.7%</strong> daripada mereka adalah Exco Kelab Pelajar yang aktif, <strong>50%</strong> ada pengalaman 1 hingga 2 tahun anjurkan program, dan <strong>42.5%</strong> memang kerap meminjam barang setiap semester. Maksudnya, maklum balas yang saya terima memang datang daripada student yang betul-betul selalu urus acara di UPTM."
    </p>
  </div>

  <!-- SLIDE 12 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">12</div>
        <div class="slide-title">Seksyen B: Kebolehgunaan Sistem (Usability)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide]</div>
    <p class="speech-text">
      "Untuk Bahagian B tentang kebolehgunaan: <strong>79.3%</strong> responden rasa sistem ni Mudah atau Sangat Mudah nak guna, dan <strong>93.4%</strong> setuju yang <em>2-Step Booking Wizard</em> buatkan proses isi borang jadi sangat senang dan pantas. Tiada seorang pun responden yang rasa sistem ni menyukarkan."
    </p>
  </div>

  <!-- SLIDE 13 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">13</div>
        <div class="slide-title">Seksyen C: Fungsi Sistem (Functionality)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide]</div>
    <p class="speech-text">
      "Masuk Bahagian C tentang fungsi sistem: <strong>89.7%</strong> setuju ciri Pakej Pintar sangat memudahkan dorang pilih barang, <strong>86.7%</strong> sahkan kaunter baki stok live paparkan stok yang tepat, dan <strong>89.7%</strong> sahkan enjin semakan konflik berjaya elakkan masalah tarikh bertindih."
    </p>
  </div>

  <!-- SLIDE 14 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">14</div>
        <div class="slide-title">Seksyen D: Kecekapan & Dokumentasi (Efficiency)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide]</div>
    <p class="speech-text">
      "Bahagian D pula dari segi kecekapan: <strong>86.7%</strong> akui tempah online jauh lebih pantas berbanding borang kertas biasa, <strong>82.8%</strong> suka sebab ada Slip Pinjaman A4 digital untuk ambil barang di kaunter, dan <strong>83.3%</strong> setuju pemeriksaan masa pulangkan barang buatkan peminjam lebih bertanggungjawab jaga barang."
    </p>
  </div>

  <!-- SLIDE 15 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">15</div>
        <div class="slide-title">Seksyen E: Kepuasan Keseluruhan (Satisfaction)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide]</div>
    <p class="speech-text">
      "Untuk kepuasan keseluruhan di Bahagian E: Dua ciri yang paling responden suka ialah <strong>Semak Stok Live (70%)</strong> dan <strong>Pakej Acara Pintar (63.3%)</strong>. Dari segi rating bintang, <strong>76.7% bagi 4 hingga 5 bintang</strong>, dengan skor kepuasan positif sebanyak <strong>90% secara keseluruhan</strong>."
    </p>
  </div>

  <!-- SLIDE 16 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">16</div>
        <div class="slide-title">Seksyen F: Maklum Balas Responden (Feedback)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide, tunjuk kotak ulasan di kanan]</div>
    <p class="speech-text">
      "Slide 16 ni paparkan maklum balas bertulis daripada responden. Ramai yang suka sebab ada pakej siap pilih dan senang tengok stok ada ke tak. Menariknya, ada juga responden yang puji reka bentuk tema warna coklat (<em>brown aesthetic</em>) sistem ni nampak kemas, profesional, dan sedap dipandang."
    </p>
  </div>

  <!-- SLIDE 17 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">17</div>
        <div class="slide-title">Inovasi Utama & Live Cloud (Core Innovations)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide]</div>
    <p class="speech-text">
      "Secara ringkasnya, PinjamGeng bawa tiga inovasi utama:<br>
      1. <strong>Enjin Semak Konflik:</strong> Sistem tolak sendiri secara automatik kalau tarikh bertindih.<br>
      2. <strong>Pakej Pintar 1-Klik:</strong> Jimatkan masa pilih barang dari 15 minit ke bawah 1 minit.<br>
      3. <strong>Enjin Pemulangan & Penyelenggaraan:</strong> Semak keadaan fizikal ('Good' vs 'Damaged') dan terus kunci barang rosak ke status 'Under Maintenance' supaya tak dipinjam semula.<br>
      Sistem ni sekarang dah live di cloud dekat <strong>pinjamgeng.infinityfreeapp.com</strong>."
    </p>
  </div>

  <!-- SLIDE 18 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">18</div>
        <div class="slide-title">Cadangan Masa Depan (Future Works)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide]</div>
    <p class="speech-text">
      "Untuk masa depan, sistem ni boleh ditambah baik dengan: Imbasan <strong>Barcode atau QR Code IoT</strong> untuk serah barang lebih cepat di kaunter, <strong>notifikasi automatik ke WhatsApp atau Telegram</strong> untuk ingatkan tarikh pulang, dan integrasi <strong>pembayaran denda online guna FPX</strong>."
    </p>
  </div>

  <!-- SLIDE 19 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">19</div>
        <div class="slide-title">Kesimpulan Projek (Conclusion)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide, bercakap santai dan yakin]</div>
    <p class="speech-text">
      "Kesimpulannya, projek PinjamGeng ni dah berjaya capai kedua-dua objektifnya dalam tempoh 12 minggu. Dengan <strong>testing 100% lulus</strong> dan <strong>kepuasan pengguna 90%</strong>, sistem ni terbukti berfungsi dengan sangat baik dan sedia untuk diguna pakai oleh kelab-kelab di UPTM."
    </p>
  </div>

  <!-- SLIDE 20 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">20</div>
        <div class="slide-title">Penutup & Sesi Soal Jawab (Thank You & Q&A)</div>
      </div>
    </div>
    <div class="action-cue">[Tindakan: Klik Next Slide, senyum dan buka ruang soalan]</div>
    <p class="speech-text">
      "Itu saja pembentangan daripada saya. Terima kasih banyak-banyak kepada Madam Jihadah dan barisan panel penilai atas masa yang diberikan. Saya dengan sukacitanya membuka ruang untuk sebarang soalan daripada panel. Terima kasih!"
    </p>
  </div>

</body>
</html>
`;

const englishHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PinjamGeng - Simple Presentation Script (English)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary-brown: #55351E;
      --title-dark: #3A2111;
      --pill-caramel: #A86538;
      --bg-cream: #FAF7F2;
      --card-border: #E8DDD2;
      --text-dark: #231F1D;
      --text-muted: #5C534D;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #FFFFFF;
      color: var(--text-dark);
      line-height: 1.55;
      padding: 30px;
      max-width: 900px;
      margin: 0 auto;
    }

    .header-box {
      border-bottom: 3px solid var(--pill-caramel);
      padding-bottom: 20px;
      margin-bottom: 28px;
    }

    .header-badge {
      display: inline-block;
      background: var(--primary-brown);
      color: #fff;
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    h1 {
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: 26px;
      color: var(--title-dark);
      margin-bottom: 6px;
      letter-spacing: -0.5px;
    }

    .meta-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px 20px;
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 12px;
    }

    .meta-grid strong {
      color: var(--text-dark);
    }

    .slide-card {
      background: #FFFFFF;
      border: 1.5px solid var(--card-border);
      border-radius: 10px;
      padding: 16px 20px;
      margin-bottom: 18px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .slide-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      border-bottom: 1px solid #F0E6DE;
      padding-bottom: 6px;
    }

    .slide-title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .slide-badge {
      background: var(--pill-caramel);
      color: #FFFFFF;
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: 13px;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .slide-title {
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      font-size: 16px;
      color: var(--title-dark);
    }

    .action-cue {
      display: inline-block;
      font-size: 12px;
      font-weight: 600;
      color: #92400E;
      background: #FEF3C7;
      padding: 2px 10px;
      border-radius: 12px;
      margin-bottom: 8px;
      font-style: italic;
    }

    .speech-text {
      font-size: 14.5px;
      line-height: 1.6;
      color: var(--text-dark);
    }

    .speech-text strong {
      color: var(--primary-brown);
    }

    @media print {
      body { padding: 0; max-width: 100%; }
      .slide-card { border: 1px solid #D9C8BA; box-shadow: none; margin-bottom: 14px; padding: 14px 16px; }
      @page { margin: 12mm 15mm; size: A4 portrait; }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <div class="header-box">
    <div class="header-badge">FYP3024 FINAL YEAR PROJECT • COMPLETE SPEAKER SCRIPT (20 SLIDES)</div>
    <h1>PINJAMGENG: SIMPLE & NATURAL PRESENTATION SCRIPT (EN)</h1>
    <div style="font-size: 14px; font-weight: 600; color: var(--primary-brown);">Smart Event Equipment Booking and Inventory Management System</div>
    
    <div class="meta-grid">
      <div><strong>Candidate:</strong> Nursyafiqah Zulaikha Binti Zilkamal (AM2412018113)</div>
      <div><strong>Supervisor:</strong> Madam Jihadah Binti Ahmad</div>
      <div><strong>Program:</strong> Diploma in Computer Science (CC101)</div>
      <div><strong>Faculty:</strong> Faculty of Computing & Multimedia (FCOM), UPTM</div>
      <div><strong>Live Cloud System:</strong> https://pinjamgeng.infinityfreeapp.com/</div>
      <div><strong>Estimated Duration:</strong> 8 – 10 Minutes (Calm, Clear & Confident)</div>
    </div>
  </div>

  <!-- SLIDE 1 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">1</div>
        <div class="slide-title">Cover Slide</div>
      </div>
    </div>
    <div class="action-cue">[Action: Look at the panel, smile and take a deep breath]</div>
    <p class="speech-text">
      "Assalamu’alaikum and good morning to the evaluators and my supervisor, Madam Jihadah. My name is <strong>Nursyafiqah Zulaikha Binti Zilkamal</strong>, matrix number <strong>AM2412018113</strong> from the <strong>Diploma in Computer Science (CC101)</strong>. Today, I am proud to present my final year project entitled: <strong>PinjamGeng: Smart Event Equipment Booking and Inventory Management System</strong>."
    </p>
  </div>

  <!-- SLIDE 2 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">2</div>
        <div class="slide-title">Project Background</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide, speak clearly and naturally]</div>
    <p class="speech-text">
      "PinjamGeng is a responsive web application developed using PHP, MySQL, and Tailwind CSS specifically for student clubs and associations at UPTM. It allows students to check real-time stock availability and submit borrowing requests online <strong>24/7</strong>. This eliminates manual paper forms and logbooks, prevents booking conflicts, and ensures organized return handovers."
    </p>
  </div>

  <!-- SLIDE 3 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">3</div>
        <div class="slide-title">Problem Statements</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide, highlight points 1 and 2]</div>
    <p class="speech-text">
      "Before building the system, I identified two main problems on campus:<br>
      <strong>First</strong>, the traditional manual paperwork and decentralized process make it difficult to know stock availability, leading to double-bookings, communication misunderstandings, and lost records.<br>
      <strong>Second</strong>, students struggle to identify which equipment items are needed for their specific events, while existing systems only allow borrowing items individually with no pre-bundled event packages."
    </p>
  </div>

  <!-- SLIDE 4 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">4</div>
        <div class="slide-title">Project Objectives</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide]</div>
    <p class="speech-text">
      "To solve these issues, I established two core objectives within the 12-week development timeframe:<br>
      <strong>First</strong>, to develop a web-based system enabling students to check stock and submit requisitions online, while administrators manage inventory and approvals.<br>
      <strong>Second</strong>, to provide curated smart event packages for at least four event categories: seminar, workshop, meeting, and photography.<br>
      Both objectives were <strong>100% completed</strong> successfully within 12 weeks."
    </p>
  </div>

  <!-- SLIDE 5 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">5</div>
        <div class="slide-title">Literature Review: Existing Systems</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide, briefly summarize the 3 reviewed systems]</div>
    <p class="speech-text">
      "Prior to development, I conducted a literature review of three existing asset tracking systems:<br>
      <strong>1. Cheqroom:</strong> Excellent asset bundling and calendar booking, but its enterprise subscription cost is too prohibitive for campus budgets.<br>
      <strong>2. Booqable:</strong> Intuitive booking wizard, but heavily designed for commercial rental businesses requiring invoices, security deposits, and credit card payments.<br>
      <strong>3. EZOfficeInventory:</strong> Full lifecycle tracking with service tickets, but has a steep learning curve and lacks campus-tailored event packages."
    </p>
  </div>

  <!-- SLIDE 6 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">6</div>
        <div class="slide-title">Comparison & Research Gap</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide, highlight the green Proposed System column]</div>
    <p class="speech-text">
      "This comparison matrix highlights the research gap filled by PinjamGeng. While existing systems provide basic online booking, they fail to offer <strong>curated event packages</strong>, <strong>standardized A4 digital loan slips</strong>, and are expensive.<br>
      <strong>PinjamGeng bridges this gap completely</strong> by providing an end-to-end solution tailored specifically for university clubs at zero subscription cost."
    </p>
  </div>

  <!-- SLIDE 7 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">7</div>
        <div class="slide-title">Agile Scrum Methodology</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide, reference the 5 sprint cycle]</div>
    <p class="speech-text">
      "For development, I adopted the <strong>Agile Scrum methodology</strong> divided into <strong>five two-week sprints</strong>: from database architecture in Sprint 1, auth and inventory in Sprint 2, booking wizard and conflict prevention in Sprint 3, return handling and maintenance ticketing in Sprint 4, to cloud deployment and UAT survey in Sprint 5. This iterative process ensured continuous alignment with my supervisor."
    </p>
  </div>

  <!-- SLIDE 8 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">8</div>
        <div class="slide-title">Unit Testing</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide, show the UT01 to UT05 results table]</div>
    <p class="speech-text">
      "For Unit Testing, I tested five critical backend functions — Bcrypt password hashing, invalid credential handling, real-time stock computation, date range validation, and <strong>UT05</strong> which automates maintenance ticket logging whenever an item is returned damaged. All test cases achieved a <strong>100% Pass rate</strong> without errors."
    </p>
  </div>

  <!-- SLIDE 9 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">9</div>
        <div class="slide-title">Integration Testing</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide]</div>
    <p class="speech-text">
      "In Integration Testing, I verified end-to-end data flow between modules — from student requisition submission, real-time database stock deductions, admin session guards, to return condition processing. All five integration test cases passed <strong>100% seamlessly</strong>."
    </p>
  </div>

  <!-- SLIDE 10 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">10</div>
        <div class="slide-title">UAT Questionnaire Overview</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide, point out the actual Google Form on the right]</div>
    <p class="speech-text">
      "Once deployed on the cloud, I conducted User Acceptance Testing (UAT). As shown on the real Google Form display on the right, <strong>30 UPTM campus respondents</strong> participated — including club presidents, event exco members, and academic advisors across six evaluation sections."
    </p>
  </div>

  <!-- SLIDE 11 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">11</div>
        <div class="slide-title">Section A: User Profile</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide, point to the 3 donut/pie charts]</div>
    <p class="speech-text">
      "Section A covers user demographics: <strong>96.7%</strong> are active student club excos, <strong>50%</strong> possess 1 to 2 years of event management experience, and <strong>42.5%</strong> borrow equipment frequently each semester. This confirms our feedback comes from active, representative target users."
    </p>
  </div>

  <!-- SLIDE 12 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">12</div>
        <div class="slide-title">Section B: Usability Evaluation</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide]</div>
    <p class="speech-text">
      "For Section B Usability: <strong>79.3%</strong> rated the system as Easy or Very Easy to use, and <strong>93.4%</strong> agreed that the <em>2-Step Booking Wizard</em> made requisition intuitive and quick. Zero respondents reported difficulty navigating the platform."
    </p>
  </div>

  <!-- SLIDE 13 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">13</div>
        <div class="slide-title">Section C: Functionality Evaluation</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide]</div>
    <p class="speech-text">
      "In Section C Functionality: <strong>89.7%</strong> confirmed the Smart Packages significantly simplified equipment selection, <strong>86.7%</strong> validated accurate stock counts, and <strong>89.7%</strong> confirmed the conflict engine successfully prevented scheduling overlaps."
    </p>
  </div>

  <!-- SLIDE 14 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">14</div>
        <div class="slide-title">Section D: Requisition Efficiency & Documentation</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide]</div>
    <p class="speech-text">
      "Section D examines operational efficiency: <strong>86.7%</strong> confirmed online requisitions are significantly faster than paper forms, <strong>82.8%</strong> appreciated the downloadable official A4 Loan Slip, and <strong>83.3%</strong> affirmed that physical check-in inspections foster borrower accountability."
    </p>
  </div>

  <!-- SLIDE 15 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">15</div>
        <div class="slide-title">Section E: Overall Satisfaction</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide]</div>
    <p class="speech-text">
      "For overall satisfaction in Section E: The top favored features were <strong>Live Stock Availability (70%)</strong> and <strong>Smart Event Packages (63.3%)</strong>. Overall, <strong>76.7% awarded 4 to 5 stars</strong>, yielding a <strong>90% overall positive satisfaction rate</strong>."
    </p>
  </div>

  <!-- SLIDE 16 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">16</div>
        <div class="slide-title">Section F: Open-Ended Feedback</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide, reference feedback cards]</div>
    <p class="speech-text">
      "Slide 16 highlights qualitative feedback. Respondents praised the convenient package selection and stock transparency. Additionally, several users complimented the warm brown aesthetic as clean, modern, and visually appealing."
    </p>
  </div>

  <!-- SLIDE 17 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">17</div>
        <div class="slide-title">Core Innovations & Live Cloud</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide]</div>
    <p class="speech-text">
      "In summary, PinjamGeng delivers three core innovations:<br>
      1. <strong>Automated Conflict Engine:</strong> Automatically blocks conflicting date and stock requests.<br>
      2. <strong>1-Click Smart Packages:</strong> Reduces equipment selection time from 15 minutes to under 1 minute.<br>
      3. <strong>Return Condition & Maintenance Engine:</strong> Inspects physical condition ('Good' vs 'Damaged') and automatically quarantines damaged items into maintenance status.<br>
      The platform is live and operational at <strong>pinjamgeng.infinityfreeapp.com</strong>."
    </p>
  </div>

  <!-- SLIDE 18 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">18</div>
        <div class="slide-title">Future Works</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide]</div>
    <p class="speech-text">
      "For future enhancements, the system can incorporate: <strong>IoT Barcode / QR Code scanning</strong> for rapid counter dispatch, <strong>automated WhatsApp / Telegram reminders</strong> for upcoming return due dates, and <strong>online fine payment integration via FPX</strong>."
    </p>
  </div>

  <!-- SLIDE 19 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">19</div>
        <div class="slide-title">Conclusion</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide, conclude with confidence]</div>
    <p class="speech-text">
      "In conclusion, PinjamGeng has successfully fulfilled all project objectives within 12 weeks. With <strong>100% test pass rates</strong> and <strong>90% user satisfaction</strong>, the system proves to be robust, practical, and ready for deployment across UPTM campus clubs."
    </p>
  </div>

  <!-- SLIDE 20 -->
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-wrap">
        <div class="slide-badge">20</div>
        <div class="slide-title">Closing & Q&A Session</div>
      </div>
    </div>
    <div class="action-cue">[Action: Next Slide, smile and open for questions]</div>
    <p class="speech-text">
      "That concludes my presentation. Thank you very much to Madam Jihadah and the panel of evaluators for your time and attention. I am now pleased to answer any questions. Thank you!"
    </p>
  </div>

</body>
</html>
`;

fs.writeFileSync('present_script_malay.html', malayHtml, 'utf8');
fs.writeFileSync('present_script_english.html', englishHtml, 'utf8');
console.log('SUCCESS: Written updated present_script_malay.html and present_script_english.html with all 20 slides.');
