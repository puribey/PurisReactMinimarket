import React, { Component } from "react";
import Item from "../Item/Item";

export default class WishList extends Component {
  render() {
    const { products, onRemoveProductFromWishList } = this.props;
    return (
      <div>
        <h3>Mis productos seleccionados</h3>
        <div className="item-list-items">
          {products.map(item => (
            <Item
              isInWishList={true}
              key={item.id}
              {...item}
              removeFromWishList={onRemoveProductFromWishList}
            />
          ))}
        </div>
      </div>
    );
  }
}
