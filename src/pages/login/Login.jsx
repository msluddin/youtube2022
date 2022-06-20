import axios from "axios"
import { useContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./login.css"

const Login = () => {
    const[credentials, setCredentials] = useState({
        password: undefined,
        password: undefined,
    })

    const {loading, error, dispatch} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) =>({
            ...prev, [e.target.id]: e.target.value,
        }))
    }

    const handleClick = async e => {
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try {
            const res = await axios.post("/auth/login", credentials);
            dispatch({type: "LOGIN_SUCCESS", payload: res.data.details})
            navigate("/")
        } catch (err) {
            dispatch({type:"LOGIN_FAILURE", payload: err.response.data})
        }
    }

    return <div className="login">
        <div className="lContainer">
            <input type="text" className="lInput" id="username" placeholder="username" onChange={handleChange} />
            <input type="password" className="lInput" id="password" placeholder="password" onChange={handleChange} />
            <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>

}

export default Login