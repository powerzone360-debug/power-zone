// Power Zone - Database Layer (db.js)
// Handles data retrieval/storage with dual-mode: Supabase cloud DB or browser LocalStorage fallback.

/*
================================================================================
SUPABASE SETUP INSTRUCTIONS (Optional):
1. Sign up on https://supabase.com and create a new project.
2. Go to the SQL Editor and run the following commands to create the tables:

CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT,
  category TEXT,
  price NUMERIC NOT NULL,
  salePrice NUMERIC,
  image TEXT,
  inStock BOOLEAN DEFAULT true,
  description TEXT,
  nutrition TEXT,
  howToUse TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) but allow public reads
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Allow full admin access with anon key" ON products FOR ALL USING (true);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow full admin access with anon key" ON categories FOR ALL USING (true);

3. Copy the 'Project URL' and 'API Key' (anon public) from Project Settings -> API.
4. Paste them into your config.js file.
================================================================================
*/

(function() {
  let supabase = null;
  
  // Initialize Supabase if keys are provided in config.js
  if (window.CONFIG && window.CONFIG.supabaseUrl && window.CONFIG.supabaseKey) {
    try {
      if (window.supabase && typeof window.supabase.createClient === 'function') {
        supabase = window.supabase.createClient(window.CONFIG.supabaseUrl, window.CONFIG.supabaseKey);
        console.log("⚡ Supabase Mode Enabled successfully.");
      } else {
        console.warn("Supabase library not loaded. Falling back to LocalStorage.");
      }
    } catch (e) {
      console.error("Failed to initialize Supabase:", e);
    }
  } else {
    console.log("💾 LocalStorage Mode Enabled (no Supabase keys found).");
  }

  // Database helper methods
  const db = {
    isSupabase() {
      return supabase !== null;
    },

    // ==========================================
    // PRODUCTS CRUD
    // ==========================================
    async getProducts() {
      if (this.isSupabase()) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching from Supabase, falling back:", error);
          return this.getLocalStorageProducts();
        }
        return data;
      } else {
        return this.getLocalStorageProducts();
      }
    },

    async saveProduct(product) {
      product.price = parseFloat(product.price) || 0;
      product.salePrice = product.salePrice ? parseFloat(product.salePrice) : null;
      product.inStock = product.inStock === true || product.inStock === 'true';

      if (this.isSupabase()) {
        const dbProduct = { ...product };
        if (!dbProduct.id) {
          dbProduct.id = Date.now().toString();
        }
        
        const { data, error } = await supabase
          .from('products')
          .upsert([dbProduct], { onConflict: 'id' });
        
        if (error) {
          console.error("Supabase Save Error:", error);
          throw new Error(error.message);
        }
        return dbProduct;
      } else {
        const products = await this.getLocalStorageProducts();
        if (!product.id) {
          product.id = Date.now().toString();
          products.push(product);
        } else {
          const index = products.findIndex(p => p.id === product.id);
          if (index !== -1) {
            products[index] = product;
          } else {
            products.push(product);
          }
        }
        localStorage.setItem('pz_products', JSON.stringify(products));
        return product;
      }
    },

    async deleteProduct(id) {
      if (this.isSupabase()) {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);
        
        if (error) {
          console.error("Supabase Delete Error:", error);
          throw new Error(error.message);
        }
        return true;
      } else {
        const products = await this.getLocalStorageProducts();
        const filtered = products.filter(p => p.id !== id);
        localStorage.setItem('pz_products', JSON.stringify(filtered));
        return true;
      }
    },

    async getLocalStorageProducts() {
      let localData = localStorage.getItem('pz_products');
      if (!localData) {
        try {
          const response = await fetch('products.json');
          if (response.ok) {
            const defaults = await response.json();
            localStorage.setItem('pz_products', JSON.stringify(defaults));
            return defaults;
          }
        } catch (e) {
          console.error("Failed to load products.json:", e);
        }
        return [];
      }
      return JSON.parse(localData);
    },

    async importProducts(productsList) {
      if (Array.isArray(productsList)) {
        if (this.isSupabase()) {
          const { error } = await supabase
            .from('products')
            .upsert(productsList, { onConflict: 'id' });
          if (error) {
            console.error("Supabase Bulk Import Error:", error);
            throw new Error(error.message);
          }
        } else {
          localStorage.setItem('pz_products', JSON.stringify(productsList));
        }
        return true;
      }
      throw new Error("Invalid products format. Expected an array.");
    },

    // ==========================================
    // CATEGORIES CRUD
    // ==========================================
    async getCategories() {
      if (this.isSupabase()) {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('created_at', { ascending: true });
        
        if (error) {
          console.error("Error fetching categories from Supabase, falling back:", error);
          return this.getLocalStorageCategories();
        }
        return data;
      } else {
        return this.getLocalStorageCategories();
      }
    },

    async saveCategory(category) {
      if (!category.name) throw new Error("Category Name is required.");
      if (!category.icon) category.icon = "fa-prescription-bottle-supplement"; // Default icon

      if (this.isSupabase()) {
        const dbCategory = { ...category };
        if (!dbCategory.id) {
          dbCategory.id = "cat_" + Date.now().toString();
        }
        
        const { data, error } = await supabase
          .from('categories')
          .upsert([dbCategory], { onConflict: 'id' });
        
        if (error) {
          console.error("Supabase Save Category Error:", error);
          throw new Error(error.message);
        }
        return dbCategory;
      } else {
        const categories = await this.getLocalStorageCategories();
        if (!category.id) {
          category.id = "cat_" + Date.now().toString();
          categories.push(category);
        } else {
          const index = categories.findIndex(c => c.id === category.id);
          if (index !== -1) {
            categories[index] = category;
          } else {
            categories.push(category);
          }
        }
        localStorage.setItem('pz_categories', JSON.stringify(categories));
        return category;
      }
    },

    async deleteCategory(id) {
      if (this.isSupabase()) {
        const { error } = await supabase
          .from('categories')
          .delete()
          .eq('id', id);
        
        if (error) {
          console.error("Supabase Delete Category Error:", error);
          throw new Error(error.message);
        }
        return true;
      } else {
        const categories = await this.getLocalStorageCategories();
        const filtered = categories.filter(c => c.id !== id);
        localStorage.setItem('pz_categories', JSON.stringify(filtered));
        return true;
      }
    },

    async getLocalStorageCategories() {
      let localData = localStorage.getItem('pz_categories');
      if (!localData) {
        try {
          const response = await fetch('categories.json');
          if (response.ok) {
            const defaults = await response.json();
            localStorage.setItem('pz_categories', JSON.stringify(defaults));
            return defaults;
          }
        } catch (e) {
          console.error("Failed to load categories.json:", e);
        }
        return [];
      }
      return JSON.parse(localData);
    },

    async importCategories(categoriesList) {
      if (Array.isArray(categoriesList)) {
        if (this.isSupabase()) {
          const { error } = await supabase
            .from('categories')
            .upsert(categoriesList, { onConflict: 'id' });
          if (error) {
            console.error("Supabase Bulk Import Categories Error:", error);
            throw new Error(error.message);
          }
        } else {
          localStorage.setItem('pz_categories', JSON.stringify(categoriesList));
        }
        return true;
      }
      throw new Error("Invalid categories format. Expected an array.");
    }
  };

  // Expose to window
  window.DB = db;
})();
