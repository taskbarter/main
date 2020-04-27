import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  REMOVE_SKILL,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
        profiles: null,
        loading: false,
      };
    case REMOVE_SKILL:
      state.profile.skills.splice(action.payload, 1);

      return {
        ...state,
        profile: {
          ...state.profile,
          skills: state.profile.skills,
        },
      };
    default:
      return state;
  }
}
