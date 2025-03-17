import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { JSX } from "react/jsx-runtime"; // needed to find JSX namespace for TS
import axios from "axios";

import IndividualJob from "./pages/IndividualJob/IndividualJob.tsx";
import JobList from "./components/JobList/JobList";
import HomePage from "./pages/HomePage/HomePage";
import JobMap from "./pages/JobMap/JobMap";
import Header from "./components/Header/Header.tsx";
import JobNote from "./components/JobNote/JobNote.tsx";

import "./App.scss";
import JobCardType from "../types/JobCardType.ts";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";

function App(): JSX.Element {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [jobs, setJobs] = useState<JobCardType[]>([]); // this is not gneric but you use <> to pass type into use state
  const [noteState, setNoteState] = useState<boolean>(false);

  const updateNote = () => {
    setNoteState(!noteState);
  };

  const fetchAllJobs = async (): Promise<void | JSX.Element> => {
    try {
      const jobListResponse = await axios.get(`${backendURL}/jobs`);
      console.log(jobListResponse.data);
      setJobs(jobListResponse.data);
    } catch (error: any) {
      console.log(error.message);
      setJobs([]);
    }
  };

  // load all jobs
  useEffect(() => {
    fetchAllJobs();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/jobs"
            element={
              <div className="view-container">
                <div className="view-map">
                  <JobMap
                    noteState={noteState}
                    updateNote={updateNote}
                    jobs={jobs}
                  />
                </div>
                <div className="view-list">
                  <JobList jobBoard={jobs} />
                </div>
              </div>
            }
          >
            <Route path=":id" element={null} />
          </Route>
          <Route
            path="/jobs/:id/note"
            element={<JobNote noteState={noteState} updateNote={updateNote} />}
          />
          <Route path="/job/:id" element={<IndividualJob />} />
          <Route path="/signIn" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/" element={<HomePage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobsearch" element={<JobSearchPage />} />
        <Route path="/jobsearch/map" element={<JobMap />} /> */}
          {/* <Route path="/job/:jobID" element={<IndividualJob />}/> */}
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

// const App = () => {
//   return (
//     <>
//       {/* <JobCard /> */}
//       <JobList />
//     </>
//   );
// };

export default App;
