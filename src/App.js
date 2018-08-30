import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Books from './components/books';
import {withTheme} from "@material-ui/core/styles/index";

const theme = createMuiTheme({
 palette: {
    primary: {
      main: '#ff7961',

    },
    secondary: {
      main: '#757ce8',
    },
     textPrimary:{
        main:'#fff',
     }
  },

});

class App extends Component {



  render() {
    return (
      <div className="App" >
         <MuiThemeProvider theme={theme}>
            <Books/>
         </MuiThemeProvider>

      </div>
    );
  }
}

export default withTheme()(App);
