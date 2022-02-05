import React from "react";
import HomeBg from "../../assets/images/home-bg.jpg";

const Home = () => {
  return (
    <div className="container th-margin-top">
      <div className="d-flex justify-content-center pt-md-5 pt-4">
        <h1>Welcome to the home page</h1>
      </div>
      <div className="d-flex justify-content-center pt-2">
        <img src={HomeBg} alt="" className="w-50" />
      </div>
    </div>
  );
};

export default Home;
