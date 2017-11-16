import * as actions from './pizza.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

// Main data interface

export interface Pizza {
    id: string;
    size: string;
}

// Entity adapter
export const pizzaAdapter = createEntityAdapter<Pizza>();
export interface State extends EntityState<Pizza> { }


// Default data / initial state

const defaultPizza = {
    ids: ['123'],
    entities: {
        '123': {
            id: '123',
            size: 'small'
        }
    }
}

export const initialState: State = pizzaAdapter.getInitialState();

// Reducer

export function pizzaReducer(
    state: State = initialState,
    action: actions.PizzaActions) {

    switch (action.type) {

        case actions.ADD_ALL:
            return pizzaAdapter.addAll(action.pizzas, state);
        

        default:
            return state;
        }

}

// Create the default selectors

export const getPizzaState = createFeatureSelector<State>('pizza');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = pizzaAdapter.getSelectors(getPizzaState);



