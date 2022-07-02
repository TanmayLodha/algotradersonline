import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import { Box, Typography, Avatar, Button } from "@mui/material";

// https://avatars.dicebear.com/api/:sprites/:seed.svg

function Profile() {
  const { user } = useContext(UserContext);
  const current = JSON.parse(user);

  return (
    <Box sx={{ width: "25vw", p: 2, transition: " all .15s ease-in-out" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          m: 5,
        }}>
        <Box
          component="img"
          src={`https://avatars.dicebear.com/api/avataaars/${current.data.username}.svg`}
          alt="profile"
          sx={{
            height: "100px",
            width: "100px",
            backgroundColor: "black",
            borderRadius: 50,
            boxShadow: "1px 0px 20px 10px rgba(0,0,0,0.1)",
          }}
        />
        {/* <Avatar
          sx={{
            height: "100px",
            width: "100px",
          }}
        /> */}
      </Box>
      <Typography
        variant="h1"
        sx={{ fontSize: "2.5rem", fontWeight: 600, ml: 2 }}>
        {current.data.username}
      </Typography>
      <Typography
        variant="h1"
        style={{ wordWrap: "break-word" }}
        sx={{
          fontSize: "1.5rem",
          fontWeight: 500,
          mt: 1,
          ml: 2,
        }}>
        {current.data.email}
      </Typography>
      <Typography
        variant="h1"
        sx={{
          fontSize: "1rem",
          fontWeight: 500,
          mt: 5,
          ml: 2,
          display: "inline-block",
        }}>
        AliceblueID:
      </Typography>
      <Typography
        variant="h1"
        sx={{
          fontSize: "1.3rem",
          fontWeight: 600,
          ml: 1,
          display: "inline-block",
        }}>
        {current.data.aliceBlueID}
      </Typography>
      <Button type="submit" variant="contained" sx={{ mt: 5, width: "100%" }}>
        Change Password
      </Button>
    </Box>
  );
}

export default Profile;
