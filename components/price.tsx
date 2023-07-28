import clsx from "clsx";

const Price = ({
  compareAmount,
  amount,
  currencyCode = "USD",
  ...props
}: {
  compareAmount?: string;
  amount: string;
  currencyCode: string;
} & React.ComponentProps<"div">) => (
  <div
    className={clsx("flex w-fit flex-row items-center gap-2", props.className)}
    suppressHydrationWarning={true}
    {...props}
  >
    {compareAmount && parseFloat(compareAmount) > parseFloat(amount) && (
      <span className="line-through block decoration-red-500">
        {`${new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: currencyCode,
          currencyDisplay: "narrowSymbol",
        }).format(parseFloat(compareAmount))}`}
        <span className="hidden @[275px]/label:inline">{` ${currencyCode}`}</span>
      </span>
    )}
    <span className="block text-right">
      {`${new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "narrowSymbol",
      }).format(parseFloat(amount))}`}
      <span className="hidden @[275px]/label:inline">{` ${currencyCode}`}</span>
    </span>
  </div>
);

export default Price;
