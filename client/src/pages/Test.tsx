import axios from 'axios';
import { useEffect } from 'react';

function Test() {
  async function request() {
    // await axios.post('http://localhost:3000/users');
    const res = await axios.get('http://localhost:3000');
    console.log(res.data);
  }

  useEffect(() => {
    request();
  }, []);

  return <div>Test</div>;
}

export default Test;
