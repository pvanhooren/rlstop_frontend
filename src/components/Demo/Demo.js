import React from "react";
import Overview from "../Overview/Overview";
import NewTradeForm from "../NewTradeForm/NewTradeForm";

class Demo extends React.Component{
    render(){
       return(
           <div>
            <Overview />
            <NewTradeForm />
           </div>
       ) ;
    }

}

export default Demo;