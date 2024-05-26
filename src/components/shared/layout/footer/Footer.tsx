import { Box, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [tokenExist, setTokenExist] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setTokenExist(true);
    }
  }, []);
  return (
    <>
      {!tokenExist && (
        <Box>
          <Divider sx={{ mb: 1 }} />
          <Box
            component="main"
            sx={{
              width: "100%",
              height: "5vh",
              px: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Link
                  to="/privacy"
                  className="link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{ textDecoration: "none", fontWeight: 600 }}
                  >
                    Privacy
                  </Typography>
                </Link>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  textAlign: "end",
                }}
              >
                <Link
                  to="/terms"
                  className="link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{
                      textDecoration: "none",
                      fontWeight: 600,
                      display: "inline",
                      mr: 3,
                    }}
                  >
                    Terms
                  </Typography>
                </Link>
                <a
                  href="https://api.whatsapp.com/send?phone=51990998136&text=Hola%20necesito%20asistencia%20con%20la%20plataforma%2C%20mi%20nombre%20es%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{
                      fontWeight: 600,
                      display: "inline",
                    }}
                  >
                    Get help
                  </Typography>
                </a>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Footer;
