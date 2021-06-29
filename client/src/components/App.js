import React, { Component } from "react";
import "./App.css";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort, changeCardList } from "../actions";

import 'whatwg-fetch';

class App extends Component {
  constructor() {
    super();

    this.state = {
      lists: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:8080/trellolist')
        .then(r => r.json())
        .then(json => this.setState({lists: json}))
        .catch(error => console.error('Error retrieving lists: ' + error));
  }

  submitNewList = (list) => {
    fetch('http://localhost:8080/trellolist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list)})
        .catch(ex => console.error('Unable to save list', ex));
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    const submitEditCardList = ({cardID, listEnd}) => {
      fetch('http://localhost:8080/trellocard/' + cardID, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({lista: listEnd})})
          .catch(ex => console.error('Unable to save card', ex));
    }

    if (!destination) {
      return;
    }

    if(source.droppableId !== destination.droppableId){
      let final = destination.droppableId;
      console.log(final)
      submitEditCardList({draggableId, final});
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { lists } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">
          <div className="title">Trello</div>
          <Droppable droppableId="all-list" direction="horizontal" type="list">
            {(provider) => (
              <div
                {...provider.droppableProps}
                ref={provider.innerRef}
                className="BoardsContainer"
              >
                {lists.map((list, index) => (
                  <TrelloList
                    listID={list.id}
                    key={list.id}
                    title={list.title}
                    cards={list.cards}
                    index={index}
                  />
                ))}
                {provider.placeholder}
                <TrelloActionButton list addListToApi={this.submitNewList} />
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.lists.lists,
  };
};
export default connect(mapStateToProps)(App);
