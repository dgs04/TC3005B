import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const getUsers = async () => {
    try {
      setLoading(true);

      const token = getToken();

      const res = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        alert(data.msg || "No se pudieron cargar los usuarios");
      }
    } catch (error) {
      console.log(error);
      alert("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (form) => {
    const token = getToken();

    await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    getUsers();
  };

  const deleteUser = async (id) => {
    const token = getToken();

    await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    getUsers();
  };

  const getUserById = async (id) => {
    const token = getToken();

    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    return data;
  };

  useEffect(() => {
    getUsers();
  }, []);

  return {
    users,
    loading,
    getUsers,
    addUser,
    deleteUser,
    getUserById
  };
}