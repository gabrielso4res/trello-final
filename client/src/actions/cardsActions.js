import { CONSTANTS } from "../actions";

export const addCard = (listID, text, key) => {
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { text, listID, key }
  };
};

export const editCard = (id, listID, newText) => {
  return {
    type: CONSTANTS.EDIT_CARD,
    payload: { id, listID, newText }
  };
};
