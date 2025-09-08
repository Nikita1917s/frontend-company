import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "@/types/User";
import type { Order } from "@/types/Order";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.BASE_URL,
  }),
  endpoints: (b) => ({
    getUsers: b.query<User[], void>({
      query: () => "data/customers.json",
    }),
    getOrders: b.query<Order[], void>({
      query: () => "data/orders.json",
    }),
  }),
});

export const { useGetUsersQuery, useGetOrdersQuery } = userApi;
