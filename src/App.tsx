import React from 'react';
import { Menu, ArrowDown, Github, Instagram, Youtube } from 'lucide-react';

function App() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src="./todd-hero.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#2F4F4F] opacity-75"></div>
        </div>
        
        {/* Navigation */}
        <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
          <span className="text-white text-2xl font-light">TB</span>
          <Menu className="text-white w-6 h-6 cursor-pointer" />
        </nav>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
          <h1 className="text-6xl md:text-8xl font-light mb-6">Todd Brannon</h1>
          <p className="text-xl md:text-2xl font-light mb-4">Guitarist • Songwriter • Producer • Instructor</p>
          <ArrowDown className="w-8 h-8 animate-bounce mt-12" />
        </div>
      </div>

      {/* About Section */}
      <section className="py-24 px-6 md:px-24 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-12">About</h2>
          <div className="space-y-8">
            <p className="text-lg md:text-xl font-light leading-relaxed">
              With over two decades of experience in music production and performance, I've dedicated my life to crafting authentic sounds and helping others discover their musical voice. Currently, I teach guitar at two local studios serving the Lewisville and Flower Mound, Texas areas five days per week, specializing in beginner to intermediate instruction with a focus on rock, pop, and worship music.
            </p>
            <p className="text-lg md:text-xl font-light leading-relaxed">
              Since 2013, I've been an active member of the worship team at Valley Creek Church in Flower Mound, contributing to three live worship albums (2015, 2023, and 2024). My musical journey began in 1996 when I formed The Shake with my cousin and two friends. We recorded multiple projects, including a 3-song EP (1998), a full-length album "In This Chaos" (1999), and additional unreleased tracks in Nashville (2001). During our five years together, we performed extensively throughout the Dallas-Fort Worth area and beyond.
            </p>
            <p className="text-lg md:text-xl font-light leading-relaxed">
              Recent projects include instrumental compositions released on major streaming platforms (Spotify, Apple Music, YouTube) under the HIAUTMSKI moniker. I've also produced and released remixes of two classic Shake songs from "In This Chaos," alongside making the complete original album available on streaming platforms for a new generation to discover.
            </p>
            <p className="text-lg md:text-xl font-light leading-relaxed">
              As an instructor, I focus on developing each student's unique style while building a strong foundation in music theory and technique. I'm always open to inquiries from potential new students, offering personalized guidance to help them achieve their musical goals.
            </p>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="py-24 px-6 md:px-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-12">Featured Work</h2>
          
          {/* Live Performances */}
          <div className="mb-16">
            <h3 className="text-2xl font-light mb-8">Live Performances</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-video">
                <iframe 
                  className="w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/HJlMHuzPDKY"
                  title="All I Can Say - Valley Creek Worship"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="aspect-video">
                <iframe 
                  className="w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/M5SHz--FuVg"
                  title="This Is Love - Valley Creek Worship"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          {/* YouTube Shorts */}
          <div className="mb-16">
            <h3 className="text-2xl font-light mb-8">Performance Shorts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-[1400px] mx-auto">
              {/* Short 1 */}
              <div className="aspect-[9/16] w-full max-w-[360px] mx-auto">
                <iframe 
                    className="w-full h-full rounded-lg shadow-lg"
                    src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
                    title="Test Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>

              </div>
              {/* Short 2 */}
              <div className="aspect-[9/16] w-full max-w-[360px] mx-auto">
                <iframe 
                  className="w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/KLOqY1d4ByA"
                  title="Performance Short 2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              {/* Short 3 */}
              <div className="aspect-[9/16] w-full max-w-[360px] mx-auto">
                <iframe 
                  className="w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/QKfNKczBk0k"
                  title="Performance Short 3"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              {/* Short 4 */}
              <div className="aspect-[9/16] w-full max-w-[360px] mx-auto">
                <iframe 
                  className="w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/UevV3DAJpCQ"
                  title="Performance Short 4"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              {/* Short 5 */}
              <div className="aspect-[9/16] w-full max-w-[360px] mx-auto">
                <iframe 
                  className="w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/YEt4bJQQ0Dc"
                  title="Performance Short 5"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative aspect-[4/3] overflow-hidden bg-gray-200">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 bg-[#2F4F4F]/80 transition-opacity group-hover:opacity-100">
                <span className="text-xl font-light mb-2">Studio Productions</span>
                <span className="text-sm font-light">Recent Albums & Singles</span>
              </div>
            </div>
            <div className="group relative aspect-[4/3] overflow-hidden bg-gray-200">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 bg-[#2F4F4F]/80 transition-opacity group-hover:opacity-100">
                <span className="text-xl font-light mb-2">Guitar Instruction</span>
                <span className="text-sm font-light">Teaching Portfolio</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 md:px-24 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-12">Services</h2>
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-light mb-4">Music Production</h3>
              <p className="text-lg font-light leading-relaxed">
                Full-service studio production, from pre-production planning through final mastering. Specializing in guitar-driven genres and acoustic arrangements.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-light mb-4">Guitar Instruction</h3>
              <p className="text-lg font-light leading-relaxed">
                Private lessons for all skill levels. Customized curriculum focusing on technique, theory, and personal style development.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-light mb-4">Session Work</h3>
              <p className="text-lg font-light leading-relaxed">
                Professional guitar tracks for your recordings. Remote sessions available with quick turnaround times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 md:px-24 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-12">Get in Touch</h2>
          <p className="text-lg md:text-xl font-light mb-12">
            Available for production, session work, and private instruction. Let's create something extraordinary together.
          </p>
          <div className="flex justify-center space-x-8">
            <a href="https://www.youtube.com/CHANNEL_ID" target="_blank" rel="noopener noreferrer">
              <Youtube className="w-6 h-6 cursor-pointer hover:text-[#2F4F4F] transition-colors" />
            </a>
            <a href="https://www.instagram.com/todd_brannon_music" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-6 h-6 cursor-pointer hover:text-[#2F4F4F] transition-colors" />
            </a>
            <a href="https://www.instagram.com/the_shake_band" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-6 h-6 cursor-pointer hover:text-[#2F4F4F] transition-colors" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 md:px-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Todd Brannon. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;