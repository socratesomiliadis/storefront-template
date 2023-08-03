function Item({
  icon,
  text,
  index,
}: {
  icon: React.ReactNode;
  text: string;
  index: number;
}) {
  return (
    <div className="flex flex-col lg:flex-row items-center">
      <div className="w-full flex flex-col items-center gap-3 py-24">
        <span className="w-5">{icon}</span>
        <p className="w-3/4 lg:w-1/4 text-center">{text}</p>
      </div>
      {index !== 2 && (
        <div className="w-2/3 lg:w-[1px] bg-gray/40 h-[1px] lg:h-1/2"></div>
      )}
    </div>
  );
}

export default function QuickInfoSection() {
  return (
    <section className="w-full bg-offWhite relative z-10 grid grod-cols-1 lg:grid-cols-3 border-y-[1px] border-gray/40 text-darkGray">
      <Item
        icon={
          <svg
            width="100%"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2V0ZM4.27273 1H5.27273V0H4.27273V1ZM3.27273 12.1818C3.27273 12.7341 3.72044 13.1818 4.27273 13.1818C4.82501 13.1818 5.27273 12.7341 5.27273 12.1818H3.27273ZM7.81818 14.7273C7.2659 14.7273 6.81818 15.175 6.81818 15.7273C6.81818 16.2796 7.2659 16.7273 7.81818 16.7273V14.7273ZM19 16.7273C19.5523 16.7273 20 16.2796 20 15.7273C20 15.175 19.5523 14.7273 19 14.7273V16.7273ZM8.63636 2.09091V1.09091C8.08408 1.09091 7.63636 1.53862 7.63636 2.09091H8.63636ZM19 2.09091H20C20 1.53862 19.5523 1.09091 19 1.09091V2.09091ZM19 11.3636V12.3636C19.5523 12.3636 20 11.9159 20 11.3636H19ZM8.63636 11.3636H7.63636C7.63636 11.9159 8.08408 12.3636 8.63636 12.3636V11.3636ZM12.8182 5.90909C12.8182 6.46138 13.2659 6.90909 13.8182 6.90909C14.3705 6.90909 14.8182 6.46138 14.8182 5.90909H12.8182ZM1 2H4.27273V0H1V2ZM3.27273 1V12.1818H5.27273V1H3.27273ZM7.81818 16.7273H19V14.7273H7.81818V16.7273ZM18 2.09091V11.3636H20V2.09091H18ZM19 10.3636H8.63636V12.3636H19V10.3636ZM9.63636 11.3636V2.09091H7.63636V11.3636H9.63636ZM8.63636 3.09091H13.8182V1.09091H8.63636V3.09091ZM13.8182 3.09091H19V1.09091H13.8182V3.09091ZM14.8182 5.90909V2.09091H12.8182V5.90909H14.8182ZM6.54545 15.7273C6.54545 16.9825 5.52792 18 4.27273 18V20C6.63249 20 8.54545 18.087 8.54545 15.7273H6.54545ZM4.27273 18C3.01753 18 2 16.9825 2 15.7273H0C0 18.087 1.91297 20 4.27273 20V18ZM2 15.7273C2 14.4721 3.01753 13.4545 4.27273 13.4545V11.4545C1.91297 11.4545 0 13.3675 0 15.7273H2ZM4.27273 13.4545C5.52792 13.4545 6.54545 14.4721 6.54545 15.7273H8.54545C8.54545 13.3675 6.63249 11.4545 4.27273 11.4545V13.4545Z"
              fill="currentColor"
            />
          </svg>
        }
        text="All of our products ship in top quality packaging"
        index={0}
      />
      <Item
        icon={
          <svg
            width="100%"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1V5.5C6 6.32843 6.67157 7 7.5 7H11.5C12.3284 7 13 6.32843 13 5.5V1M11.5 14H14M1 3V16C1 17.1046 1.89543 18 3 18H16C17.1046 18 18 17.1046 18 16V3C18 1.89543 17.1046 1 16 1H3C1.89543 1 1 1.89543 1 3Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        text="Express Delivery from
        3-8 days"
        index={1}
      />
      <Item
        icon={
          <svg
            width="100%"
            viewBox="0 0 23 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.22973 14.4828H14.3378M3.22973 14.4828H1V7.15517L3.55405 3.34483H7.81081V13.0172M19.8501 14.4828H22V1H7.81081V3.45141M8.94595 15.069C8.94595 16.6877 7.6754 18 6.10811 18C4.54081 18 3.27027 16.6877 3.27027 15.069C3.27027 13.4502 4.54081 12.1379 6.10811 12.1379C7.6754 12.1379 8.94595 13.4502 8.94595 15.069ZM19.7297 15.069C19.7297 16.6877 18.4592 18 16.8919 18C15.3246 18 14.0541 16.6877 14.0541 15.069C14.0541 13.4502 15.3246 12.1379 16.8919 12.1379C18.4592 12.1379 19.7297 13.4502 19.7297 15.069Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        }
        text="Free shipping for
        over $80"
        index={2}
      />
    </section>
  );
}
