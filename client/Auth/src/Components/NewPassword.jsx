import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import BrandBar from './BrandBar';

export default function NewPassword() {
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL;
    const [user,setUser] = useState({
            email:"",
            password:""
        })
  
      const handleChange = (e)=>{
          const {name,value} = e.target;
          setUser((prev)=>({...prev,[name]:value}));
      }

      function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._]).{8,}$/;
        return passwordRegex.test(password);
    }

  
      const handleSubmit = async (e)=>{
          e.preventDefault();

            if(!validateEmail(user.email)){
                alert("Please enter a valid email address.");
                return;
            }

            if(!validatePassword(user.password)){
                alert("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
                return;
            }

          try{
              const response = await fetch(`${API}/api/auth/newpassword/`,{
                      method:'POST',
                      headers:{"Content-Type":"application/json"},
                      body: JSON.stringify(user)
                  })
  
              const data = await response.json()
  
              alert(data.message);

              if (data.message) navigate('/')
  
              }catch(error){
                  alert("Server Could not Reached")
              }
          }


  return (
    <> 
    <BrandBar/>
    <div className='register-container'>
            <h1 className='text-white text-center'>New Password</h1>
            <h6 className='text-font-blue text-center'>Enter the new password below</h6>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Email' name='email' value={user.value} onChange={handleChange} required/><br />
                <input type="password" placeholder='password' name='password' value={user.password} onChange={handleChange} required/><br />
                <button type='submit'  className='signup-btn my-2'>Submit</button><br />
            </form>
        </div>
    </>
  )
}
