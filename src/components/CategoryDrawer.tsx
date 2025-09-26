import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, ShoppingBag, Watch, Shirt, Footprints } from 'lucide-react';

interface CategoryDrawerProps {
  children: React.ReactNode;
}

const CategoryDrawer: React.FC<CategoryDrawerProps> = ({ children }) => {
  const categories = [
    {
      title: "Men's Bags",
      slug: "men-bags",
      icon: ShoppingBag,
      description: "Premium bags, briefcases, and backpacks"
    },
    {
      title: "Men's Jewelry",
      slug: "men-jewelry", 
      icon: Watch,
      description: "Elegant watches, rings, and accessories"
    },
    {
      title: "Men's Shoes",
      slug: "men-shoes",
      icon: Footprints,
      description: "From casual sneakers to formal dress shoes"
    },
    {
      title: "Men's Clothing",
      slug: "men-clothing",
      icon: Shirt,
      description: "Stylish apparel for every occasion"
    },
    {
      title: "Nike Shoes",
      slug: "nike-shoes",
      icon: Footprints,
      description: "Iconic Nike sneakers and athletic footwear"
    },
    {
      title: "Women's Clothing",
      slug: "women-clothing",
      icon: Shirt,
      description: "Fashion-forward clothing for the modern woman"
    }
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-left">All Categories</SheetTitle>
          <SheetDescription className="text-left">
            Browse all product categories
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-2">
          {categories.map((category) => (
            <Link key={category.slug} to={`/category/${category.slug}`}>
              <Button
                variant="ghost"
                className="w-full justify-start h-auto p-4 text-left hover:bg-muted"
              >
                <category.icon className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">{category.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {category.description}
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Use our AI assistant to find the perfect products
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Ask AI Assistant
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryDrawer;