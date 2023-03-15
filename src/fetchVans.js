export async function getVans() {
  const res = await fetch("/api/vans");
  // if there is an error
  if (!res.ok) {
    throw {
      message: "faild to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
}
