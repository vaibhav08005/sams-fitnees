import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-100"
          poster="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop"
        >
          {/* Video featuring group cycling/fitness class to represent Yoga, Zumba, and Cycling */}
          <source src="videos/hero_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-sanctum-black via-transparent to-transparent z-20" />
      </motion.div>

      {/* Centered Content */}
      <div className="relative z-30 flex h-full flex-col items-center justify-center px-4">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="text-[14vw] leading-[0.8] font-display font-bold uppercase tracking-tighter text-white text-center drop-shadow-2xl">
            SAM'S <br /> <span className="text-sanctum-orange">FITNESS</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mt-12 flex flex-col items-center gap-4 text-center"
        >
          <p className="max-w-xl text-sm md:text-xl font-medium tracking-widest text-sanctum-white/90 uppercase drop-shadow-md border-l-2 border-sanctum-orange pl-4 bg-black/40 backdrop-blur-sm">
            Nanded's Premier Fitness Hub
          </p>
          <div className="flex gap-4 items-center">
            <span className="text-xs text-sanctum-orange font-bold tracking-widest uppercase">Rated 4.9/5</span>
            <span className="h-1 w-1 rounded-full bg-white"></span>
            <span className="text-xs text-white font-bold tracking-widest uppercase">Est. Taroda Road</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-widest animate-bounce z-30 drop-shadow-md"
      >
        START YOUR JOURNEY
      </motion.div>
    </section>
  );
};

export default Hero;