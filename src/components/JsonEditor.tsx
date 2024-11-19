// src/components/JsonEditor.tsx
import React, { useState } from 'react';
import { FormSchema } from '../types/schema';

interface JsonEditorProps {
  onSchemaChange: (schema: FormSchema) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onSchemaChange }) => {
  const [json, setJson] = useState<string>(JSON.stringify({ formTitle: '', formDescription: '', fields: [] }, null, 2));

  const handleChange = (event: React .ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setJson(value);
    try {
      const parsedJson = JSON.parse(value);
      onSchemaChange(parsedJson);
    } catch (error) {
      console.error("Invalid JSON", error);
    }
  };

  return (
    <div>
        <h1>Enter you Schema</h1>
      <div className='p-4 m-2'>
        <textarea
         className="w-full h-full p-4 border border-gray-300"
         value={json}
         onChange={handleChange}
         placeholder="Enter JSON schema here..."
        />
      </div>
    </div>
    
  );
};

export default JsonEditor;
export {}; // Add this line