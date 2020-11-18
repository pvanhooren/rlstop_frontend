import React from "react";
import axios from 'axios';

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

import "../Overview.css";
import "../userSelection.css";

const baseUrl= "http://localhost:8080/";

class WishlistEditor extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            wishlist: []
        }
    }

    getWishlist(){
        if(localStorage.getItem("userId") != null) {
            axios.get(baseUrl + "users/" + localStorage.getItem('userId'), {
                headers: {
                    withCredentials: true,
                    authorization: 'Basic ' + localStorage.getItem("creds")
                }
            }).then(
                result => {
                    this.setState({wishlist: result.data.wishlist})
                    console.log(this.state.wishlist);
                }).catch((e) => {
                    this.props.history.push("/me/login");
                })
        } else {
            this.props.history.push("/me/login");
        }
    }

    async deleteItem(item) {
        var r = window.confirm("Are you sure you want to delete this item?");

        if(r) {
            await axios.put(baseUrl + "users/" + localStorage.getItem('userId') + "/remove/" + item, {
                headers: {
                    withCredentials: true,
                    authorization: 'Basic ' + localStorage.getItem("creds")
                }}).then( await this.getWishlist() )
                .catch((e) => {
                    alert("Something went wrong deleting this item. Please try again!")
                })
        }
    }

    addItem = async () => {
        await axios.put(baseUrl + "users/" + this.state.userId + "/add/" + document.getElementById("newItem").value, {
            headers: {
                withCredentials: true,
                authorization: 'Basic ' + localStorage.getItem("creds")
            }}).then( await this.getWishlist() )
            .catch((e) => {
                alert("Something went wrong adding this item. Please try again!")
        })
    }

    clearWishlist = async () => {
        var r = window.confirm("Are you sure you want to clear your wishlist?");

        if(r) {
            await axios.put(baseUrl + "users/" + this.state.userId + "/clear", {
                headers: {
                    withCredentials: true,
                    authorization: 'Basic ' + localStorage.getItem("creds")
                }}).then(await this.getWishlist() )
                .catch((e) => {
                    alert("Something went wrong clearing this wishlist. Please try again!")
                });

        }
    }

    componentDidMount() {
        this.getWishlist();
    }

    render(){
        return(
          <div>
              <div className="mainArea" id="wishlistEditor">
                  <h2 className="title">Your wishlist</h2>
                  <TextField className="input" id="newItem" label="New wishlist item"></TextField><br/><br/>
                  <div className="btnGroup">
                      <br/>
                      <Button className="marginBtn" onClick={this.addItem} variant="contained" color="primary">Add to wishlist</Button>
                      <Button onClick={this.clearWishlist} variant="contained" color="secondary">Clear wishlist</Button>
                  </div>
                  <br/><br/>
                  {this.state.wishlist.map(item =>
                      <Card variant="outlined">
                          <CardContent>
                              <div className="cardText">
                                  <Typography variant="h5" component="h2">
                                      {item}
                                  </Typography>
                              </div>
                              <div className="icons">
                                  {/*<Button variant="contained" color="primary" onClick={() => this.showEditForm(trade)}>Edit</Button>*/}
                                  {/*<Button variant="contained" color="secondary" onClick={() => this.deleteTrade(trade.postId)}>Delete</Button>*/}

                                  <DeleteIcon className="icon2" color="secondary" fontSize="large" cursor="pointer" onClick={() => this.deleteItem(item)} />
                              </div>

                          </CardContent>
                          {/*<CardActions>*/}

                          {/*</CardActions>*/}
                      </Card>
                  )}
              </div>
          </div>
        );
    }
}

export default WishlistEditor;