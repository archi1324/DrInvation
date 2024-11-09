import logo from './logo.svg';
import './App.css';
import Invaited from "./MainPage/Invited"
import BirthdayInvitationForm from './Formik/BirthdayInvitation';

function App() {
  return (
    <div className='page'>
      <Invaited />
      <BirthdayInvitationForm/>
    </div>
  );
}

export default App;
