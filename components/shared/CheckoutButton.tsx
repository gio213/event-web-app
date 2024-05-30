"use client";
import { IEvent } from "@/lib/mongodb/database/models/event.model";
import React from "react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Link from "next/link";
import CheckOut from "./CheckOut";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata?.userId as string;
  const hasEventFinished = new Date(event.startDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {/* cannit buy past event */}
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry you can't buy tickets for this event as it has already finished.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full" size={"lg"}>
              <Link href="/sign-in">Sign in to Buy Tickets</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <CheckOut event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
