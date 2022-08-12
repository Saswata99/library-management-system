import React from "react";
import bookImg1 from "../img/4.jpg";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

function Footer() {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        gap: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: theme.palette.grey[500],
        pl: 30,
        pr: 55,
        pt: 10,
        pb: 8,
      })}
    >
      <Box sx={{ display: "flex", gap: 3, flexDirection: "row" }}>
        <Box>
          <Typography variant="subtitle2">Made by</Typography>
          <Typography variant="h4">Saswata Bhunia</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2 }}>
            <LinkedInIcon fontSize="medium" />
            <GitHubIcon fontSize="medium" />
          </Box>
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem sc={{ mx: "1000px" }} />
      <Box>
        <Typography variant="h5" gutterBottom={true}>
          Made with
        </Typography>
        <List dense={true}>
          <Divider light />
          <ListItem>
            <ListItemText primary="React" />
          </ListItem>
          <Divider light />
          <ListItem>
            <ListItemText primary="Firebase" />
          </ListItem>
          <Divider light />
          <ListItem>
            <ListItemText primary="Material-UI" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default Footer;
