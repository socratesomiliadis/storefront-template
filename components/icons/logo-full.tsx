import clsx from "clsx";

export default function LogoFull(props: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-label={`${process.env.SITE_NAME} logo`}
      {...props}
      className={clsx("h-6 fill-black dark:fill-white", props.className)}
      viewBox="0 0 222 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.44444 0C0.6467 0 0 0.6467 0 1.44444V2.88889C0 9.27085 5.1736 14.4444 11.5556 14.4444V24.5556C11.5556 25.3533 12.2023 26 13 26C13.7977 26 14.4444 25.3533 14.4444 24.5556V18.7778C20.8264 18.7778 26 13.6042 26 7.22222V5.77778C26 4.98003 25.3533 4.33333 24.5556 4.33333H23.1111C19.4577 4.33333 16.2003 6.02877 14.0827 8.67577C12.8031 3.68716 8.27659 0 2.88889 0H1.44444Z"
        fill="black"
      />
      <path
        d="M44.688 26V1.296H49.168C54.768 1.296 57.392 3.44 57.392 6.992C57.392 11.024 53.552 13.04 48.816 13.04H47.184V26H44.688ZM47.184 12.56H48.752C52.464 12.56 54.928 10.512 54.928 6.992C54.928 3.696 52.848 1.904 48.56 1.904H47.184V12.56ZM64.1703 26.128C60.4583 26.128 58.1543 22.576 58.1543 17.264C58.1543 11.472 60.8743 7.44 64.5223 7.44C67.6583 7.44 69.5143 9.744 69.9303 13.872H60.4583C60.3943 14.512 60.3623 15.184 60.3623 15.92C60.3623 21.2 61.9623 24.368 64.8423 24.368C67.4343 24.368 69.0983 21.712 69.7703 17.712H70.1543C69.5143 22.128 67.8503 26.128 64.1703 26.128ZM60.5223 13.296H67.6583C67.4343 10.16 66.2823 8.016 64.3303 8.016C62.3143 8.016 60.9703 9.904 60.5223 13.296ZM73.5258 26V7.664H75.8938V14.48C76.9178 9.52 79.4458 7.44 82.1338 7.44V9.776C81.6858 9.68 81.3338 9.616 80.9498 9.616C77.4298 9.616 75.8938 13.04 75.8938 17.52V26H73.5258ZM84.746 7.664C85.642 2.384 88.074 0.623999 92.01 0.271999V2.384C91.338 2.064 90.538 1.872 89.802 1.872C87.594 1.872 86.346 3.184 86.346 5.584C86.346 6.224 86.538 7.024 86.762 7.664H91.658V8.592H87.082V26L84.746 26.032V8.592H83.274V8.336L84.746 7.664ZM98.0675 26.128C94.8675 26.128 93.4595 23.888 93.4595 19.984V7.664H95.8275V19.824C95.8275 23.184 96.8515 24.56 98.9635 24.56C101.908 24.56 103.476 21.136 103.476 16.976V7.664H105.844V26H103.604L103.508 19.792C102.804 23.472 100.884 26.128 98.0675 26.128ZM110.651 26V7.664H112.987V14.32C113.627 9.968 115.515 7.344 118.683 7.344C121.435 7.344 122.907 9.328 122.907 13.232V14.32C123.579 9.936 125.435 7.344 128.603 7.344C131.355 7.344 132.827 9.328 132.827 13.232V26H130.491V13.68C130.491 10.48 129.531 9.008 127.515 9.008C124.411 9.008 122.907 12.784 122.907 17.264V26H120.571V13.68C120.571 10.48 119.611 9.008 117.595 9.008C114.491 9.008 112.987 12.784 112.987 17.264V26H110.651ZM142.42 26.128C138.708 26.128 136.404 22.576 136.404 17.264C136.404 11.472 139.124 7.44 142.772 7.44C145.908 7.44 147.764 9.744 148.18 13.872H138.708C138.644 14.512 138.612 15.184 138.612 15.92C138.612 21.2 140.212 24.368 143.092 24.368C145.684 24.368 147.348 21.712 148.02 17.712H148.404C147.764 22.128 146.1 26.128 142.42 26.128ZM138.772 13.296H145.908C145.684 10.16 144.532 8.016 142.58 8.016C140.564 8.016 139.22 9.904 138.772 13.296ZM156.315 26.224C154.459 26.224 152.379 25.584 151.227 24.912L150.363 18.384H150.715C152.091 23.312 153.883 25.616 156.635 25.616C159.291 25.616 160.315 23.6 160.315 21.616C160.315 15.664 151.643 12.816 151.643 6.416C151.643 3.664 153.275 0.848 157.595 0.848C159.355 0.848 161.339 1.296 162.747 2.224V6.736H162.395C161.691 3.408 160.091 1.424 157.179 1.424C154.523 1.424 153.595 3.312 153.595 5.232C153.595 10.928 162.267 13.68 162.267 20.336C162.267 23.056 160.763 26.224 156.315 26.224ZM171.295 26.128C167.583 26.128 165.279 22.576 165.279 17.264C165.279 11.472 167.999 7.44 171.647 7.44C174.783 7.44 176.639 9.744 177.055 13.872H167.583C167.519 14.512 167.487 15.184 167.487 15.92C167.487 21.2 169.087 24.368 171.967 24.368C174.559 24.368 176.223 21.712 176.895 17.712H177.279C176.639 22.128 174.975 26.128 171.295 26.128ZM167.647 13.296H174.783C174.559 10.16 173.407 8.016 171.455 8.016C169.439 8.016 168.095 9.904 167.647 13.296ZM180.651 26V7.664H183.019V14.032C183.723 9.84 185.611 7.344 188.747 7.344C191.531 7.344 193.003 9.328 193.003 13.232V26H190.635V13.68C190.635 10.48 189.643 9.008 187.659 9.008C184.491 9.008 183.019 12.784 183.019 17.264V26H180.651ZM201.425 26.128C199.697 26.128 197.937 25.552 196.817 24.784L196.017 19.216H196.401C197.521 23.408 199.377 25.552 201.713 25.552C203.537 25.552 204.497 24.336 204.497 22.704C204.497 18.256 197.425 16.56 197.425 11.568C197.425 9.232 199.057 7.408 202.097 7.408C203.825 7.408 205.425 7.92 206.577 8.656V12.912H206.193C205.585 9.68 204.017 7.984 201.809 7.984C199.985 7.984 199.121 9.072 199.121 10.576C199.121 14.8 206.289 16.656 206.289 21.616C206.289 23.792 204.881 26.128 201.425 26.128ZM215.264 26.128C211.552 26.128 209.248 22.576 209.248 17.264C209.248 11.472 211.968 7.44 215.616 7.44C218.752 7.44 220.608 9.744 221.024 13.872H211.552C211.488 14.512 211.456 15.184 211.456 15.92C211.456 21.2 213.056 24.368 215.936 24.368C218.528 24.368 220.192 21.712 220.864 17.712H221.248C220.608 22.128 218.944 26.128 215.264 26.128ZM211.616 13.296H218.752C218.528 10.16 217.376 8.016 215.424 8.016C213.408 8.016 212.064 9.904 211.616 13.296Z"
        fill="black"
      />
    </svg>
  );
}
