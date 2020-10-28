import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import DeleteIcon from "@material-ui/icons/Delete";

import './Wishlist.css';

class inputField{
    id= "";
    name= "";
    label= "";
    deleteName= "";

    constructor(id, name, label, deleteName){
        this.id = id;
        this.name = name;
        this.label = label;
        this.deleteName= deleteName;
    }
}

class Wishlist extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            fields: []
        }
    }

    addField = () => {
        var field = new inputField("item" + (this.state.fields.length + 1), "item" + (this.state.fields.length + 1), "Item " + (this.state.fields.length + 1), "delete" + (this.state.fields.length + 1));
        var oldFields = this.state.fields;
        oldFields.push(field)
        this.setState({fields: oldFields})
    }

    deleteField = () =>{
        var oldFields = this.state.fields;
        if(oldFields.length > 1) {
            oldFields.length -= 1;
            this.setState({fields: oldFields})
        }
    }

    componentDidMount() {
        this.addField();
    }

    render() {
        const self = this;
        return (
            <React.Fragment>
                <Typography variant="h6">
                    Create wishlist
                </Typography>
                <Grid container spacing={3}>
                {this.state.fields.map(field=>(
                        <Grid item xs={12} sm={11}>
                            <div className="inline">
                            <TextField
                                required
                                id={field.id}
                                name={field.name}
                                label={field.label}
                                fullWidth
                                autoComplete={field.name}
                            />
                            <DeleteIcon id={field.deleteName} color="secondary" cursor="pointer" onClick={this.deleteField} />
                            </div>
                        </Grid>
                ))}
                    <Button variant="contained" color="primary" onClick={this.addField}>Add item</Button>
                </Grid>

            </React.Fragment>
        );
    }
}

export default Wishlist;