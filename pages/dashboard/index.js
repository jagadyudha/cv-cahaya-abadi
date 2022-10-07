import React from "react";
import { supabase } from "@/lib/database";
import { useForm, Controller } from "react-hook-form";
import TextInput from "@/components/textInput";
import { useAuth } from "@/context/dashboardAuth";
import toast from "react-hot-toast";

const Home = () => {
  const { admin, role } = useAuth();

  // react hooks form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
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
      }
    } catch (error) {
      toast.error(error.error_description || error.message);
    }
  };
  return (
    <main className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white max-w-lg w-full p-10 m-5 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.email && (
              <p className=" text-error">Harap masukkan kata sandi.</p>
            )}
          </div>

          {/* include validation with required or other standard HTML validation rules */}
          <div className="my-4">
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur } }) => (
                <TextInput
                  title="Kata Sandi"
                  placeholder="********"
                  type="password"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.email && (
              <p className="text-error">Harap masukkan kata sandi.</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary text-white mt-10 w-full"
          >
            Masuk
          </button>
        </form>
      </div>
    </main>
  );
};

export default Home;
