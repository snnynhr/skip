rmdir build /S /Q
mkdir build
CD build/
mkdir js
mkdir util
CD ..
XCOPY util\jquery.min.js build\util
XCOPY manifest.json build
call compile\minifyjs.bat
call compile\update_crx.bat
call compile\zip.bat