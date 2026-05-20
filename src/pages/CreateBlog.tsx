// import React from "react";


// const CreateBlog = () => {
//   const [title, setTitle] = React.useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newBlog = {
//       id: Date.now(),
//       title,
//       date: new Date().toLocaleDateString(),
//       author: "Admin"
//     };

//     console.log(newBlog);
//   };

//   return (
//     <form className="max-w-3xl mx-auto space-y-6">
//       <input
//         placeholder="Blog title"
//         className="w-full p-4 bg-white border border-[#162660]/20 text-[#162660] rounded-xl"
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <button className="px-6 py-3 bg-[#162660] rounded-xl text-white">
//         Publish Blog
//       </button>
//     </form>
//   );
// };

// export default CreateBlog;


import React, { useState } from "react";
import { motion } from 'motion/react';

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      id: Date.now(),
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      category,
      date: new Date().toLocaleDateString(),
      author: "Admin",
      image,
    };

    console.log("New Blog Post:", newBlog);
    alert("Blog Published! Check console for data.");
    
    // Reset form
    setTitle("");
    setContent("");
    setTags("");
    setCategory("");
    setImage(null);
  };

  return (
 <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32"
    >
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="max-w-3xl">
          <span className="text-[#162660] font-bold uppercase tracking-widest text-sm">Create New Blog</span>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold mt-4 mb-8">
           Create a <span className="text-gradient">New Blog </span>Post.
          </h1>
       
        </div>
      </div>
  <div className="max-w-4xl mx-auto p-6 space-y-6">
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 bg-white border border-[#162660]/20 text-[#162660] rounded-xl"
          required
        />

        {/* Content */}
        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 bg-white border border-[#162660]/20 text-[#162660] rounded-xl h-64"
          required
        />

        {/* Tags */}
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-4 bg-white border border-[#162660]/20 text-[#162660] rounded-xl"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-4 bg-white border border-[#162660]/20 text-[#162660] rounded-xl"
        >
          <option value="">Select Category</option>
          <option value="Tech">Tech</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
        </select>

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-[#162660]"
        />

        {/* Preview Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="preview"
            checked={preview}
            onChange={(e) => setPreview(e.target.checked)}
          />
          <label htmlFor="preview" className="text-[#162660]">Preview Blog</label>
        </div>

        {/* Preview */}
        {preview && (
          <div className="p-4 bg-[#F1E4D1] text-[#162660] rounded-xl space-y-2">
            <h2 className="text-2xl font-bold">{title || "Title Preview"}</h2>
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Blog Preview"
                className="max-h-64 w-full object-cover rounded-xl"
              />
            )}
            <p>{content || "Content Preview..."}</p>
            {tags && <p className="text-sm text-gray-400">Tags: {tags}</p>}
            {category && <p className="text-sm text-gray-400">Category: {category}</p>}
          </div>
        )}

        {/* Publish Button */}
        <button
          type="submit"
          className="px-6 py-3 bg-[#162660] rounded-xl text-white cursor-pointer"
        >
          Publish Blog
        </button>
      </form>
    </div>
    </motion.div>

  
  );
};

export default CreateBlog;