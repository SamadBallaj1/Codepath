import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-3 text-gray-600">Page not found</p>
      <Link to="/creators" className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Back to Creators</Link>
    </div>
  );
}
