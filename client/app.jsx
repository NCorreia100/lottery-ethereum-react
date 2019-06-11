//dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import HDWalletProvider from 'truffle-hdwallet-provider';
import Web3 from 'web3';

//components
import LogAccount from './components/logAccount.jsx';
import Lottery from './components/lottery.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            accounts:[],
            provider: null,
            abi: null,
            bytecode: null,
            feedback: ""
        };
        this.setProvider = this.setProvider.bind(this);
    }
    async setProvider({ mnemonic, API }) {
        try{
       let provider= await new Web3(new HDWalletProvider(mnemonic, API));
        await this.setState({provider});   
        let accounts = await provider.eth.getAccounts();
        await this.setState({accounts});
        await console.log('acounts',accounts);
        }catch(err){
            this.setState({feedback:'Unable to retreive accounts. Pleasecheck your information and/or try again later'});
        }
    }   
    getContract() {
        fetch('/api')
            .then(data => data.json())
            .then(({ abi, bytecode }) =>  this.setState({ abi, bytecode }))                        
            .catch(err => {
                this.setState({ feedback: 'Unable to get smart contract' });
                console.log(err)
            });
           
    }
    componentDidMount() {
        this.getContract();
    }
    render() {

        if (!this.state.provider) {
            return <LogAccount setProvider={this.setProvider.bind(this)} feedback={this.state.feedback} />
        } else {
            let { abi, bytecode, provider } = this.state;
            return <Lottery provider={provider} abi={abi} bytecode={bytecode} />
        }
    }
}

ReactDOM.render(<App />, document.getElementById('root'));