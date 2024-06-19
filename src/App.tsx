import './App.css';
import { Routes, Route } from 'react-router-dom';

// Import your page components
import Login from './pages/Login';
import Redirect from './pages/Redirect';
import TransformRedirect from './pages/TransformRedirect';

function App() {
  // const testing: string = useRecoilValue(test);
  // console.log(testing);

  return (
        <Routes>
           
          <Route path='/' element={<Redirect/>}></Route>
          <Route path="/login" element={<Login />} />
         <Route path='/dashboard/:transform' element={<TransformRedirect/>}/>
        </Routes>
  )
}

export default App;


//register
