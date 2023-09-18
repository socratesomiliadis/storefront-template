import clsx from "clsx";

const dots = "mx-[2px] inline-block h-1 w-1 animate-blink rounded-md";

const LoadingDots = ({
  color = "rgb(255 255 255 / 0.6)",
  className,
}: {
  color?: string;
  className: string;
}) => {
  return (
    <span className="mx-2 inline-flex items-center">
      <span
        style={{
          backgroundColor: color,
        }}
        className={clsx(dots, className)}
      />
      <span
        style={{
          backgroundColor: color,
        }}
        className={clsx(dots, "animation-delay-[200ms]", className)}
      />
      <span
        style={{
          backgroundColor: color,
        }}
        className={clsx(dots, "animation-delay-[400ms]", className)}
      />
    </span>
  );
};

export default LoadingDots;
