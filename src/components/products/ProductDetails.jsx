import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SEO from "../../reuseable/SEO";
import { fetchProductById } from "../../services/ProductService";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setMainImage(data.productImage);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return (
      <p className="text-center text-gray-600">Loading product details...</p>
    );
  }

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <SEO
          title={product.metaTitle}
          description={product.metaDescription}
        />
      <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Section: Images */}
        <div className="md:w-1/2 p-4">
          <img
            src={`http://localhost:5000/${
              mainImage.replace(/\\/g, "/").split("backend/")[1]
            }`}
            alt={product.productName}
            className="h-100 w-full object-cover mb-4"
          />
          {product.galleryImages && product.galleryImages.length > 0 && (
            <div className="flex space-x-2">
              {product.galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/${
                    image.replace(/\\/g, "/").split("backend/")[1]
                  }`}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-20 w-100 object-cover cursor-pointer border-2 border-transparent hover:border-blue-500"
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Section: Product Details */}
        <div className="md:w-1/2 p-6 flex flex-col">
          <div>
            <h2 className="text-2xl font-bold">{product.productName}</h2>
            <p className="text-gray-500 mt-2">{product.shortDescription}</p>
            <p className="text-xl font-semibold mt-4">
              ₹{product.salePrice}{" "}
              <span className="line-through text-red-500">
                ₹{product.regularPrice}
              </span>
            </p>
            <p
              className={`mt-2 ${
                product.stockQuantity > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>
          <div className="mt-6">
            <button className="w-full bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Buy Now
            </button>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">{product.longDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
