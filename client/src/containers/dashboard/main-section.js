import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RecentOrders = (props) => (
  <div className="recentOrders">
      <div className="cardHeader">
          <h2>Recent Orders</h2>
          <Link to="/" className="btn">View All</Link>
      </div>
      <table>
          <thead>
              <tr>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Payment</td>
                  <td>Status</td>
              </tr>
          </thead>
          <tbody>
            {props.orders.map((order, index) => (
              <tr key={order.name + index}>
                  <td>{order.name}</td>
                  <td>{order.price}</td>
                  <td>{order.payment}</td>
                  <td><span className={`status ${order.statusStyle}`}>{order.status}</span></td>
              </tr>
            ))}
          </tbody>
      </table>
  </div>
);

const RecentCustomers = (props) => (
  <div className="recentCustomers">
    <div className="cardHeader">
        <h2>Recent Customers</h2>
    </div>
    <table>
      {props.customers.map((customer, index) => (
        <tr key={customer.email + index} onClick={()=> props.onClickRow(customer.id)}>
            <td width="60px">
                <div className="imgBx"><ion-icon name="person-outline"></ion-icon></div>
            </td>
            <td>
                <h4>{customer.name} <br/> <span>{customer.email}</span></h4>
            </td>
        </tr>
      ))}
    </table>
  </div>
);

const MainSection = (props) => {
  const navigate = useNavigate();

  const onClickRow = (id)=>{
    navigate(`/employees/${id}`);
  }

  return (
    <div className='main-section'>
     <div className="details">
        <RecentOrders orders={props.recentOrders}/>
        <RecentCustomers customers={props.recentCustomers} onClickRow={onClickRow}/>
      </div>
    </div>
  )
}

export default MainSection
