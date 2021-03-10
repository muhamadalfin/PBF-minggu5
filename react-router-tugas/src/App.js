import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from "react-router-dom";

export default function NestingAuth() {
  
    return(
    
      <Router>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">Honda Malang</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <AuthButton />
          <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link">
            <Link to="/home">Home</Link>
            <span class="sr-only">(current)</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link">
            <Link to="/shop">Shop</Link>
            <span class="sr-only">(current)</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link">
            <Link to="/private">Login</Link>
            <span class="sr-only">(current)</span>
        </a>
      </li>
      
    </ul>
        </div>
        </nav>
          <hr/>
          
            <Switch>
              <Route exact path="/home">
                <Home/>
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/shop">
                <Shop />
              </Route>
              <PrivateRoute path="/private">
                <ProtectedPage />
              </PrivateRoute>
            </Switch>
      </Router>

  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  let history = useHistory();
  return fakeAuth.isAuthenticated ? (

    <p style={{marginTop:'1000px'}}>
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p></p>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function ProtectedPage(){
  return (
    <h3>Private</h3>
  )
}

function LoginPage(){
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || {from : {pathname: "/"}};
  let login = () =>{
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return(
    <div>
      <center>
      <p>You Must log in to view the page at {from.pathname}</p>
      <button type="button" class="btn btn-info" onClick={login}>Log in</button>
      </center>
    </div>
  )
}

function Home() {
  const isLoggedIn = fakeAuth.isAuthenticated;
    return(
      <div>
        <h2>Harga Honda Malang Maret 2021</h2>
        <p>Informasi price list, daftar harga mobil baru Honda di kareseidenan Malang berlaku bulan Maret 2021</p>
      </div>
      );
  }

function Shop() {
  let {path,url} = useRouteMatch();
  const isLoggedIn = fakeAuth.isAuthenticated;
  if (isLoggedIn == true) {
    return(
      <div>
        <center>
        <h2>TIPE MOBIL HONDA</h2>
        <div class="card card-group" style={{width: '50rem'}}>
            <div class="card">
              <Link to={`${url}/1.5 CVT Harga Rp. 268.950.000`}>New Honda Jazz</Link>
            </div>
  
            <div class="card">
              <Link to={`${url}/1.5 CVT Turbo Harga Rp. 511.950.000`}>New Honda CRV</Link>
            </div>
  
            <div class="card">
              <Link to={`${url}/1.5 CVT Turbo Prestige Harga Rp. 547.950.000`}>Honda Civic Hatchback</Link>
            </div>
          </div>
  
          <Switch>
              <Route exact path="{path}">
                <h3>Please Choose Your Goods!</h3>
              </Route>
  
              <Route path={`${path}/:barangId`}>
                <Barang/>
              </Route>
  
          </Switch>
          </center>
      </div>
    );   
  }
    return(
    <div>
      <center>
      <h2>TIPE MOBIL HONDA</h2>
      <p>You are not logged in</p>
      </center>
    </div>
    ); 
}

function Barang() {
  let{barangId} = useParams();

  return(
    <div>
      <h3>{barangId}</h3>
    </div>
  );
}