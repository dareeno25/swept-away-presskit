"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  once?: boolean;
  as?: keyof typeof motion;
}

export function AnimatedElement({
  children,
  className = "",
  variants,
  delay = 0,
  once = true,
  as = "div"
}: AnimatedElementProps) {
  const Component = motion[as] as any;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
