import clsx from "clsx";

export default function OpenCart({
  className,
  quantity = 0,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className={clsx("relative text-darkGray text-lg", className)}>
      Cart ({quantity})
    </div>
  );
}
