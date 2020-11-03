import React from "react";
import axios from 'axios';

import Card from '@material-ui/core/Card';
import Typography from "@material-ui/core/Typography";
import CardContent from '@material-ui/core/CardContent';
import CardActions from "@material-ui/core/CardActions";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";

import '../Overview.css';

const baseUrl= "http://localhost:8080/";

class PeopleOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    getAllUsers = () => {
        axios.get(baseUrl + "users/all").then(
            result => {
                this.setState({users:result.data})
            }
        )
    }

    getFilteredUsers = () =>{
        const self = this;
        if(document.getElementById("switch").checked){
            axios.get(baseUrl + "users/filter?platform=NintendoSwitch").then(
                result => {
                    self.setState({users: result.data});
                }
            )
        } else if (document.getElementById("playstation").checked) {
            axios.get(baseUrl + "users/filter?platform=PlayStation").then(
                result => {
                    self.setState({users: result.data});
                }
            )
        } else if (document.getElementById("xbox").checked) {
            axios.get(baseUrl + "users/filter?platform=XBox").then(
                result => {
                    self.setState({users: result.data});
                }
            )
        } else if (document.getElementById("pc").checked) {
            axios.get(baseUrl + "users/filter?platform=PC").then(
                result => {
                    self.setState({users: result.data});
                }
            )
        } else {
            alert("No filter is selected, so all users will be displayed.")
            this.getAllUsers();
        }
    }

    componentDidMount() {
        this.getAllUsers();
    }

    render(){
        return(
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
                    <Button className="marginBtn" onClick={this.getFilteredUsers} variant="contained" color="primary">Filter!</Button>
                    <Button onClick={this.getAllUsers} variant="contained" color="secondary">Remove filter</Button>
                    </div>
                    </div>
                    </AccordionDetails>
                    </Accordion>
                        <br/>

                <div className="cards">
                {this.state.users.map(user =>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        {user.userName}
                                    </Typography>
                                    <Typography variant="h5" component="h2">

                                    </Typography>
                                    <Typography color="textSecondary">
                                        {user.platform} ID: {user.platformID}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Wishlist: {user.wishlist}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                </CardActions>
                            </Card>
                )}
                </div>
            </div>
        );
    }
}

export default PeopleOverview;
