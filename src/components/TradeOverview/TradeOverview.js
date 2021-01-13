import React, {Component} from 'react';
import axios from 'axios';

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardContent from '@material-ui/core/CardContent';
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Card from "@material-ui/core/Card";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FilterListIcon from '@material-ui/icons/FilterList';
import DeleteIcon from '@material-ui/icons/Delete';

import '../Overview.css'
import TextField from "@material-ui/core/TextField";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import AuthenticationService from "../../services/AuthenticationService";

var headers = {}
const baseUrl = AuthenticationService.baseUrl;

class TradeOverview extends Component {
    constructor(props) {
        super(props);

        headers = AuthenticationService.getHeaders();

        this.state = {
            trades: [],
            busy: false,
            interests: [],
            tradeId: 0,
            userId: 0,
            wants: "",
            offers: ""
        }
    }

    isInterested(tradeId) {
        if (this.state.interests.find((x) => x.trade.tradeId === tradeId) != null) {
            return true;
        }

        return false;
    }

    showInterestForm(tradeId) {
        if (!this.state.busy) {
            this.setState({tradeId: tradeId, busy: true})
            document.getElementById("view" + tradeId).style.display = "none";
            document.getElementById("interest" + tradeId).style.display = "block";
        }
    }

    showRemoveForm(tradeId) {
        if (!this.state.busy) {
            this.setState({tradeId: tradeId, busy: true})
            document.getElementById("view" + tradeId).style.display = "none";
            document.getElementById("remove" + tradeId).style.display = "block";
        }
    }

    showDeleteForm(tradeId) {
        if (!this.state.busy) {
            this.setState({tradeId: tradeId, busy: true})
            document.getElementById("delete" + tradeId).style.display = "block";
            document.getElementById("view" + tradeId).style.display = "none";
        }
    }

    cancelDelete = () => {
        this.setState({busy: false})
        document.getElementById("delete" + this.state.tradeId).style.display = "none";
        document.getElementById("view" + this.state.tradeId).style.display = "block";
    }

    cancelInterest = () => {
        this.setState({busy: false})
        document.getElementById("interest" + this.state.tradeId).style.display = "none";
        document.getElementById("view" + this.state.tradeId).style.display = "block";
    }

    cancelRemove = () => {
        this.setState({busy: false})
        document.getElementById("remove" + this.state.tradeId).style.display = "none";
        document.getElementById("view" + this.state.tradeId).style.display = "block";
    }

    deleteTrade(tradeId) {
        axios.delete(baseUrl + "trades/" + tradeId, {
                headers: headers
            }
        ).then(() => {
            this.setState({busy: false})
        }).catch((e) => {
            alert("Something went wrong deleting the trade. Please try again!")
        });
    }

    getAllTrades = () => {
        const self = this;

        axios.get(baseUrl + "trades/all", {headers: headers}
        ).then(result => {
            self.setState({trades: result.data});
        }).catch((e) => {
            if (e.response == null) {
                AuthenticationService.logOut(this.props.history)
            } else if (e.response.status == '404') {
                document.getElementById('noTrades').style.display = 'block';
            }
        });
    }


    getAllInterests = () => {
        const self = this;

        axios.get(baseUrl + "interests/user?id=" + localStorage.getItem('userId'), {headers: headers}
        ).then((response) => {
            self.setState({interests: response.data})
        }).catch((e) => {
            if (e.response == null) {
                AuthenticationService.logOut(this.props.history)
            } else if (e.response.status == '404') {
                self.setState({interests: []})
            } else {
                document.getElementById('serverError').style.display = 'block';
            }
        })
    }

    removeInterest = async () => {
        await axios.delete(baseUrl + "interests?user=" + localStorage.getItem('userId') + "&trade=" + this.state.tradeId, {
                headers: headers
            }
        ).then(() => {
                this.setState({busy: false})
            }
        ).catch((e) => {
            document.getElementById('serverError').style.display = 'block';
        })

        await this.getAllInterests();
        await this.getAllTrades();

        document.getElementById("remove" + this.state.tradeId).style.display = "none";
        document.getElementById("view" + this.state.tradeId).style.display = "block";
    }

    showInterest = async () => {
        await axios.post(baseUrl + "interests/new?user=" + localStorage.getItem('userId') + "&trade=" + this.state.tradeId + "&comment=" + document.getElementById("comment" + this.state.tradeId).value, null, {
                headers: headers
            }
        ).then(() => {
                this.setState({busy: false})
            }
        ).catch((e) => {
            document.getElementById('serverError').style.display = 'block';
        })

        await this.getAllInterests();
        await this.getAllTrades();

        document.getElementById("interest" + this.state.tradeId).style.display = "none";
        document.getElementById("view" + this.state.tradeId).style.display = "block";
    }

    getFilteredTrades = () => {
        if (!this.state.busy) {
            const self = this;
            if (document.getElementById("switch").checked) {
                axios.get(baseUrl + "trades/filter?platform=NINTENDOSWITCH", {
                        headers: headers
                    }
                ).then(result => {
                    self.setState({trades: result.data});
                }).catch((e) => {
                    if (e.response == null) {
                        document.getElementById('serverError').style.display = 'block';
                    } else {
                        self.setState({trades: []})
                    }
                });
            } else if (document.getElementById("playstation").checked) {
                axios.get(baseUrl + "trades/filter?platform=PLAYSTATION", {
                        headers: headers
                    }
                ).then(result => {
                    self.setState({trades: result.data});
                }).catch((e) => {
                    if (e.response == null) {
                        document.getElementById('serverError').style.display = 'block';
                    } else {
                        self.setState({trades: []})
                    }
                });
            } else if (document.getElementById("xbox").checked) {
                axios.get(baseUrl + "trades/filter?platform=XBOX", {
                        headers: headers
                    }
                ).then(result => {
                    self.setState({trades: result.data});
                }).catch((e) => {
                    if (e.response == null) {
                        document.getElementById('serverError').style.display = 'block';
                    } else {
                        self.setState({trades: []})
                    }
                });
            } else if (document.getElementById("pc").checked) {
                axios.get(baseUrl + "trades/filter?platform=PC", {
                        headers: headers
                    }
                ).then(result => {
                    self.setState({trades: result.data});
                }).catch((e) => {
                    if (e.response == null) {
                        document.getElementById('serverError').style.display = 'block';
                    } else {
                        self.setState({trades: []})
                    }
                });
            } else {
                this.getAllTrades();
            }
        }
    }

    componentDidMount() {
        if (AuthenticationService.isLoggedIn()) {
            this.getAllTrades();
            this.getAllInterests();
        } else {
            this.props.history.push('/me/login');
        }
    }

    render() {
        return (
            <div>
                <br/>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                    >
                        <FilterListIcon/>
                        <Typography> Filter by platform</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="filterArea">
                            <RadioGroup id="platform" className="filterGroup" name="platform">
                                <FormControlLabel value="switch" control={<Radio id="switch"/>}
                                                  label="Nintendo Switch"/>
                                <FormControlLabel value="playstation" control={<Radio id="playstation"/>}
                                                  label="PlayStation"/>
                                <FormControlLabel value="xbox" control={<Radio id="xbox"/>} label="XBox"/>
                                <FormControlLabel value="pc" control={<Radio id="pc"/>} label="PC"/>
                            </RadioGroup>
                            <div className="filterButtons">
                                <Button className="marginBtn" onClick={this.getFilteredTrades} variant="contained"
                                        color="primary" disabled={this.state.busy}>Filter!</Button>
                                <Button onClick={this.getAllTrades} variant="contained" color="secondary"
                                        disabled={this.state.busy}>Remove
                                    filter</Button>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>

                <div className="serverError" id="serverError">
                    Something went wrong connecting to our server, our apologies for the inconvenience. Please refresh and try
                    again!
                </div>

                <br/>
                {this.state.trades.map(trade =>
                    <Card variant="outlined">
                        <CardContent>
                            <div className="view" id={"view" + trade.tradeId}>
                                <div className="cardText">
                                    <Typography color="textSecondary" gutterBottom>
                                        {trade.lastModified.substring(0, 10)}, {trade.lastModified.substring(11, 16)}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        Offers: {trade.offers} -
                                        Wants: {trade.wants}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {trade.user.userName} ({trade.user.platform})
                                    </Typography>
                                </div>
                                <div className="icons">
                                    {
                                        trade.user.userId != localStorage.getItem('userId') ? (
                                            this.isInterested(trade.tradeId) ? (
                                                <Button className="marginBtn" variant="contained" color="secondary"
                                                        disabled={this.state.busy}
                                                        onClick={() => this.showRemoveForm(trade.tradeId)}>Remove
                                                    interest</Button>
                                            ) : (
                                                <Button className="marginBtn" variant="contained" color="primary"
                                                        disabled={this.state.busy}
                                                        onClick={() => this.showInterestForm(trade.tradeId)}>I'm
                                                    interested!</Button>
                                            )) : (
                                            <></>
                                        )
                                    }

                                    {localStorage.getItem('adminCode') == AuthenticationService.adminCode ?
                                        <DeleteIcon className="icon2" color={this.state.busy ? "disabled" : "secondary"}
                                                    fontSize="large" cursor="pointer"
                                                    onClick={() => this.showDeleteForm(trade.tradeId)}/>
                                        :
                                        <div></div>
                                    }
                                    {/*<CreateIcon className="icon1" color="primary" fontSize="large" cursor="pointer" onClick={() => this.showEditForm(trade)} />*/}
                                </div>
                            </div>

                            <div className="interestForm" id={"interest" + trade.tradeId}>
                                <div className="interestTextField">
                                    <Typography color="textSecondary" gutterBottom>
                                        Offers: {trade.offers}, wants: {trade.wants}
                                    </Typography>
                                    <TextField className={"interestField"} id={"comment" + trade.tradeId}
                                               label="Comment (optional)"></TextField>
                                </div>

                                <div className="icons">
                                    <ClearIcon color="secondary" fontSize="large" cursor="pointer" className="icon2"
                                               onClick={this.cancelInterest}/>
                                    <CheckIcon color="primary" fontSize="large" cursor="pointer" className="icon1"
                                               onClick={this.showInterest}/>
                                </div>
                            </div>

                            <div className="deleteForm" id={"remove" + trade.tradeId}>
                                <div className="deleteText">
                                    <Typography color="textSecondary" gutterBottom>
                                        Are you sure you you're not interested in this trade anymore?
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        Offers: {trade.offers} -
                                        Wants: {trade.wants}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {trade.user.platform}
                                    </Typography>
                                </div>
                                <div className="icons">
                                    <ClearIcon color="secondary" fontSize="large" cursor="pointer" className="icon2"
                                               onClick={this.cancelRemove}/>
                                    <CheckIcon color="primary" fontSize="large" cursor="pointer" className="icon1"
                                               onClick={this.removeInterest}/>
                                </div>
                            </div>

                            <div className="deleteForm" id={"delete" + trade.tradeId}>
                                <div className="deleteText">
                                    <Typography color="textSecondary" gutterBottom>
                                        Are you sure you want to delete this trade?
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        Offers: {trade.offers} -
                                        Wants: {trade.wants}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {trade.user.userName} ({trade.user.platform})
                                    </Typography>
                                </div>
                                <div className="icons">
                                    <ClearIcon color="secondary" fontSize="large" cursor="pointer" className="icon2"
                                               onClick={this.cancelDelete}/>
                                    <CheckIcon color="primary" fontSize="large" cursor="pointer" className="icon1"
                                               onClick={this.deleteTrade}/>
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                )}
                <div className="nothingToDisplay" id="noTrades">
                    This is awkward... It seems like there have been no trades posted yet. You can be the first one!
                    <br/><br/><Button variant="contained" color="primary"
                                      onClick={() => this.props.history.push("/new")}>Post new trade</Button>
                </div>
            </div>
        );
    }
}

export default TradeOverview;

