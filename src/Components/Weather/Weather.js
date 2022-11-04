import AirIcon from "@mui/icons-material/Air";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { WEATHER_CODES } from "../../Constants/WeatherInterpretationCodes";
import "./Weather.css";

const Weather = ({
  weather,
  city,
  goBack,
  favorites,
  addOrRemoveFavorites,
}) => {
  const { current_weather } = weather.data;
  const isFavorite = favorites.includes(city.toLowerCase());
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Box sx={{ width: "20%", padding: "20px" }}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <button onClick={goBack} className="backButton">
              <ArrowBackRoundedIcon />
            </button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              {city}
              {isFavorite ? (
                <StarIcon onClick={addOrRemoveFavorites} />
              ) : (
                <StarBorderIcon onClick={addOrRemoveFavorites} />
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <DeviceThermostatIcon />
            <span className="Temperature">
              {current_weather.temperature}&deg;
            </span>
            C
            <div className="WeatherCode">
              {WEATHER_CODES[current_weather.weathercode]}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <List
                sx={{
                  width: "75%",
                  maxWidth: 360,
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AirIcon color="primary" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Wind Direction"
                    secondary={
                      <span>{current_weather.winddirection}&deg;</span>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <SpeedRoundedIcon color="primary" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Wind Speed"
                    secondary={current_weather.windspeed + " Km/h"}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Weather;
