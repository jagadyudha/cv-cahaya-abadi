import React from "react";
import Image from "@/components/image";
import { useAuth } from "@/context/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/database";
import Loading from "@/components/loading";

const Status = () => {
  // user
  const { user, signOut } = useAuth();

  const { isLoading, isError, data, error } = useQuery(["status"], async () => {
    const { data, error } = await supabase
      .from("pesanan")
      .select("*, id_peti(*)")
      .eq("email", user?.email)
      .order("id_pesanan", { ascending: false });
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
    <main className="max-w-6xl mx-auto my-16 lg:my-24 px-4 md:px-10 mb-20 min-h-[60vh]">
      <div className="text-center max-w-md mx-auto my-8 lg:my-12 lg:mb-16 flex space-x-1">
        <h2 className="font-bold text-3xl lg:text-5xl my-2">Status Pesanan</h2>
        <button onClick={signOut} className="btn btn-primary btn-xs">
          Logout
        </button>
      </div>

      <div className="space-y-5">
        {data.length <= 0 && (
          <div className="flex flex-col items-center justify-center w-full">
            <img className="w-1/3" src="/assets/images/hero.svg" />
            <p className="text-xl -mt-10">
              Tidak ada transaksi yang sedang berjalan!
            </p>
          </div>
        )}

        {data.map((item) => (
          <div className="flex flex-col md:flex-row md:items-center justify-between border border-gray-200 p-3 rounded-lg">
            <div className="flex items-center">
              <div className="relative h-32 w-32 bg-gray-200 rounded-md">
                <Image
                  className="rounded-md"
                  src={item.id_peti.image}
                  layout={"fill"}
                  objectFit={"cover"}
                />
              </div>
              <div className="mx-5 space-y-5">
                <div>
                  <h3 className="font-bold text-xl">{item.id_peti.nama}</h3>
                  <span className="block font-bold text-primary text-lg">
                    Rp.{" "}
                    {item.id_peti.harga.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </span>
                </div>
                <div
                  className={`p-1 px-2 rounded-lg text-xs inline-block ${
                    item.status === "menunggu"
                      ? "bg-gray-300"
                      : " bg-green-700 text-white"
                  }`}
                >
                  {item.status === "menunggu"
                    ? "Sedang diproses"
                    : "Pembayaran diterima"}
                </div>
              </div>
            </div>

            <div className="text-left md:text-right mt-2 hidden md:block">
              <span className="block">Tanggal Pemesanan</span>
              <span className="block">{item.tgl.split("T")[0]}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Status;
