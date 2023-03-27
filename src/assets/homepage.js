/* global connect, AWS_CONNECT_URL  */

// https://github.com/amazon-connect/amazon-connect-streams/blob/master/Documentation.md

window.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  const callerIdSelect = document.getElementById('caller-id-select');
  const ccpContainer = document.getElementById('ccp-container');

  connect.core.initCCP(ccpContainer, {
    ccpUrl: AWS_CONNECT_URL,
    softphone: {
      allowFramedSoftphone: true,
      disableRingtone: false,
    },
  });

  callerIdSelect.addEventListener('change', (event) => {
    fetch('/caller-id', {
      method: 'put',
      body: event.target.value,
    });
  });
}
