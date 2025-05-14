'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, Home, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
// import type { Metadata } from 'next'; // Cannot use in client component

// export const metadata: Metadata = {
//   title: 'Shipping Address',
//   description: 'Enter your shipping details for checkout.',
// };

const addressSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required." }),
  streetAddress: z.string().min(5, { message: "Street address is required." }),
  apartmentSuite: z.string().optional(),
  city: z.string().min(2, { message: "City is required." }),
  stateProvince: z.string().min(2, { message: "State/Province is required." }),
  zipPostalCode: z.string().min(5, { message: "Zip/Postal code is required." }),
  country: z.string().min(2, { message: "Country is required." }),
  phoneNumber: z.string().optional().refine(val => !val || /^\+?[1-9]\d{1,14}$/.test(val), {
    message: "Invalid phone number format."
  }),
  saveAddress: z.boolean().default(false).optional(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export default function AddressPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: '',
      streetAddress: '',
      apartmentSuite: '',
      city: '',
      stateProvince: '',
      zipPostalCode: '',
      country: 'USA', // Default country
      phoneNumber: '',
      saveAddress: false,
    },
  });

  async function onSubmit(values: AddressFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    console.log('Address submitted:', values);
    toast({
      title: "Address Saved!",
      description: "Proceeding to order summary.",
    });
    // router.push('/checkout/summary'); // TODO: Implement router navigation
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold text-primary">Shipping Address</CardTitle>
            <Home className="h-8 w-8 text-primary" />
          </div>
          <CardDescription>Please enter your shipping details to proceed with your order.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="John M. Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apartmentSuite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apartment, suite, etc. (Optional)</FormLabel>
                    <FormControl><Input placeholder="Apt 4B" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl><Input placeholder="New York" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stateProvince"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State / Province</FormLabel>
                      <FormControl><Input placeholder="NY" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="zipPostalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip / Postal Code</FormLabel>
                      <FormControl><Input placeholder="10001" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USA">United States</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                          {/* Add more countries as needed */}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl><Input type="tel" placeholder="+1 212-555-0123" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="saveAddress"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Save this address for future orders</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3" disabled={isLoading}>
                 {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                     Continue to Summary <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Link href="/cart" passHref>
            <Button variant="outline" className="w-full">Back to Cart</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
