import React, { Component } from "react";
import "./App.css";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort, loadLists } from "../actions";

import 'whatwg-fetch';

class App extends Component {
  constructor() {
    super();

    this.state = {
        lists: [],
    }
  };


  componentDidUpdate(prevProps){
    if(this.props.lists !== prevProps.lists){
      this.setState({lists: this.props.lists});
    }
  };

  componentDidMount() {
    fetch('http://localhost:8080/trellolist')
        .then(r => r.json())
        .then(json => this.props.loadLists(json))
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

    const submitEditCardList = (editedcard) => {
      fetch('http://localhost:8080/trellocard/'+editedcard.cFinal, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: editedcard.cFinal,lista: editedcard.lFinal})})
          .catch(ex => console.error('Unable to save card', ex));
    }

    if (!destination) {
      return;
    }
    let lFinal = 0;
    let cFinal = 0;

    if(source.droppableId !== destination.droppableId){
      function justNumber(string){
        var numsStr = string.replace(/\D/gim, '');
        return parseInt(numsStr);
      }
      lFinal = justNumber(destination.droppableId);
      cFinal = justNumber(draggableId);
      submitEditCardList({cFinal, lFinal});
    }
    console.log(source.index)
    console.log(destination.index)

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

const mapDispatchToProps = (dispatch) => {
  return{
    loadLists: (lists) => dispatch(loadLists({lists})),
    dispatch
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.lists.lists,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
