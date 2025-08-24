import React from "react";
import { motion } from "framer-motion";

export default function InfoSection() {
  return (
    <motion.section
      className="relative w-full mt-5 px-6 sm:px-12 lg:px-20  text-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto text-center space-y-6">
    

        <p className="text-gray-300 leading-relaxed">
          All you need is a modern browser on your desktop, laptop, tablet, 
          or mobile device. No extra applications are required. Optional 
          webcams and audio enhance the experience, but they’re not necessary.
        </p>

        <p className="text-gray-300 leading-relaxed">
          We also provide dedicated spaces for roleplay, image sharing, and 
          themed discussions to explore your interests with like-minded people.
        </p>

        <p className="text-gray-300 leading-relaxed">
          If you experience connection issues, clear your browser cache and 
          try again. Use the <span className="font-semibold text-blue-400">Chat Now</span> 
          button at the top of the page to rejoin anytime. 
          If you enjoy this space, consider recommending it to friends and 
          family who may also be interested.
        </p>

      </div>
    </motion.section>
  );
}
