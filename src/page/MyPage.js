import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderStatusCard from "../component/OrderStatusCard";
import "../style/orderStatus.style.css";

const MyPage = () => {
  const dispatch = useDispatch();
  //오더리스트 들고오기
  const { orderList } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(orderActions.getOrder());
  }, []);

  // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
  if (orderList?.length === 0 || !user) {
    return (
      <Container className="no-order-box">
        <div>진행중인 주문이 없습니다.</div>
      </Container>
    );
  }
  return (
    <Container className="status-card-container">
      {orderList.length > 0 &&
        orderList.map((item, index) => (
          <OrderStatusCard key={index} item={item} user={user} />
        ))}
    </Container>
  );
};

export default MyPage;
