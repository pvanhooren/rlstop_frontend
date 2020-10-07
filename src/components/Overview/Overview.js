import React, { Component } from 'react'
import './Overview.css';

class Overview extends Component {
    constructor(props){
        super(props);

        this.state = {
            trades: []
        }
    }

    getAllTrades() {
        fetch("http://localhost:8080/trades/all").then(rse => rse.json()).then(
            result => {
                this.setState({trades: result});
            }
        )
    }

    componentDidMount() {
        this.getAllTrades();
    }

    render (){
        return (
            <div class="trades">
                <h2>All trades</h2>
                <table class="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Wants</th>
                        <th>Offers</th>
                        <th>Username</th>
                        <th>Platform</th>
                        <th>Friend ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.trades.map(trade=>(
                        <tr key={trade.postId}>
                            <td>{trade.postId}</td>
                            <td>{trade.wants}</td>
                            <td>{trade.offers}</td>
                            <td>{trade.user.userName}</td>
                            <td>{trade.user.platform}</td>
                            <td>{trade.user.platformID}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Overview

