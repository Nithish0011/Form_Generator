// src/App.tsx
import React, { useState } from 'react';
import JsonEditor from './components/JsonEditor';
import FormGenerator from './components/FormGenerator';
import { FormSchema } from './types/schema';
import './App.css';

const App: React.FC = () => {
  const [schema, setSchema] = useState<FormSchema>({
    formTitle: '',
    formDescription: '',
    fields: [],
  });

  return (
    
    <div>
      <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2">
        <JsonEditor onSchemaChange={setSchema} />
      </div>
      <div className="md:w-1/2 overflow-auto">
        <FormGenerator schema={schema} />
      </div>
    </div>
    </div>
    
  );
};

export default App;