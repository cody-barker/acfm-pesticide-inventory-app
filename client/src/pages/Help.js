import React, { useState } from "react";

function Help() {
  const [expandedRows, setExpandedRows] = useState([]);

  const topics = [
    {
      title: "How is the chem shed organized?",
      content: (
        <div className="shelving-img-wrapper">
          <img
            className="shelving-img"
            src="assets/shelving.png"
            alt="Shelving Layout"
          />
        </div>
      ),
    },
    {
      title: "How do I find containers in the chem shed?",
      content:
        "Shelves -> Filter the results using the Products and Concentrations dropdowns at the top of the page. You may select two products and concentrations if the prescription contains more than one pesticide. Use the container's shelf and row identifiers to find it in the chem shed.",
    },
    {
      title: "How do I add a premix to the chem shed?",
      content:
        "Shelves -> Add a Container. Be sure to include the team that created it. By default, the expiration date is set 2 years from today, and the date will turn red if the product expires within 3 months.",
    },
    {
      title: "How do I add concentrates to the chem shed?",
      content:
        "Shelves -> Add a Container. Set the team name to Facilities. By default, the expiration date is set 2 years from today, and the date will turn red if the product expires within 3 months.",
    },
    {
      title: "How do I remove containers from the chem shed for use?",
      content:
        "Shelves -> Click anywhere on a container's row in the table -> Remove. When removing a container, push the rest of the containers in that row to the back, so that others can see which rows have space for more containers.",
    },
    {
      title: "How do I edit a container?",
      content:
        "Shelves -> Click anywhere on the container's row in the table -> Edit",
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
        "Products -> Click on the Product Name -> Remove -> Yes. WARNING: This will remove the product from the products list and from any containers in inventory containing it. Only do this if you are certain all inventory containing the product has been used and you will not be using it in the future.",
    },
    {
      title:
        "How do I see the total number of containers for every premix and/or concentrate?",
      content:
        "Totals. Scroll as needed. If you have trouble finding a specific premix, go to the Shelves page and use the Product and Concentration filters to find it.",
    },
    {
      title:
        "How do I view how many containers each team has created since a specific date?",
      content: "Teams -> Select a Date",
    },
    {
      title: "How do I view all the premixes a team has in inventory?",
      content:
        "Teams -> Click on a team name. This will take you to the team detail page with a table of all of their premixes in the chem shed.",
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
        <h2 className="h2 h2--help">Help</h2>
        {topics.map((topic, index) => (
          <div key={index}>
            <div className="help-topic" onClick={() => toggleRow(index)}>
              <strong>{topic.title}</strong>
            </div>
            {expandedRows.includes(index) && (
              <div className="help-content">{topic.content}</div>
            )}
          </div>
        ))}
      </div>
      <div className="video-wrapper">
        <h2 className="h2 h2--video">Video Tutorial</h2>
        <iframe
          className="demo-video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Yj-KRJet66A?si=j6hYEBCETdSe3szX"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
    </div>
  );
}

export default Help;
