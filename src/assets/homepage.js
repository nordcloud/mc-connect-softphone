/* global connect, AWS_CONNECT_URL  */

// https://github.com/amazon-connect/amazon-connect-streams/blob/master/Documentation.md

window.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  const ccpContainer = document.getElementById('ccp-container');
  const callerIdSelect = document.getElementById('caller-id-select');
  const callerIdLoader = document.getElementById('caller-id-loader');
  const callerIdFieldset = document.querySelector('#caller-id-form fieldset');
  const callerIdCheckmark = document.getElementById('caller-id-checkmark');

  callerIdSelect.addEventListener('change', (event) => {
    putCallerId(event.target.value);
  });

  connect.core.initCCP(ccpContainer, {
    ccpUrl: AWS_CONNECT_URL,
    softphone: {
      allowFramedSoftphone: true,
      disableRingtone: false,
    },
  });

  async function putCallerId(callerId) {
    callerIdFieldset.disabled = true;
    callerIdLoader.hidden = false;
    callerIdCheckmark.hidden = true;

    const res = await fetch('/caller-id', {
      method: 'put',
      body: callerId,
    });

    if (res.ok) {
      const { expiresTimestampSeconds } = await res.json();
      const expiresMills = expiresTimestampSeconds * 1000 - Date.now();

      setTimeout(() => {
        callerIdSelect.value = '';
      }, expiresMills);

      callerIdFieldset.disabled = false;
      callerIdLoader.hidden = true;
      callerIdCheckmark.hidden = false;
    } else {
      alert('Failed to set Caller ID');
    }
  }
}
