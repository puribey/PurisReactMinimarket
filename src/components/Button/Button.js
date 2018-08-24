import React, { Component } from "react";
import { Glyphicon } from "react-bootstrap";

export default class Button extends Component {
  render() {
    const { onClick, className, label, icon, disabled } = this.props;
    return (
      <button className={className} onClick={onClick} disabled={disabled}>
        { icon && <Glyphicon glyph={icon} /> }  {label}
      </button>
    );
  }
}
