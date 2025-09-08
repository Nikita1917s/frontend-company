import { useNavigate } from "react-router-dom";
import type { User } from "@/types/User";
import styles from "./userDetails.module.scss";
import { NoPhotoIcon } from "@/assets/img";
import type { Order } from "@/types/Order";

export interface UsersProps {
  user: User;
  orders: Order[];
}

export const UserDetails = ({ user, orders }: UsersProps) => {
  const navigate = useNavigate();
  return (
    <div className={styles["mainWrapper"]}>
      <div className={styles["userWrapper"]}>
        <NoPhotoIcon className={styles["profilePhoto"]} />
        <div className={styles["userCard"]}>
          <h1
            className={styles["title"]}
          >{`${user.firstName} ${user.lastName}`}</h1>
          <p className={styles["userField"]}>Email: {user.email}</p>
          <p className={styles["userField"]}>Gender: {user.gender}</p>
          <p className={styles["userField"]}>City: {user.city}</p>
          <p className={styles["userField"]}>State: {user.state}</p>
          <p className={styles["userField"]}>PostCode: {user.postCode}</p>
          <p className={styles["userField"]}>Street: {user.street}</p>
          <p className={styles["userField"]}>
            StreetNumber: {user.streetNumber}
          </p>
          <p className={styles["userOrdersAmount"]}>
            Number of orders: {orders.length}
          </p>
        </div>
        <div className={styles["buttonWrapper"]}>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>

      <div className={styles["ordersWrapper"]}>
        {orders.map((order) => (
          <div key={order.number} className={styles["orderItem"]}>
            <div className={styles["orderField"]}>
              <p>Number</p>
              <p>{order.number}</p>
            </div>
            <div className={styles["orderField"]}>
              <p>ItemName</p>
              <p>{order.itemName}</p>
            </div>
            <div className={styles["orderField"]}>
              <p>Price</p>
              <p>{order.price}</p>
            </div>
            <div className={styles["orderField"]}>
              <p>Currency</p>
              <p>{order.currency}</p>
            </div>
            <div className={styles["orderField"]}>
              <p>Amount</p>
              <p>{order.amount}</p>
            </div>
            <div className={styles["orderField"]}>
              <p>Created At</p>
              <p>{order.createdAt}</p>
            </div>
            <div className={styles["orderField"]}>
              <p>Shipped At</p>
              <p>{order.shippedAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
