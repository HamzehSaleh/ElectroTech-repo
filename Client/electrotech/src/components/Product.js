import React from "react";
import Card from "@material-ui/core/Card";
import {
  CardActions,
  CardMedia,
  Typography,
  CardContent,
  CardActionArea,
  Button,
  Container,
  makeStyles,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

const Product = (props) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...props.product, quantity: 1 },
    });
  };
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" height="150" image={props.product.image} />
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.product.name}
          </Typography>
          <Typography variant="body2" component="p">
            ${props.product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => handleAddToCart()}>
          Add to Cart
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
