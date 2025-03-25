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

import { InfiniteScroll } from "@/components/animation/InfiniteScroll";
import { TestimonialCard } from "@/components/home/TestimonialCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden dark:bg-background">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20 dark:from-primary/5 dark:to-background md:py-28 min-h-[100vh] flex flex-col justify-center">
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
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 relative">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <div className="inline-block mb-3 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Simple Process
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Three Steps to <span className="text-primary">Success</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[600px] text-muted-foreground text-lg">
              Our streamlined approach helps you optimize your resume and stand
              out to employers
            </p>
          </motion.div>

          <motion.div
            className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <div className="grid max-w-xl grid-cols-1 gap-x-14 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col ms-0 md:ms-10">
                <div className="inline-flex justify-between items-center mb-10">
                  <img src="/step-1.svg" />
                  <img src="/arrow.svg" />
                </div>
                <div className="flex items-center gap-x-3 font-bold leading-7 text-foreground text-xl">
                  <Upload className="h-6 w-6" />
                  Upload Your Resume
                </div>
                <div className="mt-4 flex flex-auto flex-col leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Simply upload your current resume in PDF, DOCX, or TXT
                    format
                  </p>
                </div>
              </div>
              <div className="flex flex-col ms-0 md:ms-10">
                <div className="inline-flex justify-between items-center mb-10">
                  <img src="/step-2.svg" className="size-24" />
                  <img
                    src="/arrow.svg"
                    className="transform scale-y-[-1] hidden lg:flex"
                    alt="/"
                  />
                </div>
                <div className="flex items-center gap-x-3 font-bold leading-7 text-foreground text-xl">
                  <Award className="h-6 w-6" />
                  Get AI Analysis
                </div>
                <div className="mt-4 flex flex-auto flex-col leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Our AI analyzes your resume and provides personalized
                    recommendations
                  </p>
                </div>
              </div>
              <div className="flex flex-col ms-0 md:ms-10">
                <div className="inline-flex justify-between items-center mb-10">
                  <img src="/step-3.svg" className="size-24" />
                </div>
                <div className="flex items-center gap-x-3 font-bold leading-7 text-foreground text-xl">
                  <Download className="h-6 w-6" />
                  Optimize & Download
                </div>
                <div className="mt-4 flex flex-auto flex-col leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Apply the suggestions and download your improved resume
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pb-24 relative overflow-hidden">
        {/* 装饰性元素 */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <div className="inline-block mb-3 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Powerful Tools
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Everything You Need to{" "}
              <span className="text-primary">Stand Out</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[600px] text-muted-foreground text-lg">
              Intuitive features designed to showcase your professional
              strengths
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group relative overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}>
                <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/10 opacity-50 blur-2xl transition-all duration-300 group-hover:bg-primary/20 group-hover:opacity-100"></div>

                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  {feature.icon}
                </div>

                <h3 className="mb-2 text-xl font-bold text-foreground">
                  {feature.title}
                </h3>

                <p className="mb-5 text-muted-foreground">
                  {feature.description}
                </p>

                <Link
                  href={feature.link}
                  className="inline-flex items-center text-sm font-medium text-primary transition-all duration-300 group-hover:translate-x-1">
                  Explore Feature
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pb-24 relative overflow-hidden">
        {/* 装饰性背景元素 */}
        <div className="absolute top-40 left-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-40 right-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <div className="inline-block mb-3 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Success Stories
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Trusted by <span className="text-primary">Professionals</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[600px] text-muted-foreground text-lg">
              Real results from people who transformed their career
              opportunities
            </p>
          </motion.div>

          <div className="relative overflow-hidden">
            {/* 渐变遮罩 */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10"></div>

            <InfiniteScroll speed={2}>
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.name}
                  {...testimonial}
                  index={index}
                />
              ))}
            </InfiniteScroll>

            <InfiniteScroll direction="right" speed={2}>
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.name}
                  {...testimonial}
                  index={index}
                />
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <div className="inline-block mb-3 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Common Questions
            </div>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[600px] text-muted-foreground">
              Everything you need to know about optimizing your resume and
              landing your dream job
            </p>
          </motion.div>

          <Accordion
            type="single"
            collapsible
            className="space-y-4 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg px-4 border-primary/30">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground  pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative">
                  <Image
                    src="/rocket.png"
                    alt="Logo"
                    height={50}
                    width={50}
                    className="transition-transform duration-300 hover:rotate-12"
                  />
                </div>

                <span className="font-bold text-xl hidden sm:inline-block transition-all duration-300">
                  Insight CV
                </span>
              </Link>
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

const faqs = [
  {
    question: "How does Insight CV optimize my resume?",
    answer:
      "Insight CV uses AI to analyze your resume against job descriptions, identifying keyword gaps, suggesting improvements to your content, and reformatting your layout for better readability and ATS compatibility. Our platform provides specific recommendations tailored to your target role and industry.",
  },
  {
    question: "Will my resume pass Applicant Tracking Systems (ATS)?",
    answer:
      "Yes! Our templates and optimization tools are specifically designed to be ATS-friendly. We ensure proper formatting, appropriate keyword density, and clear section headings that ATS software can easily parse. Our system also performs ATS simulation tests to verify compatibility before you submit applications.",
  },
  {
    question: "How long does it take to create a resume?",
    answer:
      "With Insight CV, you can create a professional resume in as little as 15 minutes. Upload your existing resume for instant optimization, or build from scratch using our guided templates. Our intuitive interface and real-time suggestions streamline the process, saving you hours of formatting and guesswork.",
  },
  {
    question: "Can I create multiple versions of my resume?",
    answer:
      "Absolutely! Our platform allows you to create unlimited resume versions tailored to different positions or industries. Store all your versions in your personal dashboard, make quick edits as needed, and track which version you've sent to each employer. This targeted approach significantly increases your interview chances.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "We take data security seriously. All your information is encrypted using industry-standard protocols, and we never share your personal data with third parties without your explicit consent. You maintain complete ownership of your content, and you can delete your data from our servers at any time.",
  },
  {
    question: "Do you offer resume templates for specific industries?",
    answer:
      "Yes, we provide a wide range of industry-specific templates optimized for different career fields including technology, healthcare, finance, creative industries, and more. Each template is designed with industry standards in mind and includes relevant section suggestions and formatting appropriate for your field.",
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
    avatar: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_3.png",
  },
  {
    quote:
      "The keyword analysis feature is a game-changer. My resume now perfectly aligns with job descriptions, and I landed my dream job within weeks.",
    name: "Michael Chen",
    position: "Marketing Manager",
    avatar: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png",
  },
  {
    quote:
      "As a career changer, I was struggling to highlight my transferable skills. ResumeAI's recommendations helped me showcase my value effectively.",
    name: "Emily Rodriguez",
    position: "Data Analyst",
    avatar: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_7.png",
  },
  {
    quote:
      "The AI-powered feedback on my resume was incredibly detailed and personalized. It felt like having a professional career coach guide me through every section.",
    name: "David Kim",
    position: "Product Manager",
    avatar: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_8.png",
  },
  {
    quote:
      "After 6 months of job searching with no results, I tried ResumeAI. Within two weeks of updating my resume based on the AI suggestions, I received 5 interview invitations!",
    name: "Jessica Patel",
    position: "UX Designer",
    avatar: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_9.png",
  },
  {
    quote:
      "The industry-specific recommendations were spot on. As a healthcare professional, I appreciated how ResumeAI understood the nuances of my field and helped me stand out.",
    name: "Robert Wilson",
    position: "Healthcare Administrator",
    avatar: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_10.png",
  },
  {
    quote:
      "I was skeptical about AI resume tools, but ResumeAI exceeded my expectations. The formatting suggestions made my resume look polished and professional without losing my personal touch.",
    name: "Olivia Martinez",
    position: "Financial Analyst",
    avatar: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_11.png",
  },
  {
    quote:
      "As a recent graduate with limited experience, I was worried about my resume. ResumeAI helped me highlight my academic projects and internships in a way that impressed recruiters.",
    name: "James Taylor",
    position: "Junior Developer",
    avatar: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_12.png",
  },
];

const partners = [
  "/partner-logo-1.svg",
  "/partner-logo-2.svg",
  "/partner-logo-3.svg",
  "/partner-logo-4.svg",
  "/partner-logo-5.svg",
];
