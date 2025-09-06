@echo off
echo Starting EcoFinds Application (Stable Version)...
echo.

echo Checking for existing processes...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do (
    echo Killing existing frontend process: %%a
    taskkill /F /PID %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do (
    echo Killing existing backend process: %%a
    taskkill /F /PID %%a >nul 2>&1
)

echo Waiting for ports to be freed...
timeout /t 3 >nul

echo Installing dependencies if needed...
call npm run install-backend
call npm run install-frontend

echo.
echo Starting servers in clean state...
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:3000
echo.

start "EcoFinds Backend" cmd /k "cd backend && npm run dev"
timeout /t 5
start "EcoFinds Frontend" cmd /k "cd frontend && npm start"

echo.
echo ✅ Both servers are starting in clean state...
echo ✅ Check the opened windows for status
echo ✅ Open http://localhost:3000 when ready!
echo ✅ Updated title should show "EcoFinds - Sustainable Marketplace"
echo.
pause
