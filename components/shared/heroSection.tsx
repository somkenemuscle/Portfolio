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
          <section className="hero-status-container flex flex-col items-center">
            <span className="hero-status-bitmoji"><img className="w-20 h-20 hover:scale-105 transition-all duration-300"
              src="https://framerusercontent.com/images/DGJ4Gx0ogbA7MZuCQVUb98IKt1I.png?scale-down-to=512" />
            </span>
            <div className="text-pink-50 bg-black w-fit hero-status-info px-4 py-2 text-xs rounded tracking-wide font-light">
              <span className="animate-pulse-ring inline-block bg-pink-400 rounded-full w-2 h-2 mr-2"></span>
              {" "} Available for new projects
            </div>
          </section>


          <section className="mx-10">
            <h1 className="text-pink-200  text-5xl md:text-6xl lg:text-7xl mt-9 tracking-tight hero-header">
              Ojukwu Somkene <br /><span className="text-pink-50">Ifechukwu</span></h1>

            {/* LARGE SCREEN */}
            <p className="text-gray-400 mt-6 tracking-wide mx-auto max-w-lg hidden md:block">
              I'm a <span className="text-gray-200 font-semibold">Full-Stack developer</span> based in <span className="font-bold bg-gradient-to-r from-green-500 via-white to-green-500 bg-clip-text text-transparent">
                Lagos, Nigeria,</span> specializing in using my creativity to design <span className="text-gray-200 font-semibold">aesthetically pleasing </span>
              UIs and build <span className="text-gray-200 font-semibold">scalable applications </span>that perform efficiently
            </p>

            {/* ON MOBILE DEVICES */}
            <p className="text-gray-400 mt-6 tracking-wide mx-auto max-w-lg block md:hidden hero-subtext-mobile">
              <span className="text-gray-200 font-semibold">Full-Stack developer</span> based in <span className="font-bold bg-gradient-to-r from-green-500 via-white to-green-500 bg-clip-text text-transparent">
                Lagos, Nigeria,</span> who builds<span className="text-gray-200 font-semibold"> aesthetically pleasing </span>
              UI's and  <span className="text-gray-200 font-semibold">scalable applications</span>
            </p>
          </section>
          <section className="hidden md:block">
            <FloatingDockDemo />
          </section>
        </div>
      </div>
    </SlideIn>

  )
}

export default HeroSection