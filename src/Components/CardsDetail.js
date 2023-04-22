import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams } from "react-router-dom";
import "./Style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteToCart,
  addToCart,
  decreaseCartItem,
} from "../Store/Slices/UserSlice";

const CardsDetail = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const getData = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useNavigate();
  const compare = () => {
    let compareData = getData.filter((e) => {
      return e.id == id;
    });
    setData(compareData);
  };

  useEffect(() => {
    compare();
  }, [id, getData]);
  const decrease = (e) => {
    dispatch(decreaseCartItem(e));
  };
  const send = (e) => {
    dispatch(addToCart(e));
  };

  const dlt = (id) => {
    dispatch(deleteToCart(id));
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center">Item Details Page</h2>
        <section className="container mt-5">
          <div className="itemsdetails">
            {data.map((e, id) => {
              return (
                <>
                  <div className="items_img">
                    <img src={e.imgdata} alt="" />
                  </div>
                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p>
                            <strong>Restaurant: {e.rname}</strong>
                          </p>
                          <p>
                            <strong>Price:</strong>:₹ {e.price}
                          </p>
                          <p>
                            <strong>Dishes</strong>: {e.address}
                          </p>
                          <p>
                            <strong>Total</strong>:₹ {e.price * e.qnty}
                          </p>
                          <div
                            className="mt-5 d-flex justify-content-between align-items-center"
                            style={{
                              width: 100,
                              cursor: "pointer",
                              background: "#ddd",
                              color: "#111",
                            }}
                          >
                            <span
                              onClick={() => {
                                decrease(e, id);
                                if (e.qnty === 1) {
                                  dlt(id);
                                  history("/");
                                }
                              }}
                              style={{ fontSize: 30 }}
                            >
                              -
                            </span>

                            <span style={{ fontSize: 25 }}>{e.qnty}</span>

                            <span
                              onClick={() => send(e)}
                              style={{ fontSize: 24 }}
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating : </strong>
                            <span style={{ background: "#11ff88" }}>
                              {" "}
                              {e.rating} ☆
                            </span>
                          </p>
                          <p>
                            <strong>Order Reveiw : </strong>
                            <span>{e.somedata}</span>
                          </p>

                          <p
                            onClick={() => {
                              dlt(id);
                              history("/");
                            }}
                          >
                            <strong>Remove : </strong>

                            <span>
                              <i
                                className="fas fa-trash"
                                style={{
                                  color: "#ff0000",
                                  fontSize: "20",
                                  cursor: "pointer",
                                }}
                              ></i>
                            </span>
                          </p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardsDetail;
