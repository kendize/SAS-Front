import React from 'react';
import axios from 'axios';
class Registration extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        firstname: "",
        lastname: "",
        age: "",
        password: ""
      };
      this.onChange = this.onChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    };

      onChange(event) {
      var value = event.target.value;
      var name = event.target.name;
      this.setState({[name]: value});
  }
  
      handleSubmit(e){
        e.preventDefault();
        console.log(e)

        const data = {
          firstname: e.target.elements.firstname.value,
          lastname:e.target.elements.lastname.value,
          email: e.target.elements.email.value,
          age:e.target.elements.age.value,
          password:e.target.elements.password.value
        }
        axios.post("https://localhost:44349/api/admin", data, {
          "Content-Type": "application/json"
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(data);
          console.log(error);
        });

      }
      render() {
        return (
          
          <form onSubmit={this.handleSubmit}>
          <p>
              <input type="text" name = "email" value={this.state.email} onChange={this.onChange}/>
              <label name="Email">Пошта</label>
          </p>
  
          <p>
              <input type="password" name = "password" value={this.state.password} onChange={this.onChange}/>
              <label name="Password">Пароль</label>
          </p>
  
          <p>
              <input type="text" name = "firstname" value={this.state.firstname} onChange={this.onChange}/>
              <label name="FirstName">Ім'я</label>
          </p>
          <p>
              <input type="text" name = "lastname" value={this.state.lastname} onChange={this.onChange}/>
              <label name="LastName">Прізвище</label>
          </p>
          <p>
              <input type="text" name = "age" value={this.state.age} onChange={this.onChange}/>
              <label name="Age">Вік</label>
          </p>
          <input type="submit" value="Надіслати" />
      </form>
        );
      }
    }

  export default Registration
  