const BASE_URL = "https://34.128.73.239.sslip.io/api";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
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

async function login({ username, password }) {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function resetPassword({ id }) {
  const response = await fetchWithToken(`${BASE_URL}/users/reset/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    return { error: responseJson.message, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getWorkunits() {
  const response = await fetchWithToken(`${BASE_URL}/workunits`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, feedback: null };
  }

  return { error: false, data: responseJson.data };
}

async function addWorkUnit({ code, name }) {
  const response = await fetchWithToken(`${BASE_URL}/workunits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, name }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, feedback: null };
  }

  return { error: false, feedback: responseJson.message };
}

async function updateWorkUnit({ id, code, name }) {
  const response = await fetchWithToken(`${BASE_URL}/workunits/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, name }),
  });
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, data: null };
  }

  return { error: false, feedback: responseJson.message };
}

async function getUsers() {
  const response = await fetchWithToken(`${BASE_URL}/users`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, feedback: null };
  }

  return { error: false, data: responseJson.data };
}

async function addUser({ username, id_work_unit }) {
  const response = await fetchWithToken(`${BASE_URL}/users/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, id_work_unit }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, feedback: null };
  }

  return { error: false, data: responseJson.data };
}

async function getTypes() {
  const response = await fetchWithToken(`${BASE_URL}/types`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, feedback: null };
  }

  return { error: false, data: responseJson.data };
}

async function addType({ code, name }) {
  const response = await fetchWithToken(`${BASE_URL}/types`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, name }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, feedback: null };
  }

  return { error: false, feedback: responseJson.message };
}

async function updateType({ id, code, name }) {
  const response = await fetchWithToken(`${BASE_URL}/types/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, name }),
  });
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, data: null };
  }

  return { error: false, feedback: responseJson.message };
}

async function getItems({ id_type }) {
  const response = await fetchWithToken(
    `${BASE_URL}/types/${id_type}/nameitems`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, feedback: null };
  }

  return { error: false, data: responseJson.data };
}

async function addItem({ id_type, code, name }) {
  const response = await fetchWithToken(`${BASE_URL}/types/nameitems`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_type, code, name }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, feedback: null };
  }

  return { error: false, feedback: responseJson.message };
}

async function updateItem({ id, code, name }) {
  console.log(id);
  console.log(code);
  console.log(name);
  const response = await fetchWithToken(`${BASE_URL}/types/nameitems/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, name }),
  });
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, data: null };
  }

  return { error: false, feedback: responseJson.message };
}

async function procurement({
  id_name_item,
  quantity,
  description,
  added_date,
}) {
  const response = await fetchWithToken(`${BASE_URL}/addeditems`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_name_item, quantity, description, added_date }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, feedback: null };
  }

  return { error: false, feedback: responseJson.message };
}

async function procurementHistory() {
  const response = await fetchWithToken(`${BASE_URL}/addeditems`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, feedback: null };
  }

  return { error: false, data: responseJson.data };
}

async function getInventories() {
  const response = await fetchWithToken(`${BASE_URL}/inventories/all`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, feedback: null };
  }

  return { error: false, data: responseJson.data };
}

async function getUnassignedItem() {
  const response = await fetchWithToken(`${BASE_URL}/addeditems/distribution`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, feedback: null };
  }

  return { error: false, data: responseJson.data };
}

async function addItemToWorkUnit({ id_added_item, id_work_unit, quantity }) {
  const response = await fetchWithToken(`${BASE_URL}/inventories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_added_item, id_work_unit, quantity }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, feedback: null };
  }

  return { error: false, feedback: responseJson.message };
}

async function getRooms() {
  const response = await fetchWithToken(`${BASE_URL}/rooms`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();
  console.log(responseJson);
  if (responseJson.status !== "success") {
    return { error: responseJson.message, feedback: null };
  }

  return { error: false, data: responseJson.data };
}

async function addRoom({ name }) {
  const response = await fetchWithToken(`${BASE_URL}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, feedback: null };
  }

  return { error: false, feedback: responseJson.message };
}

async function getUnassignedRoom() {
  const response = await fetchWithToken(`${BASE_URL}/inventories`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: responseJson.message, feedback: null };
  }

  return { error: false, data: responseJson.data };
}

export {
  getAccessToken,
  putAccessToken,
  login,
  resetPassword,
  getWorkunits,
  addWorkUnit,
  updateWorkUnit,
  getUsers,
  addUser,
  getTypes,
  addType,
  updateType,
  getItems,
  addItem,
  updateItem,
  procurement,
  procurementHistory,
  getInventories,
  getUnassignedItem,
  addItemToWorkUnit,
  getRooms,
  addRoom,
  getUnassignedRoom,
};
