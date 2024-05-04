import {useState, useEffect} from 'react';
import {FaSignInAlt} from 'react-icons/fa';
import Spinner from '../components/Spinner'
import {useSelector, useDispatch} from 'react-redux';
import {login, reset} from '../features/auth/authSlice';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password} = formData

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
            navigate('/')            
        }
        dispatch(reset())

    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onSubmit = (e) => {
       e.preventDefault()

       const userData = {
        email,
        password
       }
       dispatch(login(userData))

    }

    if (isLoading) {
        return <Spinner/>
    }

    return(
        <div>
           <section>
            <h1>
                <FaSignInAlt/> Login
            </h1>
            <p>Please login to get support</p>
            </section>       
            <section>
                <form onSubmit={onSubmit}>
                
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
                        <button className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>      
        </div>
    )
}
export default Login