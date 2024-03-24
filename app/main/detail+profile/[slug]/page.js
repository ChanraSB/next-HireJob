
import WorkerProfile from "@/component/module/workerProfile/workerProfileCheck";
import { getSkillById, getWorkersById, getPortfolioById, roleCheck } from "@/service/worker";
import React from "react";
import { FaUser } from "react-icons/fa";
import Button from "@/component/base/button/button";
import Link from "next/link";
const DetailProfile = async ({ params }) => {
  const slug = params.slug;
  console.log(slug);
  const role = await roleCheck();
  const profileData = await getWorkersById(slug);
  const skillsData = await getSkillById(slug)
  
  return (
    <div style={{ marginTop: "60px", position: "relative" }}>
      <div
        style={{
          background: "#5E50A1",
          height: "300px",
          width: "100%",
          position: "absolute",
          top: "0",
          zIndex: "-1",
        }}
      ></div>
      <div className="container" style={{ paddingTop: "50px" }}>
        <div className="row row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 d-flex justify-content-center ">
          
            <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 d-flex justify-content-center">
              {profileData && (
                <div className="card py-3" style={{ width: "80%", borderRadius: "10px" }}>
                <div className="card-img" style={{ boxSizing: "border-box", width: "100px", height: "100px", marginLeft: "auto", marginRight: "auto", borderRadius: "50%" }}>
                  {profileData.photo ? <img src={profileData.photo} className="card-img " style={{ width: "100%", height: "100%", borderRadius : "50%", objectFit : "cover" }} /> : <FaUser className="card-img " style={{ width: "100%", height: "auto", borderRadius: "50%", color: "#9EA0A5" }} />}
                </div>
                <div className="card-body">
                  <h4 className="card-title ">{profileData.name || "-"}</h4>
                  <p className="card-subtitle text-secondary">{profileData.workplace || "-"}</p>
                  <p className="card-subtitle text-secondary">{profileData.domicile || "-"}</p>
                  
                  <p className="card-text text-secondary mt-2">{profileData.description || "-"}</p>
                  {role === "recruiter" ? (
                    <Link href={`/main/hire/${profileData.id}`}>
                    <Button
                      child="Hire"
                      
                      style={{ color: "white", backgroundColor: "#5E50A1", width: "100%" }}
                    />
                    </Link>
                  ) : (<></>)}
                  
                  <h4 className="mt-3">Skill</h4>
                  
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {skillsData.map((item) => (
                    <div key={item.id} className=" text-center bg-warning me-2 py-2 px-3 mb-2" style={{ color: "white", display: "flex", flexWrap: "wrap" }}>
                      {item.skill_name}
                    </div>
                  ))}
                </div>
                </div>
              </div>
              )}
            </div>
          

          <div
            className="col-sm-12 col-md-12 col-lg-8 col-xl-8  pt-4 px-4"
            style={{ borderRadius: "10px", background: "white" }}
          >
            <WorkerProfile id={slug}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProfile;
// export async function getStaticPaths() {
//   const paths = await getAllWorkerIds(); // Mengambil semua slug yang mungkin
//   return {
//     paths,
//     fallback: false // Ubah menjadi true jika ingin memberikan 404 jika slug tidak ditemukan
//   };
// }

// // Mengimplementasikan getStaticProps
// export async function getStaticProps({ params }) {
//   const slug = params.slug;
//   const profileData = await getWorkersById(slug); // Mengambil data profil berdasarkan slug
//   return {
//     props: {
//       profileData
//     }
//   };
// }
