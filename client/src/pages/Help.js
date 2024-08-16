import React, { useState } from "react";

function Help() {
  const [expandedRows, setExpandedRows] = useState([]);

  const topics = [
    {
      title: "How do I find containers in the chem shed?",
      content:
        "Inventory -> All Products -> Select a Product -> All Concentrations (optional) -> Select a Concentration (optional). You may select a second product and concentration if the prescription contains more than one pesticide. Cross reference the Shelving Layout image at the bottom of the page with the container's shelf and row to find its location.",
    },
    {
      title: "How do I add a container to the chem shed?",
      content:
        "Inventory -> Add a Container. By default, the expiration date is set 2 years from today, and the date will turn red if the product expires within 3 months.",
    },
    {
      title: "How do I remove containers from the chem shed for use?",
      content:
        "Inventory -> Click anywhere on a container's row in the table -> Remove. When removing a container, push the rest of the containers in that row to the back, so that others can see which rows have space for more containers.",
    },
    {
      title: "How do I edit a container?",
      content:
        "Inventory -> Click anywhere on the container's row in the table -> Edit",
    },
    {
      title:
        "How do I add new pesticide products that we've never used before?",
      content:
        "Products -> Add a Product. Only EPA registered pesticides will have an EPA Reg #. Leave EPA Reg # blank for products like adjuvants, surfactants and dyes.",
    },
    {
      title: "How do I edit a pesticide product name or EPA Reg #?",
      content:
        "Products -> Click on a Product Name -> Edit. This will change the pesticide name and/or EPA Reg # for every container in inventory containing that product.",
    },
    {
      title:
        "We'll no longer be using a specific product in the future. How do I remove it from the application?",
      content:
        "Products -> Click on the Product Name -> Remove -> Yes. WARNING: This will remove that product from the products list, and from any containers in inventory containing it, so only do this if you are sure we have used up all of the inventory containing that product, and are sure we'll no longer be using it in the future!",
    },
  ];

  const toggleRow = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  return (
    <div className="help-wrapper">
      <div>
        {topics.map((topic, index) => (
          <div key={index}>
            <div className="help-topic" onClick={() => toggleRow(index)}>
              <strong>{topic.title}</strong>
            </div>
            {expandedRows.includes(index) && (
              <div className="help-content">
                <p>{topic.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="shelving-img-wrapper">
        <img
          className="shelving-img"
          src="assets/shelving.png"
          alt="Shelving Layout"
        />
      </div>
    </div>
  );
}

export default Help;
