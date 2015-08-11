rmdir build /S /Q
mkdir build
CD build/
mkdir js
mkdir util
mkdir backgrounds
CD ..
XCOPY util\jquery.min.js build\util
XCOPY manifest.json build
XCOPY backgrounds\* build\backgrounds
call compile\minifyjs.bat
call compile\update_crx.bat
call compile\zip.bat