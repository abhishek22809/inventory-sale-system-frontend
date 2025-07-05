import React from 'react';


const Dashboard = ({products}) => {

  
  return (
    <div>
      <h2>Dashboard</h2>
      { products && products?.map(p => (
        <div key={p.id}>
          <strong>{p.name}</strong> - Price: ${p.price} - Stock: {p.stock}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;