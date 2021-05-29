import React, {useState} from 'react';
import axios from 'axios';
export default function Login(props) {

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(event)

      const data = {
        email: event.target.elements.email.value,
        password:event.target.elements.password.value
      }
      axios.post("https://localhost:44349/api/authentication/authenticate", data, {
        "Content-Type": "application/json"
      })
      .then(function (response) {
        localStorage.setItem("access_Token", response.data.access_Token);
        localStorage.setItem("refresh_Token", response.data.refresh_Token);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
          <input type="text" name = "email" value={Email} onChange={event => setEmail(event.target.value)}/>
          <label name="Email">Пошта</label>
      </p>
    
      <p>
          <input type="password" name = "password" value={Password} onChange={event => setPassword(event.target.value)}/>
          <label name="Password">Пароль</label>
      </p>

      <input type="submit" value="Надіслати" />
    </form>
  );
}
//class Login extends React.Component {
//    constructor(props) {
//      super(props);
//      this.state = {
//        email: "",
//        password: ""
//      };
//      this.onChange = this.onChange.bind(this);
//      this.handleSubmit = this.handleSubmit.bind(this);
//    };
//
//      onChange(event) {
//      var value = event.target.value;
//      var name = event.target.name;
//      this.setState({[name]: value});
//  }
//  
//      handleSubmit(e){
//        e.preventDefault();
//        console.log(e)
//
//        const data = {
//          email: e.target.elements.email.value,
//          password:e.target.elements.password.value
//        }
//        axios.post("https://localhost:44349/api/authentication/authenticate", data, {
//          "Content-Type": "application/json"
//        })
//        .then(function (response) {
//          localStorage.setItem("access_Token", response.data.access_Token);
//          console.log(response.data);
//        })
//        .catch(function (error) {
//          console.log(error);
//        });
//
//      }
//      render() {
//        return (
//          
//          <form onSubmit={this.handleSubmit}>
//            <p>
//                <input type="text" name = "email" value={this.state.email} onChange={this.onChange}/>
//                <label name="Email">Пошта</label>
//            </p>
//          
//            <p>
//                <input type="password" name = "password" value={this.state.password} onChange={this.onChange}/>
//                <label name="Password">Пароль</label>
//            </p>
//
//            <input type="submit" value="Надіслати" />
//          </form>
//        );
//      }
//    }

//  export default Login
  