import React from "react";
import { supabase } from "@/lib/database";
import Image from "@/components/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading";
import { NextSeo } from "next-seo";

const Produk = () => {
  // mengambil data dari database
  const { isLoading, isError, data } = useQuery(["produk"], async () => {
    const { data, error } = await supabase.from("peti").select("*");
    if (error) {
      throw new Error(`${error.message}: ${error.details}`);
    }
    return data;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <NextSeo
        title={"Produk  — Cahaya Abadi"}
        description={"Macam-macam peti mati yang kami sediakan"}
        openGraph={{
          title: "Produk  — Cahaya Abadi",
          description: "Macam-macam peti mati yang kami sediakan",
        }}
      />
      <main className="max-w-6xl mx-auto my-16 lg:my-24 px-4 md:px-10 mb-20">
        <div className="text-center max-w-md mx-auto my-8 lg:my-12">
          <h2 className="font-bold text-3xl lg:text-5xl my-2">Peti Mati</h2>
          <p>Macam-macam peti mati yang kami sediakan</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item) => (
            <Link key={item.id_peti} href={`/produk/${item.slug}`}>
              <a
                key={item.id_peti}
                className="border group border-opacity-20 border-black  rounded-md flex flex-col items-center"
              >
                <div className="relative w-full h-64 ">
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
                    Rp. {item.harga.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </span>
                  <p>{item.deskripsi.split(".")[0]}.</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default Produk;
