import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import styled from "styled-components";
import { editCard } from "../actions";
import TrelloForm from "./TrelloForm";

const CardContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
`;

const TrelloCard = React.memo(({ text, id, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setText] = useState(text);

  const submitEditCard = (card) => {
    fetch('http://localhost:8080/trellocard/'+card.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card)})
        .catch(ex => console.error('Unable to save card', ex));
  };

  const closeForm = e => {
    setIsEditing(false);
  };

  const handleChange = e => {
    setText(e.target.value);
  };

  const saveCard = e => {
    e.preventDefault();

    submitEditCard({id: id, text: cardText, lista: listID});
    dispatch(editCard(id, listID, cardText));
    setIsEditing(false);
  };

  const renderEditForm = () => {
    return (
      <TrelloForm
      text={cardText}
      value={cardText}
      onChange={handleChange}
      autoFocus
      closeForm={closeForm && saveCard}
      onBlur={saveCard} />
    );
  };

  const renderCard = () => {
    return (
      <Draggable draggableId={String(id)} index={index}>
        {provided => (
          <CardContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onDoubleClick={() => setIsEditing(true)}
          >
            <Card>
            <CardContent>
              <Typography gutterBottom>{cardText}</Typography>
            </CardContent>
          </Card>
          </CardContainer>
        )}
    </Draggable>
  );
};

return isEditing ? renderEditForm() : renderCard();
});

export default connect()(TrelloCard);