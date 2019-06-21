import React from 'react'

export default class Footer extends React.Component {
  render() {
    return (
      <div style={footerDiv}>
        <a
          href="https://github.com/lkaldyne/autoCommitter"
          target="__blank"
          style={{textDecoration: 'none', color: 'white'}}
        >
          <i className="fab fa-github" />
        </a>
      </div>
    )
  }
}

const footerDiv = {
    alignItems: 'center',
    backgroundColor: '#2C3E50',
    bottom: '0',
    color: 'white',
    display: 'flex',
    fontSize: '2rem',
    height: '4rem',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
}