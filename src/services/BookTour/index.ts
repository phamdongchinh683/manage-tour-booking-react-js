import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../../models/ApiResponse";
import { BookingDelete } from "../../models/BookingDelete";
import { BookingDetail } from "../../models/BookingDetail";
import { IBookingList } from "../../models/BookingList";
import { BookingPaginate } from "../../models/BookingPaginate";
import { UpdateBookTour } from "../../models/UpdateBookTour";
export function BookTourService() {
 const token = localStorage.getItem("token");

 const getBookTours = async (
  cursor: string | null,
  direction: string
 ): Promise<ApiResponse<BookingPaginate> | any> => {
  try {
   if (!token) {
    throw new Error("Unauthorized");
   }
   const response: AxiosResponse<ApiResponse<BookingPaginate>> =
    await axios.get(process.env.REACT_APP_BOOKING_LIST || "", {
     params: { cursor, direction },
     headers: {
      token: `${token}`,
     },
    });
   return response.data.data;
  } catch (err) {
   throw err;
  }
 };

 const addBookTours = async (data: any): Promise<string> => {
  try {
   if (!token) {
    throw new Error("Unauthorized");
   }
   const response: AxiosResponse<string> = await axios.post(
    process.env.REACT_APP_CREATE_BOOKING || "",
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
    return err.response.data.message;
   } else if (err.message) {
    return err.message;
   } else {
    return "An unknown error occurred.";
   }
  }
 };

 const getBookTourById = async (id: string): Promise<ApiResponse<BookingDetail>> => {
  try {
   if (!token) {
    throw new Error("Unauthorized");
   }
   const response = await axios.get(
    process.env.REACT_APP_BOOKING_DETAIL + `${id}` || ``,
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
 };

 const updateBookTour = async (id: string, data: UpdateBookTour) => {
  try {
   if (!token) {
    throw new Error("Unauthorized");
   }

   const response: AxiosResponse<any> = await axios.put(
    process.env.REACT_APP_UPDATE_BOOKING + `/${id}` || "",
    { bookTour: data },
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
 const deleteBookTours = async (id: BookingDelete[]) => {
  try {

   if (!token) {
    throw new Error("Unauthorized. Please log in.");
   }
   const response: AxiosResponse<string> = await axios.delete(
    process.env.REACT_APP_DELETE_BOOKING || "",
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

 const bookTourList = async (): Promise<ApiResponse<any>> => {
  try {

   if (!token) {
    throw new Error("Unauthorized. Please log in.");
   }
   const response: any = await axios.get(
    process.env.REACT_APP_GET_BOOKING || "",
    {
     headers: {
      token: `${token}`,
     },
    },

   );
   return response.data;
  } catch (err) {
   throw err;
  }
 }
 return {
  getBookTours,
  getBookTourById,
  addBookTours,
  deleteBookTours,
  updateBookTour,
  bookTourList,
 };
}