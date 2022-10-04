import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const listPerlengkapan = [
  "Handy Talky",
  "Safety Jacket",
  "Lampu rotary light bar",
  "Sirine multi suara lengkap",
  "Tabung oksigen",
  "P3K",
  "Tandu",
  "Stretcher ambulance",
  "Air conditioner",
];

const Kontak = () => {
  return (
    <main className="max-w-6xl mx-auto my-16 lg:my-24 px-4 md:px-10 mb-20 min-h-[60vh]">
      <div className="text-center mx-auto my-8 lg:my-12 max-w-5xl">
        <h2 className="font-bold text-3xl lg:text-5xl my-5">Kontak Kami</h2>
        <p className="my-2">
          Telepon : 08121764637 | 082333700200 | 081361700200
        </p>
        <p>Alamat : Jl. Raya Buduran No. 909 Sidoarjo, Jawa Timur Indonesia</p>
      </div>

      <div className="md:aspect-[16/9] aspect-square">
        <iframe
          className="rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.8388920570824!2d112.72085321532921!3d-7.483035575865309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x452996006f3c773b!2zN8KwMjgnNTkuMCJTIDExMsKwNDMnMjMuMCJF!5e0!3m2!1sid!2sid!4v1645926894010!5m2!1sid!2sid"
          width="100%"
          height="100%"
          loading="lazy"
        />
      </div>
    </main>
  );
};

export default Kontak;
