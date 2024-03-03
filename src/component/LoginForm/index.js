import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    userId: '',
    pin: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserId = e => {
    this.setState({userId: e.target.value})
  }

  onChangePin = e => {
    this.setState({pin: e.target.value})
  }

  onSuccessSubmit = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = response.json()
    console.log(response)
    if (response.ok === true) {
      this.onSuccessSubmit(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="main-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-login"
          />
          <form className="from-container" onSubmit={this.onSubmitLoginForm}>
            <h1>Welcome Back!</h1>
            <div className="input-card">
              <label htmlFor="idInput" className="label">
                User ID
              </label>
              <input
                id="idInput"
                type="text"
                placeholder="Enter User ID"
                className="input"
                onChange={this.onChangeUserId}
              />
            </div>
            <div className="input-card">
              <label htmlFor="pin" className="label">
                PIN
              </label>
              <input
                id="pin"
                type="password"
                placeholder="Enter PIN"
                className="input"
                onChange={this.onChangePin}
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
