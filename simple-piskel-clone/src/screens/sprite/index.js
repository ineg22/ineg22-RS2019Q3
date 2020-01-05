import getSession from '../../js/model/getSession.js';
import initSessionData from '../../js/view/initSessionData.js';
import initControls from '../../js/controller/initControls.js';

const session = getSession();
initSessionData(session);
initControls(session);
