import {useState} from 'react';
import {FaUser} from 'react-icons/fa';
import { toast } from 'react-toastify';

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const {name, email, password, confirmPassword} = formData

    const onChange =(e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
       e.preventDefault()
       
       if (password !== confirmPassword) {
        toast.error("Passwords do not match")
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