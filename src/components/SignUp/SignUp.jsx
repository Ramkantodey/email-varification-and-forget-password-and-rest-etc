import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from '../../firebase.init';
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        const photo = event.target.photo.value;

        const terms = event.target.terms.checked;

        // reset error  and status
        setErrorMessage('');
        setSuccess(false)

        if (!terms) {
            setErrorMessage('Please accept Our terms and condition.')
            return
        }

        if (password.length < 6) {
            setErrorMessage('Password should be 6 charters or longer');
            return
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('At least one uppercase, one lowercase, one number, one special character');
            return
        }

        // create user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
                setSuccess(true)

                // send verification email address
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log('verification email sent');
                    })

                //update profile name and photoURL
                const profile = {
                    displayName: name,
                    photoURL: photo
                }

                updateProfile(auth.currentUser, profile)
                    .then(console.log('user profile updated'))
            })
            .catch(error => console.log('user profile update error', error))
            .catch(error => {
                console.log("ERROR: ", error.message);
                setErrorMessage(error.message)
                setSuccess(false);
            })
    }

    return (

        <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-3xl text-center pt-5 font-bold">Sign Up now!</h1>

            <form onSubmit={handleSignUp} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" name="photo" placeholder="Photo" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type={showPassword ? 'text' : 'password'} name="password" placeholder="password" className="input input-bordered" required />
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="btn btn-xs absolute right-4 top-12">
                        {
                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }
                    </button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input type="checkbox" name="terms" className="checkbox" />
                        <span className="label-text ml-3">Accept Our Terms And Condition</span>

                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Sign Up</button>
                </div>
            </form>
            {
                errorMessage && <p className="text-red-500">{errorMessage}</p>
            }
            {
                success && <p className="text-green-600">Sign up is Successful</p>
            }
            <p className="m-2">Already have an account? Please <Link to='/login'>Login</Link></p>
        </div>

    );
};

export default SignUp;