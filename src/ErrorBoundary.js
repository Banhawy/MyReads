import React, { Component } from "react";
import "./error.css";
import gif from "./icons/uh-oh.gif";
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-page">
          <h1>Something Went Wrong...</h1>
          <img src={gif} alt="error-gif" />
          <button onClick={() => window.location.reload()}>
            Click here to go back
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
