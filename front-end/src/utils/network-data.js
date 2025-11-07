const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login(email, password) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function register({ fullname, email, password, birthday, gender }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fullname, email, password,  birthday, gender }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/user/me`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function addCollaborations(doctorId) {
  const response = await fetchWithToken(`${BASE_URL}/collaborations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ doctorId }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function addDoctor({ nama, email = 'test@gmail.com', spesialis, noWa, alamat }) {
  const response = await fetch(`${BASE_URL}/doctor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nama, email, spesialis, noWa, alamat }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

async function addPromptGenAi({ gender, age, weight, height, valueBmi }) {
  const response = await fetch(`${BASE_URL}/api/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ gender, age, weight, height, valueBmi })
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(response.message);
    return { error: true, data: null };
  }

  return {error: false, data: responseJson.data};
}

async function editDoctor(id, { nama, email = 'test@gmail.com', spesialis, noWa, alamat }) {
  const response = await fetch(`${BASE_URL}/doctor/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nama, email, spesialis, noWa, alamat }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

async function deleteDoctor(id) {
  const response = await fetch(`${BASE_URL}/doctor/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

async function getDoctors() {
  const response = await fetch(`${BASE_URL}/doctor`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getDoctorsById(id) {
  const response = await fetch(`${BASE_URL}/doctor/${id}`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getHistoryDoctors() {
  const response = await fetchWithToken(`${BASE_URL}/doctor/me`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  addCollaborations,
  getDoctors,
  getDoctorsById,
  getHistoryDoctors,
  addDoctor,
  editDoctor,
  deleteDoctor,
  addPromptGenAi
};