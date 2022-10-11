import React from "react";
import { supabase } from "@/lib/database";
import Image from "@/components/image";
import TextInput from "@/components/textInput";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading";
import { NextSeo } from "next-seo";
import TextArea from "@/components/textArea";
import Dropzone from "@/components/dropzone";

const Produk = () => {
  // mengambil data dari database
  const { isLoading, isError, data } = useQuery(["produk"], async () => {
    const { data, error } = await supabase.from("peti").select("*");
    if (error) {
      throw new Error(`${error.message}: ${error.details}`);
    }
    return data;
  });

  // loading upload image
  const [loading, setLoading] = React.useState(false);

  // react hooks form
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  // tombol edit saat ditekan
  const onSubmit = async (form) => {
    try {
      const { error } = await supabase.from("pesanan").insert({
        id_peti: data.id_peti,
        email: form.email,
        alamat: form.alamat,
        phone: form.phone,
        first_name: form.first_name,
        last_name: form.last_name,
        bukti_transfer: form.bukti_transfer,
      });

      if (!error) {
        toast.success("Pesanan berhasil dibuat!");
        router.push("/status");
      }
    } catch (error) {
      toast.error(error.error_description || error.message);
    }
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
        <input type="checkbox" id="add-data" className="modal-toggle" />
        <div className="modal bg-black bg-opacity-50">
          <div className="modal-box relative">
            <label
              htmlFor="add-data"
              className="btn btn-sm btn-circle bg-red-500 border-none text-white hover:bg-red-400 absolute right-2 top-2"
            >
              ✕
            </label>
            {/* <h3 className="text-lg font-bold">Edit data</h3> */}
            <div>
              <div className="my-6">
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
                      value={watch().deskripsi}
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
                  <p className=" text-error">Harap masukkan bukti transfer.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </>

      <>
        <input type="checkbox" id="edit-data" className="modal-toggle" />
        <div className="modal bg-black bg-opacity-50">
          <div className="modal-box relative">
            <label
              onClick={() => reset()}
              htmlFor="edit-data"
              className="btn btn-sm btn-circle bg-red-500 border-none text-white hover:bg-red-400 absolute right-2 top-2"
            >
              ✕
            </label>
            {/* <h3 className="text-lg font-bold">Edit data</h3> */}
            <div>
              <div className="my-6">
                <Controller
                  control={control}
                  name="nama"
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur } }) => (
                    <TextInput
                      title="Nama Produk"
                      placeholder="Peti Ukir"
                      type="text"
                      value={watch()?.nama}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
                {errors.nama && (
                  <p className=" text-error">Harap masukkan nama produk.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </>

      <main className="p-5 md:p-10 w-full min-h-screen bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-bold">Beranda</h1>

          <label
            onClick={() => reset()}
            htmlFor="add-data"
            className="btn bg-red-600 text-white hover:bg-red-500 border-none"
          >
            Tambahkan Data
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 md:my-10 gap-3 md:gap-5">
          {data.map((item) => (
            <div className="border group border-opacity-20 border-black  rounded-md flex flex-col items-center">
              <div className="relative w-full h-64 ">
                <Image
                  className="rounded-t-md"
                  src={item.image}
                  layout={"fill"}
                  objectFit={"cover"}
                />
              </div>

              <div className="flex flex-col w-full px-5 mt-10 space-y-2">
                <label
                  onClick={() => setValue("nama", item.nama)}
                  htmlFor="edit-data"
                  className="btn bg-green-700 text-white hover:bg-green-600 border-none w-full"
                >
                  Edit
                </label>

                <button className="btn bg-red-600 text-white hover:bg-red-500 border-none w-full">
                  Hapus
                </button>
              </div>

              <div className="mx-5 space-y-2 mb-5">
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
