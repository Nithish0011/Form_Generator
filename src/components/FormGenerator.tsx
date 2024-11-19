// src/components/FormGenerator.tsx
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormSchema } from '../types/schema';
import FormField from './FormField';

interface FormGeneratorProps {
  schema: FormSchema;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
    
    // Convert the data to JSON
    const jsonData = JSON.stringify(data, null, 2);
    
    // Create a Blob from the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    // Create a link element
    const link = document.createElement('a');
    
    // Set the URL of the Blob
    link.href = URL.createObjectURL(blob);
    
    // Set the download attribute with a filename
    link.download = 'form-data.json';
    
    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);
    
    // Programmatically click the link to trigger the download
    link.click();
    
    // Clean up and remove the link
    document.body.removeChild(link);
    
    alert('Form submitted successfully! Your data has been downloaded.');
    reset();
  };

  useEffect(() => {
    reset();
  }, [schema, reset]);

  return (
    <div className='d-flex justify-center'>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
          <h2>{schema.formTitle}</h2>
          <p className="text-gray-600 mb-6">{schema.formDescription}</p>
          {schema.fields.map(field => (
            <FormField key={field.id} field={field} />
          ))}
          <button type="submit" >
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
    </div>
    
  );
};

export default FormGenerator;