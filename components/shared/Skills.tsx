import { stackIcons } from "@/constants/stackIcons";
import SlideIn from "./SlideIn";


function Skills() {
  return (
    <div className="skills-container px-4 lg:px-8 my-56 cursor-pointer overflow-hidden">
      <section className="md:max-w-4xl mx-auto lg:max-w-6xl">
        <SlideIn direction="left" duration={0.7}>
          <h1 className="text-5xl md:text-6xl lg:text-8xl pb-9 font-medium text-transparent bg-clip-text bg-gradient-to-br from-pink-300 to-yellow-300">
            I don't have dark <br />secrets, only bright ones</h1>
        </SlideIn>


        {/* GRID SECTION */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left Section */}
          <div className="col-span-12 lg:col-span-4">
            <SlideIn direction="bottom" duration={0.7}>
              <div className="p-8 rounded-3xl skills-bg bg-neutral-900 text-gray-100">
                <div className="grid grid-cols-2 gap-4"> {/* Grid layout with 2 columns */}
                  {stackIcons.map((icon, index) => (
                    <div
                      key={index}
                      className="flex items-center py-1.5 px-3 text-xs font-medium"
                    >
                      <img
                        className={`w-9 h-9 ${icon.style || ""}`}
                        src={icon.src}
                        alt={icon.name}
                      />
                      <span className="pl-2">{icon.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SlideIn>
          </div>


          {/* Right Section */}
          <div className="col-span-12 lg:col-span-8 font-light text-left tracking-wide text-gray-300  transition-all duration-300">
            <SlideIn direction="right" duration={0.7}>
              <div className="rounded-3xl bg-neutral-900 p-10">
                <p>
                  My journey into <span className="text-gray-50 font-medium">software engineering </span> began with a passion for artistic creation, honed through drawing and making music.
                  This creative background naturally guided me toward the world of technology, where I could merge artistry with problem-solving through software development.
                </p>
                <p className="pt-3">
                  I specialize in both <span className="text-gray-50 font-medium">frontend </span>and <span className="text-gray-50 font-medium">backend </span>development, with extensive experience across the full stack. I thrive on the continuous learning and
                  creativity that coding offers, enjoying the challenge of transforming ideas into impactful digital solutions.
                  <span className="text-gray-50 font-medium">
                    {" "}"For me, coding is not just a profession, it's a space to innovate and unleash my creativity"
                  </span>
                </p>
                <p className="pt-3">
                  Beyond coding, I enjoy video creation , video editing and watching anime, both of which inspire my approach to UI/UX design by shaping how I think about  <span className="text-gray-50 font-medium">visual
                    storytelling</span> and <span className="text-gray-50 font-medium">aesthetics ✨</span>
                </p>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Skills;
