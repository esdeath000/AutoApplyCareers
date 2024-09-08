import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);

  return (
    <footer className={`bg-gray-900 text-white py-20 ${isAuthorized ? "footerShow" : "footerHide"}`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-sm">&copy; All Rights Reserved By AutoApply Careers.</div>
        <div className="flex space-x-4 mb-4 md:mb-0">
          <Link to="" target="_blank" className="text-xl text-gray-300 hover:text-white">
            <FaFacebookF />
          </Link>
          <Link to="" target="_blank" className="text-xl text-gray-300 hover:text-white">
            <FaYoutube />
          </Link>
          <Link to="" target="_blank" className="text-xl text-gray-300 hover:text-white">
            <FaLinkedin />
          </Link>
          <Link to="" target="_blank" className="text-xl text-gray-300 hover:text-white">
            <RiInstagramFill />
          </Link>
        </div>
        <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-sm">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/about" className="hover:text-gray-300">About Us</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
          <Link to="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
        </nav>
      </div>
      <div className="container mx-auto mt-4 text-xs text-gray-400">
        <p className=" lex items-center mb-2">
          AutoApply Careers is a platform dedicated to connecting job seekers with opportunities.
        </p>
        <p className="flex items-center m-5">
          For inquiries, please contact us at <a href="mailto:info@autoapplycareers.com" className="ml-1 text-gray-300 hover:text-white underline">info@autoapplycareers.com</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;








// import React, { useContext } from "react";
// import { Context } from "../../main";
// import { Link } from "react-router-dom";
// import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
// import { RiInstagramFill } from "react-icons/ri";

// const Footer = () => {
//   const { isAuthorized } = useContext(Context);
//   return (
//     <footer className={isAuthorized ? "footerShow" : "footerHide"}>
//       <div>&copy; All Rights Reserved By CodeWithZeeshu.</div>
//       <div>
//         <Link to={"https://www.facebook.com/profile.php?id=100030535123397"} target="_blank">
//           <FaFacebookF />
//         </Link>
//         <Link to={"https://www.youtube.com/@CodeWithZeeshu"} target="_blank">
//           <FaYoutube />
//         </Link>
//         <Link to={"https://www.youtube.com/@CodeWithZeeshu"} target="_blank">
//           <FaLinkedin />
//         </Link>
//         <Link to={"https://www.instagram.com/z_4_zeeshuuu/"} target="_blank">
//           <RiInstagramFill />
//         </Link>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
