import { FloatingDockDemo } from "./Dock"
import SlideIn from "./SlideIn"

function HeroSection() {
  return (
    <SlideIn direction="top">
      <div className="overflow-x-clip relative cursor-pointer">
        <div className="size-[850px] hero-ring"></div>
        <div className="size-[1050px] hero-ring"></div>
        <div className="size-[1250px] hero-ring"></div>
        <div className="size-[1450px] hero-ring"></div>

        <div className="text-center py-40 hero mb-32">
          <span className="text-7xl"><img className="w-20 h-20 inline-block hover:scale-105 transition-all duration-300"
            src="https://framerusercontent.com/images/DGJ4Gx0ogbA7MZuCQVUb98IKt1I.png?scale-down-to=512" /></span>
          <div className="text-pink-50 bg-black w-fit mx-auto px-4 py-2 text-xs rounded tracking-wide font-light">
            <span className="animate-pulse-ring inline-block bg-pink-400 rounded-full w-2 h-2 mr-2"></span>
            {" "} Available for new projects
          </div>

          <section className="mx-10">
            <h1 className="text-pink-200  text-5xl md:text-6xl lg:text-7xl mt-9 tracking-tight hero-header">
              Ojukwu Somkene <br /><span className="text-pink-50">Ifechukwu</span> </h1>
            {/* <p className="leading-8 text-white max-w-xl lg:max-w-2xl mx-auto mt-6 px-3">
              Yooooooooo !!, I'm a <span className="text-gray-400 font-semibold">Full-Stack developer</span>  based in <span className="font-semibold text-gray-400">
                Lagos, Nigeria <img alt="" src="https://flagcdn.com/w320/ng.png" className="inline-block h-auto w-5 shrink-0" /></span> ,
              passionate about creating web applications that are both functional and visually appealing.
              <span className="font-semibold text-gray-400">"Coding isn't just a job for me, it’s a hobby that I deeply enjoy"</span>
            </p> */}
          </section>
          <FloatingDockDemo />
        </div>
      </div>
    </SlideIn>

  )
}

export default HeroSection