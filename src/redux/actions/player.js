import ActionType from '../constants/actionTypes'

export const playerActions = {
    asyncPlayerwithTranscript: (currentTime,duration) => {
        return { type: ActionType.ASYNC_PLAYER_TRANSCRIPT,playload : {currentTime,duration} }
    },
    setAudioTimebyWordTime: (wordStartTime) => {
        return { type: ActionType.SET_AUDIO_TIME_BY_WORD, wordStartTime }
    }/*,
    searchStories:(query) =>{
        return { type: ActionType.SEARCH_STORIES, query }
    }*/
}
export default playerActions;