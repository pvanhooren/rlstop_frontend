import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

import "../Overview.css";
import "../userSelection.css";

class WishlistEditor extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            userId: 0,
            wishlist: []
        }
    }

    selectUser = () => {
        this.setState({ userId: document.getElementById("userSelect").value });
        fetch("http://localhost:8080/users/" + document.getElementById("userSelect").value).then(rse => rse.json()).then(
            result => {
                this.setState({wishlist:result.wishlist})
                console.log(this.state.wishlist);
            }
        )
        document.getElementById("wishlistEditor").style.display = "block";
    }

    deleteItem(item){
        fetch("http://localhost:8080/users/" + this.state.userId + "/remove/" + item, {method: 'PUT'})
        window.location.reload(false);
    }

    addItem = () => {
        fetch("http://localhost:8080/users/" + this.state.userId + "/add/" + document.getElementById("newItem").value, {method:'PUT'});
        window.location.reload(false);
    }

    clearWishlist = () =>{
        fetch("http://localhost:8080/users/" + this.state.userId + "/clear", {method: 'PUT'});
        window.location.reload(false);
    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers() {
        fetch("http://localhost:8080/users/all").then(rse => rse.json()).then(
            result => {
                this.setState({users: result})
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