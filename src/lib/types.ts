export interface Module {
    id: string;
    name: string;
    isDefault?: boolean;
}

export interface TabOption {
    value: string;
    label: React.ReactNode;
    badge?: {
      text: string;
      className?: string;
      show?: boolean;  // Add this property
    };
    count?: number;
  }