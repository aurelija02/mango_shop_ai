import React, { useState } from 'react';
import {
  CheckoutContainer,
  CheckoutGrid,
  FormSection,
  SectionTitle,
  FormGroup,
  Label,
  Input,
  Select,
  OrderSummary,
  SummaryItem,
  Total,
  SubmitButton
} from './styles/Checkout.styles';

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'swedbank'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we would implement the Swedbank PSD2 payment processing
    console.log('Form submitted:', formData);
  };

  return (
    <CheckoutContainer>
      <form onSubmit={handleSubmit}>
        <CheckoutGrid>
          <div>
            <FormSection>
              <SectionTitle>Customer Information</SectionTitle>
              <FormGroup>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </FormSection>

            <FormSection>
              <SectionTitle>Shipping Address</SectionTitle>
              <FormGroup>
                <Label htmlFor="address">Street Address</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="city">City</Label>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </FormSection>

            <FormSection>
              <SectionTitle>Payment Method</SectionTitle>
              <FormGroup>
                <Label htmlFor="paymentMethod">Select Payment Method</Label>
                <Select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                >
                  <option value="swedbank">Swedbank</option>
                  <option value="card">Credit Card</option>
                  <option value="klarna">Klarna</option>
                </Select>
              </FormGroup>
            </FormSection>
          </div>

          <OrderSummary>
            <SectionTitle>Order Summary</SectionTitle>
            <SummaryItem>
              <span>Tommy Atkins Mango (2x)</span>
              <span>$9.98</span>
            </SummaryItem>
            <SummaryItem>
              <span>Kent Mango (1x)</span>
              <span>$5.99</span>
            </SummaryItem>
            <SummaryItem>
              <span>Shipping</span>
              <span>$4.99</span>
            </SummaryItem>
            <Total>
              <span>Total</span>
              <span>$20.96</span>
            </Total>
            <SubmitButton type="submit">Place Order</SubmitButton>
          </OrderSummary>
        </CheckoutGrid>
      </form>
    </CheckoutContainer>
  );
};

export default Checkout; 