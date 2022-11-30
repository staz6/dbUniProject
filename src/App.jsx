import React, { Component, useEffect, useState } from "react";
import "./App.css";
import "./Style1.css";
import { createClient } from "@supabase/supabase-js";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
// import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import SupabaseContext, {
  SupabaseContextProvider,
} from "./Components/SupabaseContext";
import Login from "./Components/Login";
const supabaseUrl = "https://afuccuoqxgbkvwidhulu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmdWNjdW9xeGdia3Z3aWRodWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk3OTc4OTQsImV4cCI6MTk4NTM3Mzg5NH0.OoMnfcnGx9R_S1W9Oizh07RfNW4m1F0cTnwzGm-cNg8";
const supabase = createClient(supabaseUrl, supabaseKey);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);

function App() {
  const [cart, setCart] = useState([]);
  const [auth, setAuth] = useState(localStorage.getItem("User") ? true : false);
  return (
    <React.Fragment>
      <SupabaseContextProvider
        value={{ supabase, cart, setCart, auth, setAuth }}
      >
        {auth ? (
          <React.Fragment>
            <Navbar />
            <Home />
          </React.Fragment>
        ) : (
          <Login />
        )}
      </SupabaseContextProvider>
    </React.Fragment>
  );
}

export default App;
