import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 px-8 md:px-16 lg:px-32">
    <div className="container mx-auto flex flex-col md:flex-row items-center">
      {/* Profile Picture */}
      <div className=" mb-6 md:mb-0">
        <img 
          src="/assets/images/pic.PNG" // Replace with your actual image path
          alt="Your Name" 
          className="w-full h-full object-cover rounded-full"
        />
      </div>
  
      {/* Description */}
      <div className="md:ml-8 lg:ml-16 text-center md:text-left">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">About Me</h2>
        <p className="text-lg font-light text-gray-600">
          Hello! I'm <span className="font-bold text-gray-800">Your Name</span>, a passionate developer with a keen interest in building scalable and efficient software solutions. With a background in full-stack development, I specialize in creating dynamic and user-friendly web applications. I enjoy tackling complex problems and learning new technologies to enhance my skill set. Outside of coding, I love exploring new places, reading about tech innovations, and contributing to open-source projects.
        </p>
      </div>
    </div>
  </section>
  
  );
};

export default About;
