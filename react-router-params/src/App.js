import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

export default function  ParamsExample() {
    return  (
      <Router>
        <div>
          <h2>Accounts</h2>
          <ul>
            <li>
              <Link to="/netflix">Netflix</Link>
            </li>
            <li>
              <Link to="/gmail">Gmail</Link>
            </li>
            <li>
              <Link to="/yahoo">Yahoo</Link>
            </li>
            <li>
              <Link to="/amazon">Amazon</Link>
            </li>
          </ul>
          <hr />
          <Switch>
            <Route path="/:id" children={<Child />} />
          </Switch>
        </div>
      </Router>
    );
}
function Child(){
  let { id } = useParams();
  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}


