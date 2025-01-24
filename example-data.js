let data2 = {
    nodes: [
      { name: "Homepage" },
      { name: "Product Page" },
      { name: "Search Results" },
      { name: "Cart" },
      { name: "Checkout" },
      { name: "Payment" },
      { name: "Confirmation" },
      { name: "Contact Us" },
      { name: "FAQ" },
      { name: "Blog" },
    ],
    links: [
      { source: "Homepage", target: "Search Results", value: 50 },
      { source: "Homepage", target: "Product Page", value: 40 },
      { source: "Homepage", target: "Blog", value: 10 },
      { source: "Search Results", target: "Product Page", value: 30 },
      { source: "Search Results", target: "FAQ", value: 20 },
      { source: "Product Page", target: "Cart", value: 25 },
      { source: "Product Page", target: "Homepage", value: 15 }, // Bounce back
      { source: "Product Page", target: "Contact Us", value: 5 },
      { source: "Cart", target: "Checkout", value: 20 },
      { source: "Cart", target: "Product Page", value: 10 },
      { source: "Checkout", target: "Payment", value: 18 },
      { source: "Payment", target: "Confirmation", value: 15 },
      { source: "Checkout", target: "Cart", value: 2 }, // Abandon
      { source: "Blog", target: "Homepage", value: 5 },
    ],
  };