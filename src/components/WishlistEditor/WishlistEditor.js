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
            users: [],
            userId: 0,
            wishlist: []
        }
    }

    getWishlist = async () =>{
        await axios.get(baseUrl + "users/" + this.state.userId).then(
            result => {
                this.setState({wishlist:result.data.wishlist})
                console.log(this.state.wishlist);
            }
        )
    }

    selectUser = async() => {
        this.setState({ userId: document.getElementById("userSelect").value });
        await axios.get(baseUrl + "users/" + document.getElementById("userSelect").value).then(
            result => {
                this.setState({wishlist:result.data.wishlist})
                console.log(this.state.wishlist);
            }
        )
        document.getElementById("wishlistEditor").style.display = "block";
    }

    async deleteItem(item) {
        var r = window.confirm("Are you sure you want to delete this item?");

        if(r) {
            await axios.put(baseUrl + "users/" + this.state.userId + "/remove/" + item)
            await this.getWishlist();
        }
    }

    addItem = async () => {
        await axios.put(baseUrl + "users/" + this.state.userId + "/add/" + document.getElementById("newItem").value);
        await this.getWishlist();
    }

    clearWishlist = async () => {
        var r = window.confirm("Are you sure you want to clear your wishlist?");

        if(r) {
            await axios.put(baseUrl + "users/" + this.state.userId + "/clear");
            await this.getWishlist();
        }
    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers() {
        axios.get(baseUrl + "users/all").then(
            result => {
                    this.setState({users: result.data})
            }
        )
    }

    render(){
        return(
          <div>
              <div className="selectArea">
              <h2>Your wishlist</h2>
              <label>I am...</label>
              <select className="userSelect" id="userSelect" name="user">
                  {this.state.users.map(el => <option value={el.userId} key={el.userId}> {el.userName} </option>)}
              </select>
                  <Button onClick={this.selectUser} variant="contained" color="primary">Confirm</Button>
                <br/><br/>
              </div>
              <div className="AreaToMakeVisible" id="wishlistEditor">
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