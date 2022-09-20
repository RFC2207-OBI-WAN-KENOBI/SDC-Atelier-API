import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    {duration: '10s', target: 50},
    {duration: '10s', target: 100},
    {duration: '10s', target: 250},
    {duration: '10s', target: 500},
    {duration: '10s', target: 750},
    {duration: '10s', target: 1000},
  ]
}

export default function () {
  // const params = {
  // product_id: Math.floor(Math.random() * 1000011) + 1,
  // }
  // const res = http.get(`http://localhost:8080/meta`, params);
  // check(res, {
  //   'is status 200': (r) => r.status === 200
  // })
  const params2 = {
    product_id: Math.floor(Math.random() * 1000011) + 1,
    page: 1,
    count: 5,
    sort: 'helpfulness'
  }
  const res2 = http.get(`http://localhost:8080/reviews`, params2);
  check(res2, {
    'is status 200': (r) => r.status === 200
  })
  // const res3 = http.get(`http://localhost:3000/products/1/styles?product_id=1`);
  // check(res3, {
  //   'is status 200': (r) => r.status === 200
  // })
  // const res4 = http.get(`http://localhost:3000/products/1/related?product_id=1`);
  // check(res4, {
  //   'is status 200': (r) => r.status === 200
  // })
}