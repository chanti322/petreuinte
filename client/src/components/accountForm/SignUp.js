import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../styles/SignUpForm.css";

const SignUp = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  const [error, setError] = useState([]);

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);
  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "find-pet");
    data.append("cloud_name", "cloulau");
    fetch("https://api.cloudinary.com/v1_1/cloulau/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return;
    }
    fetch("serverURL/users/signUp", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data);
          console.log(data.error);

          setError(data.error);
        } else {
          history.push("/signUpSuccess");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };
  const checkAndSignup = () => {
    PostData();
  };

  return (
    <div className="app-wrapper">
      <div className="card auth-card input-field">
        <h2 className="welcome">Welcome!</h2>
        <h2 className="title">Create an Account</h2>
        <p>{error}</p>
      </div>
      <input
        className="input"
        type="text"
        placeholder="name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="input"
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <div>
          <p style={{ margin: 10 }}>Upload a profile picture</p>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div>
          <input className="input" type="text" />
        </div>
      </div>
      <button className="submit" onClick={() => checkAndSignup()}>
        SignUp
      </button>
      <h5>
        <Link to="/signInForm">
          <p style={{ marginTop: 30, fontSize: 25 }}>
            Already have an account ?
          </p>
        </Link>
      </h5>
    </div>
    //  </div>
    // </div>
  );
};

export default SignUp;
