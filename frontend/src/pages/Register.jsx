import {useState, useEffect} from 'react';
import {FaUser} from 'react-icons/fa';
import { toast } from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import {register, reset} from '../features/auth/authSlice';
import {useNavigate} from 'react-router-dom';

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const {name, email, password, confirmPassword} = formData
    
    //initialise actions
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //get state
    const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

    const onChange =(e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(() => {
        if(isError) {
            toast.error(message)
        } 
        //redirect when logged in
        if(isSuccess || user) {
            navigate('/home')            
        }
        dispatch(reset)

    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onSubmit = (e) => {
       e.preventDefault()
       
       if (password !== confirmPassword) {
            toast.error("Passwords do not match")
       } else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
       }
    }

    return(
        <div>
           <section>
            <h1>
                <FaUser/> Register
            </h1>
            <p>Please create an account</p>
            </section>       
            <section>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input 
                            type='text' 
                            className='form-control' 
                            name='name' 
                            id='name' 
                            value={name} 
                            onChange={onChange} 
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type='text' 
                            className='form-control' 
                            name='email' 
                            id='email' 
                            value={email} 
                            onChange={onChange} 
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type='text' 
                            className='form-control' 
                            name='password' 
                            id='password' 
                            value={password} 
                            onChange={onChange} 
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type='text' 
                            className='form-control' 
                            name='confirmPassword' 
                            id='confirmPassword' 
                            value={confirmPassword} 
                            onChange={onChange} 
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>      
        </div>
    )
}
export default Register