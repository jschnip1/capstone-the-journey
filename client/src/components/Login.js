import { useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";
import { authenticate } from "../services/authApi";


function Login() {

    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);

    const history = useHistory();

    const handleChange = (evt) => {
        const nextCredentials = { ...credentials };
        nextCredentials[evt.target.name] = evt.target.value;
        setCredentials(nextCredentials);
    };

    const handleSubmit = async evt => {
        evt.preventDefault();

        authenticate(credentials)
            .then((data) => {

                auth.login(data.jwt_token);
                history.push("/");
            })
            .catch(setErrors); 
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">Username</label>
                    <input className="form-control" type="text" value={credentials.username} name="username" onChange={handleChange} />
                </div>
                <div>
                    <label className="form-label">Password</label>
                    <input className="form-control" type="password" value={credentials.password} name="password" onChange={handleChange} />
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
    
        </div>

    )
}

export default Login;