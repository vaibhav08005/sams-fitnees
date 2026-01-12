import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DISCIPLINES } from '../constants';

const Disciplines: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform vertical scroll into horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section id="disciplines" ref={targetRef} className="relative h-[300vh] bg-sanctum-dark">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pl-10 md:pl-20">
        <motion.div style={{ x }} className="flex gap-10 md:gap-20">
          
          {/* Intro Card */}
          <div className="relative h-[60vh] w-[80vw] md:w-[40vw] flex-shrink-0 flex flex-col justify-center">
            <h2 className="text-8xl md:text-9xl font-display font-bold text-white uppercase opacity-20">
              WORK
              <br />
              OUT
            </h2>
            <p className="mt-8 text-xl text-sanctum-orange font-bold tracking-widest">
              FITNESS PROGRAMS
            </p>
          </div>

          {/* Discipline Cards */}
          {DISCIPLINES.map((d) => (
            <div 
              key={d.id} 
              className="group relative h-[60vh] w-[80vw] md:w-[35vw] flex-shrink-0 overflow-hidden bg-sanctum-gray border-t-4 border-sanctum-orange"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={d.image} 
                  alt={d.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors" />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end">
                <span className="text-sm font-bold text-sanctum-orange mb-2 border border-sanctum-orange w-fit px-2 py-1">{d.id}</span>
                <h3 className="text-5xl font-display font-bold text-white uppercase mb-4">{d.title}</h3>
                <p className="text-white/90 max-w-xs font-medium">{d.description}</p>
              </div>
            </div>
          ))}

          {/* Spacer at end */}
          <div className="w-[10vw] flex-shrink-0" />
        </motion.div>
      </div>
    </section>
  );
};

export default Disciplines;