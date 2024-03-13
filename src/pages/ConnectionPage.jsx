import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
const ConnectionPage = () => {
  const [status, setStatus] = useState('Đang kết nối...');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}health-check`)
      .then(() => {
        setStatus('Kết nối thành công!');
        setIsConnected(true);
      })
      .catch(() => {
        setStatus('Không thể kết nối đến server.');
        setIsConnected(false);
      });
  }, []);

  if (!isConnected) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <div className="text-center">
            <h1>Không thể kết nối đến server</h1>
            <p>Vui lòng kiểm tra lại kết nối của bạn và thử lại.</p>
          </div>
        </Col>
      </Row>
    </Container>
    );
  }

  return (
    <div>
      {/* {status} */}
    </div>
  );
};

export default ConnectionPage;