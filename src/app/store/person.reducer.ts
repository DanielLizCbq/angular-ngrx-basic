import { PersonActions, PersonActionTypes } from './person.actions';
import { Person } from '../person';

export const initialState: Person[] = [];

export function reducer(state = initialState, action: PersonActions): Person[] {
  switch (action.type) {
    case PersonActionTypes.PERSON_ALL:
      return state;

    case PersonActionTypes.PERSON_NEW:
      return state.concat([action.payload.person]);

    case PersonActionTypes.PERSON_DELETE:
      return state.filter((p) => p._id !== action.payload.id);

    case PersonActionTypes.PERSON_UPDATE:
      const people = state.slice();
      const i = people.findIndex((p) => p._id === action.payload.person._id);
      if (i >= 0) {
        people[i] = action.payload.person;
      }
      return people;

    default:
      return state;
  }
}
