import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://job-seeking-backend-deployment-cep2.onrender.com/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <>
      <nav className={`bg-gray-100 ${isAuthorized ? "navbarShow" : "navbarHide"}`}>
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
          <div className="logo">
            <Link to="/" className="text-4xl font-extrabold text-gray-700 hover:text-gray-900">
              AutoApply <span className="text-blue-500">Careers</span>
            </Link>
          </div>
          <div className="md:hidden">
            <GiHamburgerMenu
              className="h-8 w-8 cursor-pointer text-gray-700"
              onClick={() => setShow(!show)}
            />
          </div>
          <ul
            className={`${
              show ? "block" : "hidden"
            } absolute top-16 left-0 w-full bg-gray-100 md:bg-transparent md:static md:flex items-center justify-between md:justify-start mt-4 md:mt-0 text-lg z-10`}
          >
            <div className="md:flex md:space-x-6 md:items-center">
              <li>
                <Link
                  to={"/"}
                  onClick={() => setShow(false)}
                  className="block py-2 px-4 text-gray-500 hover:text-gray-700"
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to={"/job/getall"}
                  onClick={() => setShow(false)}
                  className="block py-2 px-4 text-gray-500 hover:text-gray-700"
                >
                  ALL JOBS
                </Link>
              </li>
              <li>
                <Link
                  to={"/applications/me"}
                  onClick={() => setShow(false)}
                  className="block py-2 px-4 text-gray-500 hover:text-gray-700"
                >
                  {user && user.role === "Employer"
                    ? "APPLICANT'S APPLICATIONS"
                    : "MY APPLICATIONS"}
                </Link>
              </li>
              {user && user.role === "Employer" && (
                <>
                  <li>
                    <Link
                      to={"/job/post"}
                      onClick={() => setShow(false)}
                      className="block py-2 px-4 text-gray-500 hover:text-gray-700"
                    >
                      POST NEW JOB
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/job/me"}
                      onClick={() => setShow(false)}
                      className="block py-2 px-4 text-gray-500 hover:text-gray-700"
                    >
                      VIEW YOUR JOBS
                    </Link>
                  </li>
                </>
              )}
            </div>
            <li className="md:ml-auto mt-4 md:mt-0">
              <button
                onClick={handleLogout}
                className="w-full md:w-auto py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md text-white"
              >
                LOGOUT
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className="w-full h-0.5 bg-gray-500"
        style={{
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
        }}
      ></div>
    </>


  );
};

export default Navbar;










// import React, { useContext, useState } from "react";
// import { Context } from "../../main";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { GiHamburgerMenu } from "react-icons/gi";

// const Navbar = () => {
//   const [show, setShow] = useState(false);
//   const { isAuthorized, setIsAuthorized, user } = useContext(Context);
//   const navigateTo = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const response = await axios.get(
//         "https://job-seeking-backend-deployment-cep2.onrender.com/api/v1/user/logout",
//         {
//           withCredentials: true,
//         }
//       );
//       toast.success(response.data.message);
//       setIsAuthorized(false);
//       navigateTo("/login");
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setIsAuthorized(true);
//     }
//   };

//   return (
//     <>
//       <nav className={`bg-gray-100 ${isAuthorized ? "navbarShow" : "navbarHide"}`}>
//         <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
//           <div className="logo">
//             <Link to="/" className="text-4xl font-extrabold text-gray-700 hover:text-gray-900">
//               AutoApply <span className="text-blue-500">Careers</span>
//             </Link>
//           </div>
//           <div className="md:hidden">
//             <GiHamburgerMenu
//               className="h-8 w-8 cursor-pointer text-gray-700"
//               onClick={() => setShow(!show)}
//             />
//           </div>
//           <ul
//             className={`${
//               show ? "block" : "hidden"
//             } absolute top-16 left-0 w-full bg-gray-100 md:bg-transparent md:static md:flex mt-4 md:mt-0 text-lg z-10`}
//           >
//             <li className="mr-6">
//               <Link
//                 to={"/"}
//                 onClick={() => setShow(false)}
//                 className="block py-2 px-4 text-gray-500 hover:text-gray-700"
//               >
//                 HOME
//               </Link>
//             </li>
//             <li className="mr-6">
//               <Link
//                 to={"/job/getall"}
//                 onClick={() => setShow(false)}
//                 className="block py-2 px-4 text-gray-500 hover:text-gray-700"
//               >
//                 ALL JOBS
//               </Link>
//             </li>
//             <li className="mr-6">
//               <Link
//                 to={"/applications/me"}
//                 onClick={() => setShow(false)}
//                 className="block py-2 px-4 text-gray-500 hover:text-gray-700"
//               >
//                 {user && user.role === "Employer"
//                   ? "APPLICANT'S APPLICATIONS"
//                   : "MY APPLICATIONS"}
//               </Link>
//             </li>
//             {user && user.role === "Employer" && (
//               <>
//                 <li className="mr-6">
//                   <Link
//                     to={"/job/post"}
//                     onClick={() => setShow(false)}
//                     className="block py-2 px-4 text-gray-500 hover:text-gray-700"
//                   >
//                     POST NEW JOB
//                   </Link>
//                 </li>
//                 <li className="mr-6">
//                   <Link
//                     to={"/job/me"}
//                     onClick={() => setShow(false)}
//                     className="block py-2 px-4 text-gray-500 hover:text-gray-700"
//                   >
//                     VIEW YOUR JOBS
//                   </Link>
//                 </li>
//               </>
//             )}
//             <li className="block py-2 px-4">
//               <button
//                 onClick={handleLogout}
//                 className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md text-white"
//               >
//                 LOGOUT
//               </button>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       <div
//         className="w-full h-0.5 bg-gray-500"
//         style={{
//           boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
//         }}
//       ></div>
//     </>
//   );
// };

// export default Navbar;
