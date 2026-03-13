import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import BrandBar from './BrandBar'

export default function Register() {

    const API = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const [user,setUser] = useState({
        username : "", 
        email : "",
        password : "", 
    })

    const handleChange = (e)=>{
        let {name,value} = e.target;
        setUser((prev)=>({...prev,[name]:value}));
    }

    function isValidUsername(username) {
        const usernameRegex = /^(?=.{3,16}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
        return usernameRegex.test(username);
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

        if(!isValidUsername(user.username)){
            alert("Username must be 3-16 characters long, can contain letters, numbers, underscores, and periods. It cannot start or end with an underscore or period, and cannot have consecutive underscores or periods.");
            return;
        }

        if(!validateEmail(user.email)){
            alert("Please enter a valid email address.");
            return;
        }

        if(!validatePassword(user.password)){
            alert("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }
        
        try{
            const response = await fetch(`${API}/api/auth/register`,{
                    method:'POST',
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(user)
                })

            const data = await response.json()

            console.log(data)

            alert(data.message);

            navigate('/login')

            }catch(error){
                alert("Server Could not Reached")
            }
        }


  return (
    <>
        <BrandBar/>
        <div className='register-container'>
            <h1 className='text-white text-center'>Create Account</h1>
            <h6 className='text-font-blue text-center'>Create your account</h6>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Full Name' name='username' value={user.username} onChange={handleChange} required/><br />
                <input type="email" placeholder='Email' name='email' value={user.email} onChange={handleChange} required/><br />
                <input type="password" placeholder='Password' name='password' value={user.password} onChange={handleChange} required/><br />
                <Link to="/new_password" className='text-font-blue link'>forget password?</Link><br />
                <button type='submit' className='signup-btn my-2'>Sign Up</button><br />
                <p className='text-gray text-center'>Already have an account? <Link to="/login" className='text-font-blue'>Login here.</Link></p>
            </form>
        </div>
    </>
  )
}
