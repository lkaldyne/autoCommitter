import React from 'react'
import LoginForm from '../components/Forms/LoginForm';
import PropTypes from 'prop-types';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { withRouter } from 'react-router-dom'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoginHovered: false,
      popoverOpen: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      popoverOpen: !prevState.popoverOpen
    }));
  }

  render() {
    let titleElement = (
      <div style={{margin: '15px'}}>
        <a href='/' style={{textDecoration: 'none'}}><h1 style={title}>{this.props.title}</h1></a>
      </div>
    )

    return this.props.location.pathname !== '/dashboard' ? (
        <div style={headerDiv}>
          {titleElement}
          <div style={{margin: '15px'}}>
            <LoginForm />
          </div>
        </div>
      ) : (
        <div style={headerDiv}>
          {titleElement}
          <div
            id="LogoutPopover"
            style={userInfoHead}
            onMouseEnter={() => { 
              this.setState({ isLoginHovered: true});
              this.setState({popoverOpen: true});
            }}
            onMouseLeave={() => { 
              this.setState({ isLoginHovered: false});
            }}
          >
            <img style={userIconStyle} src='\userIcon.png' alt="User Icon"/>
            <p
              style={{margin: '5px 10px 0 15px'}}
              className={`text-${this.state.isLoginHovered ? 'success' : null}`}
            >
              {this.props.userEmail}
            </p>
            <Popover
              placement="bottom"
              isOpen={this.state.popoverOpen}
              target="LogoutPopover"
              toggle={this.toggle}
            >
              <PopoverHeader>What would you like to do?</PopoverHeader>
              <PopoverBody>
                  <a href='/' onClick={this.props.userLogout}>LogOut</a>
              </PopoverBody>
            </Popover>
          </div>
        </div>
    );
  }
}

export default withRouter(Header);

const headerDiv = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '5rem',
  backgroundColor: '#2C3E50',
  transition: '1s'
}

const title = {
  fontFamily: 'Montserrat, source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  fontWeight: '5em',
  fontSize: '2.3rem',
  color: 'white'
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

const userIconStyle = {
  width: '40px',
  height: '40px'
}

const userInfoHead = {
  color: 'white',
  margin: '15px',
  fontSize: '20px',
  display: 'flex'
}