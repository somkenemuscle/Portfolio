import {
  IconBrandGithub,
  IconBrandX,
  IconBrandLinkedin,
  IconBrandGmail

} from "@tabler/icons-react";


function Contact() {
  return (
    <div id="contact" className="bg-gradient-to-r from-gray-50 to-white hover:cursor-pointer lg:px-48 sm:px-9 py-8 mt-10">
      {/* <!-- Use flex-col to stack on small screens, flex-row for larger screens --> */}
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <span className="text-gray-500">Contact Me</span> <br />
          <span className="text-xl hover:underline">somkeneoj@gmail.com</span>
        </div>

        {/* <!-- Keep icons in a straight line using flex-row on all screen sizes --> */}
        <div className="flex flex-row items-center space-x-4">
          <div className="h-12 w-12 flex items-center justify-center rounded-full border border-gray-300 dark:border-neutral-300 hover:shadow-md ">
            <IconBrandGmail className="hover:text-black h-6 w-6 text-gray-600 dark:text-neutral-300" />
          </div>
          <div className="h-12 w-12 flex items-center justify-center rounded-full border border-gray-300 dark:border-neutral-300 hover:shadow-md">
            <IconBrandGithub className="hover:text-black h-6 w-6 text-gray-600 dark:text-neutral-300" />
          </div>
          <div className="h-12 w-12 flex items-center justify-center rounded-full border border-gray-300 dark:border-neutral-300 hover:shadow-md">
            <IconBrandLinkedin className="hover:text-black h-6 w-6 text-gray-600 dark:text-neutral-300" />
          </div>
          <div className="h-12 w-12 flex items-center justify-center rounded-full border border-gray-300 dark:border-neutral-300 hover:shadow-md">
            <IconBrandX className="hover:text-black h-6 w-6 text-gray-600 dark:text-neutral-300" />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact