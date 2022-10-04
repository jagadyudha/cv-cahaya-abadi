import React from "react";
import Link from "next/link";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import TextInput from "@/components/textInput";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "@/lib/database";
import { useAuth } from "@/context/auth";

const navbar = [
  { name: "Beranda", href: "/" },
  { name: "Peti Mati", href: "/produk" },
  { name: "Tentang Kami", href: "/tentang" },
  { name: "Kontak Kami", href: "/kontak" },
];

const Navbar = () => {
  // mengambil data user dari context
  const { user, signOut, loading } = useAuth();

  // informasi modal apakah muncul
  const [modal, setModal] = React.useState(false);

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
        setModal(false);
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
        <div className="navbar px-5 md:px-10 mx-auto flex justify-between items-center">
          <Link href={"/"}>
            <a className="text-xl">
              <img
                src="/assets/images/logo.png"
                className="w-44 sm:w-48 navbar-start mx-2"
              />
            </a>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center navbar-end w-full">
            {/* Desktop Menu */}
            <ul className="menu menu-horizontal p-0 flex">
              {navbar.map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>
                    <a className=" text-base">{item.name}</a>
                  </Link>
                </li>
              ))}

              {!loading && user && (
                <Link href={"/status"}>
                  <button className="ml-4 btn btn-primary text-white">
                    Status Pesanan
                  </button>
                </Link>
              )}

              {!loading && !user && (
                <div className="space-x-2 flex ml-5">
                  <button
                    onClick={handleModal}
                    className="btn btn-primary text-white"
                  >
                    Masuk
                  </button>
                  <Link href={"/register"}>
                    <button className="btn btn-primary btn-outline text-white">
                      Daftar
                    </button>
                  </Link>
                </div>
              )}
            </ul>
          </div>

          {/* Right Side */}
          <div>
            {/* Mobile */}
            <div className="dropdown dropdown-end lg:hidden">
              <label tabIndex={0}>
                <HiMenuAlt1 className="duration-300 active:scale-125 text-xl" />
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

                {!loading && user && (
                  <Link href={"/status"}>
                    <button className="mt-4 btn btn-primary text-white">
                      Status Pesanan
                    </button>
                  </Link>
                )}

                {!loading && !user && (
                  <div className="space-y-2 flex flex-col">
                    <button
                      onClick={handleModal}
                      className="btn btn-primary text-white mt-5"
                    >
                      Masuk
                    </button>
                    <Link href={"/register"}>
                      <button className="btn btn-primary btn-outline text-white mt-5">
                        Daftar
                      </button>
                    </Link>
                  </div>
                )}
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
