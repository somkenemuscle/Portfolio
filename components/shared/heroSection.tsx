import { FloatingDockDemo } from "./Dock"
import SlideIn from "./SlideIn"
function HeroSection() {
  return (
    <SlideIn direction="top">
      <div className="overflow-x-clip relative">
        <div className=" size-[850px] hero-ring"></div>
        <div className=" size-[1050px] hero-ring"></div>
        <div className=" size-[1250px] hero-ring"></div>
        <div className=" size-[1450px] hero-ring"></div>

        <div className="text-center py-40 hero mb-32">
          <span className="text-7xl">👨🏽‍💻</span>
          <div className="text-orange-50 bg-black w-fit justify-self-center px-4 py-2 text-xs rounded tracking-wide font-light">
            <span className="animate-pulse-ring inline-block bg-green-600 rounded-full w-2 h-2 mr-2"></span> Available for new projects
          </div>
          <h1 className="text-orange-200 text-5xl md:text-6xl lg:text-7xl mt-9 tracking-tight hero-header">Ojukwu Somkene <br /> <span className="text-orange-50">Ifechukwu</span> </h1>
          <p className=" leading-8 text-white max-w-xl lg:max-w-2xl justify-self-center mt-6 px-3">
            I am a <span className="text-gray-400 font-semibold">Full-Stack developer</span>  based in <span className="font-semibold text-gray-400">Lagos, Nigeria</span>,
            passionate about creating web applications that are both functional and visually appealing.
            <span className="font-semibold text-gray-400">"Coding isn't just a job for me, it’s a hobby that I deeply enjoy"</span>
          </p>
          <FloatingDockDemo />
        </div>
      </div>
    </SlideIn>

  )
}

export default HeroSection