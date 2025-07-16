// Mock Supabase client for demo purposes
// This file replaces the actual Supabase client with a mock implementation
// that returns hardcoded data for the demo application

// Define the structure of common response types
type SupabaseResponse<T> = {
  data: T | null;
  error: { message: string } | null;
  count?: number;
};

// Mock data storage
const mockData = {
  profiles: [
    {
      id: "user-1",
      email: "farmer.singh@example.com",
      full_name: "Farmer Singh",
      created_at: "2023-03-15T10:30:00Z",
      district: "Amritsar",
      state: "Punjab",
      village: "Tarn Taran",
      location: "Tarn Taran, Amritsar, Punjab",
      crops: ["wheat", "rice", "potato"],
      profile_image_url: null
    },
    {
      id: "user-2",
      email: "priya.patel@example.com",
      full_name: "Priya Patel",
      created_at: "2023-02-10T14:20:00Z",
      district: "Ahmedabad",
      state: "Gujarat",
      village: "Sanand",
      location: "Sanand, Ahmedabad, Gujarat",
      crops: ["cotton", "groundnut"],
      profile_image_url: null
    },
    {
      id: "current-user",
      email: "prabjyotsingh996@gmail.com",
      full_name: "Prabjyotsingh996",
      created_at: "2023-01-01T09:00:00Z",
      district: "Bengaluru",
      state: "Karnataka",
      village: "Doddaballapura",
      location: "Doddaballapura, Bengaluru, Karnataka", 
      crops: ["tomato", "coffee"],
      profile_image_url: null
    }
  ],
  commite_posts: [
    {
      id: "post-1",
      title: "Best practices for wheat cultivation",
      content: "I've been experimenting with new wheat varieties and wanted to share my experiences with the community...",
      created_at: "2023-05-20T08:45:00Z",
      user_id: "user-1"
    },
    {
      id: "post-2",
      title: "Monsoon preparation tips",
      content: "With monsoon approaching, here are some steps I'm taking to prepare my fields...",
      created_at: "2023-06-10T15:20:00Z",
      user_id: "user-1"
    },
    {
      id: "post-3",
      title: "Organic farming success story",
      content: "After switching to organic methods last year, I've seen a significant improvement in soil health...",
      created_at: "2023-04-05T11:30:00Z",
      user_id: "user-2"
    }
  ],
  commite_replies: [
    {
      id: "reply-1",
      content: "Thanks for sharing! I've been thinking about trying that variety too.",
      created_at: "2023-05-20T10:15:00Z",
      post_id: "post-1",
      user_id: "user-2"
    },
    {
      id: "reply-2",
      content: "Would you mind sharing which organic fertilizers you're using?",
      created_at: "2023-04-06T09:30:00Z",
      post_id: "post-3",
      user_id: "user-1"
    }
  ],
  farms: [
    {
      id: "farm-1",
      name: "North Field",
      size: 5.2,
      size_unit: "hectare",
      location: "Tarn Taran, Amritsar, Punjab",
      soil_type: "clay loam",
      irrigation_type: "drip",
      user_id: "user-1"
    },
    {
      id: "farm-2",
      name: "Home Garden",
      size: 0.5,
      size_unit: "acre",
      location: "Sanand, Ahmedabad, Gujarat",
      soil_type: "sandy loam",
      irrigation_type: "sprinkler",
      user_id: "user-2"
    },
    {
      id: "farm-3",
      name: "Demo Farm",
      size: 2.0,
      size_unit: "acre",
      location: "Doddaballapura, Bengaluru, Karnataka",
      soil_type: "red soil",
      irrigation_type: "drip",
      user_id: "current-user"
    }
  ]
};

// Helper functions for the mock client
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const findById = <T extends { id: string }>(collection: T[], id: string): T | undefined => {
  return collection.find(item => item.id === id);
};

const findByField = <T>(collection: T[], field: keyof T, value: any): T[] => {
  return collection.filter(item => item[field] === value);
};

// Current user for the demo
const currentUser = {
  id: "current-user",
  email: "prabjyotsingh996@gmail.com",
  user_metadata: {
    full_name: "Prabjyotsingh996"
  }
};

// Create the mock Supabase client
export const supabase = {
  // Auth methods
  auth: {
    getUser: async () => {
      await delay(300);
      return { data: { user: currentUser }, error: null };
    },
    getSession: async () => {
      await delay(300);
      return { 
        data: { 
          session: {
            user: currentUser,
            access_token: "mock-token",
            expires_at: new Date().getTime() + 3600000
          } 
        }, 
        error: null 
      };
    },
    signOut: async () => {
      await delay(300);
      return { error: null };
    },
    admin: {
      getUserById: async (id: string) => {
        await delay(300);
        const user = findById(mockData.profiles, id);
        if (!user) {
          return { data: null, error: { message: "User not found" } };
        }
        return { 
          data: { 
            user: {
              id: user.id,
              email: user.email,
              user_metadata: {
                full_name: user.full_name
              },
              created_at: user.created_at
            }
          }, 
          error: null 
        };
      }
    }
  },
  
  // Database methods
  from: (table: string) => {
    let query: any[] = [];
    let selectedFields: string[] | null = null;
    
    if (!(table in mockData)) {
      console.warn(`Table "${table}" not found in mock data`);
      return {
        select: () => ({ data: null, error: { message: "Table not found" } })
      };
    }
    
    const tableData = mockData[table as keyof typeof mockData] as any[];
    
    // Create a chainable query builder
    const builder = {
      // Select specific fields
      select: (fields?: string) => {
        if (fields) {
          selectedFields = fields === "*" ? null : fields.split(",").map(f => f.trim());
        }
        return builder;
      },
      
      // Filter by field equality
      eq: (field: string, value: any) => {
        query.push((item: any) => item[field] === value);
        return builder;
      },
      
      // Order results
      order: (field: string, options: { ascending: boolean }) => {
        return builder;
      },
      
      // Limit results
      limit: (n: number) => {
        return builder;
      },
      
      // Execute for single result
      single: async () => {
        await delay(300);
        try {
          // Apply all query filters
          let filtered = tableData;
          for (const filter of query) {
            filtered = filtered.filter(filter);
          }
          
          // Get first result or null
          const result = filtered.length > 0 ? filtered[0] : null;
          
          // Apply field selection if specified
          let data = result;
          if (result && selectedFields) {
            data = {};
            for (const field of selectedFields) {
              (data as any)[field] = result[field];
            }
          }
          
          return { data, error: null };
        } catch (e) {
          return { data: null, error: { message: "Error in query" } };
        }
      },
      
      // Execute for multiple results
      then: async (callback: (response: SupabaseResponse<any[]>) => void) => {
        await delay(300);
        try {
          // Apply all query filters
          let filtered = tableData;
          for (const filter of query) {
            filtered = filtered.filter(filter);
          }
          
          // Apply field selection if specified
          let data = filtered;
          if (selectedFields) {
            data = filtered.map(item => {
              const result: any = {};
              for (const field of selectedFields!) {
                result[field] = item[field];
              }
              return result;
            });
          }
          
          callback({ data, error: null, count: data.length });
          return { data, error: null, count: data.length };
        } catch (e) {
          callback({ data: null, error: { message: "Error in query" }, count: 0 });
          return { data: null, error: { message: "Error in query" }, count: 0 };
        }
      },
      
      // Update records
      update: (values: any) => {
        return {
          eq: async (field: string, value: any) => {
            await delay(300);
            return { error: null };
          }
        };
      },
      
      // Insert records
      insert: async (values: any) => {
        await delay(300);
        const id = `mock-${table}-${Math.floor(Math.random() * 1000)}`;
        return { data: { ...values, id }, error: null };
      },
      
      // Delete records
      delete: () => {
        return {
          eq: async (field: string, value: any) => {
            await delay(300);
            return { error: null };
          }
        };
      }
    };
    
    return builder;
  }
};

export default supabase; 