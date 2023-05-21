import React from 'react'
import { BsTwitter } from 'react-icons/bs'
import { FaMedium } from 'react-icons/fa' 
import { SiLinktree } from 'react-icons/si'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <div>
      <footer aria-label="Site Footer" class="bg-black">
  <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
    <div class="flex justify-center text-teal-600">
          <img src="https://cdn.discordapp.com/attachments/1109549645857833112/1109760732737839114/gatecon-white.png" class="h-10 sm:h-12" alt="Logo" />
    </div>


    <ul class="mt-12 flex justify-center gap-6 md:gap-8">
      <li>
        <a
          href="/"
          rel="noreferrer"
          target="_blank"
          class="text-white transition hover:text-white/75 text-2xl"
        >
          <BsTwitter />
        </a>
      </li>

      <li>
        <a
          href="/"
          rel="noreferrer"
          target="_blank"
          class="text-white transition hover:text-white/75 text-2xl"
        >
          <FaMedium />
        </a>
      </li>

      <li>
        <a
          href="/"
          rel="noreferrer"
          target="_blank"
          class="text-white transition hover:text-white/75 text-2xl"
        >
          <FaGithub />
        </a>
      </li>

      <li>
        <a
          href="/"
          rel="noreferrer"
          target="_blank"
          class="text-white transition hover:text-white/75 text-2xl"
        >
          <SiLinktree />
        </a>
      </li>
    </ul>
    <p class="mx-auto mt-8 text-center text-white">
    ©2023 All Rights Reserved by gatecon
    </p>
  </div>
</footer>

    </div>
  )
}

export default Footer