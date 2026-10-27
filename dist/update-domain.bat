@echo off
title MethStreams 1-Click Domain Updater
color 0b
cls
node "%~dp0update-domain.js"
echo.
echo Press any key to exit...
pause >nul
