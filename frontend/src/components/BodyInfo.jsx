import React from 'react'

export default class BodyInfo extends React.Component {
  render() {
    return (
      <div style={wrapperStyle}>
        <h1>
          Welcome to AutoCommiter.
        </h1>
        <p style={pStyle}>
          If you want your Github commit history to look as beautiful as the image below, but you're way too lazy to put that level of commitment (pun intended), then look no further.<br /><br />AutoCommitter saves you the hassle and commits on your behalf. Just make an account with your GitHub token and you're all set!
        </p>
        <img
          src="\commits.png"
          alt="GitHub Commit Contributions"
          style={imageStyle}
        />
        <p>
          AutoCommitter is modular. Once your account is made, you can customize how frequently and how randomly your commits will occur, as well as other settings.
        </p>
      </div>
    )
  }
}

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'left',
  flexDirection: 'column',
  paddingRight: '120px'
}

const imageStyle = {
  margin: '20px',
  width: '70%',
  height: 'auto',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
}

const pStyle = {
  fontSize: '20px'
}