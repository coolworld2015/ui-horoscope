# UI-Horoscope
git clone https://github.com/coolworld2015/ui-horoscope.git
-------------------------------------------------------------------------------------------------
npm i
-------------------------------------------------------------------------------------------------
npm run watch
-------------------------------------------------------------------------------------------------
npm run release
-------------------------------------------------------------------------------------------------
npm run tdd
-------------------------------------------------------------------------------------------------
gulp //default build
gulp watch //no test
gulp build //for dev
gulp release //for release
gulp test // one time
gulp tdd  // all times

npm start // run server.js
npm prune // remove npm from package.json
-------------------------------------------------------------------------------------------------
git config user.name "wintermute2015"
-------------------------------------------------------------------------------------------------
git config user.email "wintermute2015@ukr.net"
-------------------------------------------------------------------------------------------------
Requirements:
-------------------------------------------------------------------------------------------------
{Node.js,Android: Android SDK}
-------------------------------------------------------------------------------------------------
npm i cordova -g
-------------------------------------------------------------------------------------------------
cordova create android_test
-------------------------------------------------------------------------------------------------
cd android_test
-------------------------------------------------------------------------------------------------
cordova platform add android
-------------------------------------------------------------------------------------------------
cordova build android
-------------------------------------------------------------------------------------------------
cd platforms\android\build\outputs\apk
-------------------------------------------------------------------------------------------------
Move apk to Genymotion for running in VM
-------------------------------------------------------------------------------------------------
D:\android_test\config.xml add <icon src="logo.png" />
-------------------------------------------------------------------------------------------------