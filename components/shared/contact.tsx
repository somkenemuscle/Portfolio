'use client'
import Link from "next/link";
import { contactlinks } from "@/constants/contactLinks";

function Contact() {
  return (
    <div id="contact" className="cursor-pointer mt-32 mb-12">
      <div className="w-full max-w-screen-lg mx-auto px-8 md:px-16">
        <div className="text-center">
          <header className="pb-7 flex items-center justify-center">
            <img className="w-14 h-14"
              src="https://framerusercontent.com/images/tDOGAARw0kdQ37aQk0HWXiX9X8.png?scale-down-to=512" alt="icon" />
            <span className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-pink-100">
              {" "} get in touch!</span>
          </header>
        </div>

        {/* <!-- Use flex-col to stack on small screens, flex-row for larger screens --> */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-2 border-neutral-800 bg-neutral-900 w-full rounded-3xl p-8 hover:bg-gradient-to-bl hover:via-transparent hover:from-black hover:to-black transition-all duration-300">
          <div className="mb-4 sm:mb-0">
            <span className="text-neutral-300 text-xs tracking-wide font-medium">Reach out to me <span aria-hidden="true">→</span></span> <br />
            <Link href="mailto:somkeneoj@gmail.com">
              <span className="text-xl font-semibold tracking-wide font-sans transition-colors duration-200"
                style={{ color: '#D7FF5E' }}>
                somkeneoj@gmail.com
              </span>
            </Link>
          </div>

          {/* <!-- Keep icons in a straight line using flex-row on all screen sizes --> */}
          <div className="flex flex-row items-center space-x-4">
            {contactlinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 w-14 flex items-center justify-center"
                aria-label={link.title}
                style={{
                  transform: `rotate(${(index + 1) % 2 === 0 ? (index + 1) * 3 : -(index + 1) * 3}deg)`,
                }}
              >
                <img src={link.icon} className="hover:scale-125 transition-transform duration-300 " />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact