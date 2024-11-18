import axios, { AxiosResponse } from "axios";
import { AdminLogin } from "../../models/AdminLogin";
import { ApiResponse } from "../../models/ApiResponse";
import { ProvinceResponse } from "../../models/ProvinceResponse";
import { LoginResponse } from "../../models/TokenResponse";
import { UserDetail } from "../../models/UserDetail";
import { UserListDelete } from "../../models/UserListDelete";
import { UsersResponse } from "../../models/UsersReponse";

export function UserService() {

  const adminLogin = async (loginData: AdminLogin): Promise<string> => {
    try {
      const response = await axios.post<LoginResponse>(
        process.env.REACT_APP_ADMIN_LOGIN || "",
        loginData 
      );
      const token = response.data.data;;
      localStorage.setItem("token", token);
      return token;
    } catch (err) {
      throw err;
    }
  };
  
  const getUsers = async (): Promise<UsersResponse[]> =>{
   try {
    const token = localStorage.getItem("token");
    if (!token) {
     throw new Error("Unauthorized");
   }
    const response = await axios.get(
      process.env.REACT_APP_GET_USERS || "",
      {
       headers: {
        token: `${token}`,
      },
      } 
    );
    return response.data.data;
  } catch (err) {
    throw err;
  }
  }

const AddUsers = async (data: any): Promise<any> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Unauthorized');
    }
    const response: AxiosResponse<string> = await axios.post(
      process.env.REACT_APP_CREATE_USERS || '',
      data,
      {
        headers: {
          token: `${token}`,
        },
      }
    );
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      return (err.response.data.message); 
    } else if (err.message) {
      return(err.message); 
    } else {
      return 'An unknown error occurred.'; 
  }
};
}

  const getUserById = async(id: string): Promise<UserDetail | null> =>{
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Unauthorized');
      }
      const response: AxiosResponse<ApiResponse<UserDetail>> = await axios.get(
        process.env.REACT_APP_DETAIL_USER+`${id}` || '',
        {
          headers: {
            token: `${token}`,
          }, 
        }
      );
      return response.data.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  const updateUser = async (data: any) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Unauthorized');
      }
  
      const response: AxiosResponse<string> = await axios.put(
        process.env.REACT_APP_UPDATE_USER || '',
        { user: data },
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

 const deleteUsers = async (data: UserListDelete[]) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Unauthorized');
      }
      const response: AxiosResponse<string> = await axios.delete(
        process.env.REACT_APP_DELETE_USERS || '',
        {
          headers: {
            token: `${token}`,
          },
          data: { users: data }, 
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };


  const provinceVietNam = async (): Promise<ProvinceResponse[]> => {
    try {
      const response: AxiosResponse = await axios.get(
        process.env.REACT_APP_GET_PROVINCES || "/provinces"
      );
      return response.data.results;
        } catch (err) {
      console.error("Error fetching provinces:", err);
      throw err;
    }
  };


  return {
    AddUsers,
    updateUser,
    deleteUsers,
    adminLogin,
    getUsers,
    getUserById,
    provinceVietNam
  };
}
