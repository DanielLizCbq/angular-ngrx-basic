import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Person } from './person';
import * as faker from 'faker';
import { Store } from '@ngrx/store';
import {
  PersonNew,
  PersonAll,
  PersonUpdate,
  PersonDelete,
} from './store/person.actions';
import { AppState } from './store';
import * as fromPersonSelectors from './store/person.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  people$: Observable<Person[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new PersonAll());
    // this.people$ = this.store.pipe(select('people'));
    // this.people$ = this.store.select(selectPeople);
    // this.store.select(selectPeopleCount).subscribe((n) => console.log(n));
    this.people$ = this.store.select(fromPersonSelectors.selectAll);
  }

  addNew(): void {
    const person: Person = {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
      age: Math.round(Math.random() * 100),
      _id: new Date().getMilliseconds().toString(),
    };
    this.store.dispatch(new PersonNew({ person }));
  }

  delete(p: Person): void {
    this.store.dispatch(new PersonDelete({ id: p._id }));
  }

  update(p: Person): void {
    const person: Person = {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
      age: Math.round(Math.random() * 100),
    };
    this.store.dispatch(
      new PersonUpdate({ id: p._id, changes: { ...p, ...person } })
    );
  }
}
