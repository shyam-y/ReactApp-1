import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


class App extends Component {
constructor(props) {
  super(props);
  this.state = { apiResponse: "", custRes: [] };
  // this.state = { custres: ""};
}

callAPI() {
   fetch("http://35.240.55.196:9000/testAPI")
       .then(res => res.text())
       .then(res => this.setState({ apiResponse: res }));
}

customersAPI() {
  fetch("http://35.240.55.196:9000/customers")
      .then(res => res.json())
      .then(res => this.setState({ custRes: res}));
}

componentWillMount() {
  this.callAPI();
  this.customersAPI();
}

render(){
  var customers = this.state.custRes
  return (
        <div>
          <table>
          <tbody>
            {customers.map((cust, index) => {
            return (
             <div>
                            <tr key = {index}>                       
                            <td>{cust.id}</td>
                        <td>{cust.firstName}</td>
                        </tr>
</div>
            )})}

                        </tbody>
                        </table>
                  
        </div>
      )
  }
}

export default App;
