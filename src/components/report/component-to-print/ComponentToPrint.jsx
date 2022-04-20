import * as React from "react";
import ModalPrint from "../modalPrint/ModalPrint";
export class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { checked: false };
  }
  canvasEl;

  handleCheckboxOnChange = () =>
    this.setState({ checked: !this.state.checked });

  setRef = (ref) => (this.canvasEl = ref);

  render() {
    return (
      <div>
        <style media="print"></style>
      </div>
    );
  }
}
