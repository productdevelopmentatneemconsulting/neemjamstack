import React from "react";
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CustomDropdown from "./customDropdown";
import Button from "@material-ui/core/Button";
import Header from "./header";
import navStyles from "./materialUI/navbarSectionStyle";
const useStyles = makeStyles(navStyles);

const Navbar = ({ navlinks }) => {
  const classes = useStyles();
  return (
    <Header
      brand="Platform Liberty"
      color="dark"
      rightLinks={
        <List className={classes.list}>
          {navlinks.edges.map(edge => {
            return edge.node.navItems.map(nav => {
              if (nav.navL2.length == 0) {
                return (
                  <ListItem key={nav.navL1.name} className={classes.listItem}>
                    <Button className={classes.navLink} onClick={e => e.preventDefault()}>
                      <Link style={{ color: "inherit", textDecoration: "none" }} to="home">
                        {nav.navL1.name}
                      </Link>
                    </Button>
                  </ListItem>
                );
              } else {
                return (
                  <ListItem className={classes.listItem}>
                    <CustomDropdown
                      buttonText={nav.navL1.name}
                      dropdownHeader={nav.navL1.name}
                      hoverColor="black"
                      buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                      }}
                      dropdownList={nav.navL2}
                    />
                  </ListItem>
                );
              }
            });
          })}
        </List>
      }
    />
  );
};

export default Navbar;
