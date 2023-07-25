import clsx from "clsx";

export default function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-label={`${process.env.SITE_NAME} logo`}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx("h-4 w-4 fill-black dark:fill-white", props.className)}
    >
      <path
        d="M1.44444 0C0.6467 0 0 0.6467 0 1.44444V2.88889C0 9.27085 5.1736 14.4444 11.5556 14.4444V24.5556C11.5556 25.3533 12.2023 26 13 26C13.7977 26 14.4444 25.3533 14.4444 24.5556V18.7778C20.8264 18.7778 26 13.6042 26 7.22222V5.77778C26 4.98003 25.3533 4.33333 24.5556 4.33333H23.1111C19.4577 4.33333 16.2003 6.02877 14.0827 8.67577C12.8031 3.68716 8.27659 0 2.88889 0H1.44444Z"
        fill="black"
      />
    </svg>
  );
}
