import React from "react";
import TradeOverview from "../TradeOverview/TradeOverview";
import NewTradeForm from "../NewTradeForm/NewTradeForm";

class Demo extends React.Component{
    render(){
       return(
           <div>
            <TradeOverview />
            <NewTradeForm />
           </div>
       ) ;
    }

}

export default Demo;