import React, {useState, useEffect}from "react";
import { getDoctorsById } from '../utils/network-data';
import { useParams } from "react-router-dom";
import { addCollaborations } from "../utils/network-data";
import LoadingPage from "../components/Loading";

function DetailDoctorPage() {
  const { id } = useParams();
  const detailWorkDays = [
    {id: 1, day: 'Senin'},
    {id: 2, day: 'Selasa'},
    {id: 3, day: 'Rabu'},
    {id: 4, day: 'Kamis'},
    {id: 5, day: 'Jumat'},
    {id: 6, day: 'Sabtu'},
    {id: 7, day: 'Minggu'},
  ];
  const [detailDoctor, setDetailDoctor] = useState(
    useEffect(() => {
      async function fetchHistoryDoctor() {
        const { data } = await getDoctorsById(id);
        setDetailDoctor(data[0]);
      }
      fetchHistoryDoctor();
  }, [id]));
  
  if (!detailDoctor) {
    return <LoadingPage />
  }

  const workDay = (workDayStartOrEnd) => {
    const dayObj = detailWorkDays.find((item) => item.id === workDayStartOrEnd);
    return dayObj ? dayObj.day : " ";
  }

  const workTime = (workTimeStartOrEnd) => {
    const date = new Date(`1970-01-01T${workTimeStartOrEnd}`);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  
  async function handlerSandMessage(doctorId, numberWhatsApp) {
    const result = await addCollaborations(doctorId);
    if (!result.error) {
      window.open(`https://wa.me/${numberWhatsApp.replace(/\D/g, '')}`, "_blank");
    } else {
      alert("Gagal menambahkan kolaborasi");
    }
  }

  return (
    <>
    <div className="doctor-detail">
      <div className="doctor-card-detail">
        <img src="https://img.icons8.com/color/96/doctor-male.png" alt="dr. Clara" />
      </div>
      <div className="info">
        <h2>{detailDoctor.name}</h2>
        <p><strong>Email: </strong> {detailDoctor.email}</p>
        <p><strong>Nomor WhatsApp: </strong> {detailDoctor.phone}</p>
        <p><strong>Spesialis: </strong> {detailDoctor.specialization}</p>
        <p><strong>Rumah Sakit: </strong> {detailDoctor.hospital_name}</p>
        <p><strong>Alamat Praktik: </strong> {detailDoctor.hospital_address}</p>
        <p><strong>Waktu Pengalaman: </strong> {detailDoctor.experience_years} Tahun</p>
        <p><strong>Hari Kerja: </strong> {workDay(detailDoctor.workday_start)} - {workDay(detailDoctor.workday_end)}</p>
        <p><strong>Jam Kerja: </strong> {workTime(detailDoctor.worktime_start)} - {workTime(detailDoctor.worktime_end)}</p>
        <button className="whatsapp-btn" type="submit"
          onClick={(e) => {
            e.preventDefault();
            handlerSandMessage(detailDoctor.id, detailDoctor.phone);
          }}
        >Konsultasi via WhatsApp</button>
      </div>
    </div>
    </>
  );
}

export default DetailDoctorPage;