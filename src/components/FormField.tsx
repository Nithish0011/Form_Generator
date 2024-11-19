// src/components/FormField.tsx
import React from 'react';
import { useFormContext, FieldError } from 'react-hook-form';
import { Field } from '../types/schema';

const FormField: React.FC<{ field: Field }> = ({ field }) => {
  const { register, formState: { errors } } = useFormContext();

  const renderInput = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'textarea':
        return (
          <input
            {...register(field.id, {
              required: field.required,
              pattern: field.validation?.pattern ? {
                value: new RegExp(field.validation.pattern),
                message: field.validation.message || 'Invalid input',
              } : undefined,
            })}
            type={field.type}
            placeholder={field.placeholder}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        );

      case 'select':
        return (
          <select
            {...register(field.id, { required: field.required })}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div>
            {field.options?.map(option => (
              <label key={option.value} className="block mb-2">
                <input
                  {...register(field.id, { required: field.required })}
                  type="radio"
                  value={option.value}
                  className="mr-2"
                />
                {option.label}
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.id}>
        {field.label}
      </label>
      {renderInput()}
      {errors[field.id] && (
        <span className="text-red-500 text-xs italic">{(errors[field.id] as FieldError).message}</span>
      )}
    </div>
  );
};

export default FormField;