import React from "react";
import { useNavigate } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BarChartIcon from "@mui/icons-material/BarChart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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
} from "@mui/material";
import { Drawer, DrawerHeader } from "../../Material";

interface ISidebarNavigation {
  open: boolean;
  setOpen: (state: boolean) => void;
  selectedPage: number;
  setSelectedPage: (state: number) => void;
  mobileOpen: boolean;
  setMobileOpen: (state: boolean) => void;
}

const SidebarNavigation: React.FC<ISidebarNavigation> = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLink = (url: string, n: number) => {
    props.setSelectedPage(n);
    navigate(url);
  };

  const handleDrawer = () => {
    props.setOpen(!props.open);
  };

  const iconos: IconDrawer[] = [
    {
      text: "Inicio",
      icon: <HomeIcon />,
      link: "/",
    },
    {
      text: "Analizar documento",
      icon: <TroubleshootIcon />,
      link: "/document-analyzer",
    },
    {
      text: "Historial",
      icon: <WorkHistoryIcon />,
      link: "/history",
    },
    {
      text: "Favoritos",
      icon: <FavoriteIcon />,
      link: "/favorites",
    },
    {
      text: "Ranking",
      icon: <BarChartIcon />,
      link: "/ranking",
    },
  ];

  return (
    <Drawer variant="permanent" open={props.open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawer}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <Divider />
      <List>
        {iconos.map((element, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor: props.selectedPage === index ? "grey" : "",
                }}
                onClick={() => handleLink(element.link, index)}
              >
                <ListItemIcon>{element.icon}</ListItemIcon>
                <ListItemText primary={element.text} />
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
