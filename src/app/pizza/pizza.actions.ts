import { Action } from '@ngrx/store';
import { Pizza }  from './pizza.reducer';

export const QUERY    = '[Pizza] query pizzas';

export const ADDED    = '[Pizza] added';
export const MODIFIED = '[Pizza] modified';
export const REMOVED  = '[Pizza] removed';

export const UPDATE   = '[Pizza] update';
export const SUCCESS  = '[Pizza] update success';

// Initial query
export class Query implements Action {
    readonly type = QUERY;
    constructor() {}
  }

// AngularFire2 StateChanges
export class Added implements Action {
    readonly type = ADDED;
    constructor(public payload: Pizza) {}
}

export class Modified implements Action {
    readonly type = MODIFIED;
    constructor(public payload: Pizza) {}
}

export class Removed implements Action {
    readonly type = REMOVED;
    constructor(public payload: Pizza) {}
}


// Run a Firestore Update
export class Update implements Action {
    readonly type = UPDATE;
    constructor(
        public id: string,
        public changes: Partial<Pizza>,
      ) { }
}

export class Success implements Action {
    readonly type = SUCCESS;
    constructor() {}
}

export type PizzaActions = 
    Query | 
    Added | 
    Modified | 
    Removed | 
    Update | 
    Success;