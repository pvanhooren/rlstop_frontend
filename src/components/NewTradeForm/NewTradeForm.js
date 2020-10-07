import React, {Component} from "react";

class NewTradeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    render(){
        return(
            <div class="newTradeForm">
            <h2>Post new trade</h2>
            </div>
        );
    }

}