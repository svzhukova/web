export async function getItem(id) {
    const res = await fetch(`http://127.0.0.1:8000/items/${id}`);
    return res.json();
  }
  