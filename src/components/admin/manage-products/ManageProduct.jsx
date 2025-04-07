import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../../../reuseable/Sidebar";
import {
  fetchAllProducts,
  deleteProduct,
  API_URL,
} from "../../../services/ProductService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Load products on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
      Swal.fire("Error!", "Failed to load products.", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteProduct(id);
      Swal.fire("Deleted!", "Product has been deleted.", "success");
      loadProducts(); // Refresh the list
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire("Error!", "Failed to delete product.", "error");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await fetch(`${API_URL}/toggle-status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      Swal.fire(
        "Success!",
        `Product has been ${currentStatus ? "deactivated" : "activated"}.`,
        "success"
      );
      loadProducts(); // Refresh product list
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire("Error!", "Failed to update status.", "error");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Product List</h2>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/admin/add-product")}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              + Add New Product
            </button>
            <button
              onClick={() => navigate("/admin/products/bulk-upload")}
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Bulk Upload
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-4 text-left text-sm font-medium text-gray-600">
                  Image
                </th>
                <th className="border p-4 text-left text-sm font-medium text-gray-600">
                  Name
                </th>
                <th className="border p-4 text-left text-sm font-medium text-gray-600">
                  Price
                </th>
                <th className="border p-4 text-left text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="border p-4 text-left text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="border hover:bg-gray-50 transition"
                  >
                    <td className="border p-4">
                      <img
                        src={`http://localhost:5000/${
                          product.productImage
                            .replace(/\\/g, "/")
                            .split("backend/")[1]
                        }`}
                        alt="Product"
                        className="h-16 w-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="border p-4 text-gray-800">
                      {product.productName}
                    </td>
                    <td className="border p-4 text-gray-800">
                      Rs.{product.salePrice || product.regularPrice}
                    </td>
                    <td className="border p-4">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={product.isActive}
                          onChange={() =>
                            toggleStatus(product._id, product.isActive)
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:bg-blue-600 transition-all"></div>
                        <span className="ml-2 text-sm font-medium text-gray-900">
                          {product.isActive ? "Active" : "Inactive"}
                        </span>
                      </label>
                    </td>
                    <td className="border p-4 flex gap-2">
                      <Link
                        to={`/edit-product/${product._id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 p-6 font-medium"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ProductList;
