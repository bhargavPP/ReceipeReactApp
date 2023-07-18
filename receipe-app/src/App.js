
import './App.css';
import { useGlobalContext } from './Context'
import Favourite from './componenets/Favourite';
import Meals from './componenets/Meals';
import Modal from './componenets/Modal';
import Search from './componenets/Search';

function App() {
  const {showModal,favourite} =useGlobalContext();
  return (
    <main>
     <Search/>
     {favourite.length>0 && <Favourite/>}
     <Meals/>
    {showModal && <Modal/>}
    </main>
  )
}

export default App;
