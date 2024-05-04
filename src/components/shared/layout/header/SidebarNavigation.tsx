import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import UploadIcon from "@mui/icons-material/Upload";
import HistoryIcon from "@mui/icons-material/History";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import BarChartIcon from "@mui/icons-material/BarChart";
import { IconDrawer } from "../../../../interfaces/IIconDrawer";
import { useTheme } from "@mui/material/styles";
import {
  Box,
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
import { useLocation } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Logo from "../../../../assets/svgs/logo.svg";

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
      icon: <HomeIcon color="primary" />,
      link: "/",
    },
    {
      text: "Subir contrato",
      icon: <UploadIcon color="primary" />,
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
      icon: <AccountCircle color="primary" />,
      link: "/profile",
    },
  ];

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
          <img src={Logo} width={150} />
          {props.isSmallScreen && (
            <IconButton onClick={handleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          )}
        </DrawerHeader>
      </Paper>
      <Divider />
      <List>
        {iconos.map((element, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding={props.isSmallScreen}>
              <ListItemButton
                sx={{
                  backgroundColor: selectedPage === index ? "#E1F9F7" : "",
                }}
                onClick={() => {
                  handleLink(element.link, index);
                }}
              >
                <ListItemIcon>{element.icon}</ListItemIcon>
                <ListItemText
                  primary={element.text}
                  sx={{ color: "#193A32" }}
                />
              </ListItemButton>
            </ListItem>

            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default SidebarNavigation;
