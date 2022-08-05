import React from "react";
import Link from "next/link";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import TextInput from "@/components/textInput";
import toast from "react-hot-toast";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { supabase } from "@/lib/database";

const navbar = [
  { name: "Beranda", href: "/" },
  { name: "Peti Mati", href: "/produk" },
  { name: "Tentang Kami", href: "/tentangkami" },
  { name: "Kontak Kami", href: "/kontakkami" },
];

const Navbar = () => {
  // informasi modal apakah muncul
  const [modal, setModal] = React.useState(false);

  // react hooks form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
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

  // handle perubahan modal ketika di klik
  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <nav className="z-20 bg-white mx-auto border-b md:py-2 py-0.5 sticky top-0 backdrop-filter backdrop-blur-sm bg-opacity-90">
        <div className="navbar max-w-6xl mx-auto flex justify-between">
          <a className="btn btn-ghost normal-case text-xl">
            <img
              src="/assets/images/logo.png"
              className="w-44 sm:w-48 navbar-start mx-2"
            />
          </a>

          {/* Desktop */}
          <div className="hidden lg:flex items-center navbar-end w-full">
            {/* Desktop Menu */}
            <ul className="menu menu-horizontal p-0">
              {navbar.map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>
                    <a className="text-lg">{item.name}</a>
                  </Link>
                </li>
              ))}
              <button
                onClick={handleModal}
                className="btn btn-ghost mr-2 ml-10 mt-0.5 capitalize text-lg font-normal"
              >
                Masuk
              </button>
            </ul>
          </div>

          {/* Right Side */}
          <div>
            {/* Register Button */}
            <button
              //   onClick={registerToggle}
              className="btn btn-primary text-white"
            >
              Daftar
            </button>

            {/* Mobile */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <HiMenuAlt1 />
              </label>

              {/* Mobile Menu */}
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content p-2 shadow-lg bg-base-100 border border-black border-opacity-10 mt-5 rounded-box w-52"
              >
                {navbar.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href}>
                      <a className="text-lg">{item.name}</a>
                    </Link>
                  </li>
                ))}

                <button
                  onClick={handleModal}
                  className="btn btn-primary text-white mt-5"
                >
                  Masuk
                </button>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Popup Login */}
      <div
        className={`modal modal-bottom sm:modal-middle ${
          modal ? "modal-open" : ""
        }`}
      >
        <div className="modal-box">
          <div className="flex justify-end">
            <button onClick={handleModal} className="btn btn-ghost text-xl">
              <IoCloseOutline />
            </button>
          </div>

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

          <div className="my-2">
            Belum memiliki akun?{" "}
            <Link href={"/register"}>
              <button className="text-primary">Daftar</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
