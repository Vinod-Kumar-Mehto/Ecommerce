import React, { useCallback, useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import { deleteToCart, deleteAllCart } from "../Store/Slices/UserSlice";
import Table from "react-bootstrap/Table";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
function Header() {
  const getData = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id) => {
    dispatch(deleteToCart(id));
  };

  const delAll = () => {
    dispatch(deleteAllCart());
  };

  const total = useCallback(() => {
    let price = 0;
    getData.map((ele) => {
      return (price += ele.price * ele.qnty);
    });
    setPrice(price);
  }, [getData]);

  useEffect(() => {
    total();
  }, [total]);
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      style={{ height: 55 }}
    >
      <Container>
        <NavLink to="/" className="text-decoration-none text-light mx-3">
          Add To Cart{" "}
        </NavLink>
        <Nav className="me-auto">
          <NavLink to="/" className="text-decoration-none text-light">
            {" "}
            Home
          </NavLink>
        </Nav>
        <Badge
          badgeContent={getData.length}
          color="primary"
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <i
            className="fa-solid fa-cart-shopping text-light"
            style={{ fontSize: 25, cursor: "pointer", color: "red" }}
          ></i>
        </Badge>
      </Container>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {getData.length ? (
          <div
            className="cards_details"
            style={{ width: "24rem", padding: 10 }}
          >
            <Table>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Restaurant Name</th>
                </tr>
              </thead>
              <tbody>
                {getData.map((e, id) => {
                  return (
                    <>
                      <tr key={id}>
                        <td>
                          <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                            <img
                              src={e.imgdata}
                              style={{ width: "5rem", height: "5rem" }}
                              alt="food"
                            ></img>
                          </NavLink>
                        </td>
                        <td>
                          <p>{e.rname}</p>
                          <p>Price : ₹{e.price}</p>
                          <p>Quantity : {e.qnty}</p>
                          <p
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              dlt(id);
                              history("/");
                            }}
                          >
                            <i className="fas fa-trash smalltrash"></i>
                          </p>
                        </td>
                        <td
                          className="mt-5"
                          style={{
                            color: "red",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            dlt(id);
                            history("/");
                          }}
                        >
                          <i className="fas fa-trash largetrash"></i>
                        </td>
                      </tr>
                    </>
                  );
                })}
                <p className="text-center">Total :₹ {price} </p>

                <Button
                  onClick={() => {
                    delAll();
                    history("/");
                  }}
                  className="d-grid gap-2"
                  variant="danger"
                  size="lg"
                >
                  Empty Cart
                </Button>
              </tbody>
            </Table>
          </div>
        ) : (
          <div
            className="cards_details d-flex justify-content-center align-items-center"
            style={{ width: "24rem", padding: 10, position: "relative" }}
          >
            <i
              className="fas fa-close smallclose"
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 2,
                right: 20,
                fontSize: 23,
                cursor: "pointer",
              }}
            ></i>
            <p style={{ fontSize: 22 }}>Your cart is empty</p>
            <img
              src="./Images/cart.gif"
              alt=""
              className="emptycart_img"
              style={{ width: "5rem", padding: 10 }}
            />
          </div>
        )}
      </Menu>
    </Navbar>
  );
}

export default Header;
