import { FloatingDockDemo } from "./Dock"
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision"

function HeroSection() {
  return (
    <BackgroundBeamsWithCollision className="mt-40 bg-white">
      <div className="xl:px-36 sm:px-32">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                OJUKWU <span className="text-yellow-400">SOMKENE</span> IFECHUKWU
              </h1>
              <p className="mt-6 text-lg  font-light leading-8 ">
                I am a <span className="text-gray-500 font-bold">full-Stack developer</span>  based in Nigeria, I love building web applications that
                fix real world problems, i am driven and work with an innovative and intristic attitude towards real life problems.
              </p>
              <div className="flex items-center justify-center gap-x-6">
                <FloatingDockDemo />
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >

          </div>
        </div>

      </div>
    </BackgroundBeamsWithCollision>
  )
}

export default HeroSection