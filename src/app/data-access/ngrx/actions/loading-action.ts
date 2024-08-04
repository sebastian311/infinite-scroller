import { createAction } from '@ngrx/store';

// Action to indicate loading has started
export const startLoading = createAction('[App] Start Loading');

// Action to indicate loading has stopped
export const stopLoading = createAction('[App] Stop Loading');