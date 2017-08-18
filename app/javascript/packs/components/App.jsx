import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import NavBar from './NavBar'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red300, indigo500,white, grey900, grey800,darkBlack} from 'material-ui/styles/colors';
import { Button, Row, Col, Grid, Clearfix, Jumbotron, Thumbnail } from 'react-bootstrap';
import Info from './Info'
import Portfolio from './Portfolio'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import AddButton from 'material-ui/svg-icons/content/add';
import CloseButton from 'material-ui/svg-icons/navigation/close'
import SaveButton from 'material-ui/svg-icons/content/save'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Matrix from "./Matrix"






injectTapEventPlugin()



const navMuiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: grey900
  },
  appBar: {
    height: 50
  },
});

const cardMuiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: grey900
  },
  appBar: {
    height: 50
  }
})

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: "loading",
      user: {
        username: "",
        realname: "",
        profileImageUrl: "http://www.steppingstonetheatre.org/wp-content/plugins/post-grid/assets/frontend/css/images/placeholder.png",
        githubUrl: ""
      },
      toggleAdd: false,
      addUrlError: false,
      addUrlErrorMessage: "",
      website: {
        url: "",
        title: "",
        subHeading: "",
        descriptions: "",
        imageUrl: "",
        githubUrl: ""
      },
      websiteSaveMessageOpen: false,
      websiteSaveMessage: "",
      portfolios: []
    }
  }

  componentDidMount() {
    var username = window.location.pathname.split('/')[2];
    this.fetchUser(username)
  }






  fetchUser(username){
    const url = `https://api.github.com/users/${username}`
    this.setState({page: "loading"})

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
        this.setState({
          user: {
            username: data.login,
            realname: data.name,
            profileImageUrl: data.avatar_url,
            githubUrl: data.html_url

          }
        })
        this.fetchList(username)
      })
    }


    fetchList(username) {
      const url = `/api/users/${username}/portfolios/all`
      fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if(!data.error) {
          this.setState({
            portfolios: data
          })
        }
        setTimeout(function(){
          console.log(this);
          this.setState({
            page: "home"
          })
        }.bind(this), 2000);


      })
    }

  handleAddErrorSnackClose = () => {
      this.setState({
        addUrlError: false,
      });
  };

  handleAddDialogOpen = () => {
    // this.setState({page: "add"})
    this.setState({toggleAdd: !this.state.toggleAdd})
    console.log("yay");
  }

  fetchUrl = (url) => {
    this.setState({
      page: "loading"
    })
    fetch(`/api/website/${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((data) => {
      if (data.error) {
        setTimeout(function(){
          console.log(this);
          this.setState({
            addUrlError: true,
            addUrlErrorMessage: data.error,
            page: "home"
          })
        }.bind(this), 2000);

      } else {
        setTimeout(function(){

          this.setState({
            page: "add",
            website: {
              url: url,
              title: data.title,
              subHeading: data.subHeading,
              descriptions: data.description,
              imageUrl: data.imageUrl
            },
            toggleAdd: false
          })
        }.bind(this), 2000);

      }

    })

  }

  handleSubmitUrl = () => {
    if (!!this.state.url.length) {
      var url = encodeURI(this.state.url)
      this.fetchUrl(url)
    } else {
      this.setState({
        addUrlError: true,
        addUrlErrorMessage: "Url can not be blank"
      })
    }

  }

  handleUrlChange = (event) => {
    this.setState({url: event.target.value})
  }

  handleCancelAdd = () => {
    this.setState({
      page: "home",
      website: {}
    })
  }

  handleAddTitleChange = (event) => {
    var currentWebsite = this.state.website
    currentWebsite.title = event.target.value
    this.setState(currentWebsite)
  }

  handleAddSubHeadingChange = (event) => {
    var currentWebsite = this.state.website
    currentWebsite.subHeading = event.target.value
    this.setState(currentWebsite)
  }

  handleAddDescriptionsChange = (event) => {
    var currentWebsite = this.state.website
    currentWebsite.descriptions = event.target.value
    this.setState(currentWebsite)
  }

  handleAddGithubUrlChange = (event) => {
    var currentWebsite = this.state.website
    currentWebsite.githubUrl = event.target.value
    this.setState(currentWebsite)
  }

  handleGithubButtonClick = () => {
    window.location.assign(this.state.user.githubUrl);
  }


  handleSaveWebsite = () => {
    console.log("haha");
    if (this.state.website.title.length > 0) {
      var url = `/api/users/${this.state.user.username}/portfolios/create?`
      var titleQuery = encodeURIComponent(this.state.website.title)
      var subHeadingQuery = encodeURIComponent(this.state.website.subHeading)
      var descriptionsQuery = encodeURIComponent(this.state.website.descriptions)
      var imageUrlQuery = encodeURIComponent(this.state.website.imageUrl)
      var githubUrlQuery = encodeURIComponent(this.state.website.githubUrl)
      var urlQuery = encodeURIComponent(this.state.website.url)
      var q = `title=${titleQuery}&subHeading=${subHeadingQuery}&descriptions=${descriptionsQuery}&imageUrl=${imageUrlQuery}&githubUrl=${githubUrlQuery}&url=${urlQuery}`
      var fullUrl = url + q
      fetch(fullUrl)
        .then((res) => res.json())
        .then((data) => {
        if (data.error) {
          this.setState({
            websiteSaveMessageOpen: true,
            websiteSaveMessage: data.error
          })
        }
        if (data.message) {
          this.setState({
            websiteSaveMessageOpen: true,
            websiteSaveMessage: data.message,
            page: "home"
          })
          this.fetchList(this.state.user.username)
        }
      })
    } else {
      this.setState({
        websiteSaveMessageOpen: true,
        websiteSaveMessage: "Title is required"
      })
    }

  }

  handleWebsiteSaveSnackClose = () => {
    this.setState({
      websiteSaveMessageOpen: false,
      websiteSaveMessage: ""
    });
  }

  handleListItemClick = (index, event) => {
    window.location.assign(this.state.portfolios[index].url);
  }

  renderPage = () => {

    const {username, realname,profileImageUrl} = this.state.user
    const {url, title, subHeading, descriptions, imageUrl,githubUrl} = this.state.website
    switch (this.state.page) {
      case 'home' :
      return (
        <div>
        <MuiThemeProvider className="navbar">
          <NavBar
          title="Portfolio"
          handleRightButtonClick={this.handleAddDialogOpen}
          iconRight = {<IconButton>{this.state.toggleAdd? <CloseButton></CloseButton> : <AddButton></AddButton>} </IconButton>}
          />
        </MuiThemeProvider>
        {this.state.toggleAdd &&
          <MuiThemeProvider>
            <div>
            <div className = "card">
              <TextField
                hintText = "Starting with http:// or https://"
                floatingLabelText="Enter website url"
                className = "textField"
                fullWidth={true}
                onChange = {this.handleUrlChange}
              />
            </div>
            <div className="submit-container">
              <RaisedButton
                label="Submit"
                primary={true}
                onClick = {this.handleSubmitUrl}
              />
            </div>
          </div>
          </MuiThemeProvider>
        }
        <Grid className="clear main-container">
          <Row>
            <Col sm={5} xsHidden lg={3} md={4}>
              <Info
                username = {username}
                realname = {realname}
                imageUrl = {profileImageUrl}
                onGithubButtonClick = {this.handleGithubButtonClick}
                >
                </Info>
              </Col>
            <Col sm={7} md={8} lg={9} xs={12}>
              <MuiThemeProvider>
                <Portfolio list = {this.state.portfolios} onListItemClick = {this.handleListItemClick}></Portfolio>
              </MuiThemeProvider>
            </Col>
          </Row>
        </Grid>
          <MuiThemeProvider>
            <Snackbar
              open={this.state.addUrlError}
              message={this.state.addUrlErrorMessage}
              autoHideDuration={4000}
              onRequestClose={this.handleAddErrorSnackClose}
            />
          </MuiThemeProvider>
        </div>
      )
      case "add":
        return (
          <div>
            <MuiThemeProvider>
              <NavBar
                title="Add a website"
                iconLeft={<IconButton><CloseButton></CloseButton></IconButton>}
                iconRight={<IconButton><SaveButton></SaveButton></IconButton>}
                handleLeftButtonClick = {this.handleCancelAdd}
                handleRightButtonClick = {this.handleSaveWebsite}
              ></NavBar>
            </MuiThemeProvider>
            <MuiThemeProvider>
              <div className = "card">
                <Thumbnail src = {imageUrl || "http://www.steppingstonetheatre.org/wp-content/plugins/post-grid/assets/frontend/css/images/placeholder.png"} alt="profile-image">

                </Thumbnail>
                <TextField
                  className = "textField"
                  fullWidth={true}
                  floatingLabelText="Title"
                  value = {title}
                  onChange = {this.handleAddTitleChange}
                />
                <TextField
                  className = "textField"
                  fullWidth={true}
                  floatingLabelText="Sub Heading"
                  value = {subHeading}
                  onChange = {this.handleAddSubHeadingChange}
                />
                <TextField
                  className = "textField"
                  fullWidth={true}
                  floatingLabelText="Descriptions"
                  value = {descriptions}
                  onChange = {this.handleAddDescriptionsChange}
                />
                <TextField
                  className = "textField"
                  fullWidth={true}
                  floatingLabelText="Github"
                  value = {githubUrl}
                  onChange = {this.handleAddGithubUrlChange}
                />
              </div>
              </MuiThemeProvider>
              <MuiThemeProvider>
              <Snackbar
                open={this.state.websiteSaveMessageOpen}
                message={this.state.websiteSaveMessage}
                autoHideDuration={4000}
                onRequestClose={this.handleWebsiteSaveSnackClose}
              />
              </MuiThemeProvider>
          </div>
        )
      case "loading":
        return <Matrix></Matrix>
      case "detail":
      (
        <div>
          <MuiThemeProvider>
            <NavBar
              title="Add a website"
              iconLeft={<IconButton><CloseButton></CloseButton></IconButton>}
              iconRight={<IconButton><SaveButton></SaveButton></IconButton>}
              handleLeftButtonClick = {this.handleCancelAdd}
              handleRightButtonClick = {this.handleSaveWebsite}
            ></NavBar>
          </MuiThemeProvider>
          <MuiThemeProvider>
            <div className = "card">
              <Thumbnail src = {imageUrl || "http://www.steppingstonetheatre.org/wp-content/plugins/post-grid/assets/frontend/css/images/placeholder.png"} alt="profile-image">

              </Thumbnail>
              <TextField
                className = "textField"
                fullWidth={true}
                floatingLabelText="Title"
                value = {title}
                onChange = {this.handleAddTitleChange}
              />
              <TextField
                className = "textField"
                fullWidth={true}
                floatingLabelText="Sub Heading"
                value = {subHeading}
                onChange = {this.handleAddSubHeadingChange}
              />
              <TextField
                className = "textField"
                fullWidth={true}
                floatingLabelText="Descriptions"
                value = {descriptions}
                onChange = {this.handleAddDescriptionsChange}
              />
              <TextField
                className = "textField"
                fullWidth={true}
                floatingLabelText="Github"
                value = {githubUrl}
                onChange = {this.handleAddGithubUrlChange}
              />
            </div>
            </MuiThemeProvider>
            <MuiThemeProvider>
            <Snackbar
              open={this.state.websiteSaveMessageOpen}
              message={this.state.websiteSaveMessage}
              autoHideDuration={4000}
              onRequestClose={this.handleWebsiteSaveSnackClose}
            />
            </MuiThemeProvider>
        </div>
      )
      default:
        return <div></div>
    }
  }

  render() {

    return (
      <div>
        {this.renderPage()}
      </div>
    )
  }


}
