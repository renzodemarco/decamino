import { Button, Input } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux";

import Swal from 'sweetalert2'

import { MdEdit } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { FaUserAstronaut } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { useState } from "react";
import { axios_JSON_Send, refresh_User } from "../../services/peticiones_back";
import { updateUser } from "../../store/auth.slice";
import { validator } from "../../utilities/validations.util";
import { Loader } from "../UI/Loader";

export const Edit_profile = () => {

    const user_profile = useSelector((state) => state.authLogin.user)
    const token = useSelector((state) => state.authLogin.token);

    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        username: user_profile.username || "",
        phoneNumber: user_profile.phoneNumber || ""
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const validatePhoneNumber = (phone) => {
        const phoneNumberRegex = /^[0-9]{8,16}$/;
        return phoneNumberRegex.test(phone);
    }

    const handleSummit = async () => {
        
        if(loading){
            return Swal.fire({
                icon: 'warning',
                title: 'Espere la respuesta \n Antes de volver a enviar los datos',
                showConfirmButton: false,
                timer: 1000
            })
        }
        
        if(!validatePhoneNumber(formData.phoneNumber) && formData.phoneNumber != ""){
            return Swal.fire({
                title: 'Error',
                text: 'Por favor, ingresa un número de telefono valido.',
                icon: 'error',
            });
        }
        
        setLoading(true)
        try {

            const edit_data = validator.clearEmptyFilds(formData)
            
            const resp = await axios_JSON_Send({
                data: edit_data,
                method: "put",
                url: "/api/user/profile",
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

        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }

    }

return (
    <article className="w-full p-2">
        <h1 className="text-black text-lg font-semibold text-center pb-2">Mis Datos</h1>
        <form className="w-full flex flex-col gap-2 pb-2">
            <Input
                className="text-black font-semibold"
                classNames={{
                    inputWrapper: "border-1 border-freshMint"
                }}
                value={formData.username || ""}
                name="username"
                placeholder="Ingrese un nombre de usuario"
                type="text"
                startContent={
                    <FaUserAstronaut className="text-greenT text-lg"/>
                }
                endContent={
                    <MdEdit className="text-greenT text-lg"/>
                }
                onChange={handleChange}
            />
            <Input
                className="text-black font-semibold"
                classNames={{
                    inputWrapper: "border-1 border-gray-600"
                }}
                placeholder="Ingrese un número de telefono"
                name="email"
                value={user_profile.email}
                disabled
                type="email"
                startContent={
                    <MdEmail className="text-gray-600 text-lg"/>
                }
                endContent={
                    <IoLockClosed className="text-gray-600 text-lg"/>
                }
            />
            <Input
                className="text-black font-semibold"
                classNames={{
                    inputWrapper: "border-1 border-freshMint"
                }}
                placeholder="Ingrese un número de telefono"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                type="number"
                startContent={
                    <FaPhone className="text-greenT text-lg"/>
                }
                endContent={
                    <MdEdit className="text-greenT text-lg"/>
                }
                onChange={handleChange}
            />
            <div className={`flex relative w-full justify-center 
                ${formData.phoneNumber != (user_profile.phoneNumber == undefined ? "" : user_profile.phoneNumber) || formData.username != user_profile.username ? "" : "hidden"}`}
            >
                <Button className="bg-greenT hover:bg-greenT/65 text-white font-semibold" size="sm"
                    onPress={handleSummit}
                >
                    Guardar
                </Button>
                <div className="absolute bottom-[-10px] right-0">
                    <Loader classNames={"size-[3rem] before:size-[1.5rem]"} hidden={!loading}/>
                </div>
            </div>
        </form>
    </article>
    )
}
