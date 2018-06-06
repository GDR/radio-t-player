export const actionTypes = {
  PLAY_EPISODE: '@@player/playEpisode',
  AUDIO_LOADED: '@@player/audioLoaded',
  GO_BACKWARD: '@@player/goBackward',
  GO_FORWARD: '@@player/goForward',
}

export const mutationTypes = {
  PLAY: "@@player/play",
  PAUSE: "@@player/pause",
  MUTE: "@@player/mute",
  UNMUTE: "@@player/unmute",
  SET_VOLUME: "@@player/setVolume",
  UPDATE_STATE: "@@player/updateState",
  SET_EPISODE: "@@player/setEpisode",
  SET_CURRENT_TIME: "@@player/setCurrentTime",
  SET_CURRENT_PERCENT: "@@player/setCurrentPercent",
  SET_AUDIO_DURATION: "@@player/setAudioDuration",
}

const getters = {
  getEpisodeUrl(state) {
    return state.currentEpisode.audio_url
  },
  getPlayerState(state) {
    return {
      isPlaying: state.isPlaying,
      currentTime: state.currentTime,
      currentTimeFormatted: formatTime(state.currentTime),
      currentPercentage: (state.currentTime / state.duration) * 100,
      isMuted: state.isMuted,
      volume: state.volume,
      duration: state.duration,
      durationFormatted: formatTime(state.duration),
      jumpedTime: state.jumpedTime,
    }
  }
}

const state = {
  currentEpisode: {
    audio_url: ""
  },

  isPlaying: false,

  currentTime: 0,

  jumpedTime: 0,

  duration: 0,

  isMuted: false,
  volume: 1,
}

const actions = {
  [actionTypes.PLAY_EPISODE](context, episode) {
    context.commit(mutationTypes.PAUSE)
    context.commit(mutationTypes.SET_EPISODE, episode)
    context.commit(mutationTypes.SET_CURRENT_TIME, 0)
  },
  [actionTypes.AUDIO_LOADED](context, duration) {
    context.commit(mutationTypes.SET_AUDIO_DURATION, duration)
    context.commit(mutationTypes.PLAY)
  },
  [actionTypes.GO_BACKWARD]({commit, state}, duration) {
    commit(mutationTypes.SET_CURRENT_TIME, state.currentTime - duration)
  },
  [actionTypes.GO_FORWARD]({commit, state}, duration) {
    commit(mutationTypes.SET_CURRENT_TIME, state.currentTime + duration)
  }
}

const mutations = {
  [mutationTypes.PLAY](state) {
    state.isPlaying = true
  },
  [mutationTypes.PAUSE](state) {
    state.isPlaying = false
  },
  [mutationTypes.MUTE](state) {
    state.isMuted = true
  },
  [mutationTypes.UNMUTE](state) {
    state.isMuted = false
  },
  [mutationTypes.SET_VOLUME](state, volume) {
    state.volume = volume
  },
  [mutationTypes.SET_CURRENT_TIME](state, time) {
    state.jumpedTime = time
  },
  [mutationTypes.UPDATE_STATE](state, currentTime) {
    state.currentTime = currentTime
  },
  [mutationTypes.SET_EPISODE](state, episode) {
    state.currentEpisode = episode
  },
  [mutationTypes.SET_AUDIO_DURATION](state, duration) {
    state.duration = duration
  },
  [mutationTypes.SET_CURRENT_PERCENT](state, percent) {
    state.jumpedTime = parseInt(state.duration * ( percent / 100))
    state.currentTime = parseInt(state.duration * ( percent / 100))
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}

const formatNumber = (num) => {
  return num < 10 ? '0' + parseInt(num) : parseInt(num)
}

const formatTime = (time) => {
  const hours = parseInt(time / (60 * 60))
  const minutes = parseInt(time / 60 - hours * 60)
  const seconds = parseInt(time % 60)
  return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`
}