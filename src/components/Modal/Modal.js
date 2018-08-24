import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Button from "../Button/Button";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: props.showModal
    };
    this.totalPriceCount = this.totalPriceCount.bind(this);
  }

  totalPriceCount(products) {
    let totalPrice = 0;
    // adding up all item prices to get a total price
    products.forEach(item => {
      const itemPrice = parseFloat(item.price.substr(1));
      totalPrice = totalPrice + itemPrice;
    });
    return totalPrice.toFixed(2);
  }

  render() {
    const { showModal } = this.state;
    const { onHideModal, products } = this.props;
    return (
      <Modal
        show={showModal}
        onHide={onHideModal}
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <h3 className="modal-header-title">
            Gracias por realizar su compra en Puri's Market!
          </h3>
          {products.map((item, index) => {
            return (
              <div key={index} className="modal-body-content">
                <p>{item.name}</p>
                <p>{item.price}</p>
              </div>
            );
          })}
          <div className="modal-body-end">
            <p>Total = ${this.totalPriceCount(products)}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-footer-actions">
            <Button
              onClick={onHideModal}
              label={"Volver al mercado"}
              className={"button-done"}
            />
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
