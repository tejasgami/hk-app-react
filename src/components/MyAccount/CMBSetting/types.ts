import { Status } from 'Models/Status';

export const SETTING_INFORMATION_SAVE = 'SETTING_INFORMATION_SAVE';
export const SETTING_INFORMATION_GET = 'SETTING_INFORMATION_GET';
export const SETTING_INFORMATION_SAVE_SUCCESS = 'SETTING_INFORMATION_SAVE_SUCCESS';
export const SETTING_INFORMATION_STATUS = 'SETTING_INFORMATION_STATUS';

export type IState = {
  status: Status,
  getCmbSetting: object[]
};
