import React from "react";

class ItemTitleDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ marginBottom: "200px" }}>
        <button onClick={() => this.props.onHideDetails()}>Hide details</button>
        <h2>Details</h2>
        <div style={{ float: "left", width: "600px", marginLeft: "200px" }}>
          <img src={this.props.itemUrl} style={{ width: "120px" }} />
        </div>
        <div style={{ float: "left" }}>
          <h3>{this.props.itemTitle}</h3>
          <span>{this.props.itemId}</span>
        </div>
      </div>
    );
  }
}

export default ItemTitleDetails;
