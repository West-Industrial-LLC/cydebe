import { JitsiMeeting } from '@jitsi/react-sdk';

export default function Meeting() {
  return (
    <JitsiMeeting
      roomName="cydebe-room"
      configOverwrite={{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        startScreenSharing: false,
        enableEmailInStats: false
      }}
      interfaceConfigOverwrite={{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
      }}
      userInfo={{
        displayName: 'User'
      }}
      onApiReady={(externalApi) => {
        // Handle Jitsi API ready
      }}
      getIFrameRef={(iframeRef) => { iframeRef.style.height = '400px'; }}
    />
  );
}
