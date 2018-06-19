const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data ;
        this.previousHash = previousHash ;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return  SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();   
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "19/06/2018", "Genesis block", "0");
    }


    getlastestBlock(){
        return this.chain[this.chain.length - 1];
    }
    
    addBlock(newBlock){
        newBlock.previousHash = this.getlastestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let fookCoin  = new Blockchain();
fookCoin.addBlock(new Block(1, "20/06/2018", { amount: 6}));
fookCoin.addBlock(new Block(2, "21/06/2018", { amount: 10}));
fookCoin.addBlock(new Block(3, "22/06/2018", { amount: 11}));

console.log(JSON.stringify(fookCoin, null, 4));
