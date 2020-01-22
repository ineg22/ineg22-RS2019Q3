import getSessionData from '../../js/model/getSessionData.js';
import initSessionView from '../../js/view/initSessionView.js';
import initControls from '../../js/controller/initControls.js';

const sessionData = getSessionData();
initSessionView(sessionData);
initControls();
