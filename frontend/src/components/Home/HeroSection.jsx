import React, { useEffect } from "react";
import {
  FaBuilding,
  FaSuitcase,
  FaUsers,
  FaUserPlus,
  FaSearch,
  FaMapMarkerAlt,
} from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Jobs",
      icon: <FaSuitcase className="text-4xl text-green-500" />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding className="text-4xl text-blue-500" />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers className="text-4xl text-red-500" />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus className="text-4xl text-yellow-500" />,
    },
  ];

  const startAnimation = () => {
    let posX = 0;
    const container = document.getElementById("details-container");

    const animate = () => {
      posX -= 1; 
      container.style.transform = `translateX(${posX}px)`;

      
      if (posX <= -300) {
        posX = 0;
      }

      requestAnimationFrame(animate);
    };

    animate();
  };


  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <div className="heroSection bg-white py-12">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between">
        
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 px-4">
            <h1 className="text-green-600 text-3xl pl-16 font-bold mb-8">
              INDIA’S #1 JOB PLATFORM
            </h1>
            <p
              className="text-gray-700 mb-8 text-3xl font-bold pl-16 whitespace-nowrap"
              style={{
                fontSize: "50px",
                maxWidth: "4000px",
                lineHeight: "1.2",
              }}
            >
              Your job search ends here
            </p>

            <p className="text-gray-700 text-xl mb-10 pl-16">
              Discover 50 lakh+ career opportunities
            </p>

            <div className="bg-gray-100 mx-6 w-full rounded-lg p-4 flex flex-col lg:flex-row items-center justify-center mx-auto mb-10 lg:space-x-4 space-y-4 lg:space-y-0 lg:max-w-4xl">
              <div className="relative w-full lg:w-1/3">
                <input
                  type="text"
                  placeholder="Search Jobs"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg lg:rounded-l-lg focus:outline-none pl-12"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative w-full lg:w-1/3">
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg lg:rounded-l-lg focus:outline-none pl-12"
                />
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button className="w-full lg:w-auto px-4 py-3 bg-green-500 text-white rounded-lg lg:rounded-r-lg hover:bg-green-600 hover:scale-105 focus:outline-none transition-transform duration-300">
                Search Jobs
              </button>
            </div>
          </div>

          <div
            id="details-container"
            className="details mt-10 overflow-hidden px-4"
            style={{
              whiteSpace: "nowrap",
            }}
          >
            {details.map((element) => (
              <div
                key={element.id}
                className="card bg-white shadow-lg p-6 rounded-lg text-center inline-block mr-4 sm:mr-8 mb-4 sm:mb-0"
                style={{
                  minWidth: "200px", 
                  flex: "0 0 auto",
                }}
              >
                <div className="icon mb-4">{element.icon}</div>
                <div className="content">
                  <p className="text-3xl font-bold text-gray-700">
                    {element.title}
                  </p>
                  <p className="text-gray-500">{element.subTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> 
    </div>
  );  
};

export default HeroSection;
