
import route from './router.js'
import Home from '/imports/ui/pages/home/Home.jsx';
import Login from '/imports/ui/pages/login/Login.jsx';
import Register from '/imports/ui/pages/register/Register.jsx';
import Conversations from '/imports/ui/pages/conversations/Conversations.jsx';
import ChatSpace from '/imports/ui/pages/chatSpace/ChatSpace.jsx';

route('/', Home);
route('/login',Login);
route('/register',Register);
route('/conversations',Conversations);
route('/chatSpace/:id',ChatSpace);