

export type Action =
    { type: 'PUSH_NEW_ROUTE', route: string }
  | { type: 'POP_ROUTE' }
  | { type: 'POP_TO_ROUTE', route: string }
  | { type: 'REPLACE_ROUTE', route: string }
  | { type: 'REPLACE_OR_PUSH_ROUTE', route: string }
  | { type: 'OPEN_DRAWER'}
  | { type: 'CLOSE_DRAWER'}
  | { type: 'SET_USER', name: string}
  | { type: 'SET_LIST', list: string}
  | { type: 'SMS_TIMING_START', second: number }
  | { type: 'SMS_TIMING_CONTINUE' }
  | { type: 'SMS_TIMING_FINISH' }

export type Dispatch = (action:Action | Array<Action>) => any;
export type GetState = () => Object;
