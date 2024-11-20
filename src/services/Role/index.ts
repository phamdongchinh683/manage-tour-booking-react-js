import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../../models/ApiResponse";
import { RoleDelete } from "../../models/RoleDelete";
import { RoleListResponse } from "../../models/RoleListResponse";
// import { UserCreation } from "../../models/UserCreation";

export function RoleService() {

  const getRoles = async (): Promise<ApiResponse<RoleListResponse[]>> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized. Please log in.");
      }
      const response: AxiosResponse<ApiResponse<RoleListResponse[]>> = await axios.get(
        process.env.REACT_APP_GET_ROLES || "",
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  const addRole = async (data: any): Promise<string> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized. Please log in.");
      }
      const response: AxiosResponse<string> = await axios.post(
        process.env.REACT_APP_CREATE_ROLE || "",
        data,
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };


  const deleteRoleById = async (id: string): Promise<string | undefined> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized. Please log in.");
      }
      const response: AxiosResponse<string> = await axios.delete(
        process.env.REACT_APP_DELETE_ROLE + `${id}` || "",
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      throw err;

    }
  }


  const deleteRoles = async (id: RoleDelete[]) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized. Please log in.");
      }
      const response: AxiosResponse<string> = await axios.delete(
        process.env.REACT_APP_DELETE_ROLES || "",
        {
          headers: {
            token: `${token}`,
          },
          data: { ids: id },
        },

      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  return {
    deleteRoleById,
    getRoles,
    addRole,
    deleteRoles
  };

}