'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Lock, Loader2, ShieldCheck } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import { MOCK_PRODUCTS } from '@/lib/constants'; // To simulate order total
import type { CartItem } from '@/types';
import Link from 'next/link';

// Simulate fetching order total (in a real app, this would be passed from summary or context)
const mockOrderItems: CartItem[] = [
  { ...MOCK_PRODUCTS[0], quantity: 1 },
  { ...MOCK_PRODUCTS[2], quantity: 2 },
];
const subtotal = mockOrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const shippingCost = subtotal > 50 ? 0 : 10;
const taxes = subtotal * 0.08;
const orderTotal = subtotal + shippingCost + taxes;


const paymentSchema = z.object({
  cardNumber: z.string()
    .min(16, { message: "Card number must be 16 digits." })
    .max(16, { message: "Card number must be 16 digits." })
    .regex(/^\d+$/, { message: "Card number must contain only digits." }),
  cardName: z.string().min(2, { message: "Name on card is required." }),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry date must be in MM/YY format." }),
  cvv: z.string()
    .min(3, { message: "CVV must be 3 or 4 digits." })
    .max(4, { message: "CVV must be 3 or 4 digits." })
    .regex(/^\d+$/, { message: "CVV must contain only digits." }),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

export default function PaymentPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    },
  });

  async function onSubmit(values: PaymentFormValues) {
    setIsLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsLoading(false);
    console.log('Payment details submitted:', values);
    toast({
      title: "Payment Successful!",
      description: "Your order has been placed. Thank you for shopping with SwiftStride!",
      action: <ShieldCheck className="text-green-500"/>,
      duration: 7000,
    });
    // In a real app, you would redirect to an order confirmation page
    // router.push('/order-confirmation/ORDER_ID');
    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-lg mx-auto shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold text-primary">Secure Payment</CardTitle>
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <CardDescription>
            Enter your payment details to complete your purchase. All transactions are secure and encrypted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-secondary rounded-lg">
            <p className="text-lg font-semibold text-secondary-foreground">
              Order Total: <span className="text-primary">${orderTotal.toFixed(2)}</span>
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name on Card</FormLabel>
                    <FormControl><Input placeholder="John M. Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input type="text" placeholder="•••• •••• •••• ••••" {...field} maxLength={19} onChange={(e) => {
                          // Format card number with spaces
                          const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                          field.onChange(value);
                        }}/>
                      </FormControl>
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl><Input type="password" placeholder="•••" {...field} maxLength={4} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    Pay ${orderTotal.toFixed(2)}
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col items-center space-y-2">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Lock className="h-3 w-3"/> Secure SSL Encrypted Payment
            </p>
          <Link href="/checkout/summary" passHref>
            <Button variant="outline" className="w-full">Back to Order Summary</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
