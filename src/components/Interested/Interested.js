import React from 'react'

import "../Overview.css"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import Button from "@material-ui/core/Button";
import axios from "axios";

import AuthenticationService from "../../services/AuthenticationService";

let headers = {};
const baseUrl = AuthenticationService.baseUrl;

class Interested extends React.Component {
    constructor(props) {
        super(props)

        headers = AuthenticationService.getHeaders();

        this.state = {
            interests: [],
            busy: false,
            interestId: 0
        }
    }

    getAllInterests() {
        const self = this;
        axios.get(baseUrl + "interests/user?id=" + localStorage.getItem('userId'), {
                headers: headers
            }
        ).then(result => {
            self.setState({interests: result.data});
        }).catch((e) => {
            if (e.response != null) {
                if (e.response.status == '404') {
                    document.getElementById('noInterests').style.display = 'block'
                    this.setState({interests: []})
                } else {
                    document.getElementById('serverError').style.display = 'block'
                }
            } else {
                AuthenticationService.logOut(this.props.history)
            }
        });
    }

    showDeleteForm(interestId) {
        if (!this.state.busy) {
            this.setState({interestId: interestId, busy: true})
            document.getElementById("delete" + interestId).style.display = "block";
            document.getElementById("view" + interestId).style.display = "none";
        }
    }

    removeInterest = async () => {
        await axios.delete(baseUrl + "interests/" + this.state.interestId, {
                headers: headers
            }
        ).then(() => {
                this.setState({busy: false})
            }
        ).catch(() => {
            alert("The interest couldn't be deleted, please try again!")
        })

        await this.getAllInterests();
    }

    cancelDelete = () => {
        this.setState({busy: false})
        document.getElementById("delete" + this.state.interestId).style.display = "none";
        document.getElementById("view" + this.state.interestId).style.display = "block";
    }

    componentDidMount() {
        if (AuthenticationService.isLoggedIn()) {
            this.getAllInterests();
        } else {
            this.props.history.push("/me/login")
        }
    }

    render() {
        return (
            <div>
                <div className="mainArea" id="interestedTrades">
                    <h2 className="title">Trades you are interested in</h2>
                    <div className="serverError" id="serverError">
                        Something went wrong connecting to our server, our apologies for the inconvenience. Please refresh and try
                        again!
                    </div>
                    {this.state.interests.map(interest =>
                        <Card key={interest.interestId} className="tradeCard" variant="outlined">
                            <CardContent>
                                <div className="view" id={"view" + interest.interestId}>
                                    <div className="cardText">
                                        <Typography color="textSecondary" gutterBottom>
                                            {interest.trade.user.userName} ({interest.trade.user.platform})
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            Offers: {interest.trade.offers} -
                                            Wants: {interest.trade.wants}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            Your comment: {interest.comment}
                                        </Typography>
                                    </div>
                                    <div className="icons">
                                        <Button variant="contained" color="secondary" disabled={this.state.busy}
                                                onClick={() => this.showDeleteForm(interest.interestId)}>Remove
                                            interest</Button>
                                    </div>
                                </div>

                                <div className="deleteForm" id={"delete" + interest.interestId}>
                                    <div className="deleteText">
                                        <Typography color="textSecondary" gutterBottom>
                                            Are you sure you you're not interested in this trade anymore?
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            Offers: {interest.trade.offers} -
                                            Wants: {interest.trade.wants}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            {interest.trade.user.platform}
                                        </Typography>
                                    </div>
                                    <div className="icons">
                                        <ClearIcon color="secondary" fontSize="large" cursor="pointer" className="icon2"
                                                   onClick={this.cancelDelete}/>
                                        <CheckIcon color="primary" fontSize="large" cursor="pointer" className="icon1"
                                                   onClick={this.removeInterest}/>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    <div className="nothingToDisplay" id="noInterests">
                        It seems like you have not showed interest in any trades yet. Click the button below to look at
                        other people's trades!
                        <br/><br/><Button variant="contained" color="primary"
                                          onClick={() => this.props.history.push("/")}>Go to overview</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Interested