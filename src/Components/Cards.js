import React, { memo, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Cardsdata from "./CardsData";
import "./Style.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/Slices/UserSlice";

const Cards = () => {
  const [data, setData] = useState(Cardsdata);
  const dispatch = useDispatch();

  const send = (element) => {
    dispatch(addToCart(element));
  };

  return (
    <div className="container mt-3 ">
      <h2 className="text-center">Chose Your Item</h2>
      <div className="row d-f  justify-content-md-between">
        {data.map((element, id) => {
          return (
            <>
              <Card
                key={id}
                style={{ width: "25rem", border: "none" }}
                className="mx-2 mt-4 card_style"
              >
                <Card.Img
                  variant="top"
                  src={element.imgdata}
                  style={{ height: "16rem" }}
                  className="mt-3"
                />
                <Card.Body>
                  <Card.Title>{element.rname}</Card.Title>
                  <Card.Text>Price:₹ {element.price}</Card.Text>
                  <div className="button_div d-flex justify-content-center">
                    <Button
                      variant="primary"
                      onClick={() => send(element)}
                      className="col-lg-12"
                    >
                      Add to cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Cards);
