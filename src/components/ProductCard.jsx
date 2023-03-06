import React from "react";

export default function ProductCard({ product: { id, image, title, category, price } }) {
  return (
    <li className="rounded-lg shadow-m overflow-hidden cursor-pointer">
      <img className="w-full" src={image} alt={title}></img>
      <div className="mt-2 px-2 text-lg ">
        <h3 className="truncate">{title}</h3>
        <p>{`$price`}</p>
        <p className="mb-2 text-gray-500">{category}</p>
      </div>
    </li>
  );
}
