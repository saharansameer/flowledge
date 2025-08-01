import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import {
  Play as PlayIcon,
  ArrowRight,
  FileText,
  Users as UsersIcon,
  MessageSquare,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export function HeroSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.25, 0, 1] },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const features = [
    {
      icon: FileText,
      title: "Smart Summaries",
      description:
        "AI generates helpful notes from your ticket details for experts",
    },
    {
      icon: UsersIcon,
      title: "Expert Matching",
      description: "Get connected with the right domain expert based on your ticket or issue",
    },
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description: "Work directly with experts in your ticket until resolved",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center">
      <div className="w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main content */}
          <motion.div
            className="lg:col-span-7 text-center lg:text-left"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {/* Main headline */}
            <motion.div variants={fadeInUp} className="mb-8">
              <h1 className="text-4xl sm:text-6xl font-bold leading-[1.1] mb-4">
                <span className="text-foreground block">Get Help or</span>
                <span className="text-primary block">Become the Help</span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Need help? Create a ticket and connect with someone who can solve
              it. Know your stuff? Join as an expert and start helping others.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mb-16"
            >
              <Link to={"/sign-up"}>
                <Button
                  size="lg"
                  className="px-8 sm:px-10 py-4 sm:py-6 text-base sm:text-lg rounded-2xl group"
                >
                  Get Started
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link to={"/"}>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 sm:px-10 py-4 sm:py-6 text-base sm:text-lg rounded-2xl group bg-transparent"
                >
                  <PlayIcon className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Feature cards */}
          <div className="lg:col-span-5">
            <motion.div
              className="space-y-6"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  className={`transform ${index === 1 ? "lg:translate-x-8" : index === 2 ? "lg:-translate-x-4" : ""}`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:shadow-lg transition-all duration-200 group">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                        <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-card-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
