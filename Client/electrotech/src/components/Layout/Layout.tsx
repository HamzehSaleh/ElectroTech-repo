import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import LocalAtmOutlinedIcon from "@material-ui/icons/LocalAtmOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import AppsIcon from "@material-ui/icons/Apps";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../layout.css";
import Spinner from "../Spinner";
import { reactElementProps } from "../../types";

import useStyles from "./styles";

const Layout: React.FC<reactElementProps> = ({ children }) => {
  const classes = useStyles();

  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const { cartItems, loading } = useSelector((state: any) => state.rootReducer);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigate = (path: string) => () => navigate(path);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            ElectroTech
          </Typography>
        </Toolbar>
        <div className="cart-itmes" onClick={handleNavigate("/cart")}>
          <ShoppingCartOutlinedIcon />
          <span className="cart-badge"> {cartItems.length}</span>
        </div>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem key={1} button onClick={handleNavigate("/")}>
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>

          <ListItem key={2} button onClick={handleNavigate("/products")}>
            <ListItemIcon>
              <AppsIcon />
            </ListItemIcon>
            <ListItemText>Products</ListItemText>
          </ListItem>

          <ListItem key={3} button onClick={handleNavigate("/bills")}>
            <ListItemIcon>
              <LocalAtmOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Bills</ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key={5} button onClick={handleNavigate("/products")}>
            <ListItemIcon>
              <ExitToAppOutlinedIcon />
            </ListItemIcon>
            <ListItemText>LogOut</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {loading && <Spinner />}
        {children}
      </main>
    </div>
  );
};

export default Layout;
