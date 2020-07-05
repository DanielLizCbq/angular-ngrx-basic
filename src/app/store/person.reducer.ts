import { PersonActions, PersonActionTypes } from './person.actions';
import { Person } from '../person';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface PeopleState extends EntityState<Person> {}

export const peopleAdapter: EntityAdapter<Person> = createEntityAdapter<Person>(
  { selectId: (p: Person) => p._id }
);

export const initialState: PeopleState = peopleAdapter.getInitialState({});

export function reducer(
  state = initialState,
  action: PersonActions
): PeopleState {
  switch (action.type) {
    case PersonActionTypes.PERSON_ALL:
      return state;

    case PersonActionTypes.PERSON_NEW:
      return peopleAdapter.addOne(action.payload.person, state);

    case PersonActionTypes.PERSON_DELETE:
      return peopleAdapter.removeOne(action.payload.id, state);

    case PersonActionTypes.PERSON_UPDATE:
      return peopleAdapter.updateOne(
        { id: action.payload.id, changes: action.payload.changes },
        state
      );

    default:
      return state;
  }
}
