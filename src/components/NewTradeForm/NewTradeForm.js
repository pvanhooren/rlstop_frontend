import React, {Component} from "react";
import axios from 'axios';

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import './NewTradeForm.css'

const baseUrl= "http://localhost:8080/";

class NewTradeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    getAllUsers() {
        axios.get(baseUrl + "users/all").then(
            result => {
                this.setState({users:result.data})
                // this.putUsersInSelect();
            }
        )
    }

    // postToEdit(tradeId){
    //     this.setState({text: "Edit trade", mode: "Edit", tradeId: tradeId});
    //     console.log("Function done.")
    // }

    // test(){
    //     console.log(document.getElementById("wants").value);
    // }

    submitForm() {
        if (document.getElementById("newWants").value !== "" && document.getElementById("newOffers").value !== "" && document.getElementById("selectBox").value !== "") {
            axios.post(baseUrl +"trades/new?wants=" + document.getElementById("newWants").value + "&offers=" + document.getElementById("newOffers").value + "&userId=" + document.getElementById("selectBox").value);
            window.location.reload(false);
        } else {
            alert("The trade cannot be added because it is not complete");
        }
    }

    // putUsersInSelect(){
    //     for (var i = 0; i < this.state.users.length; i++) {
    //         document.getElementById('selectBox').options[i] = new Option(this.state.users[i].userName, this.state.users[i].userId);
    //     }
    // }

    componentDidMount() {
        this.getAllUsers();
    }

    render(){
        return(
            <div>
            <div className="newTradeForm">
                <h2>Post new trade</h2>
                        <label>I am...</label>
                        <select className="select" id="selectBox" name="user">
                            {this.state.users.map(el => <option value={el.userId} key={el.userId}> {el.userName} </option>)}
                        </select>
                        <Button className="marginButton" variant="contained" color="primary" onClick={this.submitForm}>Post</Button><br/>
                        <br/>
                        {/*<input className="input" type="hidden"></input><br />*/}
                        {/*<label>I offer...</label><br />*/}
                        <TextField variant="outlined" className="textfield" id="newOffers" multiline rows={7} label="I offer..."></TextField>
                        {/*<label>In trade for...</label><br />*/}
                        <TextField variant="outlined" className="textfield" id="newWants" multiline rows={7} label="In trade for..."></TextField>
            </div>
            {/*<div>*/}
            {/*    <Card variant="outlined">*/}
            {/*        <CardContent>*/}
            {/*            <div className="cardText">*/}
            {/*                <Typography color="textSecondary" gutterBottom>*/}
            {/*                    {this.state.users[document.getElementById("selectBox").value - 1].userName}*/}
            {/*                </Typography>*/}
            {/*                <Typography variant="h5" component="h2">*/}
            {/*                    Offers: {document.getElementById("newOffers").value} -*/}
            {/*                    Wants: {document.getElementById("newWants").value}*/}
            {/*                </Typography>*/}
            {/*                <Typography color="textSecondary">*/}
            {/*                    {this.state.users[document.getElementById("selectBox").value - 1].platform} ID:*/}
            {/*                    {this.state.users[document.getElementById("selectBox").value - 1].platformID}*/}
            {/*                </Typography>*/}
            {/*            </div>*/}

            {/*        </CardContent>*/}
            {/*    </Card>*/}
            {/*</div>*/}
            </div>
        );
    }
}

export default NewTradeForm;