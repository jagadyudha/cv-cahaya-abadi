import React from "react";
import { useAuth } from "@/context/auth";
import Image from "next/image";
import TextInput from "@/components/textInput";
import { useForm, Controller } from "react-hook-form";
import TextArea from "@/components/textArea";

const Pesanan = () => {
  // data pesanan dan user
  const { pesanan, user } = useAuth();

  // react hooks form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // tombol pesanan saat ditekan
  const onSubmit = async (data) => {
    try {
      const { error } = await supabase.auth.signIn({
        email: data.email,
        password: data.password,
      });
      if (error) {
        throw error;
      } else {
        toast.success("Berhasil Masuk!");
        setModal(false);
      }
    } catch (error) {
      toast.error(error.error_description || error.message);
    }
  };

  if (!pesanan) {
    return <div>Kosong</div>;
  }

  console.log(user);
  return (
    <main className="max-w-6xl mx-auto my-16 lg:my-24 px-4 md:px-10 mb-20 flex gap-x-10">
      <div className="w-full">
        <div className="my-4">
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                title="Alamat Email"
                placeholder="emailmu@gmail.com"
                type="email"
                value={user.email}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.email && (
            <p className=" text-error">Harap masukkan kata sandi.</p>
          )}
        </div>

        <div className="my-4">
          <Controller
            control={control}
            name="phone"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                title="Nomor Telepon"
                placeholder="+6285727337"
                type="tel"
                value={user.user_metadata.phone}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.email && (
            <p className=" text-error">Harap masukkan kata sandi.</p>
          )}
        </div>

        <div className="flex gap-x-3 my-4">
          <div className="w-full">
            <Controller
              control={control}
              name="first_name"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur } }) => (
                <TextInput
                  title="Nama Depan"
                  placeholder="Muhammad"
                  type="text"
                  onChange={onChange}
                  value={user.user_metadata.first_name}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.first_name && (
              <p className="text-error">Harap masukkan nama depan.</p>
            )}
          </div>
          <div className="w-full">
            <Controller
              control={control}
              name="last_name"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur } }) => (
                <TextInput
                  title="Nama Belakang"
                  placeholder="Irfan"
                  type="text"
                  value={user.user_metadata.last_name}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.last_name && (
              <p className="text-error">Harap masukkan nama belakang.</p>
            )}
          </div>
        </div>

        <div className="my-4">
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur } }) => (
              <TextArea
                title="Alamat"
                placeholder="Masukkan alamat lengkap"
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.email && (
            <p className=" text-error">Harap masukkan kata sandi.</p>
          )}
        </div>
      </div>

      <div
        key={pesanan.id_peti}
        className="border group border-gray-200 max-w-sm w-full rounded-md flex flex-col items-center"
      >
        <div className="relative w-full h-64">
          <Image
            className="rounded-t-md group-hover:scale-125 duration-500"
            src={pesanan.image}
            layout={"fill"}
            objectFit={"cover"}
          />
        </div>
        <div className="mx-5 space-y-2 mb-5">
          <h3 className="font-bold text-xl mt-5">{pesanan.nama}</h3>
          <span className="block font-bold text-primary text-xl">
            Rp. {pesanan.harga.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </span>
          <p>{pesanan.deskripsi.split(".")[0]}.</p>
        </div>
      </div>
    </main>
  );
};

export default Pesanan;
