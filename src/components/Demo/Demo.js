import React from "react";
import axios from 'axios';

import TradeOverview from "../TradeOverview/TradeOverview";
import NewTradeForm from "../NewTradeForm/NewTradeForm";

class Demo extends React.Component{
    // componentDidMount(){
    //     axios.get("http://localhost:8080/users/5", {
    //         headers : {
    //             withCredentials: true,
    //             authorization: 'Basic ' + localStorage.getItem('creds')
    //         }}
    //     ).catch((e) => {
    //         alert(e.response.data.message);
    //     })
    // }
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
            {/*<TradeOverview />*/}
            {/*<NewTradeForm />*/}
            {/*    <input id="username"/>*/}
            {/*    <input id="password" type="password"/>*/}
            {/*    <button onClick={this.signIn}>Sign in</button>*/}
           </div>
       ) ;
    }

}

export default Demo;