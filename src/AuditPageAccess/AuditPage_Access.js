import React, { Component } from "react";
import { Router, Route } from "react-router-dom";

export class AuditPage_Access extends Component {
  render() {
    return (
      <div>
        <p>Access Denied!, Only audit users have access to this page. </p>
      </div>
    );
  }
}

export default AuditPage_Access;
