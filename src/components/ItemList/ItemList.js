import React, { Component } from "react";
import { default as Item } from "../Item/Item";
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";

export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
    this.handleSearchItem = this.handleSearchItem.bind(this);
  }

  handleSearchItem(event) {
    this.setState({ searchValue: event.target.value });
  }

  render() {
    const {
      products,
      onAddProductToWishList
    } = this.props;
    const { searchValue } = this.state;
    return (
      <div className="item-list-wrapper">
        <h3>Lista de productos</h3>
        <form>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="search" />
              </InputGroup.Addon>
              <FormControl
                type="text"
                placeholder="Buscar producto"
                bsSize="lg"
                onChange={this.handleSearchItem}
              />
            </InputGroup>
          </FormGroup>
        </form>
        <div className="item-list-items">
          {products
            .filter(
              item =>
                item.name.toUpperCase().indexOf(searchValue.toUpperCase()) !==
                -1
            )
            .map(item => (
              <Item
                isInWishList={false}
                key={item.id}
                {...item}
                addToWishList={onAddProductToWishList}
              />
            ))}
        </div>
      </div>
    );
  }
}
