# Land Control Game

### Questions to be answered:
1. Can a game be hosted on IPFS and also be modified without loosing the ipfs address?
1. Can a user of a game hosted on IPFS have confidence that the game is legitimate?
1. Can we track users of the game through IPFS?



### General Steps:
1. install MetaMask
1. connect MetaMask to Ropsten


### The Ops Pattern
1. Static ipfs page retreives live game IPFS address from ethereum and send the user to it (using start.html residing on the above IPFS address)
2. Operations department can upload new games to IPFS and modify the contract containing the live game page ( using Operations.html )
3. Live game is played from IPFS without it needing to know about its static address. (snake.html)

![Pattern picture](IPFS%20ethereum%20pattern.png)

# Next Steps:
1. Clean and comment the code (dont bother to read it right now, it's mvp for functionality)
1. Determine better bounce method (iframes or whatnot)
1. Get some analytics into the the static and live game page.
1. Start to make an awesome game by updating it live while people are playing it.
