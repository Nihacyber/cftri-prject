import React from "react";

const Footer = () => (
  <footer className="bg-blue-900 text-white pt-10 pb-4 mt-10">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div>
          <h3 className="text-lg font-bold mb-3">Contact Us</h3>
          <ul>
            <li>
              <p className="font-semibold">Head</p>
              <p>TTBD Department</p>
              <p>CSIR - Central Food Technological Research Institute</p>
              <p>Mysore - 570020, Karnataka, India</p>
            </li>
            <li className="flex items-center gap-3 mt-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:ttbd@cftri.res.in" className="hover:text-blue-300 transition duration-200">
                ttbd@cftri.res.in
              </a>
            </li>
            <li className="flex items-center gap-3 mt-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+918212515670" className="hover:text-blue-300 transition duration-200">
                +91 821 251 5670
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-blue-700 mt-8 pt-4 text-center text-sm">
        Copyright &copy;{new Date().getFullYear()} All rights reserved by{" "}
        <a
          href="https://www.cftri.res.in"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          CSIR-CFTRI
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;