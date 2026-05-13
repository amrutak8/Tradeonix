import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios.get("https://tradeonix.onrender.com/newOrder",{
      withCredentials: true
    })
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {allOrders.map((order) => {
              const total = Number(order.qty) * Number(order.price);
              const modeClass = order.mode === "BUY" ? "profit" : "loss";

              return (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{Number(order.price).toFixed(2)}</td>
                  <td className={modeClass}>{order.mode}</td>
                  <td>{total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {allOrders.length === 0 && (
        <p style={{ marginTop: "20px" }}>
          You haven't placed any orders today
        </p>
      )}
    </>
  );
};

export default Orders;