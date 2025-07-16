import { useState, useEffect } from "react";

// Function to get initial value based on key
function getStorageValue<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    return defaultValue;
  }
  
  const savedValue = localStorage.getItem(key);
  try {
    return savedValue ? JSON.parse(savedValue) : defaultValue;
  } catch (error) {
    console.error(`Error parsing localStorage value for key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Custom hook for using localStorage with TypeScript support
 * @param key - localStorage key to use
 * @param defaultValue - default value to use if key doesn't exist
 * @returns [value, setValue] tuple similar to useState
 */
export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => getStorageValue(key, defaultValue));

  // Function to update localStorage and state
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we can use same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // Dispatch an event so other instances can update
        window.dispatchEvent(new StorageEvent("storage", {
          key,
          newValue: JSON.stringify(valueToStore),
        }));
      }
    } catch (error) {
      console.error(`Error setting localStorage value for key "${key}":`, error);
    }
  };

  // Listen for changes to this localStorage key in other components
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };
    
    // Listen for changes
    window.addEventListener("storage", handleStorageChange);
    
    // Clean up
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
} 