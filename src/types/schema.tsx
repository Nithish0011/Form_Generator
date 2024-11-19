// src/types/schema.ts
export interface FieldOption {
    value: string;
    label: string;
  }
  
  export interface Field {
    id: string;
    type: string;
    label: string;
    required: boolean;
    placeholder?: string;
    options?: FieldOption[];
    validation?: {
      pattern?: string;
      message?: string;
    };
  }
  
  export interface FormSchema {
    formTitle: string;
    formDescription: string;
    fields: Field[];
  }
  
  export {}; // Add this line