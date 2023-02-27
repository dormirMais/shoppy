import React, { useState } from "react";
import Button from "../components/ui/Button";
import { uploadImage } from "../api.js/uploader";
import { addNewProduct } from "../api.js/firbase";

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(e.target);
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file) //
      .then((url) => {
        console.log(url);
        addNewProduct(product, url).then(() => {
          setSuccess("성공적으로 제품 추가완료");
          setTimeout(() => {
            setSuccess(null);
          }, 4000);
        });
      })
      .finally(setIsUploading(false));
  };
  return (
    <section className="w-full text-center">
      <h2 className="text-2xl font-bold my-4">새로운 제품 등록</h2>
      {success && <p className="my-2">✅{success}</p>}
      {file && <img className="w-96 mx-auto" src={URL.createObjectURL(file)} alt="local file"></img>}
      <form className="flex flex-col px-12" onSubmit={handleSubmit}>
        <input type="file" accept="image/*" name="file" required onChange={handleChange} />
        <input type="text" name="title" value={product.title ?? ""} placeholder="제품명" onChange={handleChange} />
        <input type="number" name="price" value={product.price ?? ""} placeholder="가격" required onChange={handleChange} />
        <input
          type="text"
          name="category"
          value={product.category ?? ""}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ""}
          placeholder="제품설명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ""}
          placeholder="옵션들 ,로 구분"
          required
          onChange={handleChange}
        />
        <Button text={isUploading ? `업로드 중...` : `제품 등록하기`} disabled={isUploading} />
      </form>
    </section>
  );
}
