@echo off
echo Starting EcoFinds Application...
echo.

echo Installing dependencies if needed...
call npm run install-backend
call npm run install-frontend

echo.
echo Starting backend and frontend servers...
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:3000
echo.
echo Wait for both servers to start, then open http://localhost:3000 in your browser
echo.


start "EcoFinds Backend" cmd /k "cd backend && npm run dev"
timeout /t 3
start "EcoFinds Frontend" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting...
echo Check the opened windows for status
echo Open http://localhost:3000 when ready!
pause