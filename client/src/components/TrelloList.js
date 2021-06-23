import React, { useState } from "react";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { editTitle } from "../actions";
import { connect } from "react-redux";
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

function TrelloList({ title, cards, listID, index, dispatch, submitNewCard = () => {} }) {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);

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
    dispatch(editTitle(listID, listTitle));
  };

  return (
    <Draggable draggableId={String(listID)} index={index}>
      {(provider) => (
        <div
          {...provider.draggableProps}
          {...provider.dragHandleProps}
          ref={provider.innerRef}
          className="ListContainer"
        >
          <Droppable droppableId={String(listID)} type="card">
            {(provider) => (
              <div
              {...provider.droppableProps}
              ref={provider.innerRef}>
                {isEditing ? (
                  renderEditInput()
                ) : (
                  <TitleContainer onClick={() => setIsEditing(true)}>
                    <ListTitle>{listTitle}</ListTitle>
                  </TitleContainer>
                )}
                {cards.map((card, index) => (
                  <TrelloCard
                    index={index}
                    id={card.id}
                    key={card.id}
                    text={card.text}
                    listID={listID}
                  />
                ))}
                <TrelloActionButton listID={listID} submitNewCard={submitNewCard} />
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
