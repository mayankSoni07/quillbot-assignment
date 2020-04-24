import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import './index.css';

import { EXCLUSIVE_VALUE, SEE_ALL_VALUE } from '../../Utilities/commonConstants';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    /** Predefined handle change */
    // setValue(newValue);
    
    /** Custom changes */
    props.changeCurrentTab(newValue, ()=>{
      if(newValue !== EXCLUSIVE_VALUE && newValue !== SEE_ALL_VALUE){
        /* Scroll to specific category */
        document.getElementById(newValue).scrollIntoView();
      } else if( newValue === EXCLUSIVE_VALUE || newValue === SEE_ALL_VALUE){
        document.getElementById("parent-container").scrollIntoView();
      }
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          orientation="vertical"
          value={props.currentTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          {props.productsData.map((item)=>{
            return <Tab 
              key={item.category}
              label={<span className="restaurants-label">{item.restaurantList.length + " Restaurants"}</span>} 
              icon={<span className="category-name" >{item.category.toUpperCase()}</span>} 
              value={item.category}
            />
          })}
          <Tab 
            label={<span className="restaurants-label">{props.exclusiveRestaurantsLength + " Restaurants"}</span>} 
            icon={<span className="category-name" >{"Only on Swiggy".toUpperCase()}</span>} 
            value={EXCLUSIVE_VALUE}
          />
          <Tab 
            label={<span className="restaurants-label">{props.allProductsRestaurantsLength + " Restaurants"}</span>} 
            icon={<span className="category-name" >{"See All".toUpperCase()}</span>} 
            value={SEE_ALL_VALUE}
          />
        </Tabs>
      </AppBar>
    </div>
  );
}
