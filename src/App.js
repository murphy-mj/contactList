import React, { Component,Fragment } from "react";
import Header from "./components/header/";
import ContactList from "./components/contactList/";
import FilterControls from "./components/filterControls/";
import request from "superagent";
import api from "./datastore/stubAPI";
import _ from "lodash";


class App extends Component {


    state = {
        search: "", gender: "all"
    };


    deleteContact = (key) => {
        api.delete(key);
        this.setState({});
    };

    handleChange = (type, value) => {
        type === "name"
            ? this.setState({ search: value })
            : this.setState({ gender: value });
    };





 //   componentDidMount(){
 //     request.get("https://randomuser.me/api/?results=10").end((error, res) => {
 //         if (res) {
 //             let {results: contacts} = JSON.parse(res.text);
 //             //let contacts = JSON.parse(res.text);
 //             api.initialize(contacts);
 //             this.setState({});
 //         } else {
 //             console.log(error);
 //         }
 //     });
 // }



   // const contacts = [sample, sample, sample, sample, sample];
render() {
    let contacts = api.getAll();
    let filteredContacts = contacts.filter(c => {
        const name = `${c.name.first} ${c.name.last}`;
        return name.toLowerCase().search(this.state.search.toLowerCase()) !== -1;
    });
    filteredContacts =
        this.state.gender === "all"
            ? filteredContacts
            : filteredContacts.filter(c => c.gender === this.state.gender);
    let sortedContacts = _.sortBy(filteredContacts, c => c.name.last);
    return (
        <Fragment>
            <Header noContacts={sortedContacts.length} />
            <FilterControls onUserInput={this.handleChange} />
            <ContactList
                contacts={sortedContacts}
                deleteHandler={this.deleteContact}
            />
        </Fragment>
    );
  }
}

export default App;

