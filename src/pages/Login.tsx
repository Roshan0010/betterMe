/* eslint-disable @typescript-eslint/no-explicit-any */
import graphics from "../assets/BetterMe.jpeg"
import Logo from "../assets/betterMeLogo.png"
import { useRecoilState, useRecoilValue, useSetRecoilState,} from 'recoil'
import { loginData, loginFlag, signupData } from '../store/atoms/AuthAtom';
import axios from "axios";


export const Login = () => {
  const isLogin:boolean=useRecoilValue(loginFlag)
  return (
    <div className='bg-[#020913] flex w-full min-h-[100vh]'>
      {
        isLogin?(<LoginForm/>):(<SignupForm/>)
      }
        
        <img src={graphics}
        className=' w-[40%] min-h-[100vh] '/>
        
    </div>
  )
}

const SignupForm=()=>{
  const [formData, setFormData]=useRecoilState(signupData)
  const setLoginFlag=useSetRecoilState(loginFlag)
  const changeFormData = async(e: { target: { name: any; value: any } }) => {
  // Logs the name attribute of the target element
   setFormData({ ...formData, [e.target.name]: e.target.value });  // Update formData state
    console.log(formData)
  };
  const SignUp = async () => {
    try {
      const response = await axios.post('https://6664540740b208f26dcd.appwrite.global/signup', JSON.stringify(formData));
    
      if (response.status === 200) {
        console.log('Signup successful', response);
        setLoginFlag(true); // Assuming this sets the login state or navigates to the login page
      } else {
        console.error('Signup failed', response);
      }
    } catch (error) {
      console.error('Signup error', error);
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    SignUp();
  };

return (
    <div className=' w-[60%] min-h-[100vh] m-10 p-10 flex flex-col items-center  gap-6'>
       <img src={Logo} className='w-[300px] h-[180px]'/>
       <input className='w-[80%] rounded-md h-12 bg-[#0C2D48] text-white pl-4' placeholder="Name" name='name' onChange={changeFormData}></input>
       <input className='w-[80%] rounded-md h-12 bg-[#0C2D48] text-white pl-4' placeholder="Email" name='email' onChange={changeFormData}></input>
       <input className='w-[80%] rounded-md h-12 bg-[#0C2D48] text-white pl-4' placeholder="Password" name='password' onChange={changeFormData}></input>
       <button className='w-[25%] rounded-xl h-14 bg-[#145DA0] text-white text-2xl' onClick={handleSubmit}>Register</button>

       <div>
       <span className='text-white'>Already Have an Account? </span>
       <button className='text-[#145DA0] underline text-lg'
       onClick={()=>setLoginFlag(true)}>Login</button>
       </div>
       
    </div>
)
}
const LoginForm=()=>{
  const [formData, setFormData]=useRecoilState(loginData)
  const setLoginFlag=useSetRecoilState(loginFlag)
  const changeFormData = async(e: { target: { name: any; value: any } }) => {
  // Logs the name attribute of the target element
   setFormData({ ...formData, [e.target.name]: e.target.value });  // Update formData state
    console.log(formData)
  };


return (
    <div className=' w-[60%] min-h-[100vh] m-10 p-10 flex flex-col items-center  gap-6'>
       <img src={Logo} className='w-[300px] h-[180px]'/>

       <input className='w-[80%] rounded-md h-12 bg-[#0C2D48] text-white pl-4' placeholder="Email" name='email' onChange={changeFormData}></input>
       <input className='w-[80%] rounded-md h-12 bg-[#0C2D48] text-white pl-4' placeholder="Password" name='password' onChange={changeFormData}></input>
       <button className='w-[25%] rounded-xl h-14 bg-[#145DA0] text-white text-2xl'>Login</button>
       <div>
       <span className='text-white'>Donot have an acccount? </span>
       <button className='text-[#145DA0] underline text-lg'
       onClick={()=>setLoginFlag(false)}>create one</button>
       </div>
    </div>
)
}

export default Login
//#282829