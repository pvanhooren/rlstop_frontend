import React from "react";
import Button from "@material-ui/core/Button"
import {withRouter} from "react-router-dom";

class NotFound extends React.Component{

    render() {
        return(
        <div style={{textAlign: 'center'}}>
            <h1>Whoops! Seems you are lost....</h1>
            <Button color="primary" variant="contained" href="/">
                Return Home
            </Button>
        </div>
        );
    }
}

export default NotFound;