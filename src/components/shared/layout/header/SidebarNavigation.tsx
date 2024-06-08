import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import HistoryIcon from "@mui/icons-material/History";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import { IconDrawer } from "../../../../interfaces/IIconDrawer";
import { useTheme } from "@mui/material/styles";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { Drawer, DrawerHeader } from "../../Material";
import { Link, useLocation } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Logo from "../../../../assets/svgs/logo.svg";
import LogoutIcon from "@mui/icons-material/Logout";

interface ISidebarNavigation {
  open: boolean;
  setOpen: (state: boolean) => void;
  isSmallScreen: boolean;
}

const SidebarNavigation: React.FC<ISidebarNavigation> = (props) => {
  const [selectedPage, setSelectedPage] = useState<number>(-1);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLink = (url: string, n: number) => {
    setSelectedPage(n);
    navigate(url);
  };

  const handleDrawer = () => {
    props.setOpen(!props.open);
  };

  const iconos: IconDrawer[] = [
    {
      text: "Inicio",
      icon: <HomeOutlinedIcon color="primary" />,
      link: "/",
    },
    {
      text: "Subir contrato",
      icon: <FileUploadOutlinedIcon color="primary" />,
      link: "/upload-contract",
    },
    {
      text: "Historial",
      icon: <HistoryIcon color="primary" />,
      link: "/history",
    },
    {
      text: "Favoritos",
      icon: <StarOutlineIcon color="primary" />,
      link: "/favorites",
    },
    {
      text: "Ranking",
      icon: <BarChartIcon color="primary" />,
      link: "/ranking",
    },
    {
      text: "Mi perfil",
      icon: <AccountCircleOutlinedIcon color="primary" />,
      link: "/profile",
    },
  ];

  const logoutIcon = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
    window.location.reload();
  };

  useEffect(() => {
    const currentPath = location.pathname;

    const reversedIconos = [...iconos].reverse();
    const selectedIndex = reversedIconos.findIndex((icono) =>
      currentPath.includes(icono.link)
    );

    if (selectedIndex !== -1) {
      const originalIndex = iconos.length - 1 - selectedIndex;
      setSelectedPage(originalIndex);
    }
  }, [location.pathname]);

  return (
    <Drawer variant="permanent" open={props.open}>
      <Paper elevation={0}>
        <DrawerHeader sx={{ justifyContent: "center" }}>
          <Link to="/">
            <img src={Logo} width={190} style={{ margin: "15  px 0" }} />
          </Link>
          {props.isSmallScreen && (
            <IconButton onClick={handleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          )}
        </DrawerHeader>
      </Paper>
      <Divider />
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {iconos.map((element, index) => (
          <ListItem key={index} disablePadding={props.isSmallScreen}>
            <ListItemButton
              sx={{
                backgroundColor: selectedPage === index ? "#E1F9F7" : "",
              }}
              onClick={() => {
                handleLink(element.link, index);
              }}
            >
              <ListItemIcon>{element.icon}</ListItemIcon>
              <ListItemText primary={element.text} sx={{ color: "#193A32" }} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem
          disablePadding={props.isSmallScreen}
          sx={{ marginTop: "auto" }}
        >
          <ListItemButton onClick={logoutIcon}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesión" sx={{ color: "#193A32" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SidebarNavigation;
