import React from "react";
import { supabase } from "@/lib/database";
import Image from "next/image";
import Link from "next/link";

export async function getServerSideProps() {
  const { data, error } = await supabase.from("peti").select();
  return {
    props: { data, error }, // will be passed to the page component as props
  };
}

const Produk = ({ data, error }) => {
  return (
    <main className="max-w-6xl mx-auto my-16 lg:my-24 px-4 md:px-10 mb-20">
      <div className="text-center max-w-md mx-auto my-8 lg:my-12">
        <h2 className="font-bold text-3xl lg:text-5xl my-2">Peti Mati</h2>
        <p>Macam-macam peti Mati yang kami sediakan</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item) => (
          <Link key={item.id_peti} href={`/produk/${item.slug}`}>
            <a
              key={item.id_peti}
              className="border group border-opacity-20 border-black  rounded-md flex flex-col items-center"
            >
              <div className="relative w-full h-64">
                <Image
                  className="rounded-t-md group-hover:scale-125 duration-500"
                  src={item.image}
                  layout={"fill"}
                  objectFit={"cover"}
                />
              </div>
              <div className="mx-5 space-y-2 mb-5">
                <h3 className="font-bold text-xl mt-5">{item.nama}</h3>
                <span className="block font-bold text-primary text-xl">
                  Rp. {item.harga.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </span>
                <p>{item.deskripsi.split(".")[0]}.</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Produk;
