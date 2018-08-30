import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
    background:{
      backgroundColor:'#FBE9E7',
    },
    text:{
      color:'#FBE9E7',
    }

};

export default class Header extends React.Component {
  render(){
    return (
      <div className={styles.root}>
        <AppBar position="static" className="styles.background">
          <Toolbar>
            <Typography variant="title" >
              Books
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

