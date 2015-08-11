rmdir build /S /Q
mkdir build
CD build/
mkdir js
mkdir icons
CD ..
XCOPY manifest.json build
XCOPY background.html build
XCOPY icons\* build\icons
call compile\minifyjs.bat
call compile\update_crx.bat
call compile\zip.bat
move skip.zip "build/skip.zip"
move skip.crx "build/skip.crx"