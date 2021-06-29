import { CONSTANTS } from "../actions";
import 'whatwg-fetch';

let listID = 2;
let cardID = 2;

const initialState = {
    lists: [],
};

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        cards: [],
        id: `list-${listID}`,
      };
      listID += 1;
      return {...state, lists: [...state.lists, newList]};

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`,
      };
      cardID += 1;

      const newState = state.lists.map((list) => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });

      return {...state, lists: newState};
    }

  case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type,
      } = action.payload;
      
      const newState = [...state.lists];

      if (type === "list") {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        return {...state, lists: newState};
      }

      if (droppableIdStart === droppableIdEnd) {
        const list = state.lists.find((list) => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.lists.find((list) => droppableIdStart === list.id);
        const card = listStart.cards.splice(droppableIndexStart, 1);
        const listEnd = state.lists.find((list) => droppableIdEnd === list.id);
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return {...state, lists: newState};

    case CONSTANTS.EDIT_LIST_TITLE: {
      const { listID, newTitle } = action.payload;

      const newState = state.lists.map((list) => {
        if (list.id === listID) {
          return {
            ...list,
            title: newTitle,
          };
        } else {
          return list;
        }
      });
      return {...state, lists: newState};
    }

    case CONSTANTS.EDIT_CARD: {
      const { id, listID, newText } = action.payload;

      return {...state, lists: state.lists.map(list => {
        if (list.id === listID) {
          const cardEdited = list.cards.map(card => {
            if (card.id === id) {
              card.text = newText;
              return card;
            }
            return card;
          });
          return { ...list, cards: cardEdited };
        }
        return list;
      })
    };}

    default:
      return state;
  }
};

export default listsReducer;
