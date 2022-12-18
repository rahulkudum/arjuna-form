import React, { useEffect, useState } from "react";
import "./form.css";
import logo from "./images/logo.png";
import iceo from "./images/ceo.png";
import iceo1 from "./images/ceo1.JPG";
import ilogo from "./images/arjunalogowithmotto.jpg";
import { Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";
import Carousel from "react-material-ui-carousel";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Facebook, Mail, YouTube } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import $ from "jquery";
import AddToCalendar from "@culturehq/add-to-calendar";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const useStyles = makeStyles((theme) => ({
 backdrop: {
  zIndex: 1,
  color: "#fff",
 },
}));

function Form(props) {
 let { webinarinfo } = useParams();
 let webinarId = webinarinfo.slice(0, webinarinfo.indexOf("_"));
 let webinarinfo1 = webinarinfo.slice(webinarinfo.indexOf("_") + 1);
 let title = webinarinfo1.slice(0, webinarinfo1.indexOf("_"));
 let webinarinfo2 = webinarinfo1.slice(webinarinfo1.indexOf("_") + 1);
 let subtitle = webinarinfo2.slice(0, webinarinfo2.indexOf("_"));
 let webinarinfo3 = webinarinfo2.slice(webinarinfo2.indexOf("_") + 1);
 let series = webinarinfo3.slice(0, webinarinfo3.indexOf("_"));
 let webinarinfo4 = webinarinfo3.slice(webinarinfo3.indexOf("_") + 1);
 let dateString = webinarinfo4.slice(0, webinarinfo4.indexOf("_"));
 var d_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 let date =
  new Date(dateString).toLocaleString("default", { month: "short" }) + " " + new Date(dateString).getUTCDate() + ", " + d_names[new Date(dateString).getDay()];
 let timeString = webinarinfo4.slice(webinarinfo4.indexOf("_") + 1);

 var H = +timeString.slice(0, 2);
 var h = H % 12 || 12;
 var ampm = H < 12 || H === 24 ? "AM" : "PM";
 timeString = h + timeString.slice(2) + " " + ampm;

 let { path } = useRouteMatch();
 const [webinar, setWebinar] = useState({});
 const [name, setName] = useState("");
 const [number, setNumber] = useState();
 const [dob, setDob] = useState("");
 const [email, setEmail] = useState("");
 const [gender, setGender] = useState("");
 const [role, setRole] = useState("");
 const [newStudent, setNewStudent] = useState("");
 const [done, setDone] = useState(false);
 const [id, setId] = useState("");
 const [images, setImages] = useState([]);
 const [backdrop, setBackdrop] = useState(false);
 const [description, setDescription] = useState([]);
 const [part, setPart] = useState({ email: "", gender: "", role: "", dob: "" });
 const classes = useStyles();

 useEffect(() => {
  axios
   .post("https://arjunadb.herokuapp.com/webinar/find", { webinarid: webinarId })
   .then((res) => {
    axios
     .post("https://arjunadb.herokuapp.com/pwebinar/find", { webinarid: res.data.webinarid })
     .then((res2) => {
      res.data.pwebinar = res2.data;
      setDescription(res2.data.description.split("\n"));
      setWebinar(res.data);
      console.log(res.data.time);
     })
     .catch((err) => console.log(err));
   })
   .catch((err) => console.log(err));


  let urls = [
   "1vWZGzKlt8M",
   "OKUYNoex6Ag",
   "QHfD72Z9-uA",
   "c_1lo50AVVU",
   "wcmiFAvITtU",
   "EvLTYvj0Vto",
   "nNnFg92mmGo",
   "jQidcUBKGBI",
   "1SKWtBH7s8M",
   "Ghkx3ZP07Uc",
   "6qBa_0SSdN4",
  ];

  for (var i = 0; i < urls.length; i++) {
   const img = new Image();
   img.src = "https://img.youtube.com/vi/" + urls[i] + "/0.jpg";
  }

  setImages(urls);
 }, []);

 return (
  <Switch>
   <Route exact path={path}>
    <div className="dbody">
     <header class="nav_header">
      <nav class="navigation">
       <img
        src={logo}
        alt="Arjuna logo"
        class="navigation__logo"
        onClick={() => {
         alert(`width:${window.screen.width} pixel-ratio:${window.devicePixelRatio}`);
        }}
       />
       <div class="navigation__link-box">
        <a href="https://amalmdas.com/author/" class="navigation__link">
         Books
        </a>
       </div>
       <div class="navigation__link-box">
        <a href="https://arjunaregistration.web.app" class="navigation__link">
         Webinars
        </a>
       </div>
      </nav>
     </header>
     <section className="coverpage-sec">
      {/* <img src="./images/seminar.jpg" className="coverpage-img" alt="" /> */}
      <div className="coverpage-sec__preacher-webinar-det">
       <div className="coverpage-sec__ambassador-img">
        <img src={iceo} alt="" />
       </div>
       <div className="coverpage-sec__webinar-det">
        <h1 className="coverpage-sec__webinar-det__series-name">{series} Series</h1>
        <h2 className="coverpage-sec__webinar-det__title">{title}</h2>
        <h3 className="coverpage-sec__webinar-det__sub-title">{subtitle}</h3>
        <h3 className="coverpage-sec__webinar-det__preacher-name">By Amal M Das</h3>
        <h3 className="coverpage-sec__webinar-det__date">
         <EventAvailableIcon style={{ color: "#428bca" }} /> {date} {timeString}
        </h3>
       </div>
      </div>

      <div className="coverpage-sec__reg-div" style={{ position: "relative" }}>
       {!done ? (
        <>
         {!newStudent ? (
          <form
           noValidate
           className="coverpage-sec__reg-form needs-validation 1"
           onSubmit={(e) => {
            e.preventDefault();
            setBackdrop(true);
            axios
             .post("https://arjunadb.herokuapp.com/user/find", { number: Number(number) })
             .then((resp) => {
              if (resp.data) {
               axios
                .post("https://arjunadb.herokuapp.com/user/webinaradd", {
                 id: resp.data._id,
                 webinarid: webinar._id,
                })
                .then((res) => {
                 console.log(res.data);
                 if (!res.data) {
                  setBackdrop(false);
                  alert("You have already registered for this webinar");
                 }
                 if (res.data.email === "" || res.data.dob === "" || res.data.role === "" || res.data.gender === "") {
                  setId(res.data._id);
                  setEmail(res.data.email);
                  setDob(res.data.dob);
                  setGender(res.data.gender);
                  setRole(res.data.role);
                  part.email = res.data.email;
                  part.gender = res.data.gender;
                  part.role = res.data.role;
                  part.dob = res.data.dob;
                  // if (res.data.email) {
                  //  axios
                  //   .post("https://arjunadb.herokuapp.com/user/webinaradd", { mail: res.data.email })
                  //   .then((res) => {
                  //    console.log(res);
                  //   })
                  //   .catch((err) => console.log(err));
                  // }
                  setBackdrop(false);
                  setNewStudent("part");
                 } else {
                  axios
                   .post("https://arjunadb.herokuapp.com/user/sendemail", { userid: res.data._id, webinarid: webinar._id, wname: title })
                   .then((res) => {
                    console.log(res);
                   })
                   .catch((err) => console.log(err));
                  setBackdrop(false);
                  setDone(true);
                 }
                })
                .catch((err) => console.log(err));
              } else {
               setBackdrop(false);
               setNewStudent("new");
              }
             })
             .catch((err) => console.log(err));
           }}
          >
           <div style={{ visibility: !backdrop ? "visible" : "hidden" }}>
            <h2 style={{ textAlign: "center" }}>Register Now</h2>
            <div className="outlined">
             <label for="name">Name</label>
             <input
              type="text"
              name="name"
              className="oulined-input"
              value={name}
              required
              id="defaultFormRegisterNameEx"
              onChange={(e) => setName(e.target.value)}
             />
             <div className="invalid-feedback">Name should not be empty</div>
            </div>

            <div className="outlined">
             <label for="phone">Phone Number</label>
             <input
              type="text"
              name="phone"
              className="oulined-input"
              value={number}
              pattern="^[0-9]{10}$"
              required
              id="defaultFormRegisterNumberEx"
              onChange={(e) => setNumber(e.target.value)}
             />
             <div className="invalid-feedback">Phone Number is not valid!</div>
            </div>

            <button id="form-submit" submit>
             Continue
            </button>
           </div>
          </form>
         ) : (
          <form
           noValidate
           className="coverpage-sec__reg-form needs-validation 2"
           onSubmit={(e) => {
            e.preventDefault();
            setBackdrop(true);
            if (newStudent === "new") {
             axios
              .post("https://arjunadb.herokuapp.com/user/add", {
               name: name,
               number: number,
               email: email,
               dob: dob,
               gender: gender,
               role: role,
               webinarid: webinar._id,
              })
              .then((res) => {
               axios
                .post("https://arjunadb.herokuapp.com/user/sendemail", { userid: res.data._id, webinarid: webinar._id, wname: title })
                .then((resp) => {
                 console.log(resp);
                })
                .catch((err) => console.log(err));
               setBackdrop(false);
               setDone(true);
              })

              .catch((err) => console.log(err));
            } else if (newStudent === "part") {
             axios
              .post("https://arjunadb.herokuapp.com/user/updateadd", {
               id: id,
               email: email,
               dob: dob,
               gender: gender,
               role: role,
               webinarid: webinar._id,
              })
              .then((res) => {
               axios
                .post("https://arjunadb.herokuapp.com/user/sendemail", { userid: id, webinarid: webinar._id, wname: title })
                .then((res) => {
                 console.log(res);
                })
                .catch((err) => console.log(err));
               setBackdrop(false);
               setDone(true);
              })

              .catch((err) => console.log(err));
            }
           }}
          >
           <div style={{ visibility: !backdrop ? "visible" : "hidden" }}>
            <div className="info">
             {newStudent === "new" ? <p>Looks like this is your first ARJUNA webinar!</p> : <p>Looks like some of your details are missing</p>}
             <p>By filling out the below details, you can receive updates about our events</p>
            </div>

            {newStudent === "new" || (newStudent === "part" && part.email === "") ? (
             <div className="outlined">
              <label for="name">E-mail</label>
              <input
               type="email"
               name="name"
               className="oulined-input"
               value={email}
               required
               id="defaultFormRegisterEmailEx"
               onChange={(e) => setEmail(e.target.value)}
              />
              <div className="invalid-feedback">E-mail is not valid</div>
             </div>
            ) : null}

            {newStudent === "new" || (newStudent === "part" && part.gender === "") ? (
             <div className="selectc">
              <label for="gender">Gender</label>
              <select
               name="gender"
               id="inputGroupSelect01"
               onChange={(e) => {
                setGender(e.target.value);
               }}
              >
               <option value="" disabled selected hidden></option>
               <option value="Male">Male</option>
               <option value="Female">Female</option>
              </select>
             </div>
            ) : null}

            {newStudent === "new" || (newStudent === "part" && part.role === "") ? (
             <div className="selectc">
              <label for="role">Role</label>
              <select
               name="role"
               id="inputGroupSelect01"
               onChange={(e) => {
                setRole(e.target.value);
               }}
              >
               <option value="" disabled selected hidden></option>
               <option value="student">Student</option>
               <option value="teacher">Teacher</option>
               <option value="parent">Parent</option>
               <option value="professional">Working Professional</option>
              </select>
             </div>
            ) : null}

            {newStudent === "new" || (newStudent === "part" && part.dob === "") ? (
             <div className="outlined">
              <label for="dob">Date of Birth</label>
              <input
               type="text"
               name="dob"
               className="oulined-input"
               value={dob}
               placeholder="dd/mm/yyyy"
               id="defaultFormRegisterdobEx"
               pattern="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$"
               onChange={(e) => setDob(e.target.value)}
              />
              <div className="invalid-feedback">Date of Birth: dd/mm/yyyy</div>
             </div>
            ) : null}
            <button id="form-submit" submit>
             Submit
            </button>
           </div>
          </form>
         )}
        </>
       ) : null}

       <form action="" className="coverpage-sec__reg-form" style={{ display: done ? "inline-block" : "none" }}>
        <div>
         <h2 style={{ textAlign: "center" }}>Thank You</h2>
         <p style={{ maxWidth: "20rem" }}>
          Zoom link for todays evening meeting at 5 pm will be given after you join whatsapp group. Please click below to join the Whatsapp group.
         </p>
        </div>
        <div style={{ width: "100%", textAlign: "center" }}>
         <a href="https://chat.whatsapp.com/J0wedCmne1vAMPFQJnsqqM" className="btn btn-success">
          <WhatsAppIcon style={{ marginRight: "10px" }} />
          Join the Group
         </a>
        </div>

        <div>
         <p style={{ maxWidth: "20rem" }}>Do check our YouTube videos for more helpful content!</p>
        </div>
        <Carousel
         animation="slide"
         timeout={800}
         interval={done ? 4000 : 100}
         NextIcon={<NavigateNextIcon />}
         PrevIcon={<NavigateBeforeIcon />}
         fullHeightHover={false} // We want the nav buttons wrapper to only be as big as the button element is
         navButtonsWrapperProps={{
          // Move the buttons to the bottom. Unsetting top here to override default style.
          style: {
           bottom: "0",
           top: "unset",
          },
         }}
        >
         {images.map((image) => {
          return (
           <div className="crop">
            <a href={`https://www.youtube.com/watch?v=${image}`}>
             <img src={`https://img.youtube.com/vi/${image}/0.jpg`} />
            </a>
           </div>
          );
         })}
        </Carousel>
       </form>
       <div style={{ display: backdrop ? "inline-block" : "none", position: "absolute", top: "45%", left: "45%", textAlign: "center" }}>
        <div class="spinner-grow text-primary" role="status"></div>
       </div>
      </div>
     </section>

     <section className="key-learnings-sec">
      <div className="key-learnings-sec__det">
       <h1 className="key-learnings-sec__heading">Key Learnings</h1>
       {/* <h3 className="key-learnings-sec__sub-heading">from this webinar</h3> */}

       <ul>
        {description.map((val) => {
         return <li>{val}</li>;
        })}
       </ul>
      </div>
      <div className="key-learnings-sec__img-div">
       <img src={`https://res.cloudinary.com/arjunadb/image/upload/webinar_posters/${webinarId}`} alt="books image" className="key-learnings-sec__img" />
      </div>
     </section>

     <section className="ceo-sec">
      <div className="ceo-sec__det">
       <h2 className="ceo-sec__sub-heading">Who is</h2>
       <h1 className="ceo-sec__heading">Amal M Das?</h1>

       <ul>
        <li>Bestselling Author of books like "The Art of Concentration", "Time Management for students", and "Parenting Teenagers for wholesome success"</li>
        <li>Motivational speaker, invited to top institutes like IIT BHU, IIT K, IIT M, IIT Indore, IIIT Vadodara</li>
        <li>Influenced over 3 Lakh senior secondary students in India over 12 years</li>
        <li>Founder and CEO of ARJUNA Group Trust</li>
       </ul>
      </div>
      <div className="ceo-sec__img-div">
       {/* <img src="./images/mandala_ceo.png" alt="" className="ceo-sec__mandala-img" /> */}
       <img src={iceo1} alt="" className="ceo-sec__ceo-img" />
      </div>
     </section>

     <section className="about-sec">
      <div className="about-sec__head-div">
       <h2 className="about-sec__sub-heading">About</h2>
       <h1 className="about-sec__heading">Arjuna Group Trust</h1>
      </div>
      <div className="about-sec__body-div">
       <div className="about-sec__body-div__det">
        <ul>
         <li>
          ARJUNA Group Trust is non-profit NGO founded by IIT alumni with passion to serve the student community. The balance of personal success and selfless
          service is what our group strives to live by and teach to student community. We feel blessed with the Vedic heritage of India which is a store house
          of immense wisdom. We wish to practice and share this wisdom with the purpose of having successful students and a stronger nations
         </li>
        </ul>
       </div>
       <div className="about-sec__body-div__img-div">
        <img src={ilogo} alt="" className="about-sec__body-div__about-img" />
       </div>
      </div>
     </section>

     <section></section>
     <footer>
      <p>© ARJUNA Group Trust 2021. All Rights Reserved.</p>

      {/* <nav>
     <p>About</p>
     <p>Terms and Conditions</p>
     <p>Contact</p>
    </nav> */}
     </footer>
    </div>
   </Route>
  </Switch>
 );
}

export default Form;
