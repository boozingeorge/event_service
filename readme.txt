--build project
npm install
grunt

--redis server for share session
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt-get update
sudo apt-get install redis-server

--run server
export NODE_ENV=development && node http.js

--url
http://127.0.0.1:3000/