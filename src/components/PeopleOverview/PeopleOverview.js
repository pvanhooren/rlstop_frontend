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

import AuthenticationService from '../../services/AuthenticationService';
import '../Overview.css';
import FilterListIcon from "@material-ui/icons/FilterList";

const baseUrl = "http://localhost:8080/";

class PeopleOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    getAllUsers = () => {
            axios.get(baseUrl + "users/all", {
                headers: {
                    withCredentials: true,
                    authorization: 'Bearer ' + localStorage.getItem("token")
                }
            }).then(
                result => {
                    this.setState({users: result.data})
                }).catch((e) => {
                    if(e.response != null) {
                        document.getElementById('serverError').style.display = 'block';
                    } else {
                        AuthenticationService.logOut(this.props.history)
                    }
            });
    }

    getFilteredUsers = () => {
        const self = this;
        if (document.getElementById("switch").checked) {
            axios.get(baseUrl + "users/filter?platform=NINTENDOSWITCH", {
                headers: {
                    withCredentials: true,
                    authorization: 'Bearer ' + localStorage.getItem("token")
                }
            }).then(
                result => {
                    self.setState({users: result.data});
                }).catch((e) => {
                    if (e.response == null) {
                        document.getElementById('serverError').style.display = 'block';
                    } else {
                        self.setState({trades: []})
                    }
                }
            )
        } else if (document.getElementById("playstation").checked) {
            axios.get(baseUrl + "users/filter?platform=PLAYSTATION", {
                headers: {
                    withCredentials: true,
                    authorization: 'Bearer ' + localStorage.getItem("token")
                }
            }).then(
                result => {
                    self.setState({users: result.data});
                }).catch((e) => {
                    if (e.response == null) {
                        document.getElementById('serverError').style.display = 'block';
                    } else {
                        self.setState({trades: []})
                    }
                }
            )
        } else if (document.getElementById("xbox").checked) {
            axios.get(baseUrl + "users/filter?platform=XBOX", {
                headers: {
                    withCredentials: true,
                    authorization: 'Bearer ' + localStorage.getItem("token")
                }
            }).then(
                result => {
                    self.setState({users: result.data});
                }).catch((e) => {
                    if (e.response == null) {
                        document.getElementById('serverError').style.display = 'block';
                    } else {
                        self.setState({trades: []})
                    }
                }
            )
        } else if (document.getElementById("pc").checked) {
            axios.get(baseUrl + "users/filter?platform=PC", {
                headers: {
                    withCredentials: true,
                    authorization: 'Bearer ' + localStorage.getItem("token")
                }
            }).then(
                result => {
                    self.setState({users: result.data});
                }).catch((e) => {
                    if (e.response == null) {
                        document.getElementById('serverError').style.display = 'block';
                    } else {
                        self.setState({trades: []})
                    }
                }
            )
        } else {
            this.getAllUsers();
        }
    }

    componentDidMount() {
        if (AuthenticationService.isLoggedIn()) {
            this.getAllUsers();
        } else {
            this.props.history.push("/me/login")
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
                                <Button className="marginBtn" onClick={this.getFilteredUsers} variant="contained"
                                        color="primary">Filter!</Button>
                                <Button onClick={this.getAllUsers} variant="contained" color="secondary">Remove
                                    filter</Button>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <br/>

                <div className="serverError" id="serverError">
                    It looks like something went wrong on our end, our apologies for the inconvenience. Please try
                    again later!
                </div>

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
                                    Wishlist: {user.wishlist.toString()}
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
