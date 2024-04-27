import {useState} from 'react';
import {FaSignInAlt} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../features/auth/authSlice';


function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password} = formData

    //initialise dispatch
    const dispatch = useDispatch();

    //get state
    const {user, isLoading, isSuccess, message} = useSelector(state => state.auth)


    const onChange =(e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
       e.preventDefault()

       const userData = {
        email,
        password
       }

       dispatch(login(userData))

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