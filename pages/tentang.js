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

const Tentang = () => {
  return (
    <main className="max-w-6xl mx-auto my-16 lg:my-24 px-4 md:px-10 mb-20 min-h-[60vh]">
      <div className="text-center mx-auto my-8 lg:my-12 max-w-5xl">
        <h2 className="font-bold text-3xl lg:text-5xl my-5 md:my-10">
          Tentang Kami
        </h2>
        <p>
          Cahaya Abadi didirikan pada tahun 2009 dengan persewaan ambulance dan
          penjualan peti mati adalah bisnis utama kami, yang dikembangkan dengan
          menjunjung tinggi tanggung jawab kerja. <br />
          <br /> Kepuasan pelanggan adalah kebahagiaan kami. Kendaraan yang
          digunakan dalam kondisi siap pakai dengan perlengkapan sesuai standard
          pengaman untuk operasional dilapangan. Adapun
          perlengkapan-perlengkapan tersebut adalah:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
        {listPerlengkapan.map((item) => (
          <span
            key={item}
            className="flex items-center justify-center md:justify-start"
          >
            <IoCheckmarkCircleSharp className="text-primary text-xl mr-2" />
            {item}
          </span>
        ))}
      </div>
    </main>
  );
};

export default Tentang;
