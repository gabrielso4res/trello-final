import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import TextArea from "react-textarea-autosize";
import { Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";
import { lighten } from "polished";

export class TrelloActionButton extends Component {
  constructor() {
    super();

    this.state = {
      lists: []
    }
  }

  state = {
    formOpen: false,
    text: "",
  };

  openForm = () => {
    this.setState({
      formOpen: true,
    });
  };

  closeForm = () => {
    this.setState({
      formOpen: false,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      ...this.state,
      text: e.target.value,
    });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

    if (text) {
      dispatch(addList(text));
      this.setState({ text: "" });
    }
  };

  handleAddCard = () => {
    const { dispatch, listID, addToApi } = this.props;
    const { text } = this.state;

    if (text) {
      addToApi({text, lista: listID});
      dispatch(addCard(listID, text));
      this.setState({ text: "" });
    }
  };

  renderAddButton = () => {
    const { list } = this.props;

    const buttonText = list ? "Adicionar nova lista" : "Adicionar novo card";
    const buttonTextOpacity = list ? 1 : 1;
    const buttonTextColor = list ? "black" : "black";
    const buttonTextBackground = list
      ? `${lighten(0.1, "#7159c1")}`
      : `${lighten(0.1, "#7159c1")}`;

    return (
      <div
        className="openForButtonGroup"
        onClick={this.openForm}
        style={{
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          backgroundColor: buttonTextBackground,
        }}
      >
        <AddIcon>add</AddIcon>
        <p>{buttonText}</p>
      </div>
    );
  };

  rederForm = () => {
    const { list } = this.props;

    const placeholder = list ? "Título da lista" : "Título do card";

    const buttonTitle = list ? "Adicionar lista" : "Adicionar card";

    return (
      <div>
        <Card
          style={{
            minHeight: 80,
            minWidth: 272,
            padding: "6px 8px 2px",
          }}
        >
          <TextArea
            className="cardTextArea"
            placeholder={placeholder}
            value={this.state.text}
            onChange={this.handleInputChange}
            onBlur={this.closeForm}
            autoFocus
          />
        </Card>
        <div className="formButtonGroup">
          <Button
            type={list ? null : "submit"}
            onMouseDown={list ? this.handleAddList : this.handleAddCard}
            onSubmit={list ? null : this.handleAddCard}
            variant="contained"
          >
            {buttonTitle}
          </Button>
          <CloseIcon
            style={{
              marginLeft: 8,
              cursor: "pointer",
            }}
            onClick={this.closeForm}
          >
            Close
          </CloseIcon>
        </div>
      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.rederForm() : this.renderAddButton();
  }
}

export default connect()(TrelloActionButton);
