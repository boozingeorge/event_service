#!/usr/bin/env bash

# Update packeges
apt-get update

# Install general packeges
if [ ! -f curl ]; then
    sudo apt-get install -y curl
fi

if [ ! -f nodejs ]; then
    curl -sL https://deb.nodesource.com/setup_4.x | sudo bash -
    sudo apt-get install -y nodejs
fi

if [ ! -f git ]; then
    sudo apt-get install -y git
fi

# Install nodejs packeges
cd /home/vagrant
mkdir node_modules_es_api_server
cd /vagrant
ln -s /home/vagrant/node_modules_es_api_server node_modules
npm install

sudo npm install -g forever
sudo npm install -g bower
sudo npm install -g grunt-cli

sudo npm link grunt