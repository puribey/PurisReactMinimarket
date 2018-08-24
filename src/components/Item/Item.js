import React, { Component } from "react";
import { default as Button } from "../Button/Button";

export default class Item extends Component {
  handleAdd(id) {
    console.log({ id });
    this.props.addToWishList(id);
  }
  handleRemove(id) {
    this.props.removeFromWishList(id);
  }
  render() {
    const { isInWishList, id, name, price } = this.props;
    return (
      <div className="item-wrapper">
        <div className="item-info-name">{name}</div>
        <div className="item-info-price">{price}</div>
        <div>
          {isInWishList ? (
            <Button
              className={"button-minus"}
              icon={"minus"}
              onClick={() => this.handleRemove(id)}
            />
          ) : (
            <Button
              className={"button-plus"}
              icon={"plus"}
              onClick={() => this.handleAdd(id)}
            />
          )}
        </div>
      </div>
    );
  }
}
