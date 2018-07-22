# Contracts of Contracts


### General Steps:
1. install MetaMask
1. connect MetaMask to Ropsten


### The Ops Pattern
1. Static ipfs page retreives live game IPFS address from ethereum and send the user to it (using start.html residing on the above IPFS address)
2. Operations department can upload new games to IPFS and modify the contract containing the live app page ( using Operations.html )
3. Live game is played from IPFS without it needing to know about its static address.

![Pattern picture](IPFS%20ethereum%20pattern.png)

# Installing
## ipfs
Install ipfs- https://ipfs.io/docs/install/
wget "https://dist.ipfs.io/go-ipfs/v0.4.15/go-ipfs_v0.4.15_linux-amd64.tar.gz"
* tar xvfz go-ipfs.tar.gz
* cd go-ipfs
* ./install.sh
* ipfs init
* ipfs daemon

## http-server
### install npm
* sudo apt-get update
* sudo apt-get install nodejs
* sudo apt-get install npm

### install http-server
*  sudo npm install http-server -g

## Source
 * mkdir github
 * cd github
 * git clone https://github.com/matbest/dapp-land.git

 * sudo ln -s /usr/bin/nodejs /usr/bin/node




# Operations
#### How to run things so that they dont stop when the shell exits
## Install pm2
 * $ npm install pm2 -g

## Use pm2 to run persistant web server
one can test with simple "http-server -p 1337 .". but to do the real thing use:

 * $ pm2 start http-server -- -p 1337 .
 * $ pm2 ls
 * -- is required to pass arguments through to the http-server command.

## Use PM2 to run ipfs daemon

* $ pm2 start ipfs -- daemon

## configure awesome
* Allow port 8485

## run compiler tools locally
* remixd -s /home/mathew/
