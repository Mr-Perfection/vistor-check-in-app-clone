import React from "react";
import { patchEntry } from "../api/Entries";
import "../App.scss";

class ListItemRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      isSignedOut: props.isSignedOut,
      isSigningOut: false
    };
  }

  handleSignedOut = () => {
    const { id } = this.props;
    this.setState({ isSigningOut: true });
    patchEntry(id);
  };

  getSignoutStatus = () => {
    const { isSignedOut, lastSignedOut } = this.props;
    const { isSigningOut } = this.state;

    if (isSigningOut) {
      return "Signing out";
    }

    // Already signed out.
    if (isSignedOut) {
      return <div>{lastSignedOut}</div>;
    }
    return (
      <button
        className="btn btn--smaller btn--outline"
        onClick={this.handleSignedOut}
      >
        Sign out
      </button>
    );
  };

  render() {
    const { firstName, lastName, notes } = this.props;
    return (
      <tr>
        <td className="p-2 border-t border-grey-light font-mono text-xs">
          {firstName} {lastName}
        </td>
        <td className="p-2 border-t border-grey-light font-mono text-xs">
          {notes}
        </td>
        <td className="p-1 border-t border-grey-light font-mono text-xs">
          {this.getSignoutStatus()}
        </td>
      </tr>
    );
  }
}

export default ListItemRow;
