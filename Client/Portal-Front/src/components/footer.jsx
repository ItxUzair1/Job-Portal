import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-6 mt-16">
      <p>© {new Date().getFullYear()} HireNest. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
