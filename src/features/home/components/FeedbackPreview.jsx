"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { getFeedbacks } from "../contentService";
import { cn } from "../../../lib/utils";
import Aos from "aos";
import "aos/dist/aos.css";
const FeedbackPreview = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  // Mapping durasi animasi
  const animationDuration = useMemo(() => {
    switch (speed) {
      case "fast":
        return "20s";
      case "normal":
        return "40s";
      case "slow":
        return "80s";
      default:
        return "40s";
    }
  }, [speed]);

  useEffect(() => {
    getFeedbacks()
      .then((res) => {
        setFeedbacks(res.data);
        Aos.init({ duration: 1000 });
      })
      .catch((err) => console.error("Error fetching feedbacks:", err));
  }, []);

  // Set direction & speed ke root container
  useEffect(() => {
    const root = containerRef.current;
    if (root) {
      root.style.setProperty("--animation-direction", direction === "left" ? "forwards" : "reverse");
      root.style.setProperty("--animation-duration", animationDuration);
    }
  }, [direction, animationDuration]);

  // Duplikasi hanya untuk tampilan scroll
  const duplicatedFeedbacks = useMemo(() => {
    return [...feedbacks, ...feedbacks];
  }, [feedbacks]);

  return (
    <section data-aos="zoom-out" className="max-w-7xl mx-auto py-16">
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">Feedback</h2>
      {feedbacks.length === 0 ? (
        <p className="text-center text-lg font-medium text-neutral-500 mb-16">
          Tidak ada feedback
        </p>
      ) : (
        <div
          ref={containerRef}
          className={cn(
            "scroller relative z-20 max-w-7xl overflow-hidden",
            "[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
            className
          )}
        >
          <ul
            ref={scrollerRef}
            className={cn(
              "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4 animate-marquee",
              pauseOnHover && "hover:[animation-play-state:paused]"
            )}
            style={{
              animationDuration: animationDuration,
            }}
          >
            {duplicatedFeedbacks.map((item, index) => (
              <li
                key={index}
                className="relative w-[320px] md:w-[450px] shrink-0 rounded-2xl border border-zinc-700 bg-gradient-to-b  from-zinc-800 to-zinc-900 px-6 py-6"
              >
                <blockquote className="text-sm leading-relaxed text-gray-100">
                  <p>{item.description}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <img
                      src={
                        item.is_anonymous
                          ? "/images/avatar-anonim.png"
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.resident?.name || "User")}`
                      }
                      alt={item.is_anonymous ? "Anonim" : item.resident?.name || "User"}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover border border-gray-600"
                      loading="lazy"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400">
                        {item.is_anonymous ? "Anonim" : item.resident?.name || "User"}
                      </span>
                      <span className="text-yellow-500 text-base">
                        {Array.from({ length: 5 }, (_, i) => (i < item.rating ? "★" : "☆")).join("")}
                      </span>
                    </div>
                  </div>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default FeedbackPreview;
