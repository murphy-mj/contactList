import React, { Component } from "react";
import Header from "./components/header/";
import ContactList from "./components/contactList/";
import FilterControls from "./components/filterControls/";
import request from "superagent";
import api from "./datastore/stubAPI";



class App extends Component {


    state = {
        search: "", gender: "all"
    };


    deleteContact = (key) => {
        api.delete(key);
        this.setState({});
    };



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
          <ContactList contacts={contacts}  deleteHandler={this.deleteContact} />
        </div>
    );
  }
}

export default App;

