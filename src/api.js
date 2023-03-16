export async function getVans() {
  const res = await fetch(`/api/vans`);
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
