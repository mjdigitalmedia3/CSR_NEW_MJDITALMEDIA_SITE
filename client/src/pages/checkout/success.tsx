import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Loader2, Package, ArrowRight } from "lucide-react";

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading");
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    // Verify the session
    fetch(`/api/checkout/verify?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "complete") {
          setStatus("success");
          setOrderDetails(data);
        } else {
          setStatus("processing");
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Verifying your order...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't verify your order. If you completed payment, don't worry - we'll follow up via email.
          </p>
          <Link href="/checkout">
            <Button>Return to Checkout</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-3xl">Order Confirmed!</CardTitle>
            <CardDescription className="text-lg">
              Thank you for your purchase. We've sent a confirmation email with your order details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {orderDetails?.customer_details && (
              <div className="bg-muted rounded-lg p-4 text-left">
                <p className="font-medium mb-2">Order Details</p>
                <p className="text-sm text-muted-foreground">
                  Email: {orderDetails.customer_details.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  Amount: ${(orderDetails.amount_total / 100).toFixed(2)}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button variant="outline" className="gap-2">
                  <Package className="h-4 w-4" />
                  Browse More Packages
                </Button>
              </Link>
              <Link href="/">
                <Button className="gap-2">
                  Return Home
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              Have questions? Contact us at{" "}
              <a href="mailto:hello@mjdigitalmedia.com" className="text-primary hover:underline">
                hello@mjdigitalmedia.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
