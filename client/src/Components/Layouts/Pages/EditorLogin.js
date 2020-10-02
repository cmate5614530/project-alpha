import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard } from 'mdbreact';
import { Link, Redirect  } from 'react-router-dom';
import { isLoggedIn, setUser } from "../../../services/auth";
import jwt_decode from "jwt-decode";

const style = {
    padding: '50px',
    margin: '70px auto 0',
    maxWidth: '400px',
    width: '100%'
  }

class EditorLogin extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      user:{},
      email:'',
      pass:'',

      passwordincorrect:'',
      emailnotfound:''
    };
  }
  
    componentDidMount() {
    if (this.captchaDemo) {
        console.log("started, just a second...")
        this.captchaDemo.reset();
        this.captchaDemo.execute();
    }
  }
  handleSubmit = (e) =>{
    e.preventDefault();
    const _this = this;
    const {email, pass} = this.state;
    if(this.state.email === ''){
      this.setState({emailnotfound:"Please enter your email!"});
    }
    if(this.state.pass === ''){
      this.setState({passwordincorrect:"Please enter your password!"});
    }
    if(this.state.email !== '' && this.state.pass !== ''){
          fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password : pass 
          })
        }).then(res => res.json())
        .then((res) => {

          if(!res.passwordincorrect && !res.emailnotfound ){
            let user = jwt_decode(res.token);
            const { id, name } = user;
            setUser({ 
              id,
              name,
              token : res.token
            });
            _this.setState({user});
          }else{
            this.setState({emailnotfound:res.emailnotfound});
            this.setState({passwordincorrect:res.passwordincorrect});
          }
        })
      }
  }
  render(){
    if (isLoggedIn()) {
      return <Redirect to='/editor-dasboard' />
    }
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <MDBCard style={style}>
              <form onSubmit={this.handleSubmit}>
                <p className="h4 text-center mb-4" style={{ color: '#2bbbad', }}>Sign in</p>
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  Your email
              </label>
                <input
                  type="email"
                  id="defaultFormLoginEmailEx"
                  className="form-control"
                  value={this.state.email}
                  onChange= {(e)=> { 
                    let email = e.target.value;
                    this.setState({ email });
                    this.setState({emailnotfound:''});
                   }}
                />
                <p style={{color:'red'}}>{this.state.emailnotfound}</p>
                <br />
                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                  Your password
              </label>
                <input
                  type="password"
                  id="defaultFormLoginPasswordEx"
                  className="form-control"
                  value={this.state.pass}
                  onChange= {(e)=> { 
                    let pass = e.target.value;
                    this.setState({ pass });
                    this.setState({passwordincorrect:''});
                   }}
                />
                <p style={{color:'red'}}>{this.state.passwordincorrect}</p>
                <MDBRow style={{ marginTop: '20px', }}>
                  <MDBCol md="6">
                    <MDBBtn type="submit">Login</MDBBtn>
                  </MDBCol>
                  <MDBCol md="6" className="text-right">
                    <MDBBtn ><Link to="/" style={{ color: '#fff', }}>Home</Link></MDBBtn>
                  </MDBCol>
                </MDBRow>
              </form>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
 
};

export default EditorLogin;
