import React from 'react';
import { useNavigate } from 'react-router-dom';

function ListHistoryDoctors({ listDoctor }) {
  const navigate = useNavigate();

  return (
    <>
    <div className="doctor-list">
      {listDoctor.length > 0 ? (
        listDoctor.map((doctor, index) => (
          <div key={index} className="doctor-card" onClick={() => {navigate(`/doctor/${doctor.id}`)}}>
            <img src={`https://img.icons8.com/color/96/doctor-male.png`} alt={doctor.name} className="doctor-icon"/>
            <h2 className="doctor-name">{doctor.name}</h2>
            <p><strong>Spesialis: </strong>{doctor.specialization}</p>
            <p><strong>Alamat: </strong>{doctor.hospital_name}</p>
            <a
              className="whatsapp-btn"
              href={`https://wa.me/${doctor.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => {
                e.stopPropagation();
              }}
            >Pesan via WhatsApp</a>
          </div>
        ))
      ) : (
        <p>No doctors available at the moment.</p>
      )}
    </div>
    </>
  );
}

export default ListHistoryDoctors;