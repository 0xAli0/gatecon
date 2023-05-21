import React from 'react'

const Navbar = () => {
  return (
    
<nav class="bg-black">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a class="flex items-center">
      <img src='https://cdn.discordapp.com/attachments/1109549645857833112/1109760732737839114/gatecon-white.png' class="h-8 md:h-10" alt="logo" />
  </a>
  <div class="flex md:order-2">
      <a href="#"><button type="button" class="text-black bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">Sign with wallet</button></a>
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">

  </div>
  </div>
</nav>

  )
}

export default Navbar
