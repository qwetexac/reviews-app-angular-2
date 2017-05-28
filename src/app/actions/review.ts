import { Action } from '@ngrx/store';
import { Review } from '../models/review';

export const LOAD            = '[Review] Load';
export const LOAD_SUCCESS    = '[Review] Load Success';
export const LOAD_FAIL       = '[Review] Load Fail';

export const ADD             = '[Review] Add';
export const ADD_SUCCESS     = '[Review] Add Success';
export const ADD_FAIL        = '[Review] Add Fail';

export const UPDATE          = '[Review] Update';
export const UPDATE_SUCCESS  = '[Review] Update Success';
export const UPDATE_FAIL     = '[Review] Update Fail';

export const REMOVE          = '[Review] Remove';
export const REMOVE_SUCCESS  = '[Review] Remove Success';
export const REMOVE_FAIL     = '[Review] Remove Fail';

export const SELECT          = '[Review] Select';

/*====================================
=            Load Actions            =
====================================*/

export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadActionSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Review[]) { }
}

export class LoadActionFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) { }
}

/*=====  End of Load Actions  ======*/



/*====================================
=            Add Actions            =
====================================*/

export class AddAction implements Action {
  readonly type = ADD;

  constructor(public payload: Review) { }
}

export class AddActionSuccess implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: Review) { }
}

export class AddActionFail implements Action {
  readonly type = ADD_FAIL;

  constructor(public payload: Review) { }
}

/*=====  End of Add Actions  ======*/



/*====================================
=            Update Actions            =
====================================*/

export class UpdateAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: Review) { }
}

export class UpdateActionSuccess implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: Review) { }
}

export class UpdateActionFail implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: Review) { }
}

/*=====  End of Update Actions  ======*/



/*====================================
=            Update Actions            =
====================================*/

export class RemoveAction implements Action {
  readonly type = REMOVE;

  constructor(public payload: Review) { }
}

export class RemoveActionSuccess implements Action {
  readonly type = REMOVE_SUCCESS;

  constructor(public payload: Review) { }
}

export class RemoveActionFail implements Action {
  readonly type = REMOVE_FAIL;

  constructor(public payload: Review) { }
}

/*=====  End of Update Actions  ======*/

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: number) { }
}

export type Actions
	= LoadAction
	| LoadActionSuccess
	| LoadActionFail
	| AddAction
	| AddActionSuccess
	| AddActionFail
  | UpdateAction
  | UpdateActionSuccess
  | UpdateActionFail
  | RemoveAction
  | RemoveActionSuccess
  | RemoveActionFail
  | SelectAction;
