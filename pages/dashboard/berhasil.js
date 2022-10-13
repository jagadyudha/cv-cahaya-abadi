import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/database";
import Loading from "@/components/loading";
import Image from "@/components/image";
import { IoArrowForward } from "react-icons/io5";

const Berhasil = () => {
  const queryClient = useQueryClient();

  // mengambil data transaksi
  const { isLoading: isTransaksiLoading, data: transaksiData } = useQuery(
    ["transaksi_berhasil"],
    async () => {
      const { data, error } = await supabase
        .from("pesanan")
        .select("*, id_peti(*)")
        .eq("status", "sukses");

      if (error) {
        throw new Error(`${error.message}: ${error.details}`);
      }
      return data;
    }
  );

  // merubah status
  const changeStatus = useMutation(
    async (id) => {
      const { error } = await supabase
        .from("pesanan")
        .update({ status: "menunggu" })
        .eq("id_pesanan", id);

      if (error) {
        throw new Error(`${error.message}: ${error.details}`);
      } else {
        toast.success("Berhasil ditambahkan");
      }
    },
    {
      // When mutate is called:
      onMutate: async (newPesanan) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(["transaksi_berhasil"]);

        // Snapshot the previous value
        const previousPesanan = queryClient.getQueryData([
          "transaksi_berhasil",
        ]);

        // Optimistically update to the new value
        queryClient.setQueryData(["transaksi_berhasil"]);

        // Return a context with the previous and new todo
        return { previousPesanan, newPesanan };
      },

      // If the mutation fails, use the context we returned above
      onError: (err, newPesanan, context) => {
        queryClient.setQueryData(
          ["produk", context.newPesanan.id_pesanan],
          context.previousPesanan
        );
      },

      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(["transaksi_berhasil"]);
      },
    }
  );

  if (isTransaksiLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loading />
      </div>
    );
  }

  console.log(transaksiData);

  return (
    <main className="p-5 md:p-10 w-full min-h-screen bg-gray-100">
      <h1 className="text-2xl md:text-4xl font-bold">Transaksi berhasil</h1>
      {transaksiData.length <= 0 && (
        <div className="flex flex-col items-center min-h-[75vh] justify-center w-full">
          <img className="w-1/3" src="/assets/images/hero.svg" />
          <p className="text-2xl -mt-10">Tidak ada transaksi berhasil!</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 md:my-10 gap-3 md:gap-5">
        {transaksiData.map((item) => (
          <div className="border group border-opacity-20 border-black  rounded-md flex flex-col items-center bg-white">
            <div className="relative w-full h-64 ">
              <Image
                className="rounded-t-md"
                src={item.id_peti.image}
                layout={"fill"}
                objectFit={"cover"}
              />
            </div>

            <div className="flex flex-col w-full px-5 mt-5 space-y-2">
              <a
                href={item.bukti_transfer}
                target="_blank"
                rel="noopener norefener"
              >
                <p className="text-left mb-5 font-medium text-primary flex items-center">
                  Bukti transfer{" "}
                  <IoArrowForward className="-rotate-45 ml-1 text-xl" />
                </p>
              </a>
              <button
                onClick={() => changeStatus.mutate(item.id_pesanan)}
                htmlFor="edit-data"
                className="btn bg-red-600 text-white hover:bg-red-500 border-none w-full"
              >
                Kembalikan
              </button>
            </div>

            <div className="px-5 space-y-2 mb-5 w-full">
              <h3 className="font-bold text-xl mt-5">{item.nama}</h3>
              <span className="block font-bold text-primary text-xl">
                Rp. {item.id_peti.harga.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </span>
              <hr />
              <div className="mt-4">
                <p className=" whitespace-pre-line">
                  {item.first_name} {item.last_name}
                </p>
                <p className=" whitespace-pre-line">{item.phone}</p>
                <p className=" whitespace-pre-line">{item.alamat}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Berhasil;
