import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import {
  ArrowRight,
  FileText,
  MessageSquare,
  Bot as BotIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export function HeroSection() {
  const steps = [
    {
      icon: FileText,
      title: "Create a ticket",
      description: "Describe your problem and share any relevant details.",
    },
    {
      icon: BotIcon,
      title: "AI assigns an expert",
      description:
        "Our AI analyzes the ticket and assigns it to the best-suited expert, along with a summary and helpful notes.",
    },
    {
      icon: MessageSquare,
      title: "Chat and resolve",
      description:
        "Collaborate with your assigned expert until your issue is solved.",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center">
      <div className="w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main content */}
          <motion.div
            className="lg:col-span-7 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main headline */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-6xl font-bold leading-[1.1] mb-4">
                <span className="text-foreground block">Get Help or</span>
                <span className="text-primary block">Become the Help</span>
              </h1>
            </motion.div>

            {/* Sub headline */}
            <motion.p
              className="text-base sm:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Need help? Create a ticket and connect with someone who can solve
              it. Know your stuff? Join as an expert and start helping others.
            </motion.p>

            {/* Get Started Button */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link to={"/sign-up"}>
                <Button
                  size="lg"
                  className="w-full max-w-sm sm:max-w-52 px-8 sm:px-10 py-4 sm:py-6 text-base sm:text-lg rounded-2xl group"
                >
                  Get Started
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* How it works */}
          <div className="lg:col-span-5">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  className={`transform ${index === 1 ? "lg:translate-x-8" : index === 2 ? "lg:-translate-x-4" : ""}`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:shadow-lg transition-all duration-200 group">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                        <step.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="rounded-md bg-muted text-muted-foreground text-xs font-medium py-1">
                            {`Step ${index + 1}`}
                          </span>
                          <span className="sr-only">{`Step ${index + 1}: ${step.title}`}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-card-foreground mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {step.description}
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
