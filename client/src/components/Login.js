import { useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";
import { authenticate } from "../services/authApi";
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";


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
                history.push("/profile");
            })
            .catch(setErrors); 
    }

    return (
        // <div>
        //     <h2>Login</h2>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label className="form-label">Username</label>
        //             <input className="form-control" type="text" value={credentials.username} name="username" onChange={handleChange} />
        //         </div>
        //         <div>
        //             <label className="form-label">Password</label>
        //             <input className="form-control" type="password" value={credentials.password} name="password" onChange={handleChange} />
        //         </div>
        //         <Button className="btn btn-primary" type="submit">Submit</Button>
        //     </form>
    
        // </div>

        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                <Icon name="map signs" /> Log-in to your account
            </Header>
            <Form size='large' onSubmit={handleSubmit}>
                <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' type="text" value={credentials.username} name="username" onChange={handleChange} />
                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' value={credentials.password} name="password" onChange={handleChange} />
        
                <Button color='teal' fluid size='large' type="submit"> 
                    Login
                </Button>
                </Segment>
            </Form>
            <Message>
                New to us? <Link to="/register">Register</Link>
            </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Login;