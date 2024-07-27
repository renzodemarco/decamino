import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { HiBuildingStorefront } from "react-icons/hi2";
import { MdEdit } from "react-icons/md";

import { Button, Checkbox, Input } from "@nextui-org/react";
import {Select, SelectItem, Chip} from "@nextui-org/react";
import { Galery_Commerce } from "./Galery_Commerce.Prof";
import { axios_JSON_Send, refresh_User } from "../../services/peticiones_back";
import Swal from 'sweetalert2'
import { updateUser } from "../../store/auth.slice";

import { MdTableRestaurant } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Loader } from "../UI/Loader";



export const MyCommerce = () => {

  const commerce = useSelector((state) => state.commerce.data)
  const token = useSelector((state) => state.authLogin.token);

  const dispatch = useDispatch()

  const data = ["Bar","Restaurante","Cafetería","Exótico","Centro","Comida rápida","Vegetariano","Vegano","Gourmet","Tradicional","Internacional","Fusión",
    "Buffet","De mariscos","Parrilla","Pizzería","Sushi","Tapas","Postres","Saludable","Familiar","Romántico","De lujo","Económico","Con terraza","Urbano",
    "Vintage","Moderno","Clásico","Local","Temático","De autor","Brunch","Comida casera","Restobar"]

  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(true)
  const [formData, setFormData] = useState({
    title: commerce.title || "",
    description: commerce.description || "",
    location: commerce.location || [],
    cuisine: commerce.cuisine || [],
    dineIn: commerce.dineIn || null,
    takeAway: commerce.takeAway || null,
  })

  const handleChange = (e) => {

    switch(e.target.name){
      default:
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        break;
    }
    
  }

  const handleSelected = (e) => {
    setFormData({
      ...formData,
      cuisine: Array.from(e)
    })
  }

  const updateCommerce = async () => {

    try {
      if(loading){
        return Swal.fire({
            icon: 'warning',
            title: 'Espere la respuesta \n Antes de volver a enviar los datos',
            showConfirmButton: false,
            timer: 1000
        })
      }

      setLoading(true)

      let resp

      if(commerce.title){

        resp = await axios_JSON_Send({
          data: formData,
          method: "put",
          url: "/api/restaurants",
          token
        })

      }else{
        
        resp = await axios_JSON_Send({
          data: {...formData, cuisine: Object.values(formData.cuisine)},
          method: "post",
          url: "/api/restaurants",
          token
        })
      }


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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(commerce.title != ""){

      setEditing(false)
      setFormData({
        title: commerce.title || "",
        description: commerce.description || "",
        location: commerce.location || [],
        cuisine: commerce.cuisine || [],
        dineIn: commerce.dineIn || false,
        takeAway: commerce.takeAway || false,
      })
    }
  }, [commerce])

  return (
    <section className="p-2 w-full relative max-w-full">
      <header className="flex w-full justify-center items-center border-b-2 border-woodLogo px-2 pb-2 gap-4">
        { !editing &&
        (
          <>
            <h1 className="text-gray-600 text-center font-semibold text-xl">{commerce.title}</h1>
            <Button className="bg-white rounded-full border-2 border-greenT" size="sm" isIconOnly aria-label="edit-button" onClick={()=> { setEditing(true)}}>
              <MdEdit className="text-greenT text-lg"/>
            </Button>
          </>

        )}

        { editing &&
        (<Input
          className="text-black font-semibold w-[320px]"
          classNames={{
            inputWrapper: "border-freshMint"
          }}
          label="Titulo del restaurante"
          value={formData.title || ""}
          name="title"
          placeholder="Ingrese el nombre del comercio"
          type="text"
          variant="underlined"
          startContent={
            <HiBuildingStorefront className="text-greenT text-lg"/>
          }
          endContent={
            <MdEdit className="text-greenT text-lg"/>
          }
          onChange={handleChange}
        />)}
      </header>
      <article className="max-w-full px-2 py-4 gap-2">
        <Galery_Commerce imgs={commerce.photos || []}/>
      </article>

      <article className="border-y-2 border-woodLogo px-2 py-2 flex flex-col gap-2 mt-2">
        <h2 className="font-semibold ">Sobre nosotros:</h2>
        {!editing && (<pre className="text-md font-nunito text-gray-900/70 p-4 bg-slate-100 border-2 border-slate-200 rounded-2xl break-words overflow-hidden text-wrap">
          {formData.description.trim()}
        </pre>)}
        {editing && (<textarea
          className="resize-none w-full min-h-6 h-auto max-h-[360px] text-gray-900/70 p-4 
          bg-slate-100 border-2 border-slate-200 rounded-2xl outline-freshMint"
          rows={4}
          value={formData.description}
          placeholder="Escribe una descripcion de tu comercio"
          name="description"
          onChange={handleChange}
        />)}
      </article>

      <article className="py-2">
        { !editing && (
          <>
            <h2 className="text-gray-600 font-semibold text-medium text-center">Etiquetas del comercio</h2>
            <div className="flex flex-wrap gap-2 w-full justify-center py-4">
              {commerce.cuisine.map((cui, i) => {
                return (<Chip className="bg-greenT text-white" key={i}>{cui}</Chip>)
              })}
            </div>
          </>
        )}
        { editing &&
        (<Select
          label="Etiquetas de comercio:"
          isMultiline={true}
          selectionMode="multiple"
          placeholder="Escoge tu etiqueta y describe tu comercio"
          labelPlacement="outside"
          classNames={{
            label:"font-semibold",
            selectorIcon:"hidden",
            trigger: "py-2 border-2 border-freshMint",
          }}
          selectedKeys={formData.cuisine}
          onSelectionChange={handleSelected}
          renderValue={(items) => {
            return (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip className="bg-greenT text-white" key={item.key}>{item.textValue}</Chip>
                ))}
              </div>
            );
          }}
        >
          {data.map((data) => (
            <SelectItem key={data} textValue={data}>
              {data}
            </SelectItem>
          ))}
        </Select>)}
      </article>
      <article className="p-2 flex justify-around border-b-2 border-woodLogo">
        <Chip className={`${(editing ? formData.dineIn : commerce.dineIn) ? "bg-greenT" : "bg-gray-600"} text-white py-4`}>
          <Checkbox 
          classNames={{
            label: "text-white text-base sm:text-sm md:text-base",
            icon:"text-freshMint",
            wrapper:"bg-white before:border-0 after:bg-white"
          }} 
          name="dineIn"
          size="lg" 
          isSelected={(editing ? formData.dineIn : commerce.dineIn)} 
          onValueChange={(e)=>{
              if(editing){
                setFormData({
                  ...formData,
                  dineIn: e
                })
              }else{
                setEditing(true)
              }
            } 
          }
          icon={<MdTableRestaurant/>}
          >Reservaciones</Checkbox>
        </Chip>
        <Chip className={`${(editing ? formData.takeAway : commerce.takeAway) ? "bg-greenT" : "bg-gray-600"} text-white py-4`}>
          <Checkbox 
          classNames={{
            label: "text-white text-base sm:text-sm md:text-base",
            icon:"text-freshMint",
            wrapper:"bg-white before:border-0 after:bg-white"
          }}
          name="takeAway"
          size="lg" 
          icon={<IoFastFood/>}
          isSelected={(editing ? formData.takeAway : commerce.takeAway)} 
          onValueChange={(e)=>{
              if(editing){
                setFormData({
                  ...formData,
                  takeAway: e
                })
              }else{
                setEditing(true)
              }
            }
          }
          >Pedidos</Checkbox>
        </Chip>
      </article>
      <article className="py-2">
        <h1 className="font-semibold text-gray-600 text-center text-xl">Localización</h1>
        { !editing &&
        (<div className="flex flex-wrap gap-2 justify-around py-4">
          <div className="flex text-white">
            <span className="pl-3 pr-2 py-1 bg-greenT rounded-l-full">LATITUD</span>
            <span className="pr-3 pl-2 py-1 bg-gray-500 rounded-r-full">{commerce.location[0]}</span>
          </div>
          <div className="flex text-white">
            <span className="pl-3 pr-2 py-1 bg-greenT rounded-l-full">LONGITUD</span>
            <span className="pr-3 pl-2 py-1 bg-gray-500 rounded-r-full">{commerce.location[1]}</span>
          </div>
        </div>)}

        { editing &&
        (<div className="flex justify-around gap-4 pt-2 px-2">
          <Input
            className="text-black font-semibold w-[320px]"
            classNames={{
              inputWrapper: "border-freshMint",
              label: "text-md"
            }}
            label="Latitud"
            value={formData.location[0] || ""}
            name="lan"
            placeholder="Ingrese la latitud del comercio"
            type="text"
            variant="underlined"
            startContent={
              <FaMapMarkedAlt className="text-greenT text-lg"/>
            }
            endContent={
              <MdEdit className="text-greenT text-lg"/>
            }
            onChange={(e) => { setFormData({
              ...formData,
              location:[e.target.value, formData.location[1]]
            })}}
          />
          <Input
            className="text-black font-semibold w-[320px]"
            classNames={{
              inputWrapper: "border-freshMint",
              label: "text-md"
            }}
            label="Longitud"
            value={formData.location[1] || ""}
            name="lon"
            placeholder="Ingrese la longitud del comercio"
            type="text"
            variant="underlined"
            startContent={
              <FaMapMarkedAlt className="text-greenT text-lg"/>
            }
            endContent={
              <MdEdit className="text-greenT text-lg"/>
            }
            onChange={(e) => { setFormData({
              ...formData,
              location:[formData.location[0], e.target.value]
            })}}
          />
        </div>)}
      </article>

      <footer className="py-4 flex justify-center items-center gap-4 border-t-2 border-woodLogo">
        {(editing && commerce.title) && (<Button className="text-gray-900/70 bg-softWood border-1 border-woodLogo text-base font-semibold" size="sm" onClick={()=> { setEditing(false)}}>
          Cancelar Edicion
        </Button>)}
        {editing && (<Button className="text-gray-900/70 bg-softWood border-1 border-woodLogo text-base font-semibold" size="sm" onClick={updateCommerce}>
          {commerce.title ? "Actualizar Datos" : "Crear Comercio"}
        </Button>)}
        {!editing &&(<Button className="text-gray-900/70 bg-softWood border-1 border-woodLogo text-base font-semibold" size="sm" onClick={() => { setEditing(true)}}>
          Editar Datos
        </Button>)}
        <div className="absolute bottom-[16px] right-[16px]">
          <Loader classNames={"size-[3rem] before:size-[1.5rem]"} hidden={!loading}/>
        </div>
      </footer>
    </section>
  )
}
