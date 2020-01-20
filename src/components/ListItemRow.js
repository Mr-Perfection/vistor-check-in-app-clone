import React from "react";
import "../App.scss";

class ListItemRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedOut: props.isSignedOut,
      isSigningOut: false
    };
  }

  getSignoutStatus = () => {
    const { isSignedOut, signedOutDate } = this.props;
    const { isSigningOut } = this.state;

    if (isSigningOut) {
      return "Signing out";
    }

    // Already signed out.
    if (isSignedOut) {
      return <div>{signedOutDate}</div>;
    }
    return (
      <button
        class="btn btn--smaller btn--outline"
        onClick={this.handleSignedOut}
      >
        Sign out
      </button>
    );
  };

  handleSignedOut = () => {
    this.setState({ isSigningOut: true });
    // Handle api call to mark this as signed out with signed out date.
  };

  render() {
    const { firstName, lastName, notes } = this.props;
    return (
      <tr>
        <td class="p-2 border-t border-grey-light font-mono text-xs">
          {firstName} {lastName}
        </td>
        <td class="p-2 border-t border-grey-light font-mono text-xs">
          {notes}
        </td>
        <td class="p-1 border-t border-grey-light font-mono text-xs">
          {this.getSignoutStatus()}
        </td>
      </tr>
    );
  }
}

export default ListItemRow;
