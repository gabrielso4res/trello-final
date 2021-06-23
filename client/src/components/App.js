import React, { Component } from "react";
import "./App.css";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions";

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

  submitNewCard = (card) => {
    fetch('http://localhost:8080/trellolist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card)
    }).then(r => r.json())
        .then(json => {
          let cards = this.state.cards;
          cards.push({id: json.id, text: json.text});
          this.setState({cards});
        })
        .catch(ex => console.error('Unable to save card', ex));
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
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
                <TrelloActionButton list addToApi={this.submitNewCard} />
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
