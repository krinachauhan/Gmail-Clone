import express from 'express';
import { saveSentEmail , getEmails, moveEmailToBin, toggleStarredEmails, deleteEmails} from '../controller/email-controller.js';

const routes = express.Router();

routes.post('/save', saveSentEmail);
routes.get('/emails/:type', getEmails);
routes.post('/save-draft', saveSentEmail);
routes.post('/bin', moveEmailToBin);
routes.post('/starred', toggleStarredEmails)
routes.delete('/delete', deleteEmails)
export default routes;
