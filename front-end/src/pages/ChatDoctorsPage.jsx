import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { getDoctors } from '../utils/network-data.js'
import ListDoctors from '../components/ListDoctors.jsx'
import Loading from '../components/Loading.jsx'

function ChatDoctorsPage() {
  const [listDoctors, setListDoctors] = useState(
    useEffect(() => {
      async function fetchGetDoctors() {
        const { data } = await getDoctors();
        setListDoctors(data);
      }
      fetchGetDoctors();
    }, [])
  );

  const listSpecialists = Array.isArray(listDoctors) ?
    [...new Set(listDoctors.map(doctor => doctor.specialization))] : [];

  if (!listDoctors) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-chat-doctors">
        <ListDoctors throwListDoctors={listDoctors} listSpecialists={listSpecialists}/>
      </div>
    </motion.div>
  );
}

export default ChatDoctorsPage;