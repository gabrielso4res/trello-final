import React, { useState } from "react";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { editTitle, deleteList } from "../actions";
import { connect } from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import 'whatwg-fetch';

const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ListTitle = styled.h4`
  transition: background 0.3s ease-in;
  ${TitleContainer}:hover & {
    background: #ccc;
  }
`;

function TrelloList({ title, cards, listID, index, dispatch, lIdFront }) {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);

  const submitNewCard = (card) => {
    fetch('http://localhost:8080/trellocard/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card)})
        .catch(ex => console.error('Unable to save card', ex));
  };

  const submitEditList = (list) => {
    fetch('http://localhost:8080/trellolist/' + list.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list)})
        .catch(ex => console.error('Unable to save list', ex));
  };

  const submitDeleteList = (list) => {
    fetch('http://localhost:8080/trellolist/' + list.id, {
      method: 'DELETE'})
        .catch(ex => console.error('Unable to delete list', ex));
  };

  const StyledInput = styled.input`
    width: 100%;
    border: none;
    outline-color: blue;
    border-radius: 3px;
    margin-bottom: 3px;
    padding: 5px;
  `;

  const renderEditInput = () => {
    return (
      <form onSubmit={handleFinishEditing}>
        <StyledInput
          type="text"
          value={listTitle}
          onChange={handleChange}
          autoFocus
          onBlur={handleFinishEditing}
        />
      </form>
    );
  };

  const handleChange = (e) => {
    e.preventDefault();
    setListTitle(e.target.value);
  };

  const handleFinishEditing = (e) => {
    setIsEditing(false);

    submitEditList({id: listID, title: listTitle, idFront : lIdFront});
    dispatch(editTitle(lIdFront, listTitle));
  };

  const handleDeleteList = (e) => {
    dispatch(deleteList(listID));
    submitDeleteList({id: listID})
  }

  return (
    <Draggable draggableId={String(("l"+listID))} index={index}>
      {(provider) => (
        <div
          {...provider.draggableProps}
          {...provider.dragHandleProps}
          ref={provider.innerRef}
          className="ListContainer"
        >
          <Droppable droppableId={String(("l"+listID))} type="card">
            {(provider) => (
              <div
              {...provider.droppableProps}
              ref={provider.innerRef}>
                {isEditing ? (
                  renderEditInput()
                ) : (
                  <TitleContainer onClick={() => setIsEditing(true)}>
                    <ListTitle>{listTitle}</ListTitle>
                    <DeleteIcon
                        style={{cursor: "pointer"}}
                        fontSize="small"
                        onClick={handleDeleteList}
                    >
                      Delete
                    </DeleteIcon>
                  </TitleContainer>
                )}
                {cards.map((card, index) => (
                  <TrelloCard
                    index={index}
                    id={card.id}
                    key={card.id}
                    text={card.text}
                    listID={listID}
                    lIdFront={card.lIdFront}
                  />
                ))}
                <TrelloActionButton listID={listID} lIdFront={lIdFront} addCardToApi={submitNewCard} />
                {provider.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
export default connect()(TrelloList);
