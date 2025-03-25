// TestimonialCard.tsx
"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  position: string;
  quote: string;
  avatar: string;
  rating?: number;
  index?: number;
}

export function TestimonialCard({
  name,
  position,
  quote,
  avatar,
  rating = 5,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      className="w-96 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 mx-3 transition-all duration-300 hover:border-primary group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}>
      {/* 评分 */}
      <div className="mb-4 flex">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-primary fill-primary" />
        ))}
      </div>

      {/* 引用内容 */}
      <div className="relative mb-6">
        <div className="absolute -top-2 -left-1 text-4xl text-primary/20 font-serif">
          "
        </div>
        <p className="pt-2 text-base text-foreground/90 leading-relaxed">
          {quote}
        </p>
        <div className="absolute -bottom-4 -right-1 text-4xl text-primary/20 font-serif">
          "
        </div>
      </div>

      {/* 个人信息 */}
      <div className="flex items-center">
        <div className="relative mr-4">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-primary/70 blur-sm group-hover:blur-md transition-all duration-300"></div>
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-background">
            <Image
              src={avatar}
              alt={name}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div>
          <p className="font-medium text-foreground text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{position}</p>
        </div>
      </div>
    </motion.div>
  );
}
