import React from 'react'
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';


export default function Portfolio(props) {
  console.log(props);
  return (
      <List>
        {props.list.map((project, index) => {
            return (<ListItem
              className="list-item"
              primaryText= {project.title}
              secondaryText={project.sub_heading}
              key={index}
              leftAvatar={<Avatar src={project.img_url}/>}
              onClick={() => props.onListItemClick(index)}

            />)
          })
        }
      </List>
  )
}
