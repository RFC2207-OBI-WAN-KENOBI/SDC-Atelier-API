import React from 'react';

const OverviewSelectors = ({ pickSize, sizes, currentSize, quantities }) => {
  if (quantities.length > 0) {
    console.log('sizes: ', sizes);
    return (
      <div className="overview-selectors"> Size:
        <select className="overview-dropdown" onChange={(e) => { pickSize(e) }}>
          <option value={`${currentSize}`}> {currentSize} </option>
          {sizes.map((size) => (
            <option value={size}>{size}</option>
          ))}
        </select>
        Quantity:
        <select className="overview-dropdown">
          <option value="1" default> 1 </option>
          {quantities.slice(1).map((quantity) => (
            <option value={quantity}>{quantity}</option>
          ))}
        </select>
        <div>
          <button className="cartButton">Add to Cart</button>
        </div>
      </div>
    )
  }
  else {
    console.log('sizes: ', sizes);
    return (
      <div className="overview-selectors">
      <div className="size-warning">Please select a size!</div>
        Size:
        <select className="overview-dropdown" onChange={(e) => { pickSize(e) }}>
          <option value="" disabled selected hidden> Select Size </option>
          {sizes.map((size) => (
            <option value={size}>{size}</option>
          ))}
        </select>
        Quantity:
        <select className="overview-dropdown">
          <option value="">OUT OF STOCK</option>
        </select>
        <div>
          <button className="cartButton">Add to Cart</button>
        </div>
      </div>)
  }
}
export default OverviewSelectors;