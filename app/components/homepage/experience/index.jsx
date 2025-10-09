"use client";
import { experiences } from "@/utils/data/experience";
import { motion } from "framer-motion";
import { Award, Briefcase, Calendar, Trophy } from "lucide-react";
import Image from "next/image";
import { memo, useEffect, useState } from "react";
import experienceLottie from "../../../assets/lottie/code.json";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

// Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

const cardVariants = {
  hidden: (i) => ({
    x: i % 2 === 1 ? -100 : 100,
    opacity: 0,
  }),
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  }),
};

// Memoized components to reduce re-render cost
const MemoGlowCard = memo(GlowCard);
const MemoAnimationLottie = memo(AnimationLottie);

export default function Experience() {
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest("a[href='#experience']");
      if (target) {
        e.preventDefault();
        document
          .querySelector("#experience")
          ?.scrollIntoView({ behavior: "smooth" });

        // retrigger animation sequence
        setTrigger((prev) => prev + 1);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <section
      id="experience"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      <Image
        src="/section.svg"
        alt="Hero Background"
        width={1572}
        height={795}
        className="absolute top-0 -z-10 select-none pointer-events-none"
        loading="lazy"
        decoding="async"
      />

      {/* Section Title */}
      <motion.div
        key={`title-${trigger}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="flex justify-center my-5 lg:py-8"
      >
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]" />
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md mx-3">
            Experiences
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]" />
        </div>
      </motion.div>

      {/* Cards */}
      <motion.div
        key={`container-${trigger}`} // 🔁 changing key restarts animation
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 will-change-transform"
      >
        {/* Lottie Animation */}
        <div className="flex-shrink-0 w-3/4 h-3/4 mx-auto will-change-transform">
          <MemoAnimationLottie
            key={`lottie-${trigger}`}
            animationPath={experienceLottie}
            width="100%"
            height="100%"
            loop
            autoPlay
            renderer="svg"
          />
        </div>

        {experiences.map((exp, i) => (
          <motion.div
            key={`exp-${i}-${trigger}`}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="h-full will-change-transform"
          >
            <MemoGlowCard identifier={`exp-${i}`}>
              <div className="relative border rounded-xl p-8 transition-all duration-300 bg-gray-900/40 backdrop-blur-sm border-blue-400/20 hover:border-teal-500">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{exp.mascot}</span>
                      <h3 className="text-2xl font-bold text-white">
                        {exp.title}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-300 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-teal-500" />
                      {exp.company}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {exp.year}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm italic border-l-2 border-teal-500 pl-3">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      Key Achievements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.achievements.map((achievement, j) => (
                        <div
                          key={`ach-${j}`}
                          className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 flex items-center gap-2 text-sm"
                        >
                          <Award className="w-4 h-4" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, k) => (
                      <span
                        key={`skill-${k}`}
                        className="px-2 py-1 text-xs rounded bg-blue-500/10 text-blue-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </MemoGlowCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
