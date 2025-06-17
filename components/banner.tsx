"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function Banner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const floatingShapes = [
    { className: "top-[20%] left-[10%]", size: "w-12 h-12", delay: 0 },
    { className: "top-[30%] right-[15%]", size: "w-8 h-8", delay: 1 },
    { className: "bottom-[25%] left-[20%]", size: "w-10 h-10", delay: 0.5 },
    { className: "bottom-[20%] right-[10%]", size: "w-16 h-16", delay: 1.5 },
  ];

  return (
    <section
      ref={bannerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 bg-dot-pattern opacity-40" />
      </div>

      {/* Animated floating shapes */}
      {floatingShapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.className} ${shape.size} rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-lg hidden md:block`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.8,
            scale: 1,
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            delay: shape.delay,
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-4 z-10">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6 relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-50 blur-lg"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
              <img
                src="https://i.ibb.co.com/fYgWxy10/my-pic.jpg"
                alt="Rasel Ahmed"
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-4 glow-text bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          >
            Rasel Ahmed
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground mb-8"
          >
            <span className="relative">
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary"></span>
              MERN Stack Developer
            </span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="relative overflow-hidden group"
            >
              <Link href="#contact">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Get in Touch</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 hover:bg-primary/10 transition-colors duration-300"
              onClick={() =>
                window.open(
                  "https://docs.google.com/document/d/1v5YmDLQ1yyszzu5pAXzV7nqR57eknhRj6mb96qb175E/export?format=pdf",
                  "_blank"
                )
              }
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 1.5, duration: 0.5 },
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-secondary"
          >
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
