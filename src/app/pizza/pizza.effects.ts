import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Pizza } from './pizza.reducer';
import * as pizzaActions from './pizza.actions';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { switchMap, mergeMap, map } from 'rxjs/operators';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class PizzaEffects {


    @Effect()
    query$: Observable<Action> = this.actions$.ofType(pizzaActions.QUERY).pipe(
      switchMap(action => {
        console.log(action)
        return this.afs.collection<Pizza>('pizzas', ref =>  {
          return ref.where('status', '==', 'cooking')
        })
        .stateChanges()
      }),
      mergeMap(actions =>  actions),
      map(action => {
        return {
          type: `[Pizza] ${action.type}`,
          payload: { 
            id: action.payload.doc.id, 
            ...action.payload.doc.data() 
          }
        };
      })
    );



    @Effect() update$: Observable<Action> = this.actions$.ofType(pizzaActions.UPDATE).pipe(
        map((action: pizzaActions.Update) => action),
        switchMap(data => {
            const ref = this.afs.doc<Pizza>(`pizzas/${data.id}`)
            return Observable.fromPromise( ref.update(data.changes) )
        }),
        map(() => new pizzaActions.Success())
    )

    constructor(private actions$: Actions, private afs: AngularFirestore) { }    
}