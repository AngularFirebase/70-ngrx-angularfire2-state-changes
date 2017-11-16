import * as actions from './pizza.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

// Main data interface

export interface Pizza {
    id: string;
    size: string;
    status: string; // cooking or delivered
}

// Entity adapter
export const pizzaAdapter = createEntityAdapter<Pizza>();
export interface State extends EntityState<Pizza> { }


export const initialState: State = pizzaAdapter.getInitialState();

// Reducer

export function pizzaReducer(
    state: State = initialState,
    action: actions.PizzaActions) {

    switch (action.type) {

        case actions.ADDED:
            return pizzaAdapter.addOne(action.payload, state)
    
        case actions.MODIFIED:
            return pizzaAdapter.updateOne({ 
                id: action.payload.id, 
                changes: action.payload 
            }, state)
    
        case actions.REMOVED:
            return pizzaAdapter.removeOne(action.payload.id, state)
        
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



