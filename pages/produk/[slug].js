import React from "react";
import { supabase } from "@/lib/database";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

export async function getServerSideProps(context) {
  const { data, error } = await supabase
    .from("peti")
    .select()
    .match({ slug: context.params.slug })
    .single();
  return {
    props: { data, error }, // will be passed to the page component as props
  };
}

const ProdukDetail = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={`${data.nama} — Cahaya Abadi`}
        description={
          "Menyediakan Jasa Persewaan Ambulance dan Peti Mati Dengan Harga Terjangkau"
        }
        openGraph={{
          title: `${data.nama} — Cahaya Abadi`,
          description: data.description,
          images: [
            {
              url: data.image,
              width: 1200,
              height: 630,
              alt: "Social",
              type: "image/jpeg",
            },
          ],
          site_name: `${data.nama} — Cahaya Abadi`,
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <main className="max-w-6xl mx-auto my-16 lg:my-24 px-4 md:px-10 mb-20">
        <div className="lg:flex flex-none gap-x-10">
          <div className="relative lg:w-1/2 w-full md:h-96 h-60 object-cover">
            <Image
              className="rounded-md bg-gray-100"
              src={data.image}
              layout={"fill"}
              objectFit={"contain"}
            />
          </div>

          <div className="space-y-2 mb-5 max-w-xl flex flex-col justify-between">
            <div>
              <h1 className="font-bold mt-5 lg:mt-0 text-xl lg:text-2xl">
                {data.nama}
              </h1>
              <span className="block font-bold text-primary text-xl my-4">
                Rp. {data.harga.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </span>
              <p className=" whitespace-pre-line">{data.deskripsi}</p>
            </div>
            <div className="lg:space-x-2 space-y-2 lg:space-y-0 py-5 lg:flex">
              {!router.asPath.endsWith("/jasa-ambulance-saja") && (
                <Link href={`/pesan/${data.slug}`}>
                  <button className="btn btn-lg w-full lg:w-1/2 btn-primary text-white">
                    Pesan Peti
                  </button>
                </Link>
              )}
              <Link href={"https://wa.me/628121764637?text="}>
                <button
                  //   onClick={registerToggle}
                  className="btn btn-lg w-full lg:w-1/2 btn-outline btn-primary text-white"
                >
                  Whatsapp
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProdukDetail;
