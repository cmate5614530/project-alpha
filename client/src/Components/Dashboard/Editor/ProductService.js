import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProductpopUp from "./ProductpopUp";
import ServicepopUp from "./ServicepopUp";
import FatchService from "./FatchService";
import FatchProducts from "./FatchProduct";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));



export default function ProductService() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [products, setProducts] = React.useState([]);
  const [services, setServices] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    fetchProductsHandler();
    fetchServicesHandler();
  }, []);

  const fetchProductsHandler = () => {
    fetch(`/product`)
      .then(res => res.json())
      .then(res => {
        setProducts(res.result);
      })
      .catch(error => {
        console.log("Please check your internet connection..!", error);
      });
  };

  const fetchServicesHandler = () => {
    fetch(`/service`)
      .then(res => res.json())
      .then(res => {
        setServices(res.result)
      })
      .catch(error => {
        console.log("Please check your internet connection..!", error);
      });
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          zIndex: "0",
          color: "#0dc835",
          width: "32%",
          margin: "auto",
          background: "transparent",
          marginTop: "3%",
          boxShadow: "none"
        }}
      >
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="nav tabs example"
          id="textcolor"
          variant="scrollable"
          scrollButtons="auto"
        >
          <LinkTab label="Product" {...a11yProps(0)} />
          <LinkTab label="Services" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ProductpopUp products={products} fetchProductsHandler={fetchProductsHandler} />
        <FatchProducts products={products} fetchProductsHandler={fetchProductsHandler} />

      </TabPanel>
      <TabPanel value={value} index={1}>
        <ServicepopUp services={services} fetchServicesHandler={fetchServicesHandler} />
        <FatchService services={services} fetchServicesHandler={fetchServicesHandler} />
      </TabPanel>

    </div>
  );
}
