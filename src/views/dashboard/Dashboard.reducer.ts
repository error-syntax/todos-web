import { type Task } from '@/api/types';

const INITIAL_DIALOG_STATE = {
  archiveTaskOpen: false,
  deleteTaskOpen: false,
  taskFormOpen: false,
  task: undefined,
};

interface DIALOG_STATE {
  archiveTaskOpen: boolean;
  deleteTaskOpen: boolean;
  taskFormOpen: boolean;
  task: Task | undefined;
}

interface DIALOG_ACTIONS {
  type: 'TOGGLE_DIALOG';
  payload: {
    key: keyof Omit<DIALOG_STATE, 'task'>;
    data?: Task | undefined;
  };
}

function dialogReducer(
  state: DIALOG_STATE,
  action: DIALOG_ACTIONS,
): DIALOG_STATE {
  switch (action.type) {
    case 'TOGGLE_DIALOG':
      return {
        ...state,
        [action.payload.key]: !state[action.payload.key],
        task: action.payload.data,
      };
    default:
      return state;
  }
}

export type { DIALOG_ACTIONS, DIALOG_STATE };

export { dialogReducer, INITIAL_DIALOG_STATE };
