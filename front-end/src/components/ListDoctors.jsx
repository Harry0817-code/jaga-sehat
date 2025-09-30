import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCollaborations } from '../utils/network-data'; 

function ListDoctors({ throwListDoctors, listSpecialists }) {
  const [listDoctors, setListDoctors] = useState(throwListDoctors);

  const listAllDoctors = throwListDoctors;
  const navigate = useNavigate();

  async function handlerDoctorClick(id) {
    await addCollaborations(id);
  }

  function onSpecialistChange(e) {
    const select = e.target.value;

    const filteredDoctors = 
      select === '' || select === 'Semua Spesialis' ?
      listAllDoctors : listAllDoctors.filter((doctor) => doctor.specialization === select);
    
    setListDoctors(filteredDoctors);
  }
  return (
    <>
    <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Daftar Semua Dokter</h1>
    <label htmlFor="specialist-select" style={{ marginRight: "10px", marginTop: "10px" }}>Pilih Spesialis:</label>
    <select id="specialist-select" style={{ marginTop: "10px" }} onChange={onSpecialistChange}>
      <option value="">Semua Spesialis</option>
      {listSpecialists.map((specialist, index) => (
        <option key={index} value={specialist}>{specialist}</option>
      ))}
    </select>
    <div className="doctor-grid">
      {listDoctors.length > 0 ? (
        listDoctors.map((doctor, index) => (
          <div key={index} className="doctor-card" onClick={() => {navigate(`/doctor/${doctor.id}`)}}> {/*Ketika klik kartu dokter tersebut maka alihkan halaman ke detail*/}
            <img src='https://img.icons8.com/color/96/doctor-male.png' alt={doctor.name} className='doctor-icon'/>
            <h2 className='doctor-name'>{doctor.name}</h2>
            <p><strong>Spesialis: </strong>{doctor.specialization}</p>
            <p><strong>Alamat: </strong>{doctor.hospital_name}</p>
            <a
              className='whatsapp-btn'
              href={`https://wa.me/${doctor.phone.replace(/\D/g, '')}`}
              target='_blank'
              rel='noopener noreferrer'
              onClick={e => {
                e.stopPropagation();
                handlerDoctorClick(doctor.id)}}
            >Konsultasi via WhatsApp</a>
          </div>
        ))
      ) : (<p>No Doctors available at the moment.</p>)}
    </div>
    </>
  );
}

export default ListDoctors;