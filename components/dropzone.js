import React from "react";
import { useDropzone } from "react-dropzone";
import { IoCloseOutline } from "react-icons/io5";
import { RiImageAddFill } from "react-icons/ri";
import Loading from "@/components/loading";

const Dropzone = ({ image, closeOnClick, onDrop, title, loading }) => {
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "image/png": [".png", ".jpg", ".jpeg", ".gif"],
      },
      multiple: false,
    });

  const fileRejectionItems = fileRejections.map(({ file, errors }, index) => (
    <p key={index} className="text-red-400 font-bold">
      {errors.map((e) => e.message)}
    </p>
  ));

  return (
    <div className=" cursor-pointer">
      {title && (
        <span className="block text-xs md text-gray-500 my-2 uppercase tracking-wide">
          {title}
        </span>
      )}

      <div>
        {image ? (
          <div className="border-2 px-5 py-5 relative border-dashed rounded-lg">
            <label
              onClick={closeOnClick}
              className="z-0 absolute right-3 top-3 text-xl text-white bg-error rounded-full"
            >
              <IoCloseOutline />
            </label>
            <img
              className="w-full aspect-square object-cover h-full mx-auto"
              src={image}
              alt={image}
            />
          </div>
        ) : (
          <>
            {!loading ? (
              <div
                {...getRootProps()}
                className={`${
                  isDragActive ? "border-primary" : "border-gray-200"
                } border-2 px-5 py-5 transition duration-300 rounded-lg text-center border-dashed mt-2`}
              >
                <input {...getInputProps()} />

                {isDragActive ? (
                  <div className="my-10">
                    <div className="my-3 mx-auto flex justify-center text-7xl rounded-lg text-primary transition duration-300">
                      <RiImageAddFill />
                    </div>
                    <p className="text-gray-500 max-w-[14rem] mx-auto">
                      Seret gambar disini...
                    </p>
                  </div>
                ) : (
                  <div className="my-10">
                    <div className="my-3 mx-auto flex justify-center text-7xl rounded-lg text-gray-500 transition duration-300">
                      <RiImageAddFill />
                    </div>

                    <p className="text-gray-500 max-w-[14rem] mx-auto">
                      Seret gambar disini atau {` `}
                      <span className="text-primary font-medium max-w-[14rem] mx-auto">
                        pilih gambar
                      </span>
                    </p>
                  </div>
                )}
                <ul>{fileRejectionItems}</ul>
              </div>
            ) : (
              <div className="border-2 px-5 py-5 relative border-dashed rounded-lg min-h-[200px] flex justify-center items-center">
                <Loading />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
