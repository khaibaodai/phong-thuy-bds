import { useState } from 'react';
import { Card, Form, Input, Select, Button } from 'antd';
import BaguaDiagram from './components/BaguaDiagram';
import FengShuiResult from './components/FengShuiResult';
import fengShuiData from './data/fengshui.json';

const App = () => {
  const [result, setResult] = useState(null);

  const calculateFengShui = (values) => {
    const { gender, birthYear } = values;
    const lastTwo = birthYear % 100;
    let sum = Math.floor(lastTwo / 10) + (lastTwo % 10);
    sum = sum >= 10 ? Math.floor(sum / 10) + (sum % 10) : sum;
    
    let number = gender === 'male' ? (10 - sum) : (5 + sum);
    if (number > 9) number = Math.floor(number / 10) + (number % 10);
    
    const group = [2,5,6,7,8].includes(number) ? 'Tây Tứ Mệnh' : 'Đông Tứ Mệnh';
    
    setResult({
      group,
      number,
      ...fengShuiData.elements[group]
    });
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', color: '#2F4F4F' }}>PHONG THỦY NHÀ Ở</h1>
      
      <Card style={{ maxWidth: 600, margin: '20px auto' }}>
        <Form onFinish={calculateFengShui}>
          <Form.Item name="name" label="Họ và tên">
            <Input />
          </Form.Item>
          
          <Form.Item name="birthYear" label="Năm sinh" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          
          <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="male">Nam</Select.Option>
              <Select.Option value="female">Nữ</Select.Option>
            </Select>
          </Form.Item>
          
          <Button type="primary" htmlType="submit" block>
            Xem Phong Thủy
          </Button>
        </Form>
      </Card>

      {result && (
        <div style={{ marginTop: 40 }}>
          <BaguaDiagram directions={result.directions} />
          <FengShuiResult data={result} />
        </div>
      )}
    </div>
  );
};

export default App;
