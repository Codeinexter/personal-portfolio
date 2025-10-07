"use client";
import { educations } from "@/utils/data/educations";
import { motion } from "framer-motion";
import { Award, BookOpen, Calendar, Trophy } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import lottieFile from "../../../assets/lottie/study.json";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

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
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  },
};

export default function EducationSection() {
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    // Listen for navbar clicks targeting #education
    const handleClick = (e) => {
      const target = e.target.closest("a[href='#education']");
      if (target) {
        // Smooth scroll
        document
          .querySelector("#education")
          ?.scrollIntoView({ behavior: "smooth" });

        // Force re-trigger animation
        setAnimateKey((prev) => prev + 1);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <section
      id="education"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      {/* Section Title */}
      <motion.div
        key={`title-${animateKey}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center my-5 lg:py-8"
      >
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]" />
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md mx-3">
            Educations
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]" />
        </div>
      </motion.div>

      {/* Cards */}
      <motion.div
        key={`cards-${animateKey}`} // 👈 when key changes → animation restarts
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
      >
        {/* Lottie Animation */}
        <div className="flex-shrink-0 w-3/4 h-3/4">
          <AnimationLottie
            animationPath={lottieFile}
            width={"100%"}
            height={"100%"}
          />
        </div>

        {educations.map((edu, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <GlowCard identifier={`edu-${i}`}>
              <div className="relative border rounded-xl p-8 transition-all duration-300 bg-gray-900/50 backdrop-blur-sm border-blue-400/20 hover:border-teal-500 glow-card">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{edu.mascot}</span>
                      <h3 className="text-2xl font-bold text-white">
                        {edu.degree}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-300 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-teal-500" />
                      {edu.school}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {edu.year}
                    </p>
                  </div>

                  <p className="text-gray-300 text-sm italic border-l-2 border-teal-500 pl-3">
                    {edu.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      Key Achievements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement, j) => (
                        <div
                          key={j}
                          className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 flex items-center gap-2 text-sm"
                        >
                          <Award className="w-4 h-4" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {edu.skills.map((skill, k) => (
                      <span
                        key={k}
                        className="px-2 py-1 text-xs rounded bg-blue-500/10 text-blue-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
