import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI, cartAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const MarketplaceContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const MarketplaceHeader = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  text-align: center;
`;

const MarketplaceTitle = styled.h1`
  color: #2E7D32;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
`;

const MarketplaceSubtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const SearchSection = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SearchForm = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const SearchButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: background-color 0.3s;
  
  &:hover {
    background: #45a049;
  }
`;

const FiltersSection = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const AdvancedFiltersSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const FiltersTitle = styled.h3`
  color: #333;
  margin: 0;
`;

const FiltersToggle = styled.button`
  background: none;
  border: none;
  color: #4CAF50;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FiltersGrid = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'grid' : 'none'};
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const FilterInput = styled.input`
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const PriceRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToolbarSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const ToolbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ResultsCount = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const ViewToggle = styled.div`
  display: flex;
  border: 2px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
`;

const ViewButton = styled.button<{ active: boolean }>`
  padding: 0.5rem;
  border: none;
  background: ${props => props.active ? '#4CAF50' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: ${props => props.active ? '#45a049' : '#f0f0f0'};
  }
`;

const ClearFiltersButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background: #d32f2f;
  }
`;

const CategoryButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.active ? '#4CAF50' : '#ddd'};
  background: ${props => props.active ? '#4CAF50' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: #4CAF50;
    background: ${props => props.active ? '#45a049' : '#f0f9f0'};
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #4CAF50;
`;

const StatLabel = styled.div`
  color: #666;
  margin-top: 0.5rem;
`;

const ProductsSection = styled.section``;

const ProductsGrid = styled.div<{ viewMode: 'grid' | 'list' }>`
  display: ${props => props.viewMode === 'grid' ? 'grid' : 'flex'};
  ${props => props.viewMode === 'grid' ? `
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  ` : `
    flex-direction: column;
    gap: 1rem;
  `}
  margin-top: 2rem;
`;

const ProductListItem = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`;

const ListProductImage = styled.div`
  width: 150px;
  height: 120px;
  background: linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  position: relative;
  border-radius: 8px 0 0 8px;
`;

const ListProductInfo = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;

const ListProductDetails = styled.div`
  flex: 1;
`;

const ListProductActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  min-width: 150px;
`;

const GroupSection = styled.div`
  margin-bottom: 3rem;
`;

const GroupTitle = styled.h3`
  color: #2E7D32;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 2px solid #E8F5E8;
  font-size: 1.3rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4CAF50;
  font-size: 3rem;
  position: relative;
`;

const ProductBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #4CAF50;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4CAF50;
  margin: 0.5rem 0;
`;

const ProductDescription = styled.p`
  color: #666;
  margin: 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #999;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.3s;
  
  ${props => props.variant === 'primary' ? `
    background: #4CAF50;
    color: white;
    
    &:hover {
      background: #45a049;
    }
  ` : `
    background: #f5f5f5;
    color: #333;
    
    &:hover {
      background: #e0e0e0;
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #666;
`;

const NoProductsMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  seller: {
    id: string;
    username: string;
  };
  createdAt: string;
}

const Marketplace: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  
  // Advanced Filters State
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [groupBy, setGroupBy] = useState('none');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [conditionFilter, setConditionFilter] = useState('all');
  const [sellerFilter, setSellerFilter] = useState('all');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, selectedCategory, searchQuery, sortBy, priceRange, conditionFilter, sellerFilter]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAllProducts();
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Price range filter
    if (priceRange.min) {
      filtered = filtered.filter(product => product.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(product => product.price <= parseFloat(priceRange.max));
    }

    // Condition filter
    if (conditionFilter !== 'all') {
      filtered = filtered.filter(product => product.condition === conditionFilter);
    }

    // Seller filter
    if (sellerFilter !== 'all') {
      if (sellerFilter === 'others' && user) {
        filtered = filtered.filter(product => product.seller.id !== user.id);
      } else if (sellerFilter === 'mine' && user) {
        filtered = filtered.filter(product => product.seller.id === user.id);
      }
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    setFilteredProducts(filtered);
  };

  const fetchCategories = async () => {
    try {
      const response = await productsAPI.getCategories();
      setCategories(['all', ...response.data.categories]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFiltersAndSort();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange({ min: '', max: '' });
    setConditionFilter('all');
    setSellerFilter('all');
    setSortBy('newest');
  };

  const getGroupedProducts = () => {
    if (groupBy === 'none') {
      return [{ title: '', products: filteredProducts }];
    }

    const grouped: { [key: string]: Product[] } = {};
    
    filteredProducts.forEach(product => {
      let key = '';
      switch (groupBy) {
        case 'category':
          key = product.category;
          break;
        case 'condition':
          key = product.condition;
          break;
        case 'seller':
          key = product.seller.username;
          break;
        case 'price':
          if (product.price < 50) key = 'Under $50';
          else if (product.price < 200) key = '$50 - $200';
          else if (product.price < 500) key = '$200 - $500';
          else key = 'Over $500';
          break;
        default:
          key = 'All Products';
      }
      
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(product);
    });

    return Object.entries(grouped)
      .map(([title, products]) => ({ title, products }))
      .sort((a, b) => b.products.length - a.products.length);
  };

  const handleAddToCart = async (productId: string) => {
    if (!user) return;
    
    try {
      setAddingToCart(productId);
      await cartAPI.addToCart(productId);
      alert('Product added to cart!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to add to cart');
    } finally {
      setAddingToCart(null);
    }
  };

  const renderProductCard = (product: Product) => (
    <ProductCard key={product.id}>
      <ProductImage>
        📦
        <ProductBadge>{product.condition}</ProductBadge>
      </ProductImage>
      <ProductInfo>
        <ProductTitle>{product.title}</ProductTitle>
        <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
        <ProductDescription>{product.description}</ProductDescription>
        
        <ProductMeta>
          <span>{product.category}</span>
          <span>By {product.seller.username}</span>
        </ProductMeta>

        <ProductActions>
          <ActionButton as={Link} to={`/product/${product.id}`}>
            View Details
          </ActionButton>
          {user && user.id !== product.seller.id && (
            <ActionButton
              variant="primary"
              onClick={() => handleAddToCart(product.id)}
              disabled={addingToCart === product.id}
            >
              <span style={{marginRight: '0.5rem'}}>🛒</span>
              {addingToCart === product.id ? 'Adding...' : 'Add to Cart'}
            </ActionButton>
          )}
        </ProductActions>
      </ProductInfo>
    </ProductCard>
  );

  const renderProductListItem = (product: Product) => (
    <ProductListItem key={product.id}>
      <ListProductImage>
        📦
        <ProductBadge>{product.condition}</ProductBadge>
      </ListProductImage>
      <ListProductInfo>
        <ListProductDetails>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
          <ProductDescription style={{ marginTop: '0.5rem' }}>
            {product.description}
          </ProductDescription>
          <ProductMeta style={{ marginTop: '0.5rem' }}>
            <span>{product.category}</span>
            <span>By {product.seller.username}</span>
          </ProductMeta>
        </ListProductDetails>
        <ListProductActions>
          <ActionButton as={Link} to={`/product/${product.id}`}>
            View Details
          </ActionButton>
          {user && user.id !== product.seller.id && (
            <ActionButton
              variant="primary"
              onClick={() => handleAddToCart(product.id)}
              disabled={addingToCart === product.id}
            >
              <span style={{marginRight: '0.5rem'}}>🛒</span>
              {addingToCart === product.id ? 'Adding...' : 'Add to Cart'}
            </ActionButton>
          )}
        </ListProductActions>
      </ListProductInfo>
    </ProductListItem>
  );

  const availableProducts = filteredProducts.filter(p => p.seller.id !== user?.id);
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const groupedProducts = getGroupedProducts();
  
  // Get unique sellers for seller filter
  const uniqueSellers = Array.from(new Set(products.map(p => p.seller.username)))
    .map(username => ({ 
      username, 
      id: products.find(p => p.seller.username === username)?.seller.id 
    }));
    
  // Get unique conditions for condition filter
  const uniqueConditions = Array.from(new Set(products.map(p => p.condition)));

  return (
    <MarketplaceContainer>
      <MarketplaceHeader>
        <MarketplaceTitle>🌱 EcoFinds Marketplace</MarketplaceTitle>
        <MarketplaceSubtitle>
          Discover amazing second-hand treasures and give them a new life
        </MarketplaceSubtitle>
      </MarketplaceHeader>

      <StatsSection>
        <StatCard>
          <StatNumber>{products.length}</StatNumber>
          <StatLabel>Total Items</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{availableProducts.length}</StatNumber>
          <StatLabel>Available for You</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>${totalValue.toFixed(0)}</StatNumber>
          <StatLabel>Total Value Saved</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{new Set(products.map(p => p.seller.id)).size}</StatNumber>
          <StatLabel>Active Sellers</StatLabel>
        </StatCard>
      </StatsSection>

      <SearchSection>
        <h3 style={{ marginBottom: '1rem', color: '#333' }}>Find What You're Looking For</h3>
        
        <SearchForm>
          <SearchInput
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>
            <span style={{marginRight: '0.5rem'}}>🔍</span>
            Search
          </SearchButton>
        </SearchForm>

        <FiltersSection>
          {categories.map(category => (
            <CategoryButton
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Categories' : category}
            </CategoryButton>
          ))}
        </FiltersSection>
      </SearchSection>

      <AdvancedFiltersSection>
        <FiltersHeader>
          <FiltersTitle>Advanced Filters</FiltersTitle>
          <FiltersToggle onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
            {showAdvancedFilters ? '▴' : '▾'} {showAdvancedFilters ? 'Hide' : 'Show'} Filters
          </FiltersToggle>
        </FiltersHeader>
        
        <FiltersGrid isOpen={showAdvancedFilters}>
          <FilterGroup>
            <FilterLabel>Price Range</FilterLabel>
            <PriceRangeContainer>
              <FilterInput
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              />
              <span>to</span>
              <FilterInput
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              />
            </PriceRangeContainer>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Condition</FilterLabel>
            <FilterSelect value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)}>
              <option value="all">All Conditions</option>
              {uniqueConditions.map(condition => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Seller</FilterLabel>
            <FilterSelect value={sellerFilter} onChange={(e) => setSellerFilter(e.target.value)}>
              <option value="all">All Sellers</option>
              {user && <option value="others">Others Only</option>}
              {user && <option value="mine">My Items</option>}
              {uniqueSellers.map(seller => (
                <option key={seller.username} value={seller.username}>{seller.username}</option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Clear Filters</FilterLabel>
            <ClearFiltersButton onClick={clearFilters}>
              🗑️ Clear All
            </ClearFiltersButton>
          </FilterGroup>
        </FiltersGrid>
      </AdvancedFiltersSection>

      <ToolbarSection>
        <ToolbarLeft>
          <ResultsCount>
            Showing {filteredProducts.length} of {products.length} products
          </ResultsCount>
        </ToolbarLeft>
        
        <ToolbarRight>
          <FilterGroup>
            <FilterLabel>Sort by:</FilterLabel>
            <FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="title">Name A-Z</option>
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Group by:</FilterLabel>
            <FilterSelect value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
              <option value="none">No Grouping</option>
              <option value="category">Category</option>
              <option value="condition">Condition</option>
              <option value="seller">Seller</option>
              <option value="price">Price Range</option>
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>View:</FilterLabel>
            <ViewToggle>
              <ViewButton 
                active={viewMode === 'grid'} 
                onClick={() => setViewMode('grid')}
              >
                ▦️
              </ViewButton>
              <ViewButton 
                active={viewMode === 'list'} 
                onClick={() => setViewMode('list')}
              >
                ☰
              </ViewButton>
            </ViewToggle>
          </FilterGroup>
        </ToolbarRight>
      </ToolbarSection>

      <ProductsSection>
        {loading ? (
          <LoadingMessage>Loading marketplace...</LoadingMessage>
        ) : filteredProducts.length === 0 ? (
          <NoProductsMessage>
            <h3>No products found</h3>
            <p>Try adjusting your search criteria, filters, or browse different categories.</p>
          </NoProductsMessage>
        ) : (
          <div>
            {groupedProducts.map((group, groupIndex) => (
              <GroupSection key={groupIndex}>
                {group.title && <GroupTitle>{group.title} ({group.products.length})</GroupTitle>}
                
                <ProductsGrid viewMode={viewMode}>
                  {group.products.map(product => 
                    viewMode === 'grid' 
                      ? renderProductCard(product)
                      : renderProductListItem(product)
                  )}
                </ProductsGrid>
              </GroupSection>
            ))}
          </div>
        )}
      </ProductsSection>
    </MarketplaceContainer>
  );
};

export default Marketplace;
