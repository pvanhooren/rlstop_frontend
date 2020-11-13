import React from "react";

import TradeOverview from "../TradeOverview/TradeOverview";
import NewTradeForm from "../NewTradeForm/NewTradeForm";

class Demo extends React.Component{
    // signIn(){
    //     console.log(window.btoa(document.getElementById("username").value + ':' + document.getElementById("password").value));
    //     axios.get("http://localhost:8080/admin", {
    //         headers : {
    //         authorization : 'Basic ' + window.btoa(document.getElementById("username").value + ':' + document.getElementById("password").value)
    //     }}).then(response => {
    //         console.log(response.data);
    //         }
    //     )
    // }

    render(){
       return(
           <div>
            <TradeOverview />
            <NewTradeForm />
            {/*    <input id="username"/>*/}
            {/*    <input id="password" type="password"/>*/}
            {/*    <button onClick={this.signIn}>Sign in</button>*/}
           </div>
       ) ;
    }

}

export default Demo;