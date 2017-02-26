import { Action } from '../actions/types';
import { MOBILE_REGISTER,
  REGISTER_ERROR,
  REGISTER_FULLFILL,
  GET_AREA_LIST_SUCCESS,
  SET_AREA,
} from '../actions/register';
import { REMOVE_ERROR } from '../actions/global';

type State = {
  pending: boolean,
  error: string,
  success: boolean,
  areaList: [],
  selectedArea: number,
}

const initialState: State = {
  pending: false,
  error: '',
  success: false,
  areaList: undefined,
  selectedArea: '',
};

export default function (state: State = initialState, action: Action) {
  switch (action.type) {
    case MOBILE_REGISTER:
      return {
        ...state,
        pending: true,
        error: '',
      };
    case REGISTER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.message,
      };
    case REGISTER_FULLFILL:
      return {
        ...state,
        pending: false,
        success: true,
      };
    case REMOVE_ERROR:
      return {
        ...state,
        pending: false,
        error: '',
      };
    case GET_AREA_LIST_SUCCESS:
      return {
        ...state,
        areaList: action.list.map(v => ({
          label: v.local_area,
          value: v.marketAreaId,
        })),
      };
    case SET_AREA:
      return {
        ...state,
        selectedArea: action.id,
      };
    default:
      return state;
  }
}
