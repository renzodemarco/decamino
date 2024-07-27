import { Button, DateRangePicker, Input } from "@nextui-org/react";

export const Planea_Tu_Ruta = () => {
  return (
    <div className="w-full h-full flex items-center justify-center pt-12 md:pt-0">
      <div className="text-center w-[100%] md:w-[85%] h-[100%] md:pb-8 md:pt-5">
        <h2 className="text-white font-nunito text-[2em]">
          Planea tu ruta rural
        </h2>
        <form className="flex flex-col md:flex-row gap-5 justify-center items-end mt-4 md:mt-2">
          <div className="w-full mb-4 md:mb-0">
            <label className="text-white text-left flex justify-start pb-1">
              Primer destino
            </label>
            <Input type="text" placeholder="Ingresar destino" />
          </div>

          <div className="w-full mb-4 md:mb-0">
            <label className="text-white text-left flex justify-start pb-1">
              Segundo destino
            </label>
            <Input type="text" placeholder="Ingresar destino" />
          </div>
          <div className="w-full mb-4 md:mb-0">
            <label className="text-white text-left flex justify-start pb-1">
              Día de llegada y salida
            </label>
            <DateRangePicker classNames={{ selectorIcon: "text-greenT" }} />
          </div>

          <Button
            className="font-nunito text-white font-[600] w-full bg-greenT h-[40px] mt-6 md:mt-4"
            aria-label="Buscar"
            radius="full"
          >
            Buscar
          </Button>
        </form>
      </div>
    </div>
  );
};
