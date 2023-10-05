import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarNavigation from "./SidebarNavigation";
import { AppBar } from "../Material";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<number>(0);

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
