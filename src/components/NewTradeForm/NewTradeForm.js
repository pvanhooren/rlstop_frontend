import React, {Component} from "react";
import axios from 'axios';

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import './NewTradeForm.css'

const baseUrl = "http://localhost:8080/";

class NewTradeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: Object,
            offersError: false,
            wantsError: false,
            errorText: ""
        }
    }

    isLoggedIn() {
        return !!(localStorage.getItem('token') != null & localStorage.getItem('token') !== "");
    }

    submitForm = async () => {
        this.setState({offersError: false, wantsError: false, errorText: ""})
        if (document.getElementById("newWants").value !== "" && document.getElementById("newOffers").value !== "" && localStorage.getItem("userId") != null) {
            await axios.post(baseUrl + "trades/new?wants=" + document.getElementById("newWants").value + "&offers=" + document.getElementById("newOffers").value + "&userId=" + localStorage.getItem("userId"), null, {
                headers: {
                    withCredentials: true,
                    authorization: 'Bearer ' + localStorage.getItem("token")
                }
            }).catch((e) => {
                if (e.response.data != null) {
                    this.setState({offersError: true, wantsError: true, errorText: e.response.data.message})
                } else {
                    this.setState({
                        offersError: true,
                        wantsError: true,
                        errorText: "Something at our end went wrong posting the trade. Please try again later!"
                    })
                }
            });

            this.props.history.push("/")
        } else {
            this.setState({
                offersError: true,
                wantsError: true,
                errorText: "The trade cannot be added because it is not complete"
            })
        }
    }

    getUserInfo() {
        axios.get(baseUrl + "users/" + localStorage.getItem("userId"), {
            headers: {
                withCredentials: true,
                authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then(response => {
                this.setState({user: response.data})
            }
        ).catch((e) => {
            document.getElementById('serverError').style.display = 'block'
        });
    }

    componentDidMount() {
        if (this.isLoggedIn()) {
            this.getUserInfo();
        } else {
            this.props.history.push("/me/login")
        }
    }

    render() {
        return (
            <div className="newTradeForm">
                <h2>Post new trade</h2>

                <div className="serverError" id="serverError">
                    It looks like something went wrong on our end, our apologies for the inconvenience. Please try
                    again later!
                </div>
                <br/>
                <TextField error={this.state.offersError} helperText={this.state.errorText} variant="outlined"
                           className="textfield" id="newOffers" multiline rows={7} label="I offer..."></TextField>
                <TextField error={this.state.wantsError} variant="outlined" className="textfield" id="newWants"
                           multiline rows={7} label="In trade for..."></TextField>
                <br/><br/>
                <Button className="marginButton" variant="contained" color="primary"
                        onClick={this.submitForm}>Post</Button><br/>
            </div>
        );
    }
}

export default NewTradeForm;