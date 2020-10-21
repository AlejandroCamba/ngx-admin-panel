import { OPERATION_RESULT } from '../../../types/table/table';

export interface OnUpdate {
  onSaveConfirm: (evt: Event) => OPERATION_RESULT | void;
}
