import React,{useState} from 'react'
import './SignIn.css'

function SignIn() {
    const url = 'http://localhost:3000/api/auth/register'
   
    const initialFormData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        userName:''
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value
    });
    };

    const handleClick = (e) => {
        e.preventDefault();
        const jsonData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            userName:formData.userName
        }
        console.log(jsonData)
        try {
            
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            }).then((responce) => responce.json())
            .then((data) => {
                const parent = document.getElementById('register');
                const user = document.createElement('div');
            
                if (!data.msg) {
                    user.innerHTML = `Hello ${data.user}<br/> Account created successfully!`;
                } else {
                    user.innerHTML = data.msg;
                }
            
                parent.appendChild(user);
            })
            
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
        <div className="signin-container">
            <h1>Registration Form</h1>
            <form onSubmit={(e) => handleClick(e)}>
                <label>Name:</label>
                <input type="text" name="name" placeholder="Enter your Name" value={formData.name} required onChange={handleChange} />

                <label>Email:</label>
                <input type="email" name="email" placeholder="Enter your email" value={formData.email} required onChange={handleChange} />

                <label>Password:</label>
                <input type="password" required name="password" placeholder="Enter your password"  value={formData.password} onChange={handleChange} />

                <label>Confirm Password:</label>
                <input type="password" required name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />

               
                <label>UserName:</label>
                <input type="text" name="userName"required placeholder="username" value={formData.userName} onChange={handleChange} />

                <button type="submit">Submit Now</button>
                <div id="register"></div>
            </form>
        </div>
    </>
  )
}

export default SignIn