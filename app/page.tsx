"use client";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  TrendingUp,
  FileText,
  Target,
  Upload,
  Award,
  Download,
  Star,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { TypewriterEffect } from "@/components/animation/TypewriterEffect";
import { CountUp } from "@/components/animation/CountUp";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden dark:bg-background">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20 dark:from-primary/5 dark:to-background md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              className="flex flex-col justify-center space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}>
              <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
                Optimize Your Resume,{" "}
                <span className="text-primary">Boost Your Career</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Get personalized AI-powered resume analysis and recommendations
                to stand out in your job search
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link href="/resume-upload">
                  <Button size="lg" className="group">
                    Upload Your Resume
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Learn How It Works
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="relative hidden md:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="https://storysnap.support-0bf.workers.dev/template/1742825940601-Profiling-amico.png"
                  alt="Resume optimization"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-lg bg-card p-4 shadow-lg dark:bg-card">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900/30">
                    <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Resume Score
                    </p>
                    <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                      92%
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating elements for visual interest */}
        <motion.div
          className="absolute -bottom-10 left-1/4 h-20 w-20 rounded-full bg-primary/10 dark:bg-primary/5"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
        />
        <motion.div
          className="absolute right-1/4 top-10 h-16 w-16 rounded-full bg-secondary/10 dark:bg-secondary/5"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            delay: 0.5,
          }}
        />
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
              Three simple steps to optimize your resume and improve your job
              prospects
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative flex flex-col items-center rounded-lg bg-card p-6 text-center shadow-sm dark:bg-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {step.icon}
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mb-4 text-muted-foreground">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-primary md:block">
                    <ChevronRight className="h-8 w-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}>
            <Button size="lg">
              Start Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-20 dark:bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Key Features
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
              Powerful tools to help you create the perfect resume
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex flex-col items-center rounded-lg bg-card p-6 text-center shadow-sm transition-all hover:shadow-md dark:bg-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}>
                <div className="mb-4 rounded-lg bg-primary/10 p-3 text-primary dark:bg-primary/20">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {feature.description}
                </p>
                <Link href={feature.link} className="mt-auto">
                  <Button variant="ghost" size="sm" className="group">
                    Learn More
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              What Our Users Say
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
              Success stories from professionals who improved their job
              prospects
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="rounded-lg bg-card p-6 shadow-sm dark:bg-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-amber-400 text-amber-400 dark:fill-amber-300 dark:text-amber-300"
                    />
                  ))}
                </div>
                <p className="mb-4 italic text-muted-foreground">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-muted">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-t border-border bg-muted py-12 dark:bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <h3 className="text-xl font-medium text-muted-foreground">
              Trusted by leading companies
            </h3>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 opacity-70 dark:opacity-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            {partners.map((partner, index) => (
              <div key={index} className="h-8 w-auto">
                <Image
                  src={partner}
                  alt="Partner logo"
                  width={120}
                  height={32}
                  className="h-full w-auto object-contain dark:invert"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Ready to Boost Your Career?
            </h2>
            <p className="mb-8 text-primary-foreground/90">
              Upload your resume now and get personalized recommendations to
              stand out from the competition
            </p>
            <Button size="lg" variant="secondary" className="group">
              Get Started For Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12 dark:bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-foreground">
                  ResumeAI
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                AI-powered resume optimization to help you land your dream job
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">
                Product
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">
                Company
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">
                Legal
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

const steps = [
  {
    icon: <Upload className="h-6 w-6" />,
    title: "Upload Your Resume",
    description:
      "Simply upload your current resume in PDF, DOCX, or TXT format",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Get AI Analysis",
    description:
      "Our AI analyzes your resume and provides personalized recommendations",
  },
  {
    icon: <Download className="h-6 w-6" />,
    title: "Optimize & Download",
    description: "Apply the suggestions and download your improved resume",
  },
];

const features = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Resume Optimization",
    link: "/resume-optimization",
    description:
      "AI-powered analysis to enhance your resume's impact and visibility",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "ATS Compatibility",
    link: "/ats-compatibility",
    description: "Ensure your resume passes through Applicant Tracking Systems",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Keyword Analysis",
    link: "/keyword-analysis",
    description: "Identify and incorporate industry-specific keywords",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Expert Recommendations",
    link: "/expert-recommendations",
    description: "Get tailored advice from industry professionals",
  },
];

const testimonials = [
  {
    quote:
      "ResumeAI helped me identify critical gaps in my resume. After implementing the suggestions, I received interview calls from 3 top companies!",
    name: "Sarah Johnson",
    position: "Software Engineer",
    avatar: "/testimonial-1.jpg",
  },
  {
    quote:
      "The keyword analysis feature is a game-changer. My resume now perfectly aligns with job descriptions, and I landed my dream job within weeks.",
    name: "Michael Chen",
    position: "Marketing Manager",
    avatar: "/testimonial-2.jpg",
  },
  {
    quote:
      "As a career changer, I was struggling to highlight my transferable skills. ResumeAI's recommendations helped me showcase my value effectively.",
    name: "Emily Rodriguez",
    position: "Data Analyst",
    avatar: "/testimonial-3.jpg",
  },
];

const partners = [
  "/partner-logo-1.svg",
  "/partner-logo-2.svg",
  "/partner-logo-3.svg",
  "/partner-logo-4.svg",
  "/partner-logo-5.svg",
];
