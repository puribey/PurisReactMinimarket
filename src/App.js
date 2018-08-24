import React, { Component } from "react";
import "./App.css";
import products from "./products.json";
import { WishList, ItemList, Button, Modal } from "./components";
import { Jumbotron, Grid, Row, Col } from "react-bootstrap";

class App extends Component {
  constructor() {
    super();
    this.state = {
      wishList: [],
      itemList: [],
      showModal: false
    };
    this.addProductToWishList = this.addProductToWishList.bind(this);
    this.removeProductFromWishList = this.removeProductFromWishList.bind(this);
    this.onHideModal = this.onHideModal.bind(this);
    this.onFinishPurchase = this.onFinishPurchase.bind(this);
  }
  componentDidMount() {
    this.setState(
      {
        itemList: [...products]
      },
      () => {
        // console.log("products", this.state.itemList);
      }
    );
  }

  getProductFromArray(id, array) {
    return array.find(item => item.id === id);
  }

  getIndexOfProduct(product, array) {
    return array.indexOf(product);
  }

  addProductToWishList(id) {
    const { wishList, itemList } = this.state;

    // save specific product
    const product = this.getProductFromArray(id, itemList);

    // get index of the product in the itemList
    const index = this.getIndexOfProduct(product, itemList);

    this.setState(
      {
        // add selected product to wishlist array
        wishList: [...wishList, product],

        // "slice" will create a new array. We create two arrays: from beggining to index and from index+1 to end. Then we apply the spread operator to take the items of those arrays and create a new single array containing all the items we care.
        // asign new itemList without product to itemList
        itemList: [...itemList.slice(0, index), ...itemList.slice(index + 1)]
      },
      () => {
        // console.log(this.state);
      }
    );
  }

  sortById(a, b) {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  }

  removeProductFromWishList(id) {
    const { wishList, itemList } = this.state;
    const product = this.getProductFromArray(id, wishList);
    const index = this.getIndexOfProduct(product, wishList);

    // console.log([...itemList.slice(0, id-1)]);
    // console.log([...itemList.slice(id)]);
    // console.log({id})
    // const updatedList = [
    //   ...itemList.slice(0, id - 1),
    //   product,
    //   ...itemList.slice(id + 1)
    // ];
    const updatedList = [...itemList, product].sort(this.sortById);
    this.setState(
      {
        // itemList: [...itemList, product],
        itemList: updatedList,
        wishList: [...wishList.slice(0, index), ...wishList.slice(index + 1)]
      },
      () => {
        // console.log(this.state);
      }
    );
  }

  onFinishPurchase() {
    this.setState({
      showModal: true
    });
  }

  onHideModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { wishList, itemList, showModal } = this.state;
    const finishPurchaseDisabled = wishList.length <= 0;
    return (
      <Grid>
        <Jumbotron>
          <h2>Bienvenidos a Puri's Market</h2>
          <p>
            En esta mini tienda online encontrarán productos que podrán agregar
            a su lista de pedidos para realizar la compra final.
          </p>
        </Jumbotron>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <ItemList
              products={itemList}
              onAddProductToWishList={this.addProductToWishList}
            />
          </Col>
          <Col xs={12} md={4}>
            <WishList
              products={wishList}
              onRemoveProductFromWishList={this.removeProductFromWishList}
            />
            <Button
              className={"button-done"}
              icon={"ok"}
              label={"Completar Pedido"}
              onClick={this.onFinishPurchase}
              disabled={finishPurchaseDisabled}
            />
            {showModal && (
              <Modal
                onHideModal={this.onHideModal}
                showModal={showModal}
                products={wishList}
              />
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
