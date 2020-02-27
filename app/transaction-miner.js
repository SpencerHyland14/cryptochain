const Transaction = require('../wallet/transaction');

class TransactionMiner{
    constructor({blockchain, transactionPool, wallet, pubsub}){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubsub = pubsub;
    }
    mineTransactions(){
        const validTransactions = this.transactionPool.validTransactions();

        //generate miners reward
        validTransactions.push(
            Transaction.rewardTransaction({minerWallet: this.wallet})
        );
        //add a block consisting of these transactions to the blockchain
        this.blockchain.addBlock({data: validTransactions});
        //broadcast the updated blockchain
        this.pubsub.broadcastChain();
        this.transactionPool.clear();

        //clear the pool
    }
}

module.exports = TransactionMiner;