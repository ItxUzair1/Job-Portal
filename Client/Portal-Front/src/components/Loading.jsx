// components/Loading.jsx
import { BriefcaseBusiness } from "lucide-react"; // Optional: install lucide-react icons
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <motion.div
        className="flex items-center gap-3 text-blue-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <BriefcaseBusiness size={40} className="animate-bounce" />
        <h1 className="text-2xl font-bold">JobPortal</h1>
      </motion.div>
      <motion.div
        className="mt-4 h-1 w-40 bg-blue-200 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: "10rem" }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="h-full bg-blue-500 w-1/2 animate-pulse" />
      </motion.div>
      <p className="mt-6 text-sm text-gray-500">Finding the best opportunities for you...</p>
    </div>
  );
}
