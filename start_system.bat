@echo off
echo ======================================================================
echo SMART EVENT EQUIPMENT BOOKING AND INVENTORY MANAGEMENT SYSTEM
echo Universiti Poly-Tech Malaysia (UPTM) - Final Year Project (FYP)
echo Student: Nursyafiqah Zulaikha Binti Zilkamal (AM2412018113)
echo ======================================================================
echo.

echo [1/3] Checking MariaDB Database...
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo MariaDB is already running.
) else (
    echo Starting MariaDB on port 3307...
    start /B "" "C:\xampp\mysql\bin\mysqld.exe" --defaults-file="C:\xampp\mysql\bin\my.ini" --standalone
    timeout /t 2 /nobreak >nul
)

echo [2/3] Checking Apache Web Server...
tasklist /FI "IMAGENAME eq httpd.exe" 2>NUL | find /I /N "httpd.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo Apache is already running.
) else (
    echo Starting Apache Web Server...
    start /B "" "C:\xampp\apache\bin\httpd.exe"
    timeout /t 2 /nobreak >nul
)

echo [3/3] Opening System in Web Browser...
start "" "http://localhost/smart_event_equipment/"

echo.
echo ======================================================================
echo System is LIVE at: http://localhost/smart_event_equipment/
echo Demo Admin:   admin@uptm.edu.my    (Password: password123)
echo Demo Student: syafiqah@student.uptm.edu.my (Password: password123)
echo ======================================================================
pause
