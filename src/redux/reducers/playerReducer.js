import ActionType from '../constants/actionTypes';

export default function playerReducer(state = { currentTime: '', wordStartTime: 0, duration: 0 }, action) {
    switch (action.type) {
        case ActionType.ASYNC_PLAYER_TRANSCRIPT:
            return { ...state, currentTime: action.playload.currentTime, duration: action.playload.duration }
        case ActionType.SET_AUDIO_TIME_BY_WORD:
            return { ...state, wordStartTime: action.wordStartTime }
        /*case searchActions.GET_ITEMS_BY_SCROLL:
            return { ...state, stories: state.stories.concat(action.stories.hits), storiesLength: action.stories.nbHits, pageNum: action.stories.nbPages, page: action.stories.page }
            */
        default:
            return state;
    }
}