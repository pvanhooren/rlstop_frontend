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
import GavelIcon from '@material-ui/icons/Gavel';

import AuthenticationService from '../../services/AuthenticationService';
import '../Overview.css';
import FilterListIcon from "@material-ui/icons/FilterList";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";

var headers = {};
const baseUrl = AuthenticationService.baseUrl;

class PeopleOverview extends React.Component {
    constructor(props) {
        super(props);

        headers = AuthenticationService.getHeaders();

        this.state = {
            busy: false,
            users: [],
            userId: 0,
        }
    }

    getAllUsers = () => {
        axios.get(baseUrl + "users/all", {
                headers: headers
            }
        ).then(
            result => {
                this.setState({users: result.data})
            }).catch((e) => {
            if (e.response != null) {
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
                    headers: headers
                }
            ).then(
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
                    headers: headers
                }
            ).then(
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
                    headers: headers
                }
            ).then(
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
                    headers: headers
                }
            ).then(
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

    showBanForm(userId) {
        if (!this.state.busy) {
            this.setState({userId: userId, busy: true})
            document.getElementById("view" + userId).style.display = "none";
            document.getElementById("ban" + userId).style.display = "block";
        }
    }

    showRevokeForm(userId) {
        if (!this.state.busy) {
            this.setState({userId: userId, busy: true})
            document.getElementById("view" + userId).style.display = "none";
            document.getElementById("revoke" + userId).style.display = "block";
        }
    }

    showAdminForm(userId) {
        if (!this.state.busy) {
            this.setState({userId: userId, busy: true})
            document.getElementById("view" + userId).style.display = "none";
            document.getElementById("admin" + userId).style.display = "block";
        }
    }

    showRemoveForm(userId) {
        if (!this.state.busy) {
            this.setState({userId: userId, busy: true})
            document.getElementById("view" + userId).style.display = "none";
            document.getElementById("remove" + userId).style.display = "block";
        }
    }

    banUser = async () => {
        await axios.put(baseUrl + "users/admin/" + this.state.userId + "/deactivate", null, {
                headers: headers
            }
        ).then(() => {
                this.setState({busy: false})
            }
        ).catch((e) => {
            document.getElementById('serverError').style.display = 'block';
        })

        await this.getAllUsers();

        document.getElementById("ban" + this.state.userId).style.display = "none";
        document.getElementById("view" + this.state.userId).style.display = "block";
    }

    revokeBan = async () => {
        await axios.put(baseUrl + "users/admin/" + this.state.userId + "/activate", null, {
                headers: headers
            }
        ).then(() => {
                this.setState({busy: false})
            }
        ).catch((e) => {
            document.getElementById('serverError').style.display = 'block';
        })

        await this.getAllUsers();

        document.getElementById("revoke" + this.state.userId).style.display = "none";
        document.getElementById("view" + this.state.userId).style.display = "block";
    }

    makeAdmin = async () => {
        await axios.put(baseUrl + "users/admin/" + this.state.userId + "/grant", null, {
                headers: headers
            }
        ).then(() => {
                this.setState({busy: false})
            }
        ).catch((e) => {
            document.getElementById('serverError').style.display = 'block';
        })

        await this.getAllUsers();

        document.getElementById("admin" + this.state.userId).style.display = "none";
        document.getElementById("view" + this.state.userId).style.display = "block";
    }

    removeAdmin = async () => {
        await axios.put(baseUrl + "users/admin/" + this.state.userId + "/remove", null, {
                headers: headers
            }
        ).then(() => {
                this.setState({busy: false})
            }
        ).catch((e) => {
            document.getElementById('serverError').style.display = 'block';
        })

        await this.getAllUsers();

        document.getElementById("remove" + this.state.userId).style.display = "none";
        document.getElementById("view" + this.state.userId).style.display = "block";
    }

    cancelBan = () => {
        this.setState({busy: false})
        document.getElementById("ban" + this.state.userId).style.display = "none";
        document.getElementById("view" + this.state.userId).style.display = "block";
    }

    cancelRevoke = () => {
        this.setState({busy: false})
        document.getElementById("revoke" + this.state.userId).style.display = "none";
        document.getElementById("view" + this.state.userId).style.display = "block";
    }

    cancelRemove = () => {
        this.setState({busy: false})
        document.getElementById("remove" + this.state.userId).style.display = "none";
        document.getElementById("view" + this.state.userId).style.display = "block";
    }

    cancelAdmin = () => {
        this.setState({busy: false})
        document.getElementById("admin" + this.state.userId).style.display = "none";
        document.getElementById("view" + this.state.userId).style.display = "block";
    }

    componentDidMount() {
        var cont = true;
        if (AuthenticationService.isLoggedIn()) {
            if(localStorage.getItem('adminCode') != AuthenticationService.adminCode){
                cont = false;
                this.props.history.push("/404")
            }

            if(cont){this.getAllUsers();}
        } else if(cont){
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
                    Something went wrong connecting to our server, our apologies for the inconvenience. Please refresh and try
                    again!
                </div>

                <div className="cards">
                    {this.state.users.map(user =>
                        <Card key={user.userId} variant="outlined">
                            <CardContent>
                                <div>
                                    <div className="" id={"view" + user.userId}>
                                        <div className="cardText">
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
                                        </div>
                                        <div className="icons">
                                            {localStorage.getItem('userId') != user.userId ? (
                                                <div>
                                                    {user.active ? (
                                                        <GavelIcon className="icon2"
                                                                   color={this.state.busy ? "disabled" : "secondary"}
                                                                   fontSize="large" cursor="pointer"
                                                                   onClick={() => this.showBanForm(user.userId)}/>
                                                    ) : (
                                                        <GavelIcon className="icon2"
                                                                   color={this.state.busy ? "disabled" : "primary"}
                                                                   fontSize="large" cursor="pointer"
                                                                   onClick={() => this.showRevokeForm(user.userId)}/>
                                                    )}

                                                    {user.admin ? (
                                                        <Button className="marginBtn" variant="contained"
                                                                color="secondary"
                                                                disabled={this.state.busy}
                                                                onClick={() => this.showRemoveForm(user.userId)}>Remove
                                                            admin</Button>
                                                    ) : (
                                                        <Button className="marginBtn" variant="contained"
                                                                color="primary"
                                                                disabled={this.state.busy}
                                                                onClick={() => this.showAdminForm(user.userId)}>Make
                                                            admin</Button>
                                                    )

                                                    }
                                                </div>
                                            ) : (
                                                <div className="greenText">This is you!</div>
                                            )
                                            }

                                        </div>
                                    </div>

                                    <div className="deleteForm" id={"ban" + user.userId}>
                                        <div className="deleteText">
                                            <Typography color="textSecondary" gutterBottom>
                                                Are you sure you want to ban this user?
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                Username: {user.userName} -
                                                {user.platform} ID : {user.platformID}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                This user's trades will be made invisible until the ban is revoked.
                                            </Typography>
                                        </div>
                                        <div className="icons">
                                            <ClearIcon color="secondary" fontSize="large" cursor="pointer"
                                                       className="icon2"
                                                       onClick={this.cancelBan}/>
                                            <CheckIcon color="primary" fontSize="large" cursor="pointer"
                                                       className="icon1"
                                                       onClick={this.banUser}/>
                                        </div>
                                    </div>
                                    <div className="deleteForm" id={"revoke" + user.userId}>
                                        <div className="deleteText">
                                            <Typography color="textSecondary" gutterBottom>
                                                Are you sure you want to revoke the ban on this user?
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                Username: {user.userName} -
                                                {user.platform} ID : {user.platformID}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                This user's trades will be made visible again.
                                            </Typography>
                                        </div>
                                        <div className="icons">
                                            <ClearIcon color="secondary" fontSize="large" cursor="pointer"
                                                       className="icon2"
                                                       onClick={this.cancelRevoke}/>
                                            <CheckIcon color="primary" fontSize="large" cursor="pointer"
                                                       className="icon1"
                                                       onClick={this.revokeBan}/>
                                        </div>
                                    </div>
                                    <div className="deleteForm" id={"admin" + user.userId}>
                                        <div className="deleteText">
                                            <Typography color="textSecondary" gutterBottom>
                                                Are you sure you want to make this user an admin?
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                Username: {user.userName} -
                                                {user.platform} ID : {user.platformID}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                Make sure this person is trusted, they might remove your rights.
                                            </Typography>
                                        </div>
                                        <div className="icons">
                                            <ClearIcon color="secondary" fontSize="large" cursor="pointer"
                                                       className="icon2"
                                                       onClick={this.cancelAdmin}/>
                                            <CheckIcon color="primary" fontSize="large" cursor="pointer"
                                                       className="icon1"
                                                       onClick={this.makeAdmin}/>
                                        </div>
                                    </div>
                                    <div className="deleteForm" id={"remove" + user.userId}>
                                        <div className="deleteText">
                                            <Typography color="textSecondary" gutterBottom>
                                                Are you sure you want to remove this user's admin rights?
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                Username: {user.userName} -
                                                {user.platform} ID : {user.platformID}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                This user will not be able to perform admin actions anymore.
                                            </Typography>
                                        </div>
                                        <div className="icons">
                                            <ClearIcon color="secondary" fontSize="large" cursor="pointer"
                                                       className="icon2"
                                                       onClick={this.cancelRemove}/>
                                            <CheckIcon color="primary" fontSize="large" cursor="pointer"
                                                       className="icon1"
                                                       onClick={this.removeAdmin}/>
                                        </div>
                                    </div>
                                </div>
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
