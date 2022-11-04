import {
  Button,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import "./City.css";

const City = ({ setCity, getWeather, error, favorites }) => {
  const handleChange = event => {
    setCity(event.target.value);
  };

  const clickOnFavorite = favoriteCity => {
    setCity(favoriteCity);
    getWeather(favoriteCity);
  };

  const favoriteList = {
    margin: "40px",
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Grid item style={{ padding: "20px 20px" }}>
        <Typography variant="h5">Weather Report</Typography>
      </Grid>
      <Grid
        item
        style={{
          border: "2px solid gray",
          padding: "20px 20px",
          borderRadius: "4px",
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <TextField
            error={error}
            variant="outlined"
            label="City"
            fullWidth
            style={{ marginBottom: "2em" }}
            onChange={event => handleChange(event)}
            helperText={error ? "Invalid city" : ""}
          />
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => getWeather()}
          >
            Get Report
          </Button>
        </Grid>
      </Grid>
      {favorites.length ? (
        <List
          sx={{ width: "100%", maxWidth: 360 }}
          subheader={<div className="listHeader">Favorites</div>}
          classes={{ root: favoriteList }}
        >
          {favorites.map(favoriteCity => {
            return (
              <ListItemButton
                key={favoriteCity}
                onClick={() => clickOnFavorite(favoriteCity)}
                style={{ backgroundColor: "#C0C0C0", margin: "2px" }}
              >
                <ListItemText primary={favoriteCity} />
              </ListItemButton>
            );
          })}
        </List>
      ) : null}
    </Grid>
  );
};

export default City;
