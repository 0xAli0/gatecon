import React from 'react'

const Partners = () => {
  return (
      <section id='partners' class="bg-black text-white mx-10 mt-20">
          <div class="mx-auto max-w-lg text-center mb-20 mt-8">
             <h2 class="text-3xl font-bold sm:text-4xl">Partners</h2>
          </div>

          <div class="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-3 mb-20">
            <a href='https://utilify.xyz/' target='_blank'><img src="https://cdn.discordapp.com/attachments/1109549645857833112/1109767304390123550/logo.png" alt="logo" class="h-16 mx-auto" /></a>
            <a href='https://skyrealfiprotocol.com/' target='_blank'><img src="https://cdn.discordapp.com/attachments/1109549645857833112/1109767649321304064/skyrealfi.png" alt="logo" class="h-20 mx-auto" /></a>
            <a href='https://www.zenithcore.io/' target='_blank'><img src="https://cdn.discordapp.com/attachments/1109549645857833112/1109767649828810782/zc-logo.png" alt="logo" class="h-20 mx-auto" /></a>
            <a href='https://axieinfinity.com/' target='_blank'><img src="https://cdn.discordapp.com/attachments/1109549645857833112/1109768587259936778/full-axie-infinity-logo.png" alt="logo" class="h-20 mx-auto" /></a>
            <a href='https://www.aavegotchi.com/' target='_blank'><img src="https://cdn.discordapp.com/attachments/1109549645857833112/1109768862188183614/sun.png" alt="logo" class="h-20 mx-auto" /></a>

          </div>
      </section>
  )
}

export default Partners