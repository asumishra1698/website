import React, { useState } from "react";
import { API_URL } from "../../../services/ProductService";
import Swal from "sweetalert2";
import Sidebar from "../../../reuseable/Sidebar";

const BulkUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      Swal.fire("Error!", "Please select a file to upload.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/bulk-upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        Swal.fire("Success!", "Products uploaded successfully!", "success");
      } else {
        Swal.fire("Error!", "Failed to upload products.", "error");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      Swal.fire("Error!", "Failed to upload products.", "error");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Bulk Upload Products
          </h2>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={handleUpload}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Upload Excel File
              </label>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="mt-2 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> The Excel file should include the
                following columns:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Product Name</li>
                <li>Short Description</li>
                <li>Long Description</li>
                <li>Regular Price</li>
                <li>Sale Price</li>
                <li>Stock Quantity</li>
                <li>Product Category</li>
                <li>Product Subcategory</li>
                <li>Discount</li>
                <li>Is Active (true/false)</li>
                <li>Meta Title</li>
                <li>Meta Description</li>
                <li>
                  <strong>Product Image</strong>: URL or path to the product
                  image
                </li>
                <li>
                  <strong>Gallery Images</strong>: Comma-separated URLs or paths
                  to gallery images
                </li>
              </ul>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Upload
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BulkUpload;
