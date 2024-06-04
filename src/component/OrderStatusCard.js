import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";

const OrderStatusCard = ({ item }) => {
  return (
    <div>
      <Row className="status-card">
        <Col xs={2}>
          <img src={item.items[0].productId.image} alt="" height={96} />
        </Col>
        <Col xs={8} className="order-info">
          <div>
            <strong>주문번호: {item.orderNum}</strong>
          </div>

          <div className="text-12">{item.createdAt.slice(0, 10)}</div>

          <div>
            {item.items[0].productId.name} 외 ${item.items.length - 1}개
          </div>
          <div>₩ {currencyFormat(item.totalPrice)}</div>
        </Col>
        <Col md={2} className="vertical-middle">
          <Badge bg={badgeBg[item.status]}>{item.status}</Badge>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;
