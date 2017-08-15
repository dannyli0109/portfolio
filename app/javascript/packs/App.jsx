import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';


export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar></AppBar>
        </MuiThemeProvider>
        hi
      </div>
    )
  }


}
