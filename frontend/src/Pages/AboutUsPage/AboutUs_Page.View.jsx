import { FaGithub,FaLinkedin  } from "react-icons/fa";



const team = [

  {
    name: "Andrea Laurino",
    role: "QA",
    linkedIn: "https://www.linkedin.com/in/andrea-laurino/",
    github: "https://github.com/Andrea-Laurino",
    Image: "https://avatars.githubusercontent.com/u/110556252?v=4"
  },
  {
    name: "Bazan Julio Pablo Federico",
    role: "QA",
    linkedIn: "https://www.linkedin.com/in/julio-bazan-6ba406212/",
    github: "https://github.com/FedeBazan",
    Image: "https://avatars.githubusercontent.com/u/48597230?v=4"
  },
  
  {
    name: "Joaquín Romero",
    role: "Frontend",
    linkedIn: "https://www.linkedin.com/in/joaquin-romero-360141191/",
    github: "https://github.com/JDR89",
    Image: "https://avatars.githubusercontent.com/u/87939958?v=4"
  },
  {
    name: "Matias Obregon",
    role: "Frontend",
    linkedIn: "https://www.linkedin.com/in/engineerobregonmatias/",
    github: "https://github.com/MattiasObregon",
    Image: "https://avatars.githubusercontent.com/u/141037830?v=4"
  },
  {
    name: "Christian Zamora Hermida",
    role: "Frontend",
    linkedIn: "https://www.linkedin.com/in/christianzamorahermida/",
    github: "https://github.com/christianzamher",
    Image: "https://avatars.githubusercontent.com/u/77246844?v=4"
  },
  
  {
    name: "Renzo Demarco",
    role: "Fullstack",
    linkedIn: "https://www.linkedin.com/in/renzo-demarco/",
    github: "https://github.com/renzodemarco",
    Image: "https://media.licdn.com/dms/image/D4D03AQGeI1BefH1T4g/profile-displayphoto-shrink_200_200/0/1687966369178?e=1726099200&v=beta&t=JIP1M7ZD_wWq9Vjb2J2S9zz2F1n1MpDJ3bBSdsZp3mM"
  },
  {
    name: "Abel Acevedo",
    role: "Fullstack",
    linkedIn: "https://www.linkedin.com/in/abel-fernando-acevedo/",
    github: "https://github.com/Abel3581",
    Image: "https://avatars.githubusercontent.com/u/59884602?v=4"
  },
  {
    name: "Arce Facundo",
    role: "Fullstack",
    linkedIn: "https://www.linkedin.com/in/facundo-sebastian-arce-9699992b8/",
    github: "https://github.com/ArceFacundo2022",
    Image: "https://avatars.githubusercontent.com/u/111534351?v=4"
  },  
  {
    name: "Jeremias Ianigro",
    role: "Backend",
    linkedIn: "https://www.linkedin.com/in/jeremias-ianigro",
    github: "https://github.com/Jeremiasianigro",
    Image: "https://media.licdn.com/dms/image/D4D03AQEsg0iehmOmDA/profile-displayphoto-shrink_200_200/0/1711134041575?e=1726099200&v=beta&t=GZ9g_Msn0LgYeH-cz-kZPlTs9mboZPrKX6raLsAy3JQ"
  },
  {
    name: "Tamara Migliavacca",
    role: "Backend",
    linkedIn: "https://www.linkedin.com/in/tamara-migliavacca/",
    github: "https://github.com/TamaraMiglia",
    Image: "https://avatars.githubusercontent.com/u/112015373?v=4"
  },
  
  {
    name: "Juan Papi",
    role: "Project manager",
    linkedIn: "https://www.linkedin.com/in/juanpapi/",
    github: "https://github.com/JuanPapi84",
    Image: "https://avatars.githubusercontent.com/u/122549816?v=4"
  }
];

export const AboutUs = () => {
  return (
    <>
    
    <section className="text-gray-600 body-font font-nunito bg-gradient-to-b from-[#0a1200]/70 to-[#BC976C]/5 ">
    <div className="container px-5 py-24 mx-auto">
      
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="text-white  md:text-[50px] text-[40px] font-medium title-font mb-5 font-nunito">
          Nuestro equipo
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed font-nunito text-lg text-white ">
        Este proyecto proporcionará una experiencia enriquecida para los usuarios, promoviendo la exploración y apoyo a los pueblos rurales a través de la gastronomía, utilizando la tecnología como puente para el crecimiento económico y la sostenibilidad.
        </p>
        
      </div>
      <div className="flex flex-wrap -m-2">
        {team.map((person) => (
          <div key={person.name} className="p-2 lg:w-1/3 md:w-1/2 w-full ">
            <div className="h-full flex items-center border-softWood border p-4 rounded-lg bg-gradient-to-b from-[#BC976C]/70 to-[#0a1200]/5">
              <img
                alt="team"
                className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4 shadow-lg"
                src={person.Image}
              />
              <div className="flex-grow flex justify-between items-center">
                <div>
                  <h2 className="text-gray-900  font-[300] title-font font-nunito text-[18px] md:text-[20px]">
                    {person.name}
                  </h2>
                  <p className="text-black text-[16px] ">{person.role}</p>
                </div>
                <div className="flex space-x-2">
                  <a href={person.linkedIn} className="text-3xl hover:text-greenT/90 hover:cursor-pointer " style={{transition:"0.5s"}}>
                    <FaLinkedin size={24} />
                  </a>
                  <a href={person.github} className="text-3xl hover:text-greenT/90 hover:cursor-pointer" style={{transition:"0.5s"}}>
                    <FaGithub size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
        
  </>
  );
};