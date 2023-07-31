import { useState } from 'react'
import { BASE_URL } from '../constants'
import { useSignup } from '../hooks/useSignup'
const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isLoading, error, handleSignup } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSignup(email, password);
       
    }


    // signup form 
    return (
        <div className="signup" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <form>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" disabled={isLoading}>Sign Up</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>

    )

}

export default Signup;