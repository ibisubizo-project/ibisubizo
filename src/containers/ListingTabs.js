import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Listing from './Listing'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 0}}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListingTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  console.log(props)

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Trending" />
          <Tab label="Latest" />
          <Tab label="Mine" />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer><Listing problems={props.trendingProblems} /></TabContainer>}
      {value === 1 && <TabContainer>{<Listing problems={props.latestProblems} />}</TabContainer>}
      {value === 2 && <TabContainer><Listing problems={props.userProblems} personalListings={true} /></TabContainer>}
    </div>
  );
}