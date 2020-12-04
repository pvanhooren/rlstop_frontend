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

import '../Overview.css'
import TextField from "@material-ui/core/TextField";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";

const baseUrl = "http://localhost:8080/";

class TradeOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trades: [],
            interests: [],
            tradeId: 0,
            userId: 0,
            wants: "",
            offers: ""
        }
    }

    isInterested(tradeId) {
        if(this.state.interests.find((x) => x.trade.tradeId == tradeId) != null){
            return true;
        }

        return false;
    }

    showInterestForm(tradeId) {
        this.setState({tradeId: tradeId})
        document.getElementById("view" + tradeId).style.display = "none";
        document.getElementById("interest" + tradeId).style.display = "block";
    }

    showRemoveForm(tradeId){
        this.setState({tradeId: tradeId})
        document.getElementById("view" + tradeId).style.display = "none";
        document.getElementById("remove" + tradeId).style.display = "block";
    }

    editTrade = async () => {
        const self = this;
        if (document.getElementById("wants").value !== "" && document.getElementById("offers").value !== "") {
            await axios.put(baseUrl + "trades/" + self.state.tradeId + "?wants=" + document.getElementById("wants").value + "&offers=" + document.getElementById("offers").value + "&userId=" + self.state.userId,
                {
                    headers: {
                        withCredentials: true,
                        authorization: 'Basic ' + localStorage.getItem("creds")
                    }
                }).catch((e) => {
                alert("Something went wrong editing the trade. Please try again!");
            });
            //console.log("http://localhost:8080/trades/" + self.state.tradeId + "?wants=" + document.getElementById("wants").value + "&offers=" + document.getElementById("offers").value + "&userId=" + self.state.userId);
            document.getElementById("editForm").style.display = "none";
            document.getElementById("filter").style.display = "block";
            this.getAllTrades();
        } else {
            alert("The trade cannot be edited because it is not complete. Please fill in the empty fields.")
        }
    }

    cancelInterest = () => {
        document.getElementById("interest" + this.state.tradeId).style.display = "none";
        document.getElementById("view" + this.state.tradeId).style.display = "block";
    }

    cancelRemove = () => {
        document.getElementById("remove" + this.state.tradeId).style.display = "none";
        document.getElementById("view" + this.state.tradeId).style.display = "block";
    }

    deleteTrade(tradeId) {
        axios.delete(baseUrl + "trades/" + tradeId, {
            headers: {
                withCredentials: true,
                authorization: 'Basic ' + localStorage.getItem("creds")
            }
        }).catch((e) => {
            alert("Something went wrong deleting the trade. Please try again!")
        });
    }

    getAllTrades = () => {
        const self = this;
        axios.get(baseUrl + "trades/all", {
            headers: {
                withCredentials: true,
                authorization: 'Basic ' + localStorage.getItem("creds")
            }
        }).then(
            result => {
                self.setState({trades: result.data});
            }).catch((e) => {

            if (e.response == null) {
                this.props.history.push('/me/login');
            } else if(e.response.status == '404'){
                document.getElementById('noTrades').style.display = 'block';
            }
        });
    }

    getAllInterests = () =>{
        const self = this;
        axios.get(baseUrl + "interests/user?id=" + localStorage.getItem('userId'), {
            headers: {
                withCredentials: true,
                authorization: 'Basic ' + localStorage.getItem("creds")
            }
        }).then((response) => {
            self.setState({interests: response.data})
        }).catch((e) => {
            self.setState({interests: []})
        })
    }

    removeInterest = async() => {
        await axios.delete(baseUrl + "interests?user=" + localStorage.getItem('userId') + "&trade=" + this.state.tradeId , {
            headers : {
                withCredentials: true,
                authorization: 'Basic ' + localStorage.getItem("creds")
            }}
        ).catch((e) => {
            alert("The interest couldn't be deleted, please try again!")
        })

        await this.getAllInterests();
        await this.getAllTrades();

        document.getElementById("remove" + this.state.tradeId).style.display = "none";
        document.getElementById("view" + this.state.tradeId).style.display = "block";
    }

    showInterest = async() =>{
        await axios.post(baseUrl + "interests/new?user=" + localStorage.getItem('userId') + "&trade=" + this.state.tradeId + "&comment=" + document.getElementById("comment" + this.state.tradeId).value , null, {
            headers : {
                withCredentials: true,
                authorization: 'Basic ' + localStorage.getItem("creds")
            }}
        ).catch((e) => {
            alert("The interest couldn't be added, please try again!")
        })

        await this.getAllInterests();
        await this.getAllTrades();

        document.getElementById("interest" + this.state.tradeId).style.display = "none";
        document.getElementById("view" + this.state.tradeId).style.display = "block";
    }

    getFilteredTrades = () => {
        const self = this;
        if (document.getElementById("switch").checked) {
            axios.get(baseUrl + "trades/filter?platform=NINTENDOSWITCH", {
                headers: {
                    withCredentials: true,
                    authorization: 'Basic ' + localStorage.getItem("creds")
                }
            }).then(
                result => {
                    self.setState({trades: result.data});
                }).catch((e) => {
                window.alert("Something went wrong filtering trades. Please try again!");
            });
        } else if (document.getElementById("playstation").checked) {
            axios.get(baseUrl + "trades/filter?platform=PLAYSTATION", {
                headers: {
                    withCredentials: true,
                    authorization: 'Basic ' + localStorage.getItem("creds")
                }
            }).then(
                result => {
                    self.setState({trades: result.data});
                }).catch((e) => {
                window.alert("Something went wrong filtering trades. Please try again!");
            });
        } else if (document.getElementById("xbox").checked) {
            axios.get(baseUrl + "trades/filter?platform=XBOX", {
                headers: {
                    withCredentials: true,
                    authorization: 'Basic ' + localStorage.getItem("creds")
                }
            }).then(
                result => {
                    self.setState({trades: result.data});
                }).catch((e) => {
                window.alert("Something went wrong filtering trades. Please try again!");
            });
        } else if (document.getElementById("pc").checked) {
            axios.get(baseUrl + "trades/filter?platform=PC", {
                withCredentials: true,
                headers: {
                    authorization: 'Basic ' + localStorage.getItem("creds")
                }
            }).then(
                result => {
                    self.setState({trades: result.data});
                }).catch((e) => {
                window.alert("Something went wrong filtering trades. Please try again!");
            });
        } else {
            alert("No filter is selected, so all trades will be displayed.")
            this.getAllTrades();
        }
    }

    componentDidMount() {
        this.getAllTrades();
        this.getAllInterests()
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
                                        color="primary">Filter!</Button>
                                <Button onClick={this.getAllTrades} variant="contained" color="secondary">Remove
                                    filter</Button>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>

                <br/>
                {this.state.trades.map(trade =>
                    <Card variant="outlined">
                        <CardContent>
                            <div className="view" id={"view" + trade.tradeId}>
                            <div className="cardText">
                                <Typography color="textSecondary" gutterBottom>
                                    {trade.user.userName}
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
                                {/*<Button variant="contained" color="primary" onClick={() => this.showEditForm(trade)}>Edit</Button>*/}
                                {/*<Button variant="contained" color="secondary" onClick={() => this.deleteTrade(trade.postId)}>Delete</Button>*/}
                                {
                                    trade.user.userId != localStorage.getItem('userId') ? (
                                    this.isInterested(trade.tradeId) ? (
                                        <Button variant="contained" color="secondary" onClick={() => this.showRemoveForm(trade.tradeId)}>Remove interest</Button>
                                    ) : (
                                        <Button variant="contained" color="primary" onClick={() => this.showInterestForm(trade.tradeId)}>I'm interested!</Button>
                                    )) : (
                                        <></>
                                    )
                                }
                                {/*<DeleteIcon className="icon2" color="secondary" fontSize="large" cursor="pointer" onClick={() => this.deleteTrade(trade.postId)} />*/}
                                {/*<CreateIcon className="icon1" color="primary" fontSize="large" cursor="pointer" onClick={() => this.showEditForm(trade)} />*/}
                            </div>
                            </div>

                            <div className="interestForm" id={"interest" + trade.tradeId}>
                                <div className="interestTextField">
                                    <Typography color="textSecondary" gutterBottom>
                                        Offers: {trade.offers}, wants: {trade.wants}
                                    </Typography>
                                    <TextField className={"interestField"} id={"comment" + trade.tradeId} label="Comment (optional)"></TextField>
                                </div>

                                <div className="icons">
                                    <ClearIcon color="secondary" fontSize="large" cursor="pointer" className="icon2" onClick={this.cancelInterest}/>
                                    <CheckIcon color="primary" fontSize="large" cursor="pointer" className="icon1" onClick={this.showInterest}/>
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

                        </CardContent>
                        {/*<CardActions>*/}

                        {/*</CardActions>*/}
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

