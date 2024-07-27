import "react-image-gallery/styles/css/image-gallery.css"
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import { Button, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axios_Form_Send, axios_JSON_Send, refresh_User } from "../../services/peticiones_back";
import Swal from 'sweetalert2'
import { updateUser } from "../../store/auth.slice";
import { Loader } from "../UI/Loader";

export const Galery_Commerce = (props) => {
    const {imgs} = props

    const token = useSelector((state) => state.authLogin.token);
    const dispatch = useDispatch()

    const [photoUrl, setPhotoUrl] = useState("")
    const [loading, setLoading] = useState(false)

    const listImg = imgs.map((commerce_img)=> {
        return {
            original: commerce_img,
            thumbnail: commerce_img,
            originalHeight: 360,
            thumbnailClass: "hover:border-greenT",
            originalClass: "w-full h-auto sm:max-h-[360px] rounded-xl",
            navClass: "hover:bg-red-500"
        }
    })

    const popoverListImg = imgs.map((commerce_img)=>{
        return {
            thumbnail: commerce_img,
            thumbnailClass: "hover:border-greenT w-auto h-auto max-h-[180px] max-w-[140px]",
            originalClass: "w-full h-auto sm:max-h-[360px] rounded-xl",
            navClass: "hover:bg-red-500"
        }
    })

    const hadleThumbnails = (e) => {
        setPhotoUrl(e.target.src)
    }

    const deleteImg = async () => {

        if(loading){
            return Swal.fire({
              icon: 'warning',
              title: 'Espere la respuesta \n Antes de volver a enviar los datos',
              showConfirmButton: false,
              timer: 1000
            })
        }
    
        setLoading(true)

        try {
            const resp = await axios_JSON_Send({
                data: { photoUrl },
                method: "delete",
                url: "/api/restaurants/photos",
                token
            })

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

            location.reload()


        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const addNewImg = async (e) => {
        try {
            if(!(e.target.files && e.target.files.length > 0)){
                return Swal.fire({
                  icon: 'warning',
                  title: 'Archivo no valido',
                  showConfirmButton: false,
                  timer: 1000
                })
            }
          
          if(loading){
            return Swal.fire({
              icon: 'warning',
              title: 'Espere la respuesta \n Antes de volver a enviar los datos',
              showConfirmButton: false,
              timer: 1000
            })
          }
    
          setLoading(true)
    
          const formData = new FormData();
          formData.append('photos', e.target.files[0]);
    
          const resp = await axios_Form_Send({
            data: formData,
            method: "post",
            url: "/api/restaurants/photos",
            token
          })
    
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

          location.reload()
    
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
  return (
    <>
        {listImg.length > 0 && (
            <ImageGallery
                additionalClass="rounded-xl border-4 border-woodLogo"
                items={listImg}
                showPlayButton={false}
                showThumbnails={true}
                thumbnailPosition={"bottom"}
                showIndex={true}
                showNav={true}
            />
        )}
        <div className="flex flex-col justify-center items-center pt-2">
            <div className="pb-2">
                <Loader classNames={"size-[5rem] before:size-[2.5rem]"} hidden={!loading}/>
            </div>
          <div className='w-full flex gap-2 items-center justify-evenly'>
            <Button className="p-0 bg-greenT text-white text-sm xs:text-base xs:font-semibold">
              <label className="w-full h-full text-center flex items-center px-2">
                Nueva imagen
                <input
                  type='file'
                  name="inputPhotos"
                  accept="image/*"
                  onChange={addNewImg}
                  className='hidden'
                />
              </label>
            </Button>
            <Popover
              showArrow
              offset={10}
              placement="bottom"
              backdrop="blur"
            >
              <PopoverTrigger>
                <Button className="bg-red-700/80 text-white text-sm xs:text-base xs:font-semibold">
                  Eliminar imagen
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full">
                {(titleProps) => (
                    <>
                        <div className="py-2 w-full">
                            <p className="text-base font-bold text-foreground text-center" {...titleProps}>
                            Seleccione la imagen que desee eliminar
                            </p>
                            <div className="pt-2 pb-1 max-w-[640px]">
                            <ImageGallery
                                additionalClass=""
                                items={popoverListImg}
                                showPlayButton={false}
                                showThumbnails={true}
                                thumbnailPosition={"bottom"}
                                showIndex={false}
                                showNav={false}
                                showFullscreenButton={false}
                                onThumbnailClick={hadleThumbnails}
                            />
                            </div>
                        </div>
                        { photoUrl && (
                            <div className="relative px-1 py-2 w-full border-t-2 border-woodLogo flex justify-around ">
                                <Button className="bg-red-700/80 text-white text-sm xs:text-base xs:font-semibold"
                                    onClick={deleteImg}
                                >
                                    Eliminar imagen
                                </Button>
                                <div className="absolute bottom-[4px] right-0">
                                    <Loader classNames={"size-[3rem] before:size-[1.5rem]"} hidden={!loading}/>
                                </div>
                            </div>
                        )}
                    </>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
    </>
  )
}

Galery_Commerce.propTypes = {
    imgs: PropTypes.array.isRequired,
};
