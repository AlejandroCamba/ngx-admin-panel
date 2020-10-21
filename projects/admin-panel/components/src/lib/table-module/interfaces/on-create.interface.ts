import { OPERATION_RESULT } from '../../../types/table/table';

export interface OnCreate {
  onCreateConfirm: (evt: Event) => OPERATION_RESULT | void;
}
