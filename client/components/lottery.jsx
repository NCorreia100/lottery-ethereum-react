import React from 'react';
import { Dropdown } from 'react-bootstrap';

class Lottery extends React.Component {
    constructor(props) {
        super(props);

        console.log('abi:', this.props.abi, '\nbytecode:', this.props.bytecode, '\nProvider:', this.props.provider);

        this.state = {
            accounts: [],
            contract: null,
            network: null,
            manager: '',
            players: [],
            balance: 0,
            feedback: ''
        };
    }
    submitPlayer() {
        let eth = document.getElementById('wei').value;
        if (eth <= 0.1) {
            this.setState({ feedback: 'Not enough wei to participate (min: 0.1 eth)' })
            return;
        }
        let player = document.getElementById('acctHash').value;
        if (player.length === 0) {
            let selection = document.getElementById('dropdown-basic').value;
            if (selection === 0) {
                this.setState({ feedback: 'Account address is required' })
                return;
            }
            player = this.state.accounts[selection - 1];
        }
        this.addPlayer(player, eth);
    }
    addPlayer(account, eth) {
        this.state.contract.methods.addPlayer().send({
            from: account,
            value: web3.utils.toWei(eth, 'ether')
        })
            .then(() => {
                this.setState({
                    balance: this.contract.eth.getBalance(account),
                    players: this.contract.methods.getPlayers.call({ from: account })
                })
            })
    }
    pickWinner(selected) {
        if (selected === this.state.manager) {
            this.state.contract.methods.pickWinner().send({ from: this.manager })
            this.setState({
                feedback: "Winner took" + this.balance,
                players: [],
                balance: 0
            })
        }
        else {
            this.setState({ feedback: 'Only manager can pick winner' })
        }
    }
    async componentDidMount(){
        let { provider, abi, bytecode } = this.props;
        try{
        let accounts = await provider.eth.getAccounts();
        let network = await contract.eth.net.getNetworkType();
        await (console.log('accounts:',accounts,'\nnetwork:',network))
        let contract = await new provider.eth.Contract(abi,{gas:'1000000'})
        .deploy({data: '0x' + bytecode}) // add 0x bytecode
        .send({from: accounts[0]})
        await console.log('Contract deployed to', contract.options.address);
        }catch(err){
            console.log('unable to deploy contract to blockchain\n'+err)
        }finally{
            await this.setState({ contract, abi, bytecode, accounts, network });
        }

    }
    render() {
        if (this.state.accounts.length === 0)
            return <React.Fragment><h3>Retrieving account information...</h3></React.Fragment>
        else
            console.log('Accounts:', this.state.accounts);
        return <React.Fragment>
            <form>
                <label>Manager:</label>{this.state.manager}
                <br />
                <label>Select an account from menu or enter account address</label>
                <br />
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Make a selection
                        </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {this.state.accounts.map((acct, i) => (<Dropdown.Item href="#" id={i} key={i}>{`#${i} | ${acct}`}</Dropdown.Item>))}
                    </Dropdown.Menu>
                </Dropdown>
                <br />
                <input id="acctHash" type="text" placeholder="optional account hash" ></input>
                <br />
                <input id="wei" type="decimal" placeholder="eth" required>0.02</input>
                <button type="submit" onClick={() => { submitPlayer() }} >Submit</button>

            </form>
        </React.Fragment>
    }
}

export default Lottery;