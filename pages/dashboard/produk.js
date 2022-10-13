import React from "react";
import { supabase } from "@/lib/database";
import Image from "@/components/image";
import TextInput from "@/components/textInput";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/loading";
import { NextSeo } from "next-seo";
import TextArea from "@/components/textArea";
import Dropzone from "@/components/dropzone";
import { toast } from "react-hot-toast";

const Produk = () => {
  const queryClient = useQueryClient();

  // mengambil data dari database
  const { isLoading, isError, data } = useQuery(["produk"], async () => {
    const { data, error } = await supabase
      .from("peti")
      .select("*")
      .order("id_peti", { ascending: false });
    if (error) {
      throw new Error(`${error.message}: ${error.details}`);
    }
    return data;
  });

  // menambahkan data produk
  const addProduk = useMutation(
    async (data) => {
      const { error } = await supabase.from("peti").insert({
        nama: data.nama,
        slug: data.nama
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, ""),
        harga: data.harga,
        deskripsi: data.deskripsi,
        last_name: data.last_name,
        image: data.image,
      });

      if (error) {
        throw new Error(`${error.message}: ${error.details}`);
      } else {
        toast.success("Berhasil ditambahkan");
      }
    },
    {
      // When mutate is called:
      onMutate: async (newProduk) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(["produk"]);

        // Snapshot the previous value
        const previousProduk = queryClient.getQueryData(["produk"]);

        // Optimistically update to the new value
        queryClient.setQueryData(["produk"], [newProduk, ...previousProduk]);

        // Return a context with the previous and new todo
        return { previousProduk, newProduk };
      },

      // If the mutation fails, use the context we returned above
      onError: (err, newProduk, context) => {
        queryClient.setQueryData(
          ["produk", context.newProduk.nama],
          context.previousProduk
        );
      },

      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(["produk"]);
        setIsAdd(false);
      },
    }
  );

  // update data produk
  const updateProduk = useMutation(
    async (data) => {
      const { error } = await supabase
        .from("peti")
        .update({
          nama: data.nama,
          slug: data.nama
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, ""),
          harga: data.harga,
          deskripsi: data.deskripsi,
          last_name: data.last_name,
          image: data.image,
        })
        .eq("id_peti", data.id_peti);

      if (error) {
        throw new Error(`${error.message}: ${error.details}`);
      } else {
        toast.success("Berhasil diupdate");
      }
    },
    {
      // When mutate is called:
      onMutate: async (newProduk) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(["produk"]);

        // Snapshot the previous value
        const previousProduk = queryClient.getQueryData(["produk"]);

        // Optimistically update to the new value
        queryClient.setQueryData(["produk"]);

        // Return a context with the previous and new todo
        return { previousProduk, newProduk };
      },

      // If the mutation fails, use the context we returned above
      onError: (err, newProduk, context) => {
        queryClient.setQueryData(
          ["produk", context.newProduk.nama],
          context.previousProduk
        );
      },

      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(["produk"]);
        setIsUpdate(false);
      },
    }
  );

  // delete produk
  const deleteProduk = useMutation(
    async (data) => {
      const { error } = await supabase
        .from("peti")
        .delete()
        .eq("id_peti", data.id_peti);

      if (error) {
        throw new Error(`${error.message}: ${error.details}`);
      } else {
        toast.success("Berhasil dihapus");
      }
    },
    {
      // When mutate is called:
      onMutate: async (newProduk) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(["produk"]);

        // Snapshot the previous value
        const previousProduk = queryClient.getQueryData(["produk"]);

        // Optimistically update to the new value
        queryClient.setQueryData(["produk"]);

        // Return a context with the previous and new todo
        return { previousProduk, newProduk };
      },

      // If the mutation fails, use the context we returned above
      onError: (err, newProduk, context) => {
        queryClient.setQueryData(
          ["produk", context.newProduk.nama],
          context.previousProduk
        );
      },

      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(["produk"]);
        setIsUpdate(false);
      },
    }
  );

  // loading upload image
  const [loading, setLoading] = React.useState(false);

  // handle modal tambah data
  const [isAdd, setIsAdd] = React.useState(false);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);

  // react hooks form
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  // tombol Simpan saat ditekan
  const onAddProduk = async (form) => {
    addProduk.mutate(form);
  };

  // tombol Simpan saat ditekan
  const onUpdateProduk = async (form) => {
    updateProduk.mutate(form);
  };

  // upload to cloudinary
  const onUpload = React.useCallback((acceptedFiles) => {
    const files = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setLoading(true);

    // upload gambar
    const upload = files.map(async (item, index) => {
      const formData = new FormData();
      formData.append("file", item);
      formData.append("upload_preset", "bukti_transfer");
      const req = await fetch(
        "https://api.cloudinary.com/v1_1/dxfdywofj/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const res = await req.json();
      if (res.secure_url) {
        setValue("image", res.secure_url);
        return () => URL.revokeObjectURL(item.preview);
      }
    });

    // upload selesai
    Promise.all(upload).finally(() => setLoading(false));
  }, []);

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

      <>
        {isAdd && (
          <div className="modal modal-open bg-black bg-opacity-50 ml-28">
            <div className="bg-white w-1/3 relative  p-0 rounded-lg">
              <button
                onClick={() => {
                  setIsAdd(!isAdd);
                  reset();
                }}
                className="border-none text-white bg-red-500 btn btn-sm btn-circle rounded-full cursor-pointer absolute -right-2 -top-2"
              >
                ✕
              </button>
              <form
                onSubmit={handleSubmit(onAddProduk)}
                className="overflow-y-scroll h-96 custom-scroll px-5 my-5"
              >
                <div className="mb-6">
                  <Controller
                    control={control}
                    name="nama"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur } }) => (
                      <TextInput
                        title="Nama Produk"
                        placeholder="Masukkan nama peti"
                        type="text"
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {errors.nama && (
                    <p className=" text-error">Harap masukkan nama produk.</p>
                  )}
                </div>

                <div className="my-6">
                  <Controller
                    control={control}
                    name="harga"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur } }) => (
                      <TextInput
                        title="Harga (Rupiah)"
                        placeholder="Masukkan Harga"
                        type="text"
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {errors.harga && (
                    <p className=" text-error">Harap masukkan harga.</p>
                  )}
                </div>

                <div className="my-6">
                  <Controller
                    control={control}
                    name="deskripsi"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur } }) => (
                      <TextArea
                        title="Deskripsi"
                        placeholder="Masukkan Deskripsi"
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {errors.alamat && (
                    <p className=" text-error">Harap masukkan alamat.</p>
                  )}
                </div>

                <div className="my-6">
                  <span className="block label-text text-gray-500 my-2 uppercase text-xs">
                    Upload Gambar
                  </span>

                  <Controller
                    control={control}
                    name="image"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur } }) => (
                      <Dropzone
                        loading={loading}
                        closeOnClick={() => setValue("image", null)}
                        onDrop={onUpload}
                        image={watch().image}
                      />
                    )}
                  />
                  {errors.bukti_transfer && (
                    <p className=" text-error">Harap masukkan gambar</p>
                  )}
                </div>

                <button className="btn btn-primary w-full" type="submit">
                  Simpan
                </button>
              </form>
            </div>
          </div>
        )}
      </>

      <>
        {isUpdate && (
          <div className="modal modal-open bg-black bg-opacity-50 ml-28">
            <div className="bg-white w-1/3 relative  p-0 rounded-lg">
              <button
                onClick={() => {
                  setIsUpdate(!isUpdate);
                  reset();
                }}
                className="border-none text-white bg-red-500 btn btn-sm btn-circle rounded-full cursor-pointer absolute -right-2 -top-2"
              >
                ✕
              </button>
              <form
                onSubmit={handleSubmit(onUpdateProduk)}
                className="overflow-y-scroll h-96 custom-scroll px-5 my-5"
              >
                <div className="mb-6">
                  <Controller
                    control={control}
                    name="nama"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur } }) => (
                      <TextInput
                        value={watch().nama}
                        title="Nama Produk"
                        placeholder="Masukkan nama peti"
                        type="text"
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {errors.nama && (
                    <p className=" text-error">Harap masukkan nama produk.</p>
                  )}
                </div>

                <div className="my-6">
                  <Controller
                    control={control}
                    name="harga"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur } }) => (
                      <TextInput
                        value={watch().harga}
                        title="Harga (Rupiah)"
                        placeholder="Masukkan Harga"
                        type="text"
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {errors.harga && (
                    <p className=" text-error">Harap masukkan harga.</p>
                  )}
                </div>

                <div className="my-6">
                  <Controller
                    control={control}
                    name="deskripsi"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur } }) => (
                      <TextArea
                        value={watch().deskripsi}
                        title="Deskripsi"
                        placeholder="Masukkan Deskripsi"
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {errors.alamat && (
                    <p className=" text-error">Harap masukkan alamat.</p>
                  )}
                </div>

                <div className="my-6">
                  <span className="block label-text text-gray-500 my-2 uppercase text-xs">
                    Upload Gambar
                  </span>

                  <Controller
                    control={control}
                    name="image"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur } }) => (
                      <Dropzone
                        loading={loading}
                        closeOnClick={() => setValue("image", null)}
                        onDrop={onUpload}
                        image={watch().image}
                      />
                    )}
                  />
                  {errors.bukti_transfer && (
                    <p className=" text-error">Harap masukkan gambar produk</p>
                  )}
                </div>

                <button className="btn btn-primary w-full" type="submit">
                  Perbarui
                </button>
              </form>
            </div>
          </div>
        )}
      </>

      <>
        {isDelete && (
          <div className="modal modal-open bg-black bg-opacity-50 ml-28">
            <div className="bg-white w-1/3 relative  p-5 rounded-lg">
              <button
                onClick={() => {
                  setIsDelete(!isDelete);
                  reset();
                }}
                className="border-none text-white bg-red-500 btn btn-sm btn-circle rounded-full cursor-pointer absolute -right-2 -top-2"
              >
                ✕
              </button>

              <h3 className="font-bold text-lg">Hapus Produk</h3>
              <p className="py-4">
                Anda yakin ingin menghapus ini? Setelah dihapus, produk ini
                tidak dapat dikembalikan.
              </p>
              <div className="space-x-1 flex justify-end">
                <button
                  className="btn btn-primary btn-outline"
                  onClick={() => {
                    deleteProduk.mutate(watch());
                    setIsDelete(false);
                  }}
                >
                  Hapus
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setIsDelete(!isDelete);
                  }}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </>

      <main className="p-5 md:p-10 w-full min-h-screen bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-bold">Data Produk</h1>

          <button
            onClick={() => setIsAdd(!isAdd)}
            className="btn bg-red-600 text-white hover:bg-red-500 border-none"
          >
            Tambahkan Data
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 md:my-10 gap-3 md:gap-5">
          {data.map((item) => (
            <div className="border group border-opacity-20 border-black  rounded-md flex flex-col items-center bg-white">
              <div className="relative w-full h-64 ">
                <Image
                  className="rounded-t-md"
                  src={item.image}
                  layout={"fill"}
                  objectFit={"cover"}
                />
              </div>

              <div className="flex flex-col w-full px-5 mt-10 space-y-2">
                <button
                  onClick={() => {
                    setIsUpdate(!isUpdate);
                    setValue("id_peti", item.id_peti);
                    setValue("nama", item.nama);
                    setValue("harga", item.harga);
                    setValue("deskripsi", item.deskripsi);
                    setValue("image", item.image);
                  }}
                  htmlFor="edit-data"
                  className="btn bg-green-700 text-white hover:bg-green-600 border-none w-full"
                >
                  update
                </button>

                <button
                  onClick={() => {
                    setIsDelete(!isDelete);
                    setValue("id_peti", item.id_peti);
                  }}
                  className="btn bg-red-600 text-white hover:bg-red-500 border-none w-full"
                >
                  Hapus
                </button>
              </div>

              <div className="px-5 space-y-2 mb-5 w-full">
                <h3 className="font-bold text-xl mt-5">{item.nama}</h3>
                <span className="block font-bold text-primary text-xl">
                  Rp. {item.harga.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </span>
                <p className=" whitespace-pre-line">{item.deskripsi}.</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Produk;
