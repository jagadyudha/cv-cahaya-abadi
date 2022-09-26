import React from "react";
import TextInput from "@/components/textInput";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/database";
import Router from "next/router";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  // tombol submit ditekan
  const onSubmit = async (data) => {
    try {
      const { error } = await supabase.auth.signUp(
        {
          email: data.email,
          password: data.password,
        },
        {
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
          },
        }
      );
      if (error) {
        throw error;
      } else {
        toast.success("Berhasil Registrasi!");
        Router.push("/");
      }
    } catch (error) {
      toast.error(error.error_description || error.message);
    }
  };

  return (
    <main className="max-w-6xl mx-auto my-16 lg:my-24 px-4 md:px-10 mb-20">
      <div className="text-center max-w-md mx-auto my-8 lg:my-12">
        <h2 className="font-bold text-3xl lg:text-5xl">Registrasi</h2>
      </div>

      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form Nama Depan */}
          <div className="my-4">
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
                  onBlur={onBlur}
                />
              )}
            />
            {errors.first_name && (
              <p className="text-error">Harap masukkan nama depan.</p>
            )}
          </div>

          {/* Form Nama Belakang */}
          <div className="my-4">
            <Controller
              control={control}
              name="last_name"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur } }) => (
                <TextInput
                  title="Nama Belakang"
                  placeholder="Irfan"
                  type="text"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.last_name && (
              <p className="text-error">Harap masukkan nama belakang.</p>
            )}
          </div>

          {/* Form Telepon */}
          <div className="my-4">
            <Controller
              control={control}
              name="phone"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur } }) => (
                <TextInput
                  title="Nomor HP"
                  placeholder="+628477748332"
                  type="tel"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.phone && (
              <p className="text-error">Harap masukkan telepon.</p>
            )}
          </div>

          {/* Form Email */}
          <div className="my-4">
            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur } }) => (
                <TextInput
                  title="Email"
                  placeholder="emailmu@gmail.com"
                  type="email"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.email && (
              <p className="text-error">Harap masukkan telepon.</p>
            )}
          </div>

          {/* Form Email */}
          <div className="my-4">
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur } }) => (
                <TextInput
                  title="Kata Sandi"
                  placeholder="*************"
                  type="password"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.password && (
              <p className="text-error">Harap masukkan telepon.</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary text-white mt-10 w-full"
          >
            Daftar
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
