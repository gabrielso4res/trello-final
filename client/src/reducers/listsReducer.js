import { CONSTANTS } from "../actions";

const listsReducer = (state = {lists:[]}, action) => {
  switch (action.type) {
    case CONSTANTS.LOAD_LISTS:
      return {...state, lists: action.payload.lists}

    case CONSTANTS.ADD_LIST:
      let maxId = Math.max((state.lists.map((list) => {return list.id})));
      const newList = {
        title: action.payload,
        cards: [],
        lIdFront: "l" + (state.lists.length + 1),
        id: maxId += 1,
      };

      return {...state, lists: [...state.lists, newList]};

    case CONSTANTS.ADD_CARD: {
      let qtdCards = 0;
      state.lists.map((list) => {return qtdCards += list.cards.length});
      const newCard = {
        text: action.payload.text,
        cIdFront: "c"  + (qtdCards + 1)/*(state.lists.find((list) => action.payload.listID === list.id).cards.length + 1) + "l" + action.payload.listID*/,
        id: qtdCards + 1 /*(state.lists.find((list) => action.payload.listID === list.id).cards.length + 1)*/,
      };

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
        const list = state.lists.find((list) => droppableIdStart === list.lIdFront);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.lists.find((list) => droppableIdStart === list.lIdFront);
        const card = listStart.cards.splice(droppableIndexStart, 1);
        const listEnd = state.lists.find((list) => droppableIdEnd === list.lIdFront);
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return {...state, lists: [...state.lists]};

    case CONSTANTS.EDIT_LIST_TITLE: {
      const { listID, newTitle } = action.payload;

      const newState = state.lists.map((list) => {
        if (list.lIdFront === listID) {
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
        if (list.lIdFront === listID) {
          const cardEdited = list.cards.map(card => {
            if (card.cIdFront === id) {
              card.text = newText;
              return card;
            }
            return card;
          });
          return { ...list, cards: cardEdited };
        }
        return list;
      })
      };
    }

    case CONSTANTS.DELETE_CARD: {
      const { id, listID } = action.payload;
      return {
        ...state, lists: state.lists.map(list => {
          if (list.id === listID) {
            const newCards = list.cards.filter(card => card.id !== id);
            return {...list, cards: newCards};
          } else {
            return list;
          }
        })
      };
    }

    case CONSTANTS.DELETE_LIST: {
      const { listID } = action.payload;
      return {...state, lists: state.lists.filter(list => list.id !== listID)};
    }

    default:
      return state;
  }
};

export default listsReducer;
