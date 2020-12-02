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
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";

const baseUrl= "http://localhost:8080/";

class WishlistEditor extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            wishlist: [],
            item: "",
            index: 0
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

    showDeleteForm(item, index){
        this.setState({ item: item, index: index})
        document.getElementById("delete" + index).style.display = "block";
        document.getElementById("view" + index).style.display = "none";
    }

    cancelDelete = () => {
        document.getElementById("delete" + this.state.index).style.display = "none";
        document.getElementById("delete" + this.state.index).style.height = document.getElementById("view" + this.state.index).style.height
        document.getElementById("view" + this.state.index).style.display = "block";
    }

    deleteItem = async() => {
            await axios.put(baseUrl + "users/" + localStorage.getItem('userId') + "/remove/" + this.state.item, null ,{
                headers: {
                    withCredentials: true,
                    authorization: 'Basic ' + localStorage.getItem("creds")
                }}
                ).catch((e) => {
                    alert("Something went wrong deleting this item. Please try again!")
                })

            await this.getWishlist();
    }

    addItem = async () => {
        await axios.put(baseUrl + "users/" + localStorage.getItem('userId') + "/add/" + document.getElementById("newItem").value, null,{
            headers: {
                withCredentials: true,
                authorization: 'Basic ' + localStorage.getItem("creds")
            }}).catch((e) => {
                alert("Something went wrong adding this item. Please try again!")
        })

        await this.getWishlist();
    }

    clearWishlist = async () => {
        var r = window.confirm("Are you sure you want to clear your wishlist?");

        if(r) {
            await axios.put(baseUrl + "users/" + localStorage.getItem('userId') + "/clear", null, {
                headers: {
                    withCredentials: true,
                    authorization: 'Basic ' + localStorage.getItem("creds")
                }}).catch((e) => {
                    alert("Something went wrong clearing this wishlist. Please try again!")
                });

            await this.getWishlist();
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

                  {this.state.wishlist.map((item, index) =>
                      <Card className="itemCard" variant="outlined">
                          <CardContent>
                      <div>
                        <div id={"view" + index}>
                              <div className="cardText">
                                  <Typography color="textSecondary" gutterBottom>
                                      Item {index + 1}
                                  </Typography>
                                  <Typography variant="h5" component="h2">
                                      {item}
                                  </Typography>
                              </div>
                              <div className="icons">
                                  {/*<Button variant="contained" color="primary" onClick={() => this.showEditForm(trade)}>Edit</Button>*/}
                                  {/*<Button variant="contained" color="secondary" onClick={() => this.deleteTrade(trade.postId)}>Delete</Button>*/}

                                  <DeleteIcon className="icon2" color="secondary" fontSize="large" cursor="pointer" onClick={() => this.showDeleteForm(item, index)} />
                              </div>
                        </div>

                        <div className="deleteForm" id={"delete" + index}>
                              <div className="deleteText">
                                  <Typography color="textSecondary" gutterBottom>
                                      Are you sure you want to delete this item?
                                  </Typography>
                                  <Typography variant="h5" component="h2">
                                      {item}
                                  </Typography>
                              </div>
                              <div className="icons">
                                  <ClearIcon color="secondary" fontSize="large" cursor="pointer" className="icon2" onClick={this.cancelDelete}/>
                                  <CheckIcon color="primary" fontSize="large" cursor="pointer" className="icon1" onClick={this.deleteItem}/>
                              </div>
                        </div>
                      </div>
                          </CardContent>
                      </Card>
                      )}
              </div>
          </div>
        );
    }
}

export default WishlistEditor;