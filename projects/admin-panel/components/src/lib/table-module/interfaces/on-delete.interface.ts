import { OPERATION_RESULT } from '../../../types/table/table';

export interface OnDelete {
  onDeleteConfirm: (evt: Event) => OPERATION_RESULT | void;
}