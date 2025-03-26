import React from "react";
import { FaInstagram, FaGithub, FaLinkedin, FaBriefcase } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-black text-gray-300 px-8 py-8">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
        {/* Left Section: About */}
        <div className="flex flex-col justify-start">
          <h1 className="text-2xl font-bold text-white mb-4">Chirag Tyagi</h1>
          <p className="text-sm leading-relaxed">
            Full-stack developer passionate about building user-centric
            applications and contributing to open-source. Experienced in
            front-end and back-end technologies with a focus on delivering
            scalable and maintainable solutions.
          </p>
        </div>

        {/* Center Section: Contact Info First */}
        <div className="flex flex-col gap-4 justify-start">
          <h2 className="text-lg font-semibold text-white">Contact Info</h2>
          <p className="text-sm text-gray-400 flex items-center gap-2">
            📧 <span className="text-white">Email:</span>{" "}
            <a
              href="mailto:chirag.tyagi@example.com"
              className="text-gray-400 hover:text-white transition"
            >
              chiragt281@example.com
            </a>
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-2">
            📞 <span className="text-white">Phone:</span>{" "}
            <span className="text-gray-400">+91 91492 09086</span>
          </p>

          {/* Connect with Me Section Below */}
          <h2 className="text-lg font-semibold text-white mt-6">Connect with Me</h2>
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/invites/contact/?i=1niejpidrm4of&utm_content=68wfwfs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <FaInstagram size={20} />
              <span className="text-sm hidden md:inline">Instagram</span>
            </a>

            <a
              href="https://github.com/chiragtyagi23"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <FaGithub size={20} />
              <span className="text-sm hidden md:inline">GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/chiragtyagi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <FaLinkedin size={20} />
              <span className="text-sm hidden md:inline">LinkedIn</span>
            </a>

            <a
              href="https://www.naukri.com/mnjuser/profile?id=&altresid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <FaBriefcase size={20} />
              <span className="text-sm hidden md:inline">Naukri</span>
            </a>
          </div>
        </div>

        {/* Right Section: Empty or Additional Details */}
        <div className="flex flex-col justify-start">
          <h2 className="text-lg font-semibold text-white mb-4">Other Details</h2>
          <p className="text-sm text-gray-400">
            Available for freelance projects and open to collaborating on
            exciting ventures. Feel free to connect!
          </p>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Chirag Tyagi. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
