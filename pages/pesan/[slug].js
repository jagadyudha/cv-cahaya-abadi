import React from "react";
import { useAuth } from "@/context/auth";
import Image from "next/image";
import TextInput from "@/components/textInput";
import { useForm, Controller } from "react-hook-form";
import TextArea from "@/components/textArea";
import { supabase } from "@/lib/database";
import Dropzone from "@/components/dropzone";

export async function getServerSideProps(context) {
  const { data, error } = await supabase
    .from("peti")
    .select()
    .match({ slug: context.params.slug })
    .single();

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data, error }, // will be passed to the page component as props
  };
}

const Pesan = ({ data }) => {
  // data user
  const { user } = useAuth();

  // react hooks form
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  // auto complete form dengan data user
  React.useEffect(() => {
    if (user) {
      setValue("email", user.email);
      setValue("phone", user.user_metadata.phone);
      setValue("first_name", user.user_metadata.first_name);
      setValue("last_name", user.user_metadata.last_name);
    }
  }, [user]);

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

  return (
    <main className="max-w-3xl mx-auto my-16 lg:my-24 px-4 md:px-10 mb-20">
      <div className="text-center max-w-md mx-auto my-8 lg:my-12 lg:mb-16">
        <h2 className="font-bold text-3xl lg:text-5xl my-2">Detail Pesanan</h2>
      </div>

      <div className="w-full">
        <div className="my-4">
          <span className="block label-text text-gray-500 my-2">Jenis</span>
          <div
            key={data.id_peti}
            className="border border-gray-200 p-4 flex items-center rounded-md "
          >
            <div className="relative h-20 w-20 bg-gray-200 rounded-md">
              <Image
                className="rounded-md"
                src={data.image}
                layout={"fill"}
                objectFit={"cover"}
              />
            </div>
            <div className="mx-5 space-y-2">
              <h3 className="font-bold text-xl ">{data.nama}</h3>
              <span className="block font-bold text-primary text-xl">
                Rp. {data.harga.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </span>
            </div>
          </div>
        </div>

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
                value={watch()?.email}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.email && <p className=" text-error">Harap masukkan email.</p>}
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
                value={watch()?.phone}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.phone && (
            <p className=" text-error">Harap masukkan nomor telepon.</p>
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
                  value={watch()?.first_name}
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
                  value={watch().last_name}
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
            name="adress"
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
          {errors.adress && (
            <p className=" text-error">Harap masukkan kata sandi.</p>
          )}
        </div>

        <div className="my-4">
          <span className="bg-green-200 text-green-800 p-1 rounded-md block px-2 text-sm">
            Silahkan transfer{" "}
            <b>Rp. {data.harga.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</b>, ke
            nomor rekening BCA <b>345345897</b> atas nama Budi. Jika sudah
            transfer, silahkan upload bukti transfer dibawah ini.
          </span>
          <Dropzone />
        </div>

        <button className="btn w-full btn-primary text-white my-6">
          Pesan Sekarang
        </button>
      </div>
    </main>
  );
};

export default Pesan;
