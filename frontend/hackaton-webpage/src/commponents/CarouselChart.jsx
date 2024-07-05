import React from "react";
import { Carousel } from "@material-tailwind/react";

export default function CarouselChart() {
  return (
    <Carousel
      className="rounded-xl z-10 h-96 w-full bg-black/50 "
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <img
          src="charts/cancelationspermonth2019vs2020.png"
          alt="image 2"
          className="h-full w-auto object-cover"
        />
      </div>

      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <img
          src="charts/clientsegmentation1.png"
          alt="image 1"
          className="h-full w-auto object-cover"
        />
      </div>

      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <img
          src="charts/Hack_barplot_Top_20_distr_total_invoice_by_customer.png"
          alt="image 1"
          className="h-full w-auto object-cover"
        />
      </div>

      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <img
          src="charts/Hack_histogram_distr_total_items_by_day.png"
          alt="image 1"
          className="h-full w-auto object-cover"
        />
      </div>

      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <img
          src="charts/Hack_histogram_distr_total_items_by_months.png"
          alt="image 1"
          className="h-full w-auto object-cover"
        />
      </div>

      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <img
          src="charts/LogisticRegresion.png"
          alt="image 1"
          className="h-full w-auto object-cover"
        />
      </div>

      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <img
          src="charts/modelanalisis.png"
          alt="image 1"
          className="h-full w-auto object-cover"
        />
      </div>

      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <img
          src="charts/radar_chart.png"
          alt="image 1"
          className="h-full w-auto object-cover"
        />
      </div>

      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <img
          src="charts/RFMhistograms.png"
          alt="image 1"
          className="h-full w-auto object-cover"
        />
      </div>

      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <img
          src="charts/Sales per month 2019-2020.png"
          alt="image 1"
          className="h-full w-auto object-cover"
        />
      </div>

      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <img
          src="charts/top10canceledproducts.png"
          alt="image 1"
          className="h-full w-auto object-cover"
        />
      </div>
    </Carousel>
  );
}
