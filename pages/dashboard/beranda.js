import React from "react";
import {
  IoPersonOutline,
  IoSwapHorizontalOutline,
  IoSyncOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/database";

const Beranda = () => {
  // mengambil dan menghitung data user
  const {
    isLoading: isUserLoading,
    data: userData,
    isError: isUserError,
  } = useQuery(["user"], async () => {
    const { count, error } = await supabase
      .from("users")
      .select("*", { count: "exact" });
    if (error) {
      throw new Error(`${error.message}: ${error.details}`);
    }
    return count;
  });

  // mengambil data transaksi
  const { isLoading: isTransaksiLoading, data: transaksiData } = useQuery(
    ["transaksi"],
    async () => {
      const { data, error } = await supabase.from("pesanan").select("*");
      if (error) {
        throw new Error(`${error.message}: ${error.details}`);
      }
      return data;
    }
  );

  return (
    <main className="p-5 md:p-10 w-full min-h-screen bg-gray-100">
      <h1 className="text-2xl md:text-4xl font-bold">Beranda</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 my-5 md:my-10 gap-3 md:gap-5">
        <div className="flex justify-between items-center space-x-10 bg-white p-10 rounded-lg">
          <div>
            <h3 className="text-lg md:text-xl">Total Pengguna</h3>
            <span className="text-2xl md:text-4xl font-bold my-2 block">
              {userData ?? "-"}
            </span>
          </div>
          <div className="bg-primary bg-opacity-30 p-4 rounded-full">
            <IoPersonOutline className="text-primary text-2xl" />
          </div>
        </div>

        <div className="flex justify-between items-center space-x-10 bg-white p-10 rounded-lg">
          <div>
            <h3 className="text-lg md:text-xl">Total Transaksi</h3>
            <span className="text-2xl md:text-4xl font-bold my-2 block">
              {transaksiData ? transaksiData.length : "-"}
            </span>
          </div>
          <div className="bg-primary bg-opacity-30 p-4 rounded-full">
            <IoSwapHorizontalOutline className="text-primary text-2xl" />
          </div>
        </div>

        <div className="flex justify-between items-center space-x-10 bg-white p-10 rounded-lg">
          <div>
            <h3 className="text-lg md:text-xl">Transaksi Berjalan</h3>
            <span className="text-2xl md:text-4xl font-bold my-2 block">
              {transaksiData
                ? transaksiData.filter((item) => item.status === "menunggu")
                    .length
                : "-"}
            </span>
          </div>
          <div className="bg-primary bg-opacity-30 p-4 rounded-full">
            <IoSyncOutline className="text-primary text-2xl" />
          </div>
        </div>

        <div className="flex justify-between items-center space-x-10 bg-white p-10 rounded-lg">
          <div>
            <h3 className="text-lg md:text-xl">Transaksi Berhasil</h3>
            <span className="text-2xl md:text-4xl font-bold my-2 block">
              {transaksiData
                ? transaksiData.filter((item) => item.status === "sukses")
                    .length
                : "-"}
            </span>
          </div>
          <div className="bg-primary bg-opacity-30 p-4 rounded-full">
            <IoCheckmarkOutline className="text-primary text-2xl" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Beranda;
