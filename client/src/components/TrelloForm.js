import React from "react";
import styled from "styled-components";
import Textarea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";

const Container = styled.div`
  width: 284px;
  margin-bottom: 8px;
`;

const StyledCard = styled(Card)`
  min-height: 85px;
  padding: 6px 8px 2px;
`;

const StyledTextArea = styled(Textarea)`
  resize: none;
  width: 100%;
  overflow: hidden;
  outline: none;
  border: none;
`;

const TrelloForm = React.memo(
    ({ list, text = "", onChange, closeForm, saveCard }) => {
      const placeholder = list
        ? "Titulo da lista..."
        : "Titulo do card...";

      
      return (
        <Container>
          <StyledCard>
            <StyledTextArea
              placeholder={placeholder}
              autoFocus
              value={text}
              onChange={e => onChange(e)}
              onBlur={closeForm}
            />
          </StyledCard>
        </Container>
        );
    }
  );
  
  export default TrelloForm;
  