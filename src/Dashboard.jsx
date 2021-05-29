import axios from 'axios';
import React from 'react';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            firstname: "",
            lastname: "",
            email: "",
            age: ""
        };
        
    }
    handleDelete(id) {
      axios.delete(`https://localhost:44349/api/admin/${id}`).finally(() => {
        console.log(id);
        this.setState(prev => ({...prev, data:prev.data}));
      })
      
    }

    componentDidMount() {
        axios.get(`https://localhost:44349/api/admin`, {
          headers: {"Accept": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem("access_Token")}
        })
          .then(res => {
           
            this.setState(prev => ({...prev, data:res.data}));
            console.log(res.data);
          })
          .catch(
            error => console.log(error)
              )
      }
        render() {
            return (
              <div>
                  <table>
                      <thead>
                        <tr>
                            <td>ID</td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Email</td>
                            <td>Age</td>
                            <td>Registered Date</td>
                            <td>Study Date</td>
                            <td>Action</td>
                        </tr>
                      </thead>
                    
                    <tbody>
                      {this.state.data && this.state.data.map(user => (<tr key={user.id.toString()}>

                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>{user.registeredDate}</td>
                        <td>{user.studyDate}</td>

                        <td>
                          <form onSubmit={(event) => {
                            event.preventDefault();
                            this.handleDelete(user.id);

                            }}>
                            <input type = "submit" value = "Видалити"></input>
                          </form>


                        </td>
                      </tr>))}
                    </tbody>
                  </table>
              </div>
            );
          };
}
export default Dashboard