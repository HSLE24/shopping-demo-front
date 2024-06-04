import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import { cartActions } from "../action/cartAction";

const ProductAll = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.product.error);
  const { productList } = useSelector((state) => state.product);
  // 처음 로딩하면 상품리스트 불러오기

  const [query, setQuery] = useSearchParams();
  const name = query.get("name");

  useEffect(() => {
    dispatch(productActions.getProductList({ name }));
    dispatch(cartActions.getCartQty());
  }, [query]);

  return (
    <Container>
      <Row>
        {productList.length > 0 &&
          productList.map((item, index) => {
            return (
              <Col md={3} sm={12} key={index}>
                <ProductCard product={item} />
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default ProductAll;
