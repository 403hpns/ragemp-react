import { cva, VariantProps } from "class-variance-authority";
import { merge } from "../../lib/merge";
import { ButtonHTMLAttributes } from "react";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default: "",
    },
    defaultVariants: {
      variant: "default",
    },
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  className,
  variant,
  ...props
}) => {
  return (
    <button
      className={merge({ className, variant })}
      disabled={isLoading}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
