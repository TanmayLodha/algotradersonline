import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ height: "100vh" }}>
      <Grid container>
        <Grid item xs={6}>
          <Box
            component="img"
            src="guy12.png"
            alt="stocks"
            sx={{
              height: 500,
              pl: 10,
              pt: 12,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Box
            component="section"
            sx={{
              pt: 27,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Typography variant="h2" sx={{ fontSize: "2rem", fontWeight: 600 }}>
              Automate your trade with our algorithms
            </Typography>
            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
              Dive fearlessly into the world of trading with our end-to-end
              trading algos, empowering both amateurs and experts
            </Typography>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
              Suppoted Partners:
            </Typography>
            <Box
              component="img"
              src="aliceblue.png"
              alt="aliceblue"
              sx={{
                height: 80,
                width: 120,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
