import React, {Component} from "react";
import './NewTradeForm.css'
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class NewTradeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    getAllUsers() {
        fetch("http://localhost:8080/users/all").then(rse => rse.json()).then(
            result => {
                this.setState({users:result})
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
            fetch("http://localhost:8080/trades/new?wants=" + document.getElementById("newWants").value + "&offers=" + document.getElementById("newOffers").value + "&userId=" + document.getElementById("selectBox").value, {method: 'POST'});
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
            <div className="newTradeForm">
                <h2>Post new trade</h2>
                        <label>I am...</label>
                        <select className="select" id="selectBox" name="user">
                            {this.state.users.map(el => <option value={el.userId} key={el.userId}> {el.userName} </option>)}
                        </select>
                        <Button className="marginButton" variant="contained" color="primary" onClick={this.submitForm}>Post</Button><br/>
                        {/*<input className="input" type="hidden"></input><br />*/}
                        {/*<label>I offer...</label><br />*/}
                        <TextField className="textfield" id="newOffers" label="I offer..."></TextField>
                        {/*<label>In trade for...</label><br />*/}
                        <TextField className="textfield" id="newWants" label="In trade for..."></TextField>
            </div>
        );
    }
}

export default NewTradeForm;