import { Edit_profile } from "../../components/Profile/Edit_profile.Prof"
import { Img_Profile } from "../../components/Profile/Img_Profile.Prof"

export const Section_MyInformation = () => {
  return (
    <section className="hidden sm:block w-[475px] border-2 rounded-xl bg-white border-woodLogo/45 z-10">
        <div className="w-full gap-2">
            <Img_Profile/>
            <Edit_profile/>
        </div>
    </section>
  )
}
