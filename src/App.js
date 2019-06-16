import React, { Component } from "react";
import Header from "./components/header/";
import ContactList from "./components/contactList/";
import FilterControls from "./components/filterControls/";
import request from "superagent";
import api from "./datastore/stubAPI";



class App extends Component {

      //const sample = {
      //  name: { first: "Joe", last: "Bloggs" },
      //  email: "j.bloggs@example.com",
      //  phone: "012-3456789",
      //  picture: { thumbnail: "./profile.png" }
      //};


 componentDidMount(){
      request.get("https://randomuser.me/api/?results=10").end((error, res) => {
          if (res) {
              let {results: contacts} = JSON.parse(res.text);
              //let contacts = JSON.parse(res.text);
              api.initialize(contacts);
              this.setState({});
          } else {
              console.log(error);
          }
      });
  }



   // const contacts = [sample, sample, sample, sample, sample];
render() {
    let contacts = api.getAll();
    return (
        <div className="jumbotron">
          <Header noContacts={contacts.length} />
          <FilterControls />
          <ContactList contacts={contacts} />
        </div>
    );
  }
}

export default App;

