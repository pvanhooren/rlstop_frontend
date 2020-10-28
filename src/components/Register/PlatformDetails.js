import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

export default function PlatformDetails() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Platform details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <RadioGroup id="platform" name="platform">
                        <FormControlLabel value="switch" control={<Radio id="switch" />} label="Nintendo Switch" />
                        <FormControlLabel value="playstation" control={<Radio id="playstation" />} label="PlayStation" />
                        <FormControlLabel value="xbox" control={<Radio id="xbox" />} label="XBox" />
                        <FormControlLabel value="pc" control={<Radio id="pc" />} label="PC" />
                    </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="platformID"
                        name="platformID"
                        label="Friend code / Platform username"
                        fullWidth
                        autoComplete="platformID"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}