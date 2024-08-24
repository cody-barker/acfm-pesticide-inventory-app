import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div id="background-image" className="wrapper">
      <div className="wrapper__form wrapper__form--login">
        <h1 className="wrapper__title">ACFM Pesticide Inventory</h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
