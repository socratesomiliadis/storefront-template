"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";
// import type Matter as from "matter-js";
import type { Engine, Body } from "matter-js";
import Matter from "matter-js";
import Image from "next/image";
import Link from "next/link";

export default function GravitationalItems({
  colors,
}: {
  colors?: {
    bgColor?: string;
    textColor?: string;
    descColor?: string;
    gravSticker1Color?: string;
    gravSticker2Color?: string;
    gravStickerBoxColor?: string;
  };
}) {
  const GRAVITY_DEFAULT_VALUE = 0.0017 as const;
  const containerRef = useRef<HTMLDivElement>(null);

  const itemEls = useRef<HTMLElement[]>([]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });

    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth < 1024) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      });
    };
  }, []);

  const getScrollSpeed = (() => {
    let lastPos: number | null;
    let newPos: number;
    let timer: NodeJS.Timeout;
    let delta: number;
    const delay = 40;

    function clear() {
      lastPos = null;
      delta = 0;
    }

    clear();

    return () => {
      newPos = window.scrollY;
      if (lastPos != null) {
        delta = newPos - lastPos;
      }
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      return delta;
    };
  })();

  useEffect(() => {
    // Matter
    let matterInstance: typeof Matter;
    let engine: Engine;
    let boxes: ({
      body: Body;
      elem: HTMLElement;
      render(): void;
    } | null)[];
    // Limits for resize handling
    let boxGround: Body;
    let boxLeftWall: Body;
    let boxRightWall: Body;

    // Quantity of initial items
    const initialBoxesN = itemEls.current?.length ?? 0;
    let currentBodies = 0;
    const recalc = false;

    // Active engine

    const isAddingBox: boolean = false;

    // Mobile behaviour
    let timeout: ReturnType<typeof setTimeout>;

    const getBoxes = (matter: typeof Matter) => {
      // Create boxes from current rendered items
      const boxes = itemEls.current!.map((boxRef) => {
        if (getComputedStyle(boxRef).display === "block") {
          return {
            body: matter.Bodies.rectangle(
              containerRef.current!.clientWidth * Math.random(),
              containerRef.current!.clientHeight / 2 - boxRef.clientHeight,
              boxRef.clientWidth,
              boxRef.clientHeight,
              {
                friction: 1,
              },
            ),
            elem: boxRef,
            render() {
              if (boxRef?.clientHeight && boxRef?.clientWidth) {
                const { x, y } = this.body.position;
                this.elem.style.top = `${y - boxRef.clientHeight / 2}px`;
                this.elem.style.left = `${x - boxRef.clientWidth / 2}px`;
                this.elem.style.transform = `rotate(${this.body.angle}rad)`;
              }
            },
          };
        } else {
          return null;
        }
      });

      return boxes;
    };

    const getLimits = (matter: typeof Matter) => {
      const ceil = matter.Bodies.rectangle(
        containerRef.current!.clientWidth / 2,
        -60 / 2,
        containerRef.current!.clientWidth,
        60,
        {
          isStatic: true,
          friction: 1,
        },
      );
      const ground = matter.Bodies.rectangle(
        containerRef.current!.clientWidth / 2,
        containerRef.current!.clientHeight + 60 / 2,
        containerRef.current!.clientWidth,
        64,
        { isStatic: true, friction: 1 },
      );
      const leftWall = matter.Bodies.rectangle(
        containerRef.current!.clientWidth + 60 / 2,
        containerRef.current!.clientHeight / 2,
        60,
        containerRef.current!.clientHeight,
        { isStatic: true, friction: 1 },
      );
      const rightWall = matter.Bodies.rectangle(
        -60 / 2,
        containerRef.current!.clientHeight / 2,
        60,
        containerRef.current!.clientHeight,
        { isStatic: true, friction: 1 },
      );

      return { ground, leftWall, rightWall, ceil };
    };

    const initialization = (matter: typeof Matter) => {
      const Engine = matter.Engine,
        MouseConstraint = matter.MouseConstraint,
        Mouse = matter.Mouse,
        Composite = matter.Composite;

      // Create engine
      engine = Engine.create({ gravity: { scale: GRAVITY_DEFAULT_VALUE } });

      // Create boxes from current rendered items
      const initialBoxes = getBoxes(matter);

      // Update boxes state with created boxes
      boxes = initialBoxes;

      // Limits
      const { ground, leftWall, rightWall, ceil } = getLimits(matter);

      // Update limits state to allow resize calculation if needed
      boxGround = ground;
      boxLeftWall = leftWall;
      boxRightWall = rightWall;

      // Mouse Constraints
      const mouse = Mouse.create(containerRef.current!),
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false,
            },
          },
        });

      // This looks hideous but it's really needed
      // Allow page scroll when mouse is hovering canvas or touch device is interacting
      mouseConstraint.mouse.element.removeEventListener(
        "mousewheel",
        (mouseConstraint.mouse as any).mousewheel,
      );
      mouseConstraint.mouse.element.removeEventListener(
        "DOMMouseScroll",
        (mouseConstraint.mouse as any).mousewheel,
      );
      mouseConstraint.mouse.element.removeEventListener(
        "touchstart",
        (mouseConstraint.mouse as any).mousedown,
      );
      mouseConstraint.mouse.element.removeEventListener(
        "touchmove",
        (mouseConstraint.mouse as any).mousemove,
      );
      mouseConstraint.mouse.element.removeEventListener(
        "touchend",
        (mouseConstraint.mouse as any).mouseup,
      );

      // Add all of the bodies and walls to the world
      Composite.add(engine.world, [
        ...initialBoxes.filter((bx) => bx !== null).map((b) => b!.body),
        leftWall,
        rightWall,
        ceil,
        ground,
        mouseConstraint,
      ]);

      currentBodies =
        itemEls.current?.filter(
          (ref) => getComputedStyle(ref).display === "block",
        ).length || 0;

      // Main loop
      (function run() {
        boxes.forEach((box) => box?.render());
        window.requestAnimationFrame(run);
        Engine.update(engine, 1000 / 60);
      })();
    };

    matterInstance = Matter;
    initialization(Matter);

    const handleResize = () => {
      // re-calculate limits
      const { ground, leftWall, rightWall } = getLimits(matterInstance);

      // add limits to engine
      matterInstance.Composite.add(engine.world, [ground, leftWall, rightWall]);

      // remove old limits from engine
      matterInstance.Composite.remove(engine.world, boxGround);
      matterInstance.Composite.remove(engine.world, boxLeftWall);
      matterInstance.Composite.remove(engine.world, boxRightWall);

      // update limits state as source of truth
      boxGround = ground;
      boxLeftWall = leftWall;
      boxRightWall = rightWall;
    };

    window.addEventListener("resize", handleResize);

    if (isMobile) {
      window.addEventListener("scroll", () => {
        const velocity = getScrollSpeed();
        handleTouchDeviceScroll(velocity);
      });
    }
    // Touch devices behaved badly with element drag so we do a small gravity effect on scroll instead
    const handleTouchDeviceScroll = (velocity: number) => {
      if (isMobile) {
        engine.gravity = {
          x: 0,
          y: 1,
          scale: velocity <= 2 ? GRAVITY_DEFAULT_VALUE : -0.0013,
        };

        // prevent negative gravity being stuck
        timeout = setTimeout(() => {
          engine.gravity = {
            x: 0,
            y: 1,
            scale: GRAVITY_DEFAULT_VALUE,
          };
        }, 250);
      }
    };

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, [isMobile]);

  return (
    <section className="w-screen h-screen relative z-10 p-4 pt-24 lg:p-24">
      <div
        ref={containerRef}
        className="relative rounded-2xl isolate overflow-hidden grav-container bg-darkGray w-full h-full"
      >
        <div className="absolute flex flex-col items-center z-50 gap-10 lg:gap-24 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <h1 className="text-offWhite font-medium text-4xl lg:text-8xl pointer-events-none">
            404 Page
          </h1>
          <div className="flex whitespace-nowrap flex-row items-center gap-6 lg:gap-16">
            <Link
              href="/"
              className="text-gray underline text-base lg:text-2xl"
            >
              Back to home
            </Link>
            <Link
              href="/contact"
              className="text-gray underline text-base lg:text-2xl"
            >
              Talk with us
            </Link>
          </div>
        </div>
        <div
          //@ts-expect-error
          ref={(element) => (itemEls.current[0] = element)}
          className="gravity-rect-1 block absolute bg-[#1D1A17] w-fit py-4 px-16 text-offWhite select-none rounded-2xl"
        >
          <span className="pointer-events-none">Armani</span>
        </div>
        <div
          //@ts-expect-error
          ref={(element) => (itemEls.current[1] = element)}
          className="gravity-rect-1 block absolute bg-[#1D1A17] w-fit py-4 px-16 text-offWhite select-none rounded-2xl"
        >
          <span className="pointer-events-none">Gucci</span>
        </div>
        <div
          //@ts-expect-error
          ref={(element) => (itemEls.current[2] = element)}
          className="gravity-rect-1 block absolute bg-[#1D1A17] w-fit py-4 px-16 text-offWhite select-none rounded-2xl"
        >
          <span className="pointer-events-none">Versace</span>
        </div>
        <div
          //@ts-expect-error
          ref={(element) => (itemEls.current[3] = element)}
          className="gravity-rect-1 block absolute bg-[#1D1A17] w-fit py-4 px-16 text-offWhite select-none rounded-2xl"
        >
          <span className="pointer-events-none">Prada</span>
        </div>
        <div
          //@ts-expect-error
          ref={(element) => (itemEls.current[4] = element)}
          className="gravity-rect-1 block absolute bg-[#1D1A17] w-fit py-4 px-16 text-offWhite select-none rounded-2xl"
        >
          <span className="pointer-events-none">Cavalli</span>
        </div>
        <div
          //@ts-expect-error
          ref={(element) => (itemEls.current[5] = element)}
          className="gravity-rect-1 block absolute bg-[#1D1A17] w-fit py-4 px-16 text-offWhite select-none rounded-2xl"
        >
          <span className="pointer-events-none">Jo Malone</span>
        </div>
        <div
          //@ts-expect-error
          ref={(element) => (itemEls.current[6] = element)}
          className="gravity-rect-1 block absolute bg-[#1D1A17] w-fit py-4 px-16 text-offWhite select-none rounded-2xl"
        >
          <span className="pointer-events-none">Bulgari</span>
        </div>
        {!isMobile && (
          <>
            <div
              //@ts-expect-error
              ref={(element) => (itemEls.current[7] = element)}
              className="gravity-rect-1 hidden lg:block absolute w-fit select-none"
            >
              <Image
                src="/static/images/404/1.png"
                width={800}
                priority
                height={800}
                alt=""
                className="pointer-events-none w-44 h-auto"
              />
            </div>
            <div
              //@ts-expect-error
              ref={(element) => (itemEls.current[8] = element)}
              className="gravity-rect-1 hidden lg:block absolute w-fit select-none"
            >
              <Image
                src="/static/images/404/2.png"
                width={800}
                priority
                height={800}
                alt=""
                className="pointer-events-none w-44 h-auto"
              />
            </div>
            <div
              //@ts-expect-error
              ref={(element) => (itemEls.current[9] = element)}
              className="gravity-rect-1 hidden lg:block absolute w-fit select-none"
            >
              <Image
                src="/static/images/404/3.png"
                width={800}
                priority
                height={800}
                alt=""
                className="pointer-events-none w-44 h-auto"
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
