"use client";

import * as React from "react";
import { useState, useId, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Slot } from "@radix-ui/react-slot";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TypewriterProps {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
}

export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";

  useEffect(() => {
    if (!currentText) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    currentText,
    loop,
    speed,
    deleteSpeed,
    delay,
    displayText,
    text,
  ]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-text-secondary"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gold text-void hover:bg-gold-light shadow-lg shadow-gold/10",
        destructive: "bg-accent-error text-white hover:bg-accent-error/90",
        outline: "border border-white/10 bg-white/5 text-text-primary hover:bg-white/10 hover:border-white/20",
        secondary: "bg-surface text-text-primary hover:bg-surface/80",
        ghost: "hover:bg-white/5 text-text-secondary hover:text-text-primary",
        link: "text-gold underline-offset-4 hover:underline font-semibold",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-full px-4",
        lg: "h-13 rounded-full px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text-primary shadow-sm transition-all placeholder:text-text-tertiary/50 focus-visible:bg-white/10 focus-visible:border-gold/30 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, ...props }, ref) => {
    const id = useId();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    return (
      <div className="grid w-full items-center gap-2">
        {label && <Label htmlFor={id}>{label}</Label>}
        <div className="relative">
          <Input id={id} type={showPassword ? "text" : "password"} className={cn("pe-12", className)} ref={ref} {...props} />
          <button 
            type="button" 
            onClick={togglePasswordVisibility} 
            className="absolute inset-y-0 end-0 flex h-full w-12 items-center justify-center text-text-tertiary transition-colors hover:text-gold focus-visible:text-gold focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" 
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (<EyeOff className="size-4" aria-hidden="true" />) : (<Eye className="size-4" aria-hidden="true" />)}
          </button>
        </div>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

function JusticeLogo() {
    return (
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                <Scale className="w-5 h-5 text-gold" />
            </div>
            <span className="font-display text-2xl text-gold font-semibold tracking-tight">JusticeAI</span>
        </div>
    )
}

function SignInForm() {
  const navigate = useNavigate();
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault(); 
    console.log("UI: Sign In form submitted"); 
    navigate("/chat");
  };
  return (
    <form onSubmit={handleSignIn} autoComplete="on" className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center mb-4">
        <JusticeLogo />
        <h1 className="text-3xl font-display font-bold text-text-primary">Sign in to your account</h1>
        <p className="text-balance text-sm text-text-secondary">Access your legal defense strategy</p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" name="email" type="email" placeholder="counsel@justiceAI.app" required autoComplete="email" />
        </div>
        <PasswordInput name="password" label="Password" required autoComplete="current-password" placeholder="••••••••" />
        <Button type="submit" variant="default" className="mt-4">Access Workspace</Button>
      </div>
    </form>
  );
}

function SignUpForm() {
  const navigate = useNavigate();
  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault(); 
    console.log("UI: Sign Up form submitted"); 
    navigate("/chat");
  };
  return (
    <form onSubmit={handleSignUp} autoComplete="on" className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center mb-4">
        <JusticeLogo />
        <h1 className="text-3xl font-display font-bold text-text-primary">Create an account</h1>
        <p className="text-balance text-sm text-text-secondary">Start your constitutional journey</p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" type="text" placeholder="Advocate Name" required autoComplete="name" />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" name="email" type="email" placeholder="counsel@justiceAI.app" required autoComplete="email" />
        </div>
        <PasswordInput name="password" label="Create Password" required autoComplete="new-password" placeholder="••••••••"/>
        <Button type="submit" variant="default" className="mt-4">Initialize Account</Button>
      </div>
    </form>
  );
}

function AuthFormContainer({ isSignIn, onToggle }: { isSignIn: boolean; onToggle: () => void; }) {
    return (
        <div className="mx-auto grid w-[380px] gap-6">
            <div className="p-8 rounded-3xl premium-blur border border-white/5 shadow-2xl">
                {isSignIn ? <SignInForm /> : <SignUpForm />}
                <div className="mt-8 text-center text-sm text-text-tertiary">
                    {isSignIn ? "New to JusticeAI?" : "Already an advocate?"}{" "}
                    <button 
                        onClick={onToggle}
                        className="text-gold hover:text-gold-light font-semibold underline-offset-4 hover:underline transition-colors"
                    >
                        {isSignIn ? "Create account" : "Sign in instead"}
                    </button>
                </div>
            </div>
            
            <div className="relative text-center text-xs px-2 py-4">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-white/5"></div>
                </div>
                <span className="relative z-10 bg-void px-4 text-text-tertiary uppercase tracking-widest font-bold">Secure Access Only</span>
            </div>
            
            <Button 
                variant="outline" 
                type="button" 
                onClick={() => console.log("UI: Google button clicked")}
                className="hover:border-gold/30 hover:bg-gold/5"
            >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google icon" className="mr-3 h-5 w-5" />
                Continue with Professional ID
            </Button>
        </div>
    )
}

interface AuthContentProps {
    image?: {
        src: string;
        alt: string;
    };
    quote?: {
        text: string;
        author: string;
    }
}

interface AuthUIProps {
    signInContent?: AuthContentProps;
    signUpContent?: AuthContentProps;
}

const defaultSignInContent = {
    image: {
        src: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop",
        alt: "A classical law library with gold lighting"
    },
    quote: {
        text: "Justice is truth in action.",
        author: "Benjamin Disraeli"
    }
};

const defaultSignUpContent = {
    image: {
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop",
        alt: "A modern, minimalist office space with legal clarity"
    },
    quote: {
        text: "Liberty consists in the power to do that which is permitted by law.",
        author: "Cicero"
    }
};

export function AuthUI({ signInContent = {}, signUpContent = {} }: AuthUIProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleForm = () => setIsSignIn((prev) => !prev);

  const finalSignInContent = {
      image: { ...defaultSignInContent.image, ...signInContent.image },
      quote: { ...defaultSignInContent.quote, ...signInContent.quote },
  };
  const finalSignUpContent = {
      image: { ...defaultSignUpContent.image, ...signUpContent.image },
      quote: { ...defaultSignUpContent.quote, ...signUpContent.quote },
  };

  const currentContent = isSignIn ? finalSignInContent : finalSignUpContent;

  return (
    <div className="w-full min-h-screen md:grid md:grid-cols-2 bg-void text-text-primary selection:bg-gold/30 selection:text-white">
      <style>{`
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear {
          display: none;
        }
      `}</style>
      <div className="flex h-screen items-center justify-center p-6 md:h-auto md:p-0">
        <AuthFormContainer isSignIn={isSignIn} onToggle={toggleForm} />
      </div>

      <div
        className="hidden md:block relative bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${currentContent.image.src})` }}
        key={currentContent.image.src}
      >
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-x-0 bottom-0 h-[250px] bg-gradient-to-t from-void to-transparent z-10" />
        
        <div className="relative z-20 flex h-full flex-col items-center justify-end p-12 pb-24 max-w-lg mx-auto">
            <blockquote className="space-y-4 text-center">
              <p className="text-4xl font-display font-bold italic leading-tight text-white drop-shadow-lg">
                “<Typewriter
                    key={currentContent.quote.text}
                    text={currentContent.quote.text}
                    speed={60}
                    cursor="_"
                  />”
              </p>
              <footer className="block text-sm font-mono tracking-[0.3em] uppercase text-gold">
                  — {currentContent.quote.author}
              </footer>
            </blockquote>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-12 right-12 z-20 opacity-50">
            <div className="w-32 h-32 border-r border-t border-gold/40" />
        </div>
        <div className="absolute bottom-12 left-12 z-20 opacity-50">
            <div className="w-32 h-32 border-l border-b border-gold/40" />
        </div>
      </div>
    </div>
  );
}
