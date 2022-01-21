import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, FormField, Popup } from "semantic-ui-react";

import { register, authenticate } from "../services/authApi";
import AuthContext from "../AuthContext";

function Register() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [confirmPass, setConfirmPass] = useState({ confirmPassword: "" })
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);

    const history = useHistory();

    useEffect(() => {
        if (auth.user.username !== "") {
            history.push("/")
        }

    }, [auth, history])

    const handleChange = (evt) => {
        const nextCredentials = { ...credentials };
        const nextConfirmPass = { ...confirmPass };
        nextCredentials[evt.target.name] = evt.target.value;
        nextConfirmPass[evt.target.name] = evt.target.value;
        setCredentials(nextCredentials);
        setConfirmPass(nextConfirmPass);
    };

    const handleSubmit = async evt => {
        evt.preventDefault();

        if (credentials.password !== confirmPass.confirmPassword) {
            setErrors(["Password and Confirm Password must match"])
        }
        else {
            register(credentials)
                .then(() => {
                    authenticate(credentials)
                        .then((data) => {
                            auth.login(data.jwt_token);
                            history.push("/create/profile");
                        })
                        .catch(setErrors);
                })
                .catch((error) => setErrors(error));
        }


    }

    return (<div>
        <h2>Register</h2>
        <Form onSubmit={handleSubmit}>

            <FormField>
                <label>Email *</label>
                <input type="text" placeholder='example@example.com' value={credentials.username} name="username" onChange={handleChange} />
            </FormField>

            <FormField>
                <label className="form-label">Password *</label>
                <input className="form-control" type="password" value={credentials.password} name="password" onChange={handleChange} />
            </FormField>

            <FormField>
                <label className="form-label">Confirm Password *</label>
                <input className="form-control" type="password" value={confirmPass.confirmPassword} name="confirmPassword" onChange={handleChange} />
            </FormField>
            <Button type="submit">Submit</Button>
        </Form>
        {/* <p>{errors}</p> */}
    </div>
    )
}

export default Register;