import React from "react";
import entriesTest from "./testing/entries";
import "./App.css";
import "./App.scss";
import ListItemRow from "./components/ListItemRow";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      entries: []
    };
  }

  componentDidMount() {
    //TODO (stephen): this will be replaced by fetch()
    this.setState({
      entries: entriesTest,
      isLoaded: true
    });
  }

  render() {
    const { error, isLoaded, entries } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div class="container mx-auto mt-12 p-8 border  min-h-screen max-w-3xl">
          <div class="clearfix">
            <button class="btn  btn--brand float-right ml-2">
              <i class="fas fa-user"></i>&nbsp;&nbsp;New visitor
            </button>
            <input
              type="text"
              class="p-2 text-sm border float-right max-w-xs w-full"
              placeholder="Search"
            />
            <img
              src="https://dashboard.envoy.com/assets/images/logo-small-red-ba0cf4a025dd5296cf6e002e28ad38be.svg"
              alt="Envoy Logo"
              width="31"
              class="py3 block"
            />
          </div>
          <div class="flex-grow h-screen overflow-y-scroll">
            <div class="mx-auto">
              <div class="mt-8">
                <table class="w-full">
                  <thead>
                    <tr>
                      <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">
                        Name
                      </th>
                      <th class="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">
                        Notes
                      </th>
                      <th class="text-sm font-semibold text-grey-darker p-1 bg-grey-lightest">
                        Signed out
                      </th>
                    </tr>
                  </thead>
                  <tbody class="align-baseline">
                    {entries.map(
                      ({
                        firstName,
                        lastName,
                        isSignedOut,
                        lastSignedOutDate
                      }) => {
                        return (
                          <ListItemRow
                            firstName={firstName}
                            lastName={lastName}
                            isSignedOut={isSignedOut}
                            signedOutDate={lastSignedOutDate}
                          />
                        );
                      }
                    )}
                  </tbody>
                </table>

                <div class="mt-8 mb-8">
                  <p class="mt-2">
                    <div class="flex">
                      <a href="#" class="mr-4 px-1">
                        {" "}
                        <i class="fas fa-angle-left"></i>{" "}
                      </a>
                      <div class="flex text-center mr-4">
                        <span class="w-20">1</span>
                        <span class="w-20">&nbsp;/&nbsp;</span>
                        <span class="w-20">2</span>
                      </div>
                      <a href="#" class="mr-4 px-1">
                        <i class="fas fa-angle-right"></i>
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

export default App;
