import TrackPlayer, {Event} from 'react-native-track-player';
module.exports = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteJumpForward, async event => {
    let position = await TrackPlayer.getPosition();
    let newPosition = position + 20;
    await TrackPlayer.seekTo(newPosition);
  });
  TrackPlayer.addEventListener(Event.RemoteJumpBackward, async event => {
    let position = await TrackPlayer.getPosition();
    let newPosition = position > 20 ? position - 20 : 0;
    await TrackPlayer.seekTo(newPosition);
  });
};
