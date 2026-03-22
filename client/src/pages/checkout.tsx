import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, ShoppingCart, CreditCard, ArrowLeft, Loader2, Check } from "lucide-react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function Checkout() {
  const { items, removeFromCart, total, itemCount, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create checkout session");
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      const { error: redirectError } = await stripe.redirectToCheckout({ sessionId });
      
      if (redirectError) {
        throw new Error(redirectError.message);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (itemCount === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">
            Browse our packages and add items to get started.
          </p>
          <Link href="/products">
            <Button size="lg" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              View Packages
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/products" className="text-muted-foreground hover:text-foreground flex items-center gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <Card key={item.productId}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.product.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {item.product.description}
                      </p>
                      
                      {item.selectedUpsells.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Add-ons:</p>
                          {item.selectedUpsells.map((upsell) => (
                            <div key={upsell.id} className="flex items-center gap-2 text-sm">
                              <Check className="h-3 w-3 text-green-500" />
                              <span>{upsell.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                +${upsell.price}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">${item.totalPrice.toLocaleString()}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive mt-2"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>{itemCount} item(s)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.product.name}</span>
                      <span>${item.totalPrice.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold">${total.toLocaleString()}</span>
                </div>

                <div className="pt-4 space-y-3">
                  <Button 
                    className="w-full gap-2" 
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4" />
                        Pay with Stripe
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">
                      Pay in full or choose from flexible payment options
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <span>Powered by</span>
                      <Badge variant="outline" className="text-xs">Stripe</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">Available Payment Options:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Credit/Debit Card</Badge>
                    <Badge variant="secondary">Affirm</Badge>
                    <Badge variant="secondary">Klarna</Badge>
                    <Badge variant="secondary">AfterPay</Badge>
                  </div>
                  <p className="mt-2">
                    * Buy Now, Pay Later options available at checkout based on eligibility
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
