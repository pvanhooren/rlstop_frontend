import React, { Component } from 'react'
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardContent from '@material-ui/core/CardContent';
import CardActions from "@material-ui/core/CardActions";
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import '../Overview.css'

class TradeOverview extends Component {
    constructor(props){
        super(props);

        this.state = {
            trades: [],
            tradeId: 0,
            userId: 0,
            wants: "",
            offers: ""
        }

    }

    showEditForm(trade) {
        this.setState({ tradeId: trade.postId, userId: trade.user.userId, wants: trade.wants, offers: trade.offers})
        document.getElementById("filter").style.display = "none";
        document.getElementById("editForm").style.display = "block";
    }

    editTrade = () =>{
        const self = this;
        if(document.getElementById("wants").value != "" && document.getElementById("offers").value != "") {
            fetch("http://localhost:8080/trades/" + self.state.tradeId + "?wants=" + document.getElementById("wants").value + "&offers=" + document.getElementById("offers").value + "&userId=" + self.state.userId, {method: 'PUT'});
            //console.log("http://localhost:8080/trades/" + self.state.tradeId + "?wants=" + document.getElementById("wants").value + "&offers=" + document.getElementById("offers").value + "&userId=" + self.state.userId);
            document.getElementById("editForm").style.display = "none";
            document.getElementById("filter").style.display = "block";
            window.location.reload(false);
        } else {
            alert("The trade cannot be edited because it is not complete. Please fill in the empty fields.")
        }
    }

    cancelEdit(){
        document.getElementById("editForm").style.display = "none";
        document.getElementById("filter").style.display = "block";
    }

    deleteTrade(tradeId){
        fetch("http://localhost:8080/trades/" + tradeId, {method:'DELETE'})
        window.location.reload(false);
    }

    getAllTrades = () => {
        const self = this;
        fetch("http://localhost:8080/trades/all").then(rse => rse.json()).then(
            result => {
                self.setState({trades: result});
            }
        )
    }

    getFilteredTrades = () =>{
        const self = this;
        if(document.getElementById("switch").checked){
            fetch("http://localhost:8080/trades/filter?platform=NintendoSwitch").then(rse => rse.json()).then(
                result => {
                    self.setState({trades: result});
                }
            )
        } else if (document.getElementById("playstation").checked) {
            fetch("http://localhost:8080/trades/filter?platform=PlayStation").then(rse => rse.json()).then(
                result => {
                    self.setState({trades: result});
                }
            )
        } else if (document.getElementById("xbox").checked) {
            fetch("http://localhost:8080/trades/filter?platform=XBox").then(rse => rse.json()).then(
                result => {
                    self.setState({trades: result});
                }
            )
        } else if (document.getElementById("pc").checked) {
            fetch("http://localhost:8080/trades/filter?platform=PC").then(rse => rse.json()).then(
                result => {
                    self.setState({trades: result});
                }
            )
        } else {
            alert("No filter is selected, so all trades will be displayed.")
            this.getAllTrades();
        }
    }

    componentDidMount() {
        this.getAllTrades();
    }

    render (){
        return (
            <div>

                <br/>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography>Filter by platform</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="filterArea">
                            <RadioGroup id="platform" className="filterGroup" name="platform">
                                <FormControlLabel value="switch" control={<Radio id="switch" />} label="Nintendo Switch" />
                                <FormControlLabel value="playstation" control={<Radio id="playstation" />} label="PlayStation" />
                                <FormControlLabel value="xbox" control={<Radio id="xbox" />} label="XBox" />
                                <FormControlLabel value="pc" control={<Radio id="pc" />} label="PC" />
                            </RadioGroup>
                            <div className="filterButtons">
                                <Button className="marginBtn" onClick={this.getFilteredTrades} variant="contained" color="primary">Filter!</Button>
                                <Button onClick={this.getAllTrades} variant="contained" color="secondary">Remove filter</Button>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <br/><br/>

                <br/>
                {this.state.trades.map(trade =>
                    <Card variant="outlined">
                        <CardContent>
                            <div className="cardText">
                            <Typography color="textSecondary" gutterBottom>
                                {trade.user.userName}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                Wants: {trade.wants} -
                                Offers: {trade.offers}
                            </Typography>
                            <Typography color="textSecondary">
                                {trade.user.platform} ID: {trade.user.platformID}
                            </Typography>
                            </div>
                            <div className="icons">
                                {/*<Button variant="contained" color="primary" onClick={() => this.showEditForm(trade)}>Edit</Button>*/}
                                {/*<Button variant="contained" color="secondary" onClick={() => this.deleteTrade(trade.postId)}>Delete</Button>*/}

                                {/*<DeleteIcon className="icon2" color="secondary" fontSize="large" cursor="pointer" onClick={() => this.deleteTrade(trade.postId)} />*/}
                                {/*<CreateIcon className="icon1" color="primary" fontSize="large" cursor="pointer" onClick={() => this.showEditForm(trade)} />*/}
                            </div>

                        </CardContent>
                        {/*<CardActions>*/}

                            {/*</CardActions>*/}
                    </Card>
                )}

            </div>
        );
    }
}

export default TradeOverview;

