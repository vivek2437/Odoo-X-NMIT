import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const HomeContainer = styled.div`
  min-height: calc(100vh - 80px);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #4CAF50 0%, #81C784 50%, #A5D6A7 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const HeroButton = styled(Link)<{ variant?: 'primary' | 'secondary' }>`
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s;
  display: inline-block;
  
  ${props => props.variant === 'secondary' ? `
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid white;
    
    &:hover {
      background: white;
      color: #4CAF50;
    }
  ` : `
    background: white;
    color: #4CAF50;
    
    &:hover {
      background: rgba(255, 255, 255, 0.9);
      transform: translateY(-2px);
    }
  `}
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  background: white;
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FeaturesTitle = styled.h2`
  text-align: center;
  color: #2E7D32;
  font-size: 2.5rem;
  margin-bottom: 3rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  background: #f9f9f9;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  color: #2E7D32;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const StatsSection = styled.section`
  padding: 4rem 2rem;
  background: #f5f5f5;
`;

const StatsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const StatsTitle = styled.h2`
  color: #2E7D32;
  font-size: 2.5rem;
  margin-bottom: 3rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 1.1rem;
`;

const CTASection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%);
  color: white;
  text-align: center;
`;

const CTAContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const SearchSection = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SearchTitle = styled.h1`
  text-align: center;
  color: #2E7D32;
  margin-bottom: 1rem;
  font-size: 2.5rem;
`;

const SearchSubtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
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

const ProductsSection = styled.section``;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
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

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>🌱 Welcome to EcoFinds</HeroTitle>
          <HeroSubtitle>
            The sustainable marketplace where second-hand treasures find new homes.
            Join our community of conscious consumers making a positive impact.
          </HeroSubtitle>
          
          <HeroButtons>
            <HeroButton to="/marketplace">
              🛍️ Browse Marketplace
            </HeroButton>
            {user ? (
              <HeroButton to="/add-product" variant="secondary">
                ➕ Start Selling
              </HeroButton>
            ) : (
              <HeroButton to="/register" variant="secondary">
                👋 Join EcoFinds
              </HeroButton>
            )}
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeaturesContainer>
          <FeaturesTitle>Why Choose EcoFinds?</FeaturesTitle>
          
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>🌍</FeatureIcon>
              <FeatureTitle>Eco-Friendly</FeatureTitle>
              <FeatureDescription>
                Reduce waste and carbon footprint by giving pre-loved items a second chance. 
                Every purchase helps build a more sustainable future.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>💰</FeatureIcon>
              <FeatureTitle>Save Money</FeatureTitle>
              <FeatureDescription>
                Find quality items at incredible prices. From electronics to furniture, 
                get more value for your money while supporting the circular economy.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🤝</FeatureIcon>
              <FeatureTitle>Trusted Community</FeatureTitle>
              <FeatureDescription>
                Join thousands of buyers and sellers who believe in sustainable consumption. 
                Our platform ensures safe and reliable transactions.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>

      <StatsSection>
        <StatsContainer>
          <StatsTitle>Our Impact</StatsTitle>
          
          <StatsGrid>
            <StatCard>
              <StatNumber>10+</StatNumber>
              <StatLabel>Products Available</StatLabel>
            </StatCard>
            
            <StatCard>
              <StatNumber>3</StatNumber>
              <StatLabel>Active Sellers</StatLabel>
            </StatCard>
            
            <StatCard>
              <StatNumber>$2,000+</StatNumber>
              <StatLabel>Value Circulated</StatLabel>
            </StatCard>
            
            <StatCard>
              <StatNumber>9</StatNumber>
              <StatLabel>Categories</StatLabel>
            </StatCard>
          </StatsGrid>
        </StatsContainer>
      </StatsSection>

      <CTASection>
        <CTAContainer>
          <CTATitle>Ready to Start Your Sustainable Journey?</CTATitle>
          <CTADescription>
            Join EcoFinds today and become part of the movement towards conscious consumption.
          </CTADescription>
          
          <HeroButtons>
            <HeroButton to="/marketplace">
              🔍 Explore Marketplace
            </HeroButton>
            {!user && (
              <HeroButton to="/register" variant="secondary">
                📝 Create Account
              </HeroButton>
            )}
          </HeroButtons>
        </CTAContainer>
      </CTASection>
    </HomeContainer>
  );
};

export default Home;
