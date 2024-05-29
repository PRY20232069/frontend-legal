import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarNavigation from "./SidebarNavigation";
import { AppBar } from "../../Material";
import { useMediaQuery } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box } from "@mui/material";
import Logo from "../../../../assets/svgs/logo.svg";

const Header = () => {
  const [open, setOpen] = useState(true);
  const [tokenExist, setTokenExist] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery("(max-width:850px)");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setTokenExist(true);
    }
  }, []);

  const logoutIcon = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
    window.location.reload();
  };

  useEffect(() => {
    setOpen(isSmallScreen ? false : true);
  }, [isSmallScreen]);

  return (
    <Box>
      {/* {tokenExist && (
        <AppBar position="fixed" open={open} color="inherit">
          <Toolbar>
            {isSmallScreen && <img src={Logo} width={150} />}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            Cerrar sesión
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={logoutIcon}
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )} */}
      {tokenExist && (
        <SidebarNavigation
          open={open}
          setOpen={setOpen}
          isSmallScreen={isSmallScreen}
        />
      )}
    </Box>
  );
};

export default Header;
