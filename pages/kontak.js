import React from "react";
import { NextSeo } from "next-seo";

const Kontak = () => {
  return (
    <>
      <NextSeo
        title={"Kontak Kami — Cahaya Abadi"}
        description={"Daftar kontak yang dapat dihubungi"}
        openGraph={{
          title: "Kontak Kami — Cahaya Abadi",
          description: "Daftar kontak yang dapat dihubungi",
        }}
      />
      <main className="max-w-6xl mx-auto my-16 lg:my-24 px-4 md:px-10 mb-20 min-h-[60vh]">
        <div className="text-center mx-auto my-8 lg:my-12 max-w-5xl">
          <h2 className="font-bold text-3xl lg:text-5xl my-5">Kontak Kami</h2>
          <p className="my-2">
            Telepon : 08121764637 | 082333700200 | 081361700200
          </p>
          <p>
            Alamat : Jl. Raya Buduran No. 909 Sidoarjo, Jawa Timur Indonesia
          </p>
        </div>

        <div className="md:aspect-[16/9] aspect-square">
          <iframe
            className="rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d506413.6767692619!2d112.722825!3d-7.425703!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1b450e0bf4ec73ed!2sAmbulance%20Cahaya%20Abadi!5e0!3m2!1sen!2sid!4v1665658720763!5m2!1sen!2sid"
            width="100%"
            height="100%"
            loading="lazy"
          />
        </div>
      </main>
    </>
  );
};

export default Kontak;
