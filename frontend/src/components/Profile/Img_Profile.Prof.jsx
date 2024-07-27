import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch, useSelector} from "react-redux";
import logo from "/logosinFondo.png";
import BG_MERCHANT from "../../assets/Img/profile_merchant.webp"
import BG_TRAVELER from "../../assets/Img/profile_traveler.webp"

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Avatar
} from "@nextui-org/react";

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Swal from 'sweetalert2'
import { axios_Form_Send, refresh_User } from '../../services/peticiones_back';
import { updateUser } from '../../store/auth.slice'
import { Loader } from '../UI/Loader';



export const Img_Profile = () => {
  
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user_profile = useSelector((state) => state.authLogin.user)
  const token = useSelector((state) => state.authLogin.token);

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const [blob, setBlob] = useState({
    url: "",
    data: null
  })
  const [image, setImage] = useState(null);
  const [etiIMG, setEtiIMG] = useState({
    height:"800px",
    width:"800px"
  })
  const [crop, setCrop] = useState({ unit: 'px', width: 30,height: 30, aspect: 1 });
  const [currentImage, setCurrentImage] = useState(user_profile.profileImg || "img/T10.png");

  
  const handleOpenModal = () => {
    onOpen()
  };

  const handleCloseModal = () => {
    setImage(null);
    setCurrentImage(user_profile.profileImg)
    setCrop({ unit: 'px', width: 30,height: 30, aspect: 1 })
    setBlob({
      url: "",
      data: null
    })
  };

  const handleUploadImage = async (closeModal) => {

    try {

      if(!loading){
        return Swal.fire({
          icon: 'warning',
          title: 'Espere la respuesta \n Antes de volver a enviar los datos',
          showConfirmButton: false,
          timer: 1000
        })
      }

      setLoading(false)
      
      const formData = new FormData();
      const jpegFile = new File([blob.data], 'newFile.jpg', { type: 'image/jpeg' });

        formData.append('profileImg', jpegFile);

        const resp = await axios_Form_Send({
          data: formData, 
          method: "put", 
          url: `/api/user/profile-img/upload`, 
          token
        })

        setLoading(true)

        if(resp.error){
          return Swal.fire({
            icon: 'error',
            title: 'Error al enviar los datos',
            showConfirmButton: false,
            timer: 1000
          })
        }
  
        dispatch(updateUser(await refresh_User(token)))
        
        Swal.fire({
          icon: 'success',
          title: resp.message,
          showConfirmButton: false,
          timer: 1000
        })

        closeModal()
        
      } catch (error) {
      console.log(error)
    }
  };


  const onSelectFile = (e) => {

    if (e.target.files && e.target.files.length > 0) {

      setCurrentImage(user_profile.profileImg)
      setCrop({ unit: 'px', width: 30,height: 30, aspect: 1, x:0, y:0 })
      setBlob({
        url: "",
        data: null
      })

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImage(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);

      setEtiIMG(document.getElementById('IMG-SELECT'))
    }
  };

  const onCropChange = (crop) => {
    if(crop.height > etiIMG.height || crop.width > etiIMG.width || crop.height !== crop.width){
      return
    }else{
      setCrop(crop);
    }
  };

  const makeClientCrop = async () => {
    if (image && crop.width && crop.height) {
      // Realiza acciones adicionales con la imagen recortada o escalada
      const imageElement = new Image();
      imageElement.src = image;
      imageElement.onload = async function () {
        const croppedImageUrl = await getCroppedImg(imageElement, crop, 'newFile.jpeg');
        setImage(null)
        setBlob({
          url: window.URL.createObjectURL(croppedImageUrl),
          data : croppedImageUrl
        })
      };
    }
  };

  const getCroppedImg = (imageSrc, crop2, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = imageSrc.naturalWidth / etiIMG.width;
    const scaleY = imageSrc.naturalHeight / etiIMG.height;
    canvas.width = crop2.width * scaleX;
    canvas.height = crop2.height * scaleY;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      imageSrc,
      crop2.x * scaleX,   // Coordenada X redondeada
      crop2.y * scaleY,    // Coordenada Y redondeada
      crop2.width * scaleX,                            // Ancho del área a recortar en la imagen de origen
      crop2.height * scaleY,                            // Alto del área a recortar en la imagen de origen
      0,                              // Coordenada X en el lienzo donde se dibujará el recorte
      0,                              // Coordenada Y en el lienzo donde se dibujará el recorte
      crop2.width * scaleX ,                            // Ancho del área en el lienzo donde se dibujará el recorte
      crop2.height * scaleY                           // Alto del área en el lienzo donde se dibujará el recorte
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            // Rechazar si no se obtiene un blob
            console.error('Canvas is empty');
            return;
          }
          blob.name = fileName;
          window.URL.revokeObjectURL(imageSrc.src);
          resolve(blob);
        },
        'image/jpeg',
        1
      );
    });
  };

  return (
    <>
      <article className='bg-cyan-400/20 bg-cover rounded-t-xl hidden sm:block' style={{backgroundImage: `url(${user_profile.role == "traveler" ? BG_TRAVELER : BG_MERCHANT})` }}>
        <div className='w-full h-[164px] flex justify-center items-center relative p-2'>
          <Avatar
              isBordered
              size="lg"
              className="transition-transform ring-freshMint w-32 h-32 text-large shadow-xl shadow-greenT"
              name={user_profile.username}
              src={user_profile.profileImg}
          />
          <Button size='md' isIconOnly className="absolute top-[65%] left-[60%] text-lg rounded-full bg-softWood border-2 border-woodLogo" onClick={handleOpenModal}>
            <IoMdAdd/>
          </Button>
        </div>
        <div className='flex justify-center border-b-2 border-woodLogo px-2 pb-2'>
          <h2 className='text-center font-semibold text-lg text-black px-4 bg-softWood border-1 border-woodLogo rounded-2xl'>{user_profile.username}</h2>
        </div>
      </article>

      <article className='rounded-t-xl block sm:hidden'>
        <div className='w-full h-[208px] flex justify-center items-center relative p-2 mt-[-108px]'>
          <Avatar
              isBordered
              size="lg"
              className="transition-transform ring-freshMint w-40 h-40 text-large shadow-xl shadow-greenT"
              name={user_profile.username}
              src={user_profile.profileImg}
          />
          <Button size='md' isIconOnly className="absolute top-[65%] left-[60%] text-lg rounded-full bg-softWood border-2 border-woodLogo" onClick={handleOpenModal}>
            <IoMdAdd/>
          </Button>
        </div>
        <div className='flex justify-center px-2 pb-4'>
          <h2 className='text-center font-semibold text-lg text-black px-4 bg-softWood border-1 border-woodLogo rounded-2xl'>{user_profile.username}</h2>
        </div>
      </article>

      <Modal
          backdrop="opaque"
          size="2xl"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={()=> handleCloseModal()}
          isDismissable={false}
          placement="top"
          classNames={{
            backdrop: "bg-gradient-to-br from-[#94B9FF]/75 to-[#CDFFD8]/75 backdrop-opacity-10",
            base: "",
            header: "flex justify-center",
            body:"gap-2 pb-[52px] relative",
            footer:"bg-woodLogo relative"
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  <h1 className='text-center text-xl font-bold'>Cambiar imagen de perfil</h1>
                </ModalHeader>
                <ModalBody>
                  <div className='w-full h-[148px] flex justify-center items-center relative p-2'>
                    <Avatar
                        isBordered
                        size="lg"
                        className="transition-transform ring-freshMint w-32 h-32 text-large"
                        name={user_profile.username}
                        src={blob.url || currentImage}
                    />
                  </div>
                  <form className='border-t-2 border-woodLogo flex justify-center px-2 pt-4 pb-2'>
                    <div className='w-full flex flex-col gap-2 items-center justify-center'>
                      <label className='font-semibold'>
                        Selecciona una nueva imagen
                      </label>
                      <input
                        type='file'
                        name="file"
                        accept="image/*"
                        onChange={onSelectFile}
                        className='file:border-0 file:bg-greenT file:rounded-l-2xl file:text-white file:cursor-pointer file:py-1 file:px-2 text-black xs:font-semibold text-xs xs:text-sm cursor-pointer bg-slate-200 rounded-2xl pr-2'
                      />
                    </div>
                  </form>
                  <section className={`border-t-2 border-woodLogo flex flex-col justify-center p-2 ${image == null ?"hidden" : ""}`}>
                    <ReactCrop
                      crop={crop}
                      onChange={onCropChange}
                      aspect={1}
                      minHeight={"300px"}
                      minWidth={"300px"}
                      maxHeight={etiIMG.height}
                      maxWidth={etiIMG.width}
                      keepSelection
                    >
                      <img src={image ? image : logo} id='IMG-SELECT'/>
                    </ReactCrop>
                    <div className='p-2 flex justify-center'>
                      {image && (
                        <Button className='font-semibold rounded-full bg-greenT cursor-pointer hover:bg-greenT/75 text-white' onClick={() => {
                          makeClientCrop()
                        }}>
                          Recortar Imagen
                        </Button>
                      )}
                    </div>
                  </section>
                  <div className='absolute bottom-[8px] right-[8px]'>
                    <Loader classNames={"size-[4rem] before:size-[2rem] z-10"} hidden={loading}/>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <div className="absolute top-[-46px] w-full left-0">
                    <img className="w-[60px] h-[56px]" src={logo} alt="DeCamino" />
                  </div>
                  <Button className='font-semibold text-gray-700' variant='flat' color='default' onClick={onClose}>Cancelar</Button>
                  {blob.url && (<Button className='font-semibold rounded-full bg-greenT cursor-pointer hover:bg-greenT/75 text-white' onClick={ () => {handleUploadImage(onClose)}}>Subir imagen</Button>)}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
    </>
  );
};
