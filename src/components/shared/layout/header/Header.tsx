import { useState } from "react";
import { useNavigate } from "react-router";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarNavigation from "./SidebarNavigation";
import { AppBar } from "../../Material";
import { AccountCircle } from "@mui/icons-material";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<number>(0);

  const navigate = useNavigate();

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LegalGuardAI
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => navigate("/profile")}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <SidebarNavigation
        open={open}
        setOpen={setOpen}
        mobileOpen={mobileOpen}
        selectedPage={selectedPage}
        setMobileOpen={setMobileOpen}
        setSelectedPage={setSelectedPage}
      />
    </>
  );
};

export default Header;