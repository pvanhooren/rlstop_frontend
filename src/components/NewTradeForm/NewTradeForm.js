import React, {Component} from "react";
import axios from 'axios';

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import './NewTradeForm.css'
import AuthenticationService from "../../services/AuthenticationService";

var headers = {};
const baseUrl = AuthenticationService.baseUrl;

class NewTradeForm extends Component {
    constructor(props) {
        super(props);

        headers = AuthenticationService.getHeaders();

        this.state = {
            user: Object,
            wishlist: [],
            offersError: false,
            wantsError: false,
            errorText: ""
        }
    }

    submitForm = async () => {
        this.setState({offersError: false, wantsError: false, errorText: ""})
        if (document.getElementById("newWants").value !== "" && document.getElementById("newOffers").value !== "" && localStorage.getItem("userId") != null) {
            await axios.post(baseUrl + "trades/new?wants=" + document.getElementById("newWants").value + "&offers=" + document.getElementById("newOffers").value + "&userId=" + localStorage.getItem("userId"), null, {
                    headers: headers
                }
            ).catch((e) => {
                if (e.response != null) {
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
                headers: headers
            }
        ).then(response => {
                this.setState({user: response.data})
            }
        ).catch((e) => {
            if (e.response != null) {
                document.getElementById('serverError').style.display = 'block'
            } else {
                AuthenticationService.logOut(this.props.history)
            }
        });
    }

    async getWishlist() {
        await axios.get(baseUrl + "users/" + localStorage.getItem('userId'), {
                headers: headers
            }
        ).then(
            result => {
                this.setState({wishlist: result.data.wishlist})
                console.log(this.state.wishlist);
            }).catch((e) => {
            if (e.response != null) {
                document.getElementById('serverError').style.display = 'block'
            } else {
                AuthenticationService.logOut(this.props.history)
            }
        })
    }

    fillInWants(item) {
        document.getElementById('newWants').value = item;
    }

    componentDidMount() {
        if (AuthenticationService.isLoggedIn()) {
            this.getUserInfo();
            this.getWishlist();
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
                           className="textfield" id="newOffers" multiline rows={7} label="I offer..."
                           InputLabelProps={{shrink: true,}}></TextField>
                <TextField error={this.state.wantsError} variant="outlined" className="textfield" id="newWants"
                           multiline rows={7} label="In trade for..." InputLabelProps={{shrink: true,}}></TextField>
                <br/><br/>
                <Button className="marginButton" variant="contained" color="primary"
                        onClick={this.submitForm}>Post</Button><br/><br/><br/>
                {this.state.wishlist != [] ? (
                        <div>
                            ... Or directly fill in something from your wishlist in the wants section!
                            <br/>
                            {this.state.wishlist.map(item =>
                                <Button color="primary" onClick={() => this.fillInWants(item)}>|| {item} ||</Button>
                            )}
                        </div>
                    ) :
                    <div></div>
                }

            </div>
        );
    }
}

export default NewTradeForm;