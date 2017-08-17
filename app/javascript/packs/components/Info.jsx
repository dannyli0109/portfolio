import React from 'react'
import {Thumbnail, Button} from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default function Info(props) {
  console.log(props);
  const style = {
    backgroundColor: "#f4511e"
  }
  return (
    <Thumbnail src={props.imageUrl} alt="profile-image">
      <h3>{props.username}</h3>
      <p>{props.realname}</p>
      <p>
        <MuiThemeProvider>
            <RaisedButton
              label="Github"
              primary={true}
              fullWidth={true}
              onClick={props.onGithubButtonClick}
            />
        </MuiThemeProvider>
      </p>
    </Thumbnail>
  )
}
