export async function getVans(id) {
  const url = id ? `/api/vans/${id}` : "/api/vans/";
  const res = await fetch(url);
  const data = await res.json();
  // if there is an error
  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }
  return data.vans;
}

export async function loginUser(user) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(user),
  });
  const data = await res.json();
  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }
  return data;
}

export async function getHostVans() {
  const res = await fetch("/api/host/vans");
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
}
