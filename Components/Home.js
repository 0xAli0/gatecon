import React from 'react'

const Home = () => {
  return (
<section class="relative bg-[url(https://github.com/M4VI/testt/blob/main/ezgif.com-video-to-gif-min.gif?raw=true)] bg-cover bg-center bg-no-repeat text-white">
  <div
    class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center"
  >
    <div class="mx-auto max-w-3xl text-center">
      <h1
        class="bg-gradient-to-r text-white bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >
        Gate to Connect!
      </h1>

      <p class="mt-6 text-xl text-white">
      Join the Web3 games revolution with GATECON
      </p>

      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <a
          class="block w-full rounded-xl border border-white bg-white px-12 py-3 text-sm font-medium text-black hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          href="/signup"
        >
          Sign Up
        </a>

        <a
          class="block w-full rounded-xl border border-white px-12 py-3 text-sm font-medium text-white hover:bg-white hover:text-black focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="/signin"
        >
          Sign In
        </a>
      </div>
    </div>
  </div>
</section>
  )
}

export default Home