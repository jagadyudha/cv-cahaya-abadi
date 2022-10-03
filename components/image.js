import React, { useState } from "react";
import NextImage, { ImageProps } from "next/image";

const Image = ({ src, className, ...props }) => {
  const [isReady, setIsReady] = useState(false);

  const onLoadCallback = () => {
    setIsReady(true);
  };

  return (
    <>
      <figure
        className={`${
          className ? className : "rounded-md"
        } flex overflow-hidden`}
      >
        <NextImage
          src={src}
          className={`${isReady ? " blur-none" : "blur-2xl"} ${
            className ? className : "rounded-md"
          }`}
          {...props}
          onLoadingComplete={onLoadCallback}
          unoptimized={true}
        />
      </figure>
    </>
  );
};

export default Image;
