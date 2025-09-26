import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import productsData from '@/data/products.json';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const searchProducts = () => {
      setIsLoading(true);
      
      if (!query.trim()) {
        setFilteredProducts([]);
        setIsLoading(false);
        return;
      }

      // Simple text-based search for now
      // In production, this would use your backend search API
      const results = productsData.filter(product => {
        const searchText = query.toLowerCase();
        return (
          product.title.toLowerCase().includes(searchText) ||
          product.category.toLowerCase().includes(searchText) ||
          (product.brand && product.brand.toLowerCase().includes(searchText)) ||
          (product.description && product.description.toLowerCase().includes(searchText))
        );
      });

      setFilteredProducts(results);
      setIsLoading(false);
    };

    searchProducts();
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Search Results</h1>
            <p className="text-muted-foreground">
              {query ? `Showing results for "${query}"` : 'Enter a search term to find products'}
            </p>
          </div>
          
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="bg-muted h-48 rounded-lg mb-4"></div>
                  <div className="bg-muted h-4 rounded mb-2"></div>
                  <div className="bg-muted h-4 rounded w-3/4 mb-4"></div>
                  <div className="bg-muted h-6 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Found {filteredProducts.length} products
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.asin} product={product} />
              ))}
            </div>
          </>
        ) : query ? (
          <div className="text-center py-16">
            <Search className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold mb-4">No products found</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              We couldn't find any products matching "{query}". Try adjusting your search terms or browse our categories.
            </p>
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold mb-4">Start Your Search</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter a search term in the search bar above to find products.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;