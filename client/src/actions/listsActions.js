import { CONSTANTS } from "../actions";

export const loadLists = (lists) => {
  return{
    type: CONSTANTS.LOAD_LISTS,
    payload: lists,
  };
}

export const addList = (title) => {
  return {
    type: CONSTANTS.ADD_LIST,
    payload: title,
  };
};

export const editTitle = (listID, newTitle) => {
  return {
    type: CONSTANTS.EDIT_LIST_TITLE,
    payload: {
      listID,
      newTitle,
    },
  };
};

export const changeCardList = (id, startID, endID) => {
  return {
    type: CONSTANTS.CHANGE_CARD_LIST,
    payload: {
      id,
      startID,
      endID,
    },
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return {
    type: CONSTANTS.DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type,
    },  
  };
};