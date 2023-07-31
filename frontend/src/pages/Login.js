import { useState } from 'react'
import { BASE_URL } from '../constants'
import { useLogin } from '../hooks/useLogin'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {isLoading, error, handleLogin } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(email, password);
    }


    // login form 
    return (
        <div className="login" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <form>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" disabled={isLoading}>Login</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>

    )

}

export default Login;