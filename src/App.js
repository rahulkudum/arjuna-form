import Form from "./form";
import "./app.css";
import "./css/main.css";
import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

function App() {
 const [latestWebinar, setLatestWebinar] = useState("");

 useEffect(() => {
  axios
   .get("https://arjunadb.herokuapp.com/webinar/latest")
   .then((res1) => {
    let currentWebinar = res1.data;

    axios
     .post("https://arjunadb.herokuapp.com/pwebinar/find", { webinarid: currentWebinar.webinarid })
     .then((res2) => {
      currentWebinar.pwebinar = res2.data;
      setLatestWebinar(`${currentWebinar._id}_${currentWebinar.pwebinar.name}_${currentWebinar.pwebinar.subtitle}_
         ${currentWebinar.pwebinar.series}_${currentWebinar.date}_${currentWebinar.time}`);
     })
     .catch((err) => {
      console.error(err);
     });
   })
   .catch((error) => {
    console.error(error);
   });

  console.log(latestWebinar);
 }, []);

 return (
  <Switch>
   <Route exact path="/">
    {latestWebinar ? (
     <Redirect to={`/${latestWebinar}`} />
    ) : (
     <div className="page-center">
      <div class="spinner-grow text-primary" role="status"></div>
      <br />
      <p>loading...</p>
     </div>
    )}
   </Route>

   <Route path="/:webinarinfo">
    <Form />
   </Route>
  </Switch>
 );
}

export default App;
