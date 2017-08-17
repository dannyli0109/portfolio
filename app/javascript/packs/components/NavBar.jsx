import React from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AddButton from 'material-ui/svg-icons/content/add';



// <IconButton iconClassName="muidocs-icon-custom-github" />

export default function NavBar(props) {

  return (
      <AppBar
        title = {props.title}
        className = "nav-bar"
        iconElementRight = {props.iconRight}
        iconElementLeft = {props.iconLeft || <div></div>}
        onRightIconButtonTouchTap = {props.handleRightButtonClick}
        onLeftIconButtonTouchTap = {props.handleLeftButtonClick}
      >
      </AppBar>
  )
}
