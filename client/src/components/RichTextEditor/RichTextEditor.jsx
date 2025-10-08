import React from "react";
import Editor from "react-simple-wysiwyg";

export default function RichTextEditor({ input, setInput }) {
  const handleChange = (e) => {

    setInput({ ...input, courseDescription: e.target.value });
   
  };

  return (
   
      
      <div className="mt-4 transition-all duration-200 border border-gray-300 ove4rflow-hidden rounded-xl dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-400">
        <Editor
          // defaultValue={input.courseDescription}
          value={input.courseDescription}
          onChange={handleChange}
          containerProps={{
            className:
              "prose max-w-none dark:prose-invert min-h-[200px] bg-white dark:bg-gray-800",
          }}
        />
      </div>
 
  );
}
