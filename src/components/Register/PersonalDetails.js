import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function PersonalDetails(props) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Personal details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="emailAddress"
                        name="emailAddress"
                        label="Email address"
                        fullWidth
                        autoComplete="emailAddress"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="userName"
                        name="userName"
                        label="Username"
                        fullWidth
                        autoComplete="userName"
                        inputRef={props.userName}
                        onChange={test}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        autoComplete="password"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm password"
                        type="password"
                        fullWidth
                        autoComplete="confirmPassword"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}