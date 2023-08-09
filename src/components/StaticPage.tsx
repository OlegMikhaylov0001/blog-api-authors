import React from 'react'

function StaticPage() {
  return (
    <section className="p-8 sm:p-[100px] bg-black">
        <h2 className="font-h1 text-5xl text-white mb-10 text-left">
          Engaging Minds, Exploring Worlds
        </h2>
        <div className="flex gap-10">
          <p className="text-white text-left">
            Our blog captures the essence of today’s burning topics and picks
            the brains of experts across various fields. Buckle up for an
            exciting ride through the depths of the human intellect!
          </p>
          <p className="text-white text-left">
            Discover intriguing perspectives, indulge in fiery discussions, and
            challenge the status quo. Bring out the inner rebel in you and get
            ready to question everything you knew so far!
          </p>
        </div>
      </section>
  )
}

export default StaticPage