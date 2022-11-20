import Image from "next/image";
import Calculator from "../components/Calculator";

export default function Page() {
  return (
    <div className="text-inter flex-col bg-white w-screen h-full z-0">
      <section id="calculator" className="bg-blue-700 relative flex lg:h-[636px]  h-[868px] w-full z-10">
        <img src="/hero-bg.svg" className="h-full w-full items-stretch object-cover hidden md:block z-10" />
        <img src="/hero-bg-m.svg" className="h-full w-full items-stretch object-cover md:hidden block z-10" />
        <img
          src="/logo.svg"
          className="absolute lg:left-[44.97%] lg:right-[44.96%] md:left-[40%] md:right-[42%] right-[25%] md:top-[57px] top-[49px] bottom-[92.84%] z-20"
        />
      </section>
      <section id="cta" className="block relative justify-center text-center lg:pt-[60px] bg-white w-full h-full z-10">
        <Calculator />
        <div className="flex flex-col relative h-full w-full bottom-0">
          <div className="md:px-0 px-[15px]">
            <p className="text-[#553EFF] font-black  md:text-4xl text-[40px] xl:mt-[190px] lg:mt-[150px] mt-[477px] w-full text-center">
              ¿Vas a dejar pasar la oportunidad?
            </p>
          </div>

          <p className="font-inter font-bold text-[18px]  mt-1 mx-[15px]">
            ¡Aprende a generar ingresos en el Mercado con Trading en la Bolsa desde Cero!
          </p>
          <div className=" flex-col h-[60px] w-[296px] px-[14px] mt-6 text-center items-center bg-[#FFCC00] rounded-[60px] self-center md:mb-[68px] mb-[81px]">
            <a
              href="#"
              className="h-full w-full flex flex-col font-inter font-black text-[18px] text-[#553EFF] leading-[60px]"
            >
              ¡Empieza HOY por $999!
            </a>
          </div>
        </div>
      </section>
      <section id="disclaimer" className="bg-[#F5F5F6] relative py-[20px] w-full block mt-0 text-center z-10">
        <div className=" text-center sm:px-4 px-6">
          <p className=" text-[#0C2F52] text-sm font-inter">
            *Oferta valida solo por Backfriday, del 22 hasta el 30 de noviembre del 2022. Precio final $999 <br />
            <span className="font-bold">© Copyright 2022 Infusion Investments LLC</span>
          </p>
        </div>
      </section>
    </div>
  );
}
