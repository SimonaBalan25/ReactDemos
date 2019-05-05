import React from "react";

class ItemIconDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <img src={this.props.itemUrl} />
          <h2>{this.props.itemTitle}</h2>
        </div>
        <div>
          <button onClick={() => this.props.action()}>Back</button>
        </div>
      </div>
    );
  }
}

export default ItemIconDetails;
