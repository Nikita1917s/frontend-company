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
    getUserByEmail: b.query<User | undefined, string>({
      async queryFn(email, _api, _extraOptions, fetchWithBQ) {
        const result = await fetchWithBQ("data/customers.json");
        if (result.error) return { error: result.error };
        const users = result.data as User[];
        const user = users.find((u) => u.email === email);
        return { data: user };
      },
    }),
    getOrdersByNumbers: b.query<Order[], number[]>({
      async queryFn(numbers, _api, _extraOptions, fetchWithBQ) {
        const result = await fetchWithBQ("data/orders.json");
        if (result.error) return { error: result.error };
        const orders = result.data as Order[];
console.log('numbers', 'number', result);

        const filtered = orders.filter((o) => numbers.includes(o.number));
        return { data: filtered };
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetOrdersQuery,
  useGetUserByEmailQuery,
  useGetOrdersByNumbersQuery,
} = userApi;
