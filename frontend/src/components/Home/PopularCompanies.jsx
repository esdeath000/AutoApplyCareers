import React, { useState } from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

// FAQ Component
const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    {
      question: 'How do I search for jobs?',
      answer: 'You can search for jobs by entering job titles or keywords in the search bar and selecting a location.'
    },
    {
      question: 'How do I apply for a job?',
      answer: 'To apply for a job, click on the job listing and follow the instructions provided in the job description.'
    },
    {
      question: 'Can I save jobs to apply later?',
      answer: 'Yes, you can save jobs to your favorites and apply at a later time.'
    },
    {
      question: 'How do I track my applications?',
      answer: 'You can track your applications through your account dashboard where all your applied jobs will be listed.'
    }
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      {faqData.map((faq, index) => (
        <div key={index} className="mb-4 border-b border-gray-200 pb-4">
          <div
            className={`flex justify-between items-center cursor-pointer text-lg font-medium ${openFAQ === index ? 'text-blue-500' : 'text-gray-700'}`}
            onClick={() => toggleFAQ(index)}
          >
            <h3>{faq.question}</h3>
            <i className={`pi pi-${openFAQ === index ? 'minus' : 'plus'} text-xl`}></i>
          </div>
          {openFAQ === index && <p className="text-gray-600 mt-2">{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
};

// Popular Companies Component
const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 10,
      icon: <FaMicrosoft className="text-3xl text-blue-500" />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 5,
      icon: <SiTesla className="text-3xl text-gray-900" />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 20,
      icon: <FaApple className="text-3xl text-gray-800" />,
    },
  ];
  
  return (
    <div className="container mx-auto p-6">
      <h3 className="text-4xl font-bold text-center mb-8">Top Companies</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {companies.map((company) => (
          <div key={company.id} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <div className="text-5xl mb-4">{company.icon}</div>
            <div className="text-xl font-semibold">{company.title}</div>
            <div className="text-gray-600 mb-4">{company.location}</div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
              Open Positions: {company.openPositions}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Home Component
const Home = () => {
  return (
    <>
      <PopularCompanies />
      <FAQ />
    </>
  );
};

export default Home;
