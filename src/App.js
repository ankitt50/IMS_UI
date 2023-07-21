import "./App.css";
import { useEffect, useState } from "react";

function App() {
  let formSubmitHandler = function (event) {
    event.preventDefault();
    let enteredItem = {
      itemName: enteredItemName,
      itemEnteredByUser: "IMS",
      itemEnteredDate: Date.now(),
      itemBuyingPrice: enteredItemBP,
      itemSellingPrice: enteredItemSP,
      itemLastModifiedDate: Date.now(),
      itemLastModifiedByUser: "IMS",
      itemStatus: "AVAILABLE",
    };
    fetch("http://localhost:8080/app/item", {
      method: "POST",
      body: JSON.stringify(enteredItem),
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsChanged(!isChanged);
      })
      .catch();
  };

  let ItemNameChangeHandler = function (event) {
    setItemName(event.target.value);
  };
  let ItemSellingPriceChangeHandler = function (event) {
    setItemSP(event.target.value);
  };
  let ItemBuyingPriceChangeHandler = function (event) {
    setItemBP(event.target.value);
  };
  let [listOfItems, setItemList] = useState([]);
  let [enteredItemBP, setItemBP] = useState(0.0);
  let [enteredItemSP, setItemSP] = useState(0.0);
  let [enteredItemName, setItemName] = useState("");
  let [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/app/item")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItemList(data);
      })
      .catch();
  }, [isChanged]);

  return (
    <div className="App">
      <div className="HeaderDiv">
        <h1>Inventory Management System</h1>
      </div>
      <form className="FormOuterClass" onSubmit={formSubmitHandler}>
        <div className="FormInnerDiv">
          <label>Item Name</label>
          <br />
          <input
            type="text"
            className="InputTextField"
            value={enteredItemName}
            onChange={ItemNameChangeHandler}
            placeholder="Item Name"
          />
        </div>
        <div className="formInnerDiv">
          <label>Item Selling Price</label>
          <br />
          <input
            className="InputTextField"
            type="number"
            min="0.0"
            value={enteredItemSP}
            placeholder="Item Selling Price"
            onChange={ItemSellingPriceChangeHandler}
          />
        </div>
        <div className="formInnerDiv">
          <label>Item Buying Price</label>
          <br />
          <input
            className="InputTextField"
            type="number"
            min="0.0"
            value={enteredItemBP}
            placeholder="Item Buying Price"
            onChange={ItemBuyingPriceChangeHandler}
          />
        </div>
        <div>
          <button type="Submit">Submit</button>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>ItemName</th>
            <th>ItemSellingPrice</th>
            <th>ItemBuyingPrice</th>
            <th>AvailableStatus</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listOfItems.map((el) => {
            return (
              <tr>
                <td>{el.itemName}</td>
                <td>{el.itemSellingPrice}</td>
                <td>{el.itemBuyingPrice}</td>
                <td>{el.itemStatus}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
