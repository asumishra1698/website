import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../../services/ProductService";
import SEO from "../../reuseable/SEO";
import HeroSlider from "../../reuseable/HeroSlider";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const activeProducts = products.filter((product) => product.isActive);

  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const blogSlides = [
    {
      image: "https://iqsetters.com/assets/bg-image3.jpg",
      title: "All Products",
      description: "Empowering your business with cutting-edge technology.",
    },
    {
      image: "https://iqsetters.com/assets/bg-image3.jpg",
      title: "All Products",
      description: "Empowering your business with cutting-edge technology.",
    },
    {
      image: "https://iqsetters.com/assets/bg-image3.jpg",
      title: "All Products",
      description: "Empowering your business with cutting-edge technology.",
    },
    {
      image: "https://iqsetters.com/assets/bg-image3.jpg",
      title: "All Products",
      description: "Empowering your business with cutting-edge technology.",
    },
  ];

  return (
    <>
      <HeroSlider slides={blogSlides} />
      <SEO
        title="All Products | Website Desinging | Gonardweb"
        description="Explore our range of products designed to enhance your business operations and drive success."
        keywords="products, technology, business solutions, Gonardweb"
        canonical="https://gonardweb.com/products"
      />
      <div className="p-6 lg:p-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Products</h2>
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {activeProducts.map((product) => (
            <Link
              to={`/product/${product._id}`}
              className="mt-2 inline-block rounded-lg"
            >
              <div
                key={product._id}
                className="border rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={
                    product.productImage
                      ? `http://localhost:5000/${
                          product.productImage
                            .replace(/\\/g, "/")
                            .split("backend/")[1]
                        }`
                      : "https://via.placeholder.com/150"
                  }
                  alt={product.productName}
                  className="h-100 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold">{product.productName}</h3>
                  <p className="text-gray-600">
                    ₹{product.salePrice}{" "}
                    <span className="line-through text-red-500">
                      ₹{product.regularPrice}
                    </span>
                  </p>
                  <Link
                    to={`/product/${product._id}`}
                    className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>{" "}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductGrid;
