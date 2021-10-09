import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import initializeAuthentication from './agunBase/firebase.initialize';
import { GoogleAuthProvider, getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';

initializeAuthentication();

function App() {
  //all auth Provider will be here
  const Google = new GoogleAuthProvider();
  const Github = new GithubAuthProvider();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAlredyUser, setIsAlredyUser] = useState(false);
  const [user, SetUser] = useState('');
  //this function just check is the user is alredy register if user checked it will count alredy register
  const handleCheckBox = e => {

    setIsAlredyUser(e.target.checked);

  }
  const handleRegistration = () => {
    console.log("Resitiration clicked");

  }

  const getEmail = e => {
    setEmail(e.target.value);
  }
  const getPassword = e => {
    setPassword(e.target.value);

  }
  //this handle...(google/github) sign in with 
  const handleGoogle = () => {
    handleAuthProviderSigin(Google);

  }
  const handleGithub = () => {
    handleAuthProviderSigin(Github);
  }

  //this function handle  sigin with pop up for google or github we just need to pass the Authentication Provider
  const handleAuthProviderSigin = (provider) => {
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {

        const { displayName, email, photoURL } = result.user;
        const logedUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        }
        SetUser(logedUser);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  // function end here









  console.log(isAlredyUser);
  return (<div className="App">
    {!user.name ?
      <div className='d-flex mar-top'>
        <div className="container my-auto">
          <div className="card shadow sm-w-50 mx-auto  w-50" >

            <div className="card-body ">
              <h5 className="card-title text-center h3">{isAlredyUser ? "Sign In" : "Sign Up"}</h5>
              <div className="d-flex flex-row gap-3  justify-content-center m-3">


                <div>
                  <button onClick={handleGoogle} className='btn btn-danger'><i className="bi bi-google"></i>  Sign in With Google</button>
                </div>
                <div>
                  <button onClick={handleGithub} className='btn btn-dark'><i className="bi bi-github"></i>  Sign in With Github</button>
                </div>


              </div>


              <div className="d-flex flex-column gap-3 justify-content-center mt-5 m-3" >

                <form className='g-2'>

                  {
                    !isAlredyUser && <div>
                      <input type="text" className="form-control mb-3" id="inputEmail3" placeholder="Name" />
                    </div>
                  }
                  <div>

                    <input onBlur={getEmail} type="email" className="form-control mb-3" placeholder="Email" />
                  </div>
                  <div>
                    <input onBlur={getPassword} type="password" className="form-control mb-3" id="inputEmail3" placeholder="Paswword" />
                  </div>
                </form>
                <div>
                  <button type='submit' onClick={handleRegistration} className="w-100 btn btn-success  p-1 text-white"> <i class="bi bi-box-arrow-in-right">  </i> {isAlredyUser ? "Sign In" : "Register"}</button>

                </div>

                <div>
                  <input onChange={handleCheckBox} type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label ms-1" htmlFor="exampleCheck1">   Already Registered?</label>
                </div>



              </div>




            </div>
          </div>



        </div>
      </div>
      :

      <div className="container text-center">

        <h3>Welcome {user.name}</h3>
        <p>I know Your Email is {user.email}</p>
        <img src={user.photo} alt="" />

      </div>

    }



  </div>
  );
}

export default App;
