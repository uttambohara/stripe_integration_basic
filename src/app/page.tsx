"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Nike Jordan",
    description: "Nike Off-White Air Jordan 4 Sail | Size W8",
    images: [
      "https://sothebys-md.brightspotcdn.com/dims4/default/c1276e0/2147483647/strip/true/crop/3543x3543+0+0/resize/800x800!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F59%2F65%2Fb06225664a25b8cb4034c8a61c91%2Fnike-off-white-air-jordan-4-sail.jpg",
    ],
    amount: 2200,
  },
];

interface TCheckoutData {
  name: string;
  description: string;
  amount: number;
  images: string[];
}

export default function Home() {
  // const [activeSessions, setActiveSessions] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  async function handleCheckoutSession(data: TCheckoutData) {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/checkout-sessions", data);
      console.log(response.data.session);
      // setActiveSessions([...activeSessions, response.data.session.id]);
      router.push(response.data.session.url);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      {products.map((product) => (
        <div
          className="border rounded-md flex items-center gap-x-20 p-4 w-[400px]"
          key={product.id}
        >
          <div className="relative h-28 w-28">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl">{product.name}</h3>
            <p className="text-muted-foreground text-sm">
              {product.description}
            </p>
            <p className="text-2xl">${product.amount}</p>
            <Button
              disabled={isSubmitting}
              onClick={() =>
                handleCheckoutSession({
                  name: product.name,
                  description: product.description,
                  amount: product.amount,
                  images: product.images,
                })
              }
            >
              Pay
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
