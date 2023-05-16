import { reducerCases } from './Constants';

export const initialState = {
  token: null,
  playlists: [],
  user: null,
  selectedPlaylistId: '2HIcZsRev9L3agOHQpEFEK',
  selectedPlaylist: null,
  currentlyPlaying: null,
  playerState: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    case reducerCases.SET_PLAYLISTS: {
      return {
        ...state,
        playlists: action.playlists,
      };
    }
    case reducerCases.SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    case reducerCases.SET_PLAYLIST: {
      return {
        ...state,
        selectedPlaylist: action.payload,
      };
    }
    case reducerCases.SET_PLAYING: {
      return {
        ...state,
        currentlyPlaying: action.currentlyPlaying,
      };
    }
case reducerCases.SET_PLAYER_STATE: {
      return {
        ...state,
        playerState: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
