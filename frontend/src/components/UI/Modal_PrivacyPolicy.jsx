import { useEffect } from "react";
import PropTypes from 'prop-types';
import { useDispatch} from "react-redux";
import { setCookieAcceptance } from "../../store/modal.slice";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image
} from "@nextui-org/react";
import logo from "/logosinFondo.png";
import logo_white from "/logo.png"



export const PrivacyPolicy = ({ children, lessBottoms = false, acceptedPolicy }) => {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Verifica si el usuario ha aceptado las cookies al cargar la página
  useEffect(() => {
    const acceptedCookies = sessionStorage.getItem("acceptedCookies");
    if (acceptedCookies !== null) {
      dispatch(setCookieAcceptance(JSON.parse(acceptedCookies)));
    }
  }, [dispatch]);

  // Guarda la preferencia del usuario en sessionStorage y actualiza el estado de Redux
  const handleClose = () => {
    sessionStorage.setItem("acceptedCookies", JSON.stringify(true));
    dispatch(setCookieAcceptance(true));
    acceptedPolicy(true)
  };

    return (
      <>
        <div onClick={()=> {onOpen()}}>
          {children}
        </div>
        <Modal
          backdrop="opaque"
          size="3xl"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          placement="auto"
          classNames={{
            backdrop: "bg-gradient-to-br from-[#94B9FF]/75 to-[#CDFFD8]/75 backdrop-opacity-40",
            base: "max-h-screen",
            header: "h-[15%]",
            body:"h-[70%] overflow-y-scroll pb-12 bg-gray100/45",
            footer:"h-[15%] relative"
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex justify-center items-end gap-1 border-b-2 border-woodLogo">
                  <Image src={logo_white} width={120} height={60} alt="Logo" />
                </ModalHeader>
                <ModalBody>
                  <h1 className="text-center text-2xl font-bold">¡🍪 COOKIES 🍪!</h1>
                  <p>
                    Nos importa su privacidad. El uso que hacemos de la
                    información que recopila DeCamino (es decir, nosotros) se
                    recoge en la <b>Política de privacidad de DeCamino.</b>
                  </p>
                  <p>
                    Nosotros utilizamos la expresión «información personal» para
                    referirnos a la información que le identifica directamente
                    (p. ej., su nombre, dirección de correo electrónico o
                    información de facturación) o podría estar razonablemente
                    vinculada con usted o ser utilizada de forma combinada para
                    identificarle (p. ej., el número de identificación de una
                    cuenta o dirección IP). Siempre le informaremos sobre qué
                    información personal recopilamos sobre usted. Consulte el
                    Aviso de privacidad de cada producto para obtener
                    información detallada.
                  </p>
                  <p>
                    {`Cualquier información que no se encuadre en esa descripción,
                    deberá ser considerada "información no personal". Si
                    almacenamos sus informaciones personales con informaciones
                    no personales, esta combinación será considerada como
                    "informaciones personales". Si excluimos todas las
                    informaciones personales de un conjunto de datos, los datos
                    restantes deben ser considerados informaciones no
                    personales.`}
                  </p>
                </ModalBody>
                <ModalFooter className="bg-woodLogo ">
                  <div className="absolute top-[-46px] w-full left-0">
                    <img className="w-[60px] h-[56px]" src={logo} alt="DeCamino" />
                  </div>
                  {
                    !lessBottoms &&
                    (
                      <>
                        <Button 
                          onClick={()=>{onClose()}}
                          className="text-black bg-gray300/85"
                        >
                          No Acepto
                        </Button>
                        <Button 
                          className="bg-freshMint font-bold text-white"
                          onClick={()=>{handleClose(); onClose()}}
                        >
                          Acepto
                        </Button>
                      </>
                    )
                  }
                  {
                    lessBottoms && (
                      <Button 
                          onClick={onClose}
                          className="text-black bg-gray300/85"
                        >
                          Cerrar
                      </Button>
                    )
                  }
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
};

PrivacyPolicy.propTypes = {
  children: PropTypes.node.isRequired,
  lessBottoms: PropTypes.bool,
  acceptedPolicy: PropTypes.any
};