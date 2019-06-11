import React from 'react';

let accountAccess = {
    mnemonic: '',
    API: ''
}

var LogAccount = function (props) {    
    
    return (
        <React.Fragment>

            <h3>Enter your Mnemonic and API:</h3>
            <br/>
            <input type="text" placeholder="copy-paste your mnemonic here" onChange={e=>{accountAccess.mnemonic=e.target.value}} />
            <br/>
            <input type="text" placeholder="API for the target Ethereum network" onChange={e=>{accountAccess.API=e.target.value}} />
            <br/>
            <label>{props.feedback}</label>
            <button type="submit"  onClick={()=>{props.setProvider(accountAccess)}}>Submit</button>

        </React.Fragment>
    )

}


export default LogAccount;