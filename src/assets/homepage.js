/* global AWS_CONNECT_URL, connect  */

window.addEventListener('DOMContentLoaded', () => {
  initPhoneApp(); // https://github.com/amazon-connect/amazon-connect-streams/blob/master/Documentation.md
});

function initPhoneApp() {
  const customersForm = document.getElementById('customers-form');
  const customersSelect = document.getElementById('customers-select');
  const customersFieldset = customersForm.querySelector('fieldset');
  const phoneContainer = document.getElementById('phone-app');

  connect.core.initCCP(phoneContainer, {
    ccpUrl: AWS_CONNECT_URL,
    softphone: {
      allowFramedSoftphone: true,
      disableRingtone: false,
    },
  });

  connect.agent((agent) => {
    customersFieldset.disabled = false;

    customersForm.addEventListener('submit', (event) => {
      const customerData = JSON.parse(customersSelect.value);
      const endpoint = connect.Endpoint.byPhoneNumber(customerData.OutboundNumber);

      agent.connect(endpoint, {
        failure: (err) => {
          const { type, message } = JSON.parse(err);
          alert(`${type}: ${message}`);
        },
      });
      event.preventDefault();
    });
  });
}
