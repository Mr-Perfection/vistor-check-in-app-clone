import React from "react";
import queryString from "query-string";

import { addEntry, getEntries } from "./api/Entries";
import "./App.css";
import "./App.scss";
import ListItemRow from "./common/ListItemRow";
import Modal from "./common/Modal";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      originalEntries: [],
      entries: [],
      isNewVistorModalEnabled: false,
      firstName: "",
      lastName: "",
      notes: "",
      search: "",
      validationError: "",
      signedOutFilter: false
    };
  }

  async componentDidMount() {
    //TODO (stephen): this will be replaced by fetch()
    let entries = [];
    try {
      entries = await getEntries();
    } catch (error) {
      this.setState({ error: error });
    }

    this.setState({
      entries,
      originalEntries: entries,
      isLoaded: true,
      search: ""
    });
  }

  toggleModal = () => {
    const { isNewVistorModalEnabled } = this.state;
    this.setState({ isNewVistorModalEnabled: !isNewVistorModalEnabled });
  };

  toggleSignedOut = async () => {
    const { signedOutFilter, originalEntries } = this.state;
    let newEntries = originalEntries;

    if (!signedOutFilter) {
      const signedOutEntries = await getEntries("isSignedOut", "true");
      newEntries = signedOutEntries;
    }
    this.setState({ signedOutFilter: !signedOutFilter, entries: newEntries });
  };

  handleSubmit = async () => {
    // https://us-central1-envoy-visitor-check-in.cloudfunctions.net/addEntry
    // create a new XMLHttpRequest
    const { isNewVistorModalEnabled, firstName, lastName, notes } = this.state;

    if (!firstName || !lastName || !notes) {
      this.setState({ validationError: "All fields must be filled." });
      return;
    }

    await addEntry(firstName, lastName, notes);
    const entries = await getEntries("isSignedOut", "false");
    console.log("entries", entries);
    this.setState({
      entries,
      isNewVistorModalEnabled: !isNewVistorModalEnabled,
      firstName: "",
      lastName: "",
      notes: ""
    });
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleSearchChange = event => {
    this.handleInputChange(event);
    const target = event.target;
    const value = target.value;
    let entries = this.state.originalEntries.filter(function(entry) {
      return entry.fullName.includes(value);
    });

    this.setState({
      entries
    });
  };

  render() {
    const {
      error,
      validationError,
      isLoaded,
      entries,
      isNewVistorModalEnabled
    } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container mx-auto mt-12 p-8 border  min-h-screen max-w-3xl">
          <Modal
            title="New entry"
            show={isNewVistorModalEnabled}
            handleToggle={this.toggleModal}
          >
            <div className="center w-300">
              <input
                type="text"
                className="display-block text-sm border max-w-xs w--100"
                placeholder="First name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChange}
              />
              <input
                type="text"
                className="display-block text-sm border max-w-xs w--100"
                placeholder="Last name"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange}
              />
              <input
                type="text"
                className="display-block text-sm border max-w-xs w--100"
                placeholder="Notes"
                name="notes"
                value={this.state.notes}
                onChange={this.handleInputChange}
              />
            </div>
            <button
              className="btn btn--small btn--brand"
              onClick={this.handleSubmit}
            >
              Save
            </button>
            <p>{validationError}</p>
          </Modal>
          <div className="clearfix">
            <button
              className="btn  btn--brand float-right ml-2"
              onClick={this.toggleModal}
            >
              <i className="fas fa-user"></i>&nbsp;&nbsp;New visitor
            </button>
            <input
              type="text"
              className="p-2 text-sm border float-right max-w-xs w-full"
              placeholder="Search"
              name="search"
              value={this.state.search}
              onChange={this.handleSearchChange}
            />
            <button
              className="btn  btn--brand float-right ml-2"
              onClick={this.toggleSignedOut}
            >
              <i className="fas fa-user"></i>&nbsp;&nbsp;Signed Out
            </button>
            <img
              src="https://dashboard.envoy.com/assets/images/logo-small-red-ba0cf4a025dd5296cf6e002e28ad38be.svg"
              alt="Envoy Logo"
              width="31"
              className="py3 block"
            />
          </div>
          <div className="flex-grow h-screen overflow-y-scroll">
            <div className="mx-auto">
              <div className="mt-8">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">
                        Name
                      </th>
                      <th className="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">
                        Notes
                      </th>
                      <th className="text-sm font-semibold text-grey-darker p-1 bg-grey-lightest">
                        Signed out
                      </th>
                    </tr>
                  </thead>
                  <tbody className="align-baseline">
                    {entries.map(
                      (
                        {
                          id,
                          firstName,
                          lastName,
                          isSignedOut,
                          lastSignedOut,
                          notes
                        },
                        index
                      ) => {
                        return (
                          <ListItemRow
                            key={index}
                            id={id}
                            firstName={firstName}
                            lastName={lastName}
                            isSignedOut={isSignedOut}
                            lastSignedOut={lastSignedOut}
                            notes={notes}
                          />
                        );
                      }
                    )}
                  </tbody>
                </table>

                <div className="mt-8 mb-8">
                  <p className="mt-2">
                    <div className="flex">
                      <a href="#" className="mr-4 px-1">
                        {" "}
                        <i className="fas fa-angle-left"></i>{" "}
                      </a>
                      <div className="flex text-center mr-4">
                        <span className="w-20">1</span>
                        <span className="w-20">&nbsp;/&nbsp;</span>
                        <span className="w-20">2</span>
                      </div>
                      <a href="#" className="mr-4 px-1">
                        <i className="fas fa-angle-right"></i>
                      </a>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Home;
