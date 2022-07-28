import Image from "next/image";
import {
  GiAmbulance,
  GiMilitaryAmbulance,
  GiCargoShip,
  GiShower,
  GiNurseMale,
  GiCoffin,
} from "react-icons/gi";

export default function Home() {
  return (
    <main>
      {/* Bagian Hero (awal halaman) */}
      <section>
        <div className="absolute w-full h-[92vh]">
          <Image
            src={"/assets/images/hero.png"}
            layout={"fill"}
            objectFit="cover"
            priority
          />
        </div>
        <div className="relative h-[92vh] flex px-4 md:px-10 max-w-6xl mx-auto items-center">
          <div>
            <h1 className="text-white font-bold text-2xl md:text-5xl">
              Menyediakan Jasa Persewaan Ambulance dan Peti Mati Dengan Harga
              Terjangkau
            </h1>
            <button className="my-10 btn btn-outline text-white hover:bg-primary hover:border-primary">
              Lihat Produk
            </button>
          </div>
        </div>
      </section>

      {/* Pemisah */}
      <div className="flex justify-center my-10 md:my-12">
        <div className="h-4 w-4 bg-primary rounded-full"></div>
      </div>

      {/* Bagian Layanan Kami */}
      <section className="max-w-7xl px-4 md:px-10 mx-auto">
        <div className="text-center max-w-md mx-auto mb-8">
          <h2 className="font-bold text-3xl">Layanan Kami</h2>
          <p>Pilih paket layanan yang anda butuhkan</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {layanan.map((item, index) => (
            <div
              key={index}
              className="border border-opacity-20 border-black p-10 py-16 rounded-md flex flex-col items-center text-center"
            >
              <div className="bg-primary bg-opacity-20 text-primary text-4xl rounded-full p-4">
                {item.icon}
              </div>
              <div className=" max-w-xs mx-auto">
                <h3 className="font-bold text-xl mt-5">{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pemisah */}
      <div className="flex justify-center my-10 md:my-12">
        <div className="h-4 w-4 bg-primary rounded-full"></div>
      </div>

      {/* Bagian Peti Paling Laris */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 mb-20">
        <div className="text-center max-w-md mx-auto mb-8">
          <h2 className="font-bold text-3xl">Peti Terlaris</h2>
          <p>Rekomendasi peti paling banyak dipesan</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {peti.map((item) => (
            <div
              key={item.id}
              className="border border-opacity-20 border-black  rounded-md flex flex-col items-center"
            >
              <div className="relative w-full h-64">
                <Image
                  className="rounded-t-md"
                  src={item.image}
                  layout={"fill"}
                  objectFit={"cover"}
                />
              </div>
              <div className="mx-5 space-y-2 mb-5">
                <h3 className="font-bold text-xl mt-5">{item.nama}</h3>
                <span className="block font-bold text-primary text-xl">
                  Rp.{item.harga}
                </span>
                <p>{item.deskripsi}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

const peti = [
  {
    id_peti: 1,
    nama: "Peti Ukir",
    harga: 100000,
    image:
      "https://user-images.githubusercontent.com/41937681/181463738-bb85a2fd-01c1-4130-b6d8-e696feb697ab.png",
    deskripsi: "Terbuat dari material kayu jati yang di ukir dengan apik.",
    dibuat: "2022-08-02",
  },
  {
    id_peti: 2,
    nama: "Peti Ukir",
    harga: 100000,
    image:
      "https://user-images.githubusercontent.com/41937681/181463738-bb85a2fd-01c1-4130-b6d8-e696feb697ab.png",
    deskripsi: "Terbuat dari material kayu jati yang di ukir dengan apik.",
    dibuat: "2022-08-02",
  },
  {
    id_peti: 3,
    nama: "Peti Ukir",
    harga: 100000,
    image:
      "https://user-images.githubusercontent.com/41937681/181463738-bb85a2fd-01c1-4130-b6d8-e696feb697ab.png",
    deskripsi: "Terbuat dari material kayu jati yang di ukir dengan apik.",
    dibuat: "2022-08-02",
  },
];

const layanan = [
  {
    name: "Ambulance Dalam Kota",
    desc: "Menyediakan jasa pengantaran jenazah dalam kota",
    icon: <GiAmbulance />,
  },
  {
    name: "Ambulance Luar Kota",
    desc: "Menyediakan jasa pengantaran jenazah Luar Kota",
    icon: <GiMilitaryAmbulance />,
  },
  {
    name: "Ambulance Luar Pulau",
    desc: "Menyediakan jasa pengantaran jenazah hingga ke luar pulau (cargo)",
    icon: <GiCargoShip />,
  },
  {
    name: "Pemandian Jenazah",
    desc: "Menyediakan jasa pemandian jenazah",
    icon: <GiShower />,
  },
  {
    name: "Perawatan Jenazah",
    desc: "Jenazah dapat kami rawat sesuai permintaan keluarga",
    icon: <GiNurseMale />,
  },
  {
    name: "Penyediaan Peti Mati",
    desc: "Kami juga menyediakan peti mati untuk jenazah",
    icon: <GiCoffin />,
  },
];
