
const solc = require('solc');
const solConfig = require('./sol.config.js');

let compiled = solc.compile(JSON.stringify(solConfig));
let  Lottery = JSON.parse(compiled,1).contracts.Lottery.Lottery;

module.exports = {
    abi: Lottery.abi,
    bytecode: Lottery.evm.bytecode
}
